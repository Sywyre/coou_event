import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LandingPage = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full">
      <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-center font-headingFont">
        COOU Staff Data collection
      </h1>
      <div className="flex gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add new Entry</Button>
        </DialogTrigger>
        <DialogContent className="w-[300px] lg:w-[425px] rounded-sm">
          <DialogHeader>
            <DialogTitle className="font-headingFont">Enter NIN</DialogTitle>
            <DialogDescription>
              Verify your NIN here. Click verify when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 font-bodyFont">
            <div className="flex items-center gap-4">
              <Label htmlFor="name" className="text-right">
                NIN
              </Label>
              <Input id="name" defaultValue="" className="col-span-3" />
            </div>
          </div>
          <DialogFooter className="grid gap-4 grid-cols-2">
            <Link to="/form">
              <Button className="w-full">Skip</Button>
            </Link>
            <Button type="submit" className="opacity-50">
              Verify
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Link to='/view'>
        <Button>View all Entries</Button>
      </Link>
      </div>
    </div>
  );
};

export default LandingPage;
