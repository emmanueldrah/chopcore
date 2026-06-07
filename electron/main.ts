import { app, BrowserWindow } from 'electron';
import path from 'path';
import { spawn, ChildProcess, exec } from 'child_process';
import os from 'os';

let mainWindow: BrowserWindow | null;
let backendProcess: ChildProcess | null;
let postgresProcess: ChildProcess | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1280,
    minHeight: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
    title: 'ChopCore',
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.maximize();
}

function startPostgres() {
  if (process.env.NODE_ENV === 'development') return Promise.resolve();

  return new Promise((resolve, reject) => {
    const pgPath = path.join(process.resourcesPath, 'postgres', 'bin', os.platform() === 'win32' ? 'pg_ctl.exe' : 'pg_ctl');
    const pgData = path.join(app.getPath('userData'), 'pgdata');

    // Simple check/init if data dir doesn't exist would go here
    const pgProcess = spawn(pgPath, ['start', '-D', pgData]);

    pgProcess.on('exit', (code) => {
      if (code === 0) resolve(true);
      else reject(new Error('Postgres failed to start'));
    });
  });
}

function runMigrations() {
    return new Promise((resolve) => {
        const initScript = process.env.NODE_ENV === 'development'
            ? 'python3 scripts/init_db.py'
            : path.join(process.resourcesPath, 'scripts', 'init_db');

        exec(initScript, (error) => {
            if (error) console.error('Migration error:', error);
            resolve(true);
        });
    });
}

function startBackend() {
  const backendPath = process.env.NODE_ENV === 'development'
    ? 'python3 backend/main.py'
    : path.join(process.resourcesPath, 'backend', 'chopcore-api');

  const [command, ...args] = backendPath.split(' ');
  backendProcess = spawn(command, args);
}

app.whenReady().then(async () => {
  try {
    await startPostgres();
    await runMigrations();
    startBackend();
    createWindow();
  } catch (err) {
    console.error('Startup error:', err);
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (backendProcess) backendProcess.kill();
    // Stop postgres logic would go here
    app.quit();
  }
});
