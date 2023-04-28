import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Search from "./pages/Search";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Detail from "./pages/Detail";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "search/:q",
        element: <Search />,
      },
      {
        path: "detail/:id",
        element: <Detail />,
      },
    ],
  },
]);

const Router = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <div>
        <ReactQueryDevtools initialIsOpen={true} />
      </div>
    </QueryClientProvider>
  );
};

export default Router;
