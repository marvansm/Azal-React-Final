import { createRootRoute, createRoute } from "@tanstack/react-router";
import Layout from "../Layout";
import HomePage from "../Featured/Pages/Home";

export const rootRoute = createRootRoute({
  component: Layout,
});

export const HomeRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

export const routeTree = rootRoute.addChildren([HomeRouter]);
