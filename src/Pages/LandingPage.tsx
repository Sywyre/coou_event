import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-center font-headingFont">
        Welcome to COOU Staff Data collection page
      </h1>
      <Link to="/form">
        <Button className="m-4">Fill up a form</Button>
      </Link>
    </div>
  );
};

export default LandingPage;
