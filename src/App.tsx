import { RouterProvider } from '@tanstack/react-router';
import { router } from '@/router';
import { useInitAuth } from '@/features/auth/hooks/useInitAuth';
import { Loader } from '@/components/layout/loader';

export function App() {
  const isReady = useInitAuth();

  if (!isReady) return <Loader />;
  return <RouterProvider router={router} />;
}

export default App;
