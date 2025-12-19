import { createRootRoute, createRoute } from "@tanstack/react-router";
import Layout from "../Layout";
import HomePage from "../Featured/Pages/Home";
import BookingPage from "../Featured/Pages/Booking";
import PersonalCabinet from "../Featured/Pages/PersonalCabinet";
import Login from "../Featured/Pages/Login";

export const rootRoute = createRootRoute({
  component: Layout,
});

export const HomeRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
export const BookingPageRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/booking",
  component: BookingPage,
});
export const PersonalCabinetRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cabinet",
  component: PersonalCabinet,
});
export const LoginRouter = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

export const routeTree = rootRoute.addChildren([
  HomeRouter,
  BookingPageRouter,
  PersonalCabinetRouter,
  LoginRouter,
]);
