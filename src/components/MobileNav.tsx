import { Link, useLocation, useNavigate } from "react-router-dom";
import { CircleUser, FileText, Home, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MobileNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <header className="flex h-14 justify-between items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:justify-end">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-8 text-lg font-medium">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              {/* Add Logo here */}
              <span className="sr-only">COOU</span>
            </Link>
            <div>
              <Link
                to="/"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Button
                  variant={location.pathname === "/" ? "default" : "outline"}
                  className="w-full flex gap-3 justify-start"
                >
                  <Home className="h-5 w-5" />
                  Home
                </Button>
              </Link>
              <Link
                to="/view"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Button
                  variant={
                    location.pathname === "/view" ? "default" : "outline"
                  }
                  className="w-full flex gap-3 justify-start"
                >
                  <FileText className="h-4 w-4" />
                  View All Entries
                </Button>
              </Link>
            </div>
          </nav>
        </SheetContent>
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full lg:flex"
          >
            <CircleUser className="h-5 w-5 lg:absolute" />
            <span className="sr-only hidden">Toggle user menu</span>
            <span className="relative h-3 w-3 hidden lg:flex">
              <span className="animate-ping absolute bottom-4 left-4 inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative bottom-4 left-4 inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default MobileNav;
