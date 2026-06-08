import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-[3rem] shadow-2xl p-12 max-w-lg w-full text-center border border-slate-100">
            <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-red-100">
                <AlertCircle size={48} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic mb-4">Something went wrong</h1>
            <p className="text-slate-400 font-bold mb-10 leading-relaxed uppercase tracking-widest text-[10px]">The application encountered an unexpected error. Our team has been notified.</p>
            <button
                onClick={() => window.location.reload()}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black flex items-center justify-center space-x-3 shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
            >
                <RefreshCcw size={20} />
                <span>Reload Application</span>
            </button>
          </div>
        </div>
      );
    }

    return this.children;
  }
}

export default ErrorBoundary;
