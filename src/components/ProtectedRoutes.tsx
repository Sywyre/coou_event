import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import MobileNav from "@/components/MobileNav";
import Header from "@/components/Header";

const PrivateRoute = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[250px_1fr] font-bodyFont">
      <Header />
      <div className="flex flex-col">
        <MobileNav />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-0 lg:grid lg:grid-cols-[1fr_200px]">
          <Outlet />
          <div className="border-l bg-muted/40"></div>
        </main>
      </div>
    </div>
  );
};

export default PrivateRoute;
