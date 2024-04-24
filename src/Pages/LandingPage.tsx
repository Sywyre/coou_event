import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useState } from "react";
import apiClient from "@/services/api-client";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import useNinStore, { Nin } from "@/stores";

const schema = z.object({
  nin: z
    .string()
    .min(11, { message: "Your NIN must be up to 11 digits" })
    .max(11, { message: "Your NIN Must be 11 digits" }),
});

type formData = z.infer<typeof schema>;

const LandingPage = () => {
  const [nin, setNin] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const { toast } = useToast();
  const { ninDetails, updateNin } = useNinStore();

  const form = useForm<formData>({
    resolver: zodResolver(schema),
  });

  const handleVerification = (values: formData) => {
    setIsLoading(true);
    setNin(values.nin);
    apiClient
      .get<Nin>("https://api.dojah.io/api/v1/kyc/nin/", {
        params: {
          nin: values.nin,
        },
      })
      .then((res) => {
        updateNin({...res.data.entity, nin: values.nin});
        setIsLoading(false);
        setConfirmation(true);
      })
      .catch((err) => {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `${err.message} Try Again`,
        });
        form.reset();
      });
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full">
      <Toaster />
      <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-center font-headingFont">
        COOU Staff Data collection
      </h1>
      <div className="flex gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add new Entry</Button>
          </DialogTrigger>
          <DialogContent className="w-[300px] lg:w-[425px] rounded-sm">
            {!confirmation && (
              <DialogHeader>
                <DialogTitle className="font-headingFont">
                  Enter NIN
                </DialogTitle>
                <DialogDescription>
                  Verify your NIN here. Click verify when you're done.
                </DialogDescription>
              </DialogHeader>
            )}
            <div className="grid font-bodyFont">
              <div className="flex items-center">
                <form
                  onSubmit={form.handleSubmit(handleVerification)}
                  className="grid gap-4 w-full"
                >
                  {!confirmation && (
                    <div>
                      <Label htmlFor="name" className="text-right font-bold">
                        NIN
                      </Label>
                      <Input
                        id="name"
                        {...form.register("nin")}
                        className="col-span-3 w-full"
                      />
                      {form.formState.errors.nin && (
                        <p className="text-[red] text-sm pt-2">
                          {form.formState.errors.nin?.message}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    {!confirmation && (
                      <Link to="/form">
                        <Button className="w-full">Skip</Button>
                      </Link>
                    )}
                    {confirmation ? (
                      <Dialog>
                        <DialogTrigger className="w-[250px]" asChild>
                          <Button>Confirm NIN Details</Button>
                        </DialogTrigger>
                        <DialogContent className="w-[300px] lg:w-[425px] rounded-sm">
                          <DialogHeader>
                            <DialogTitle className="font-headingFont">
                              Confirm NIN Details
                            </DialogTitle>
                            <DialogDescription>
                              Check if the details from NIN match the physcial
                              form you're about to fill.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid font-bodyFont">
                            <div className="flex items-center">
                              <ul>
                                <li>NIN: {nin}</li>
                                <li>Surname: {ninDetails.last_name}</li>
                                <li>
                                  Other name: {ninDetails.first_name}{" "}
                                  {ninDetails.middle_name}
                                </li>
                                <li>Phone number: {ninDetails.phone_number}</li>
                                <li>DoB: {ninDetails.date_of_birth}</li>
                                <li>Gender: {ninDetails.gender}</li>
                              </ul>
                              <img
                                className="self-start"
                                src={`${ninDetails.photo}`}
                              />
                            </div>
                          </div>
                          <DialogFooter className="grid gap-4 grid-cols-1">
                            <Link to="/form">
                              <Button className="w-full" onClick={() => setConfirmation(false)}>Continue</Button>
                            </Link>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button type="submit" disabled={!form.formState.isValid}>
                        {isLoading && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Verify
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <DialogFooter className="grid gap-4 grid-cols-2"></DialogFooter>
          </DialogContent>
        </Dialog>
        <Link to="/view">
          <Button>View all Entries</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
