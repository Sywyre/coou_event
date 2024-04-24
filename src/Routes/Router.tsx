import LoginPage from "@/Pages/Auth/LoginPage";
// import RegisterPage from "@/Pages/Auth/RegisterPage";
import FormPage from "@/Pages/Form";
import IndividualEntry from "@/Pages/IndividualEntry";
import LandingPage from "@/Pages/LandingPage";
import ViewEntry from "@/Pages/ViewEntry";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    element: <ProtectedRoutes />,
    path: "/",
    children: [
      { index: true, element: <LandingPage /> },
      { path: "/form", element: <FormPage /> },
      { path: "/view", element: <ViewEntry /> },
      { path: "/view/:id", element: <IndividualEntry /> },
    ],
  },
]);

export default router;
