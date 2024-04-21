import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-center font-headingFont">
        COOU Staff Data collection
      </h1>
      <Link to="/personal">
        <Button className="m-4">Add new Entry</Button>
      </Link>
    </div>
  );
};

export default LandingPage;
