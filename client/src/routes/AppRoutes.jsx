import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/home/Home";
import MyTask from "../pages/myTasks/MyTask";
import NewTask from "../pages/newTask/NewTask";
import AllTask from "../pages/allTasks/AllTask";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import { ProtectedRoutes, PublicRoutes } from "./ProtectedRoutes";

export default function AppRoutes() {
  const routes = [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "my-tasks",
          element: (
            <ProtectedRoutes>
              <MyTask />
            </ProtectedRoutes>
          ),
        },
        {
          path: "new-task",
          element: (
            <ProtectedRoutes>
              <NewTask />
            </ProtectedRoutes>
          ),
        },
        {
          path: "all-task",
          element: (
            <ProtectedRoutes>
              <AllTask />
            </ProtectedRoutes>
          ),
        },
        {
          path: "login",
          element: (
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          ),
        },
        {
          path: "signup",
          element: (
            <PublicRoutes>
              <Register />
            </PublicRoutes>
          ),
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}
