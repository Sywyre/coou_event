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
import { useNavigate } from "react-router-dom";
//import { Progress } from "@/components/ui/progress";

const schema = z.object({
  surname: z
    .string()
    .min(2, { message: "Surname must contain at least 2 characters" })
    .max(20),
  othername: z
    .string()
    .min(2, { message: "Other names must contain at least 2 characters" })
    .max(50),
  email: z.string().email(),
  nin: z.string(),
  phoneNumber: z.string(),
  gender: z.string(),
  address: z.string(),
  state: z.string(),
  lga: z.string(),
  town: z.string(),
  staff_id: z.string(),
  faculty: z.string(),
  department: z.string(),
  unit: z.string(),
  date_of_assumption_of_duty: z.string(),
  date_of_confirmation_of_employment: z.string(),
  present_rank_or_grade_level: z.string(),
  last_promotion_date: z.string(),
});

const FormPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [progress, setProgress] = useState(0);

  // const progressCal = (progress / 25) * 100;

  const { toast } = useToast();
  const navigate = useNavigate();

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
      staff_id: values.staff_id,
      faculty: values.faculty,
      department: values.department,
      unit: values.unit,
      date_of_assumption_of_duty: values.date_of_assumption_of_duty,
      date_of_confirmation_of_employment:
        values.date_of_confirmation_of_employment,
      present_rank_or_grade_level: values.present_rank_or_grade_level,
      last_promotion_date: values.last_promotion_date,
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
          setIsLoading(false);
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
        setTimeout(() => navigate("/"), 3000);
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
                                name="staff_id"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                      Staff Id
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter your Staff Id"
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
                                name="faculty"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                      Faculty
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter your Faculty"
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
                                name="department"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                      Department
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter your Department"
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
                                name="unit"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                      Unit
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter your Unit"
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
                                name="date_of_assumption_of_duty"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                      Date of Assumption of Duty
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter the date you resumed work"
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
                                name="date_of_confirmation_of_employment"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                      Date of Confirmation of Employment
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter the date you confirmed employment"
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
                                name="present_rank_or_grade_level"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                      Present Rank/Grade Level
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter your present Rank"
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
                                name="last_promotion_date"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                      Last Promotion Date
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter your Last Promotion Date"
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
