import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routes";

export const router = createRouter({ routeTree });

const TanstackRouterProvider = () => {
  return <RouterProvider router={router} />;
};

export default TanstackRouterProvider;
