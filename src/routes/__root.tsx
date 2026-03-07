import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
// import { useInitAuth } from '@/features/auth/queries/useInitAuth';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  // useInitAuth();
  return (
    <React.Fragment>
      <Outlet />
      <TanStackRouterDevtools />
    </React.Fragment>
  );
}
