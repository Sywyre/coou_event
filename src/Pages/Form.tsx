import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { base } from "@/utils";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
//import { Progress } from "@/components/ui/progress";


const schema = z.object({
  surname: z.string().min(2).max(20),
  othername: z.string().min(2).max(50),
  email: z.string().email(),
  nin: z.string(),
  phoneNumber: z.string(),
  gender: z.string(),
  address: z.string(),
  state: z.string(),
  lga: z.string(),
  town: z.string(),
});

const FormPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [progress, setProgress] = useState(0);

  // const progressCal = (progress / 25) * 100;

  const { toast } = useToast();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      surname: "",
      othername: "",
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log(values);
    setIsLoading(true);

    const payload = {
      surname: values.surname,
      other_names: values.othername,
      email: values.email,
      nin: values.nin,
      phone_number: values.phoneNumber,
      gender: values.gender,
      contact_address: values.address,
      state_of_origin: values.state,
      lga: values.lga,
      town: values.town,
    };

    base("Form").create(
      [
        {
          fields: payload,
        },
      ],
      function (err, records) {
        if (err) {
          console.error(err);
          //setToast("error");
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: `Try again`,
          });
          return;
        }
        records?.forEach(function () {
          //reset();
        });
        toast({
          title: "Congrats🎉",
          description: `Submitted Successfully`,
        });
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="w-full h-full my-8 font-bodyFont flex justify-center items-center">
      <Card className="grid w-[400px] mx-4 xl:mx-auto lg:w-[700px]">
        <Toaster />
        <CardHeader className="grid text-center">
          <CardTitle className="font-bold text-3xl font-headingFont">
            COOU Staff Data
          </CardTitle>
          <CardDescription className="flex justify-center">
            {/* <Progress value={progressCal} className="w-full" /> */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <Carousel className="w-full">
                  <CarouselContent>
                    <CarouselItem>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex  p-6">
                            <div className="flex flex-col gap-5 w-full">
                              <FormField
                                control={form.control}
                                name="surname"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                      Surname
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter a surname"
                                        {...field}
                                        className="lg:text-base"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="othername"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                      Other Names
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter your other names"
                                        {...field}
                                        className="lg:text-base"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                      Email
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter your Email"
                                        {...field}
                                        className="lg:text-base"
                                        type="email"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="nin"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                      NIN
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter your NIN"
                                        {...field}
                                        className="lg:text-base"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                      Phone Number
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter your Phone Number"
                                        {...field}
                                        className="lg:text-base"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                      Gender
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter your Gender"
                                        {...field}
                                        className="lg:text-base"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex  p-6">
                            <div className="flex flex-col gap-5 w-full">
                              <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                      Address
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter your Address"
                                        {...field}
                                        className="lg:text-base"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                      State of Origin
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter your State of Origin"
                                        {...field}
                                        className="lg:text-base"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="lga"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                      LGA
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter your Local government area"
                                        {...field}
                                        className="lg:text-base"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="town"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                      Town
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter your town"
                                        {...field}
                                        className="lg:text-base"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <Button
                                type="submit"
                                className="w-full font-headingFont lg:text-lg"
                              >
                                {isLoading && (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Submit
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormPage;
