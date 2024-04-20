import LoginPage from "@/Pages/Auth/LoginPage";
import FormPage from "@/Pages/FormPage";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    element: <ProtectedRoutes />,
    path: "/",
    children: [{ index: true, element: <FormPage /> }],
  },
]);

export default router;
