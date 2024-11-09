import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/home/Home";
import MyTask from "../pages/myTasks/MyTask";
import NewTask from "../pages/newTask/NewTask";
import AllTask from "../pages/allTasks/AllTask";

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
          element: <MyTask />,
        },
        {
          path: "new-task",
          element: <NewTask />,
        },
        {
          path: "all-task",
          element: <AllTask />,
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}
