import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { BuyerHome } from './modules/buyer/BuyerHome';
import { LoginForm } from './modules/auth/LoginForm';
import { MainLayout } from './components/MainLayout';
import { VendorApplicationForm } from './modules/vendor/VendorApplicationForm';
import { VendorStorefront } from './modules/buyer/VendorStorefront';
import { CartPage } from './modules/buyer/CartPage';
import { CheckoutPage } from './modules/buyer/CheckoutPage';
import { VendorDashboard } from './modules/vendor/VendorDashboard';
import { AdminDashboard } from './modules/admin/AdminDashboard';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { user, role, isLoading } = useAuthStore();

  // For verification purposes, we'll bypass the user check if a special flag is set
  const bypassAuth = false;

  if (!bypassAuth) {
    if (isLoading) return <div className="h-screen flex items-center justify-center font-display text-marketClay">Loading Ferako...</div>;
    if (!user) return <Navigate to="/login" replace />;
    if (allowedRoles && role && !allowedRoles.includes(role)) return <Navigate to="/" replace />;
  }

  return <MainLayout>{children}</MainLayout>;
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: <div className="min-h-screen flex items-center justify-center p-4 bg-harmattanSand"><LoginForm /></div>
  },
  {
    path: '/',
    element: <ProtectedRoute><BuyerHome /></ProtectedRoute>
  },
  {
    path: '/vendor/apply',
    element: <ProtectedRoute><VendorApplicationForm /></ProtectedRoute>
  },
  {
    path: '/vendor/dashboard',
    element: <ProtectedRoute allowedRoles={['vendor_owner']}><VendorDashboard /></ProtectedRoute>
  },
  {
    path: '/vendor/:id',
    element: <ProtectedRoute><VendorStorefront /></ProtectedRoute>
  },
  {
    path: '/cart',
    element: <ProtectedRoute><CartPage /></ProtectedRoute>
  },
  {
    path: '/checkout',
    element: <ProtectedRoute><CheckoutPage /></ProtectedRoute>
  },
  {
    path: '/admin/dashboard',
    element: <ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
