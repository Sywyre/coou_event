import Address from "@/Pages/EmploymentDetails";
import LoginPage from "@/Pages/Auth/LoginPage";
import FormPage from "@/Pages/PersonalDetails";
import LandingPage from "@/Pages/LandingPage";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    element: <ProtectedRoutes />,
    path: "/",
    children: [
      { index: true, element: <LandingPage /> },
      { path: "/personal", element: <FormPage /> },
      { path: "/employment", element: <Address /> },
    ],
  },
]);

export default router;
