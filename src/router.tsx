import { createBrowserRouter } from 'react-router-dom';
import React from 'react';

// Layouts
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ProtectedRoute } from './modules/auth/ProtectedRoute';

// Modules
import { Dashboard } from './modules/dashboard/Dashboard';
import { Login } from './modules/auth/Login';
import { SetupWizard } from './modules/setup/SetupWizard';
import { MenuManagement } from './modules/menu/MenuManagement';
import { InventoryManagement } from './modules/inventory/InventoryManagement';
import { TableFloorPlan } from './modules/tables/TableFloorPlan';
import { POS } from './modules/orders/POS';
import { KitchenDisplay } from './modules/kitchen/KitchenDisplay';
import { ReservationList } from './modules/reservations/ReservationList';
import { EventManagement } from './modules/events/EventManagement';
import { DeliveryTracking } from './modules/delivery/DeliveryTracking';
import { StaffManagement } from './modules/staff/StaffManagement';
import { LoyaltyProgram } from './modules/loyalty/LoyaltyProgram';
import { ReportsDashboard } from './modules/reports/ReportsDashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <DashboardLayout />,
        children: [
          { path: '/', element: <Dashboard /> },
          { path: '/menu', element: <MenuManagement /> },
          {
            path: '/inventory',
            element: <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'INVENTORY_MANAGER']} />,
            children: [{ path: '', element: <InventoryManagement /> }]
          },
          { path: '/tables', element: <TableFloorPlan /> },
          { path: '/reservations', element: <ReservationList /> },
          { path: '/events', element: <EventManagement /> },
          { path: '/delivery', element: <DeliveryTracking /> },
          {
            path: '/staff',
            element: <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'MANAGER']} />,
            children: [{ path: '', element: <StaffManagement /> }]
          },
          { path: '/loyalty', element: <LoyaltyProgram /> },
          {
            path: '/reports',
            element: <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'ACCOUNTANT']} />,
            children: [{ path: '', element: <ReportsDashboard /> }]
          },
        ],
      },
      { path: '/pos', element: <POS /> },
      { path: '/kitchen', element: <KitchenDisplay /> },
    ],
  },
  { path: '/pos', element: <POS /> },
  { path: '/kitchen', element: <KitchenDisplay /> },
  { path: '/login', element: <Login /> },
  { path: '/setup', element: <SetupWizard /> },
]);
