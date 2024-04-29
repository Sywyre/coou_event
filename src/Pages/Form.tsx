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
import { academicQualification, base, employmentTypes, states } from "@/utils";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFaculty from "@/hooks/useFaculty";
import useNinStore from "@/stores";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const schema = z.object({
  surname: z
    .string()
    .min(2, { message: "Surname must contain at least 2 characters" })
    .max(20),
  othername: z
    .string()
    .min(2, { message: "Other names must contain at least 2 characters" })
    .max(50),
  email: z.string().email().optional().or(z.literal("")),
  nin: z.string(),
  dob: z.string(),
  phoneNumber: z.string(),
  gender: z.string(),
  address: z.string(),
  state: z.string(),
  lga: z.string(),
  town: z.string(),
  staff_id: z.string(),
  staff_type: z
    .enum(["Yes", "No"], {
      required_error: "You need to select a value.",
    })
    .optional()
    .or(z.literal("")),
  faculty: z.string().optional().or(z.literal("")),
  department: z.string(),
  unit: z.string().optional().or(z.literal("")),
  dutyDate: z.string(),
  employmentDate: z.string(),
  present_rank: z.string(),
  lastPromoDate: z.string(),
  academic_qualification: z.string(),
  professional_qualification: z.enum(["Yes", "No"], {
    required_error: "You need to select a value.",
  }),
  type_of_employment: z.string().optional().or(z.literal("")),
});

const FormPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { faculties } = useFaculty();
  const { ninDetails } = useNinStore();

  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [dutyDate, setDutyDate] = useState<Date>();
  const [employmentDate, setEmploymentDate] = useState<Date>();
  const [lastPromoDate, setLastPromoDate] = useState<Date>();
  const [isTeaching, setIsTeaching] = useState("");
  const [employmentType, setEmploymentType] = useState("");

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      surname: `${
        ninDetails.last_name == undefined ? "" : ninDetails.last_name
      }`,
      othername: `${
        ninDetails.first_name == undefined ? "" : ninDetails.first_name
      } ${ninDetails.middle_name == undefined ? "" : ninDetails.middle_name}`,
      nin: `${ninDetails.nin == undefined ? "" : ninDetails.nin}`,
      gender: `${ninDetails.gender == undefined ? "" : ninDetails.gender}`,
      phoneNumber: `${
        ninDetails.phone_number == undefined ? "" : ninDetails.phone_number
      }`,
      dob: `${
        ninDetails.date_of_birth == undefined ? "" : ninDetails.date_of_birth
      }`,
    },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    setIsLoading(true);

    const payload = {
      surname: values.surname,
      other_names: values.othername,
      admin_email: localStorage.getItem("admin_email")?.toString(),
      email: values.email,
      nin: values.nin,
      nin_is_valid: ninDetails.nin ? "✅" : "",
      is_captured: "false",
      phone_number: values.phoneNumber,
      gender: values.gender,
      dob: values.dob,
      contact_address: values.address,
      state_of_origin: values.state,
      lga: values.lga,
      town: values.town,
      staff_id: values.staff_id,
      teaching_staff: isTeaching,
      faculty: values.faculty,
      unit: values.unit,
      department: values.department,
      date_of_assumption_of_duty: values.dutyDate,
      date_of_confirmation_of_employment: values.employmentDate,
      present_rank: values.present_rank,
      last_promotion_date: values.lastPromoDate,
      academic_qualification: values.academic_qualification,
      professional_qualification: values.professional_qualification,
      other_type_of_employment: values.type_of_employment,
      type_of_employment: employmentType,
    };

    base(import.meta.env.VITE_AIRTABLE_TABLE).create(
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
        setIsLoading(false);
        navigate("/");
        toast({
          title: "Congrats🎉",
          description: `Submitted Successfully`,
        });
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
          <CardDescription className="flex justify-center"></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Carousel className="w-full">
                  <CarouselContent>
                    <CarouselItem>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex p-6">
                            <div className="flex flex-col gap-4 w-full">
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
                                        readOnly={
                                          ninDetails?.last_name?.length > 1
                                        }
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
                                        readOnly={
                                          ninDetails?.first_name?.length > 1
                                        }
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
                                        readOnly={ninDetails?.nin?.length > 1}
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
                                        readOnly={
                                          ninDetails?.phone_number?.length > 1
                                        }
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="dob"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                    Date of Birth
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter date of birth"
                                        {...field}
                                        className="lg:text-base"
                                        readOnly={ninDetails?.date_of_birth?.length > 1}
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
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger className="w-full">
                                          <SelectValue placeholder="Select a Gender" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectGroup>
                                          <SelectItem value="m">
                                            Male
                                          </SelectItem>
                                          <SelectItem value="f">
                                            Female
                                          </SelectItem>
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
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
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger className="w-full">
                                          <SelectValue placeholder="Select your state of origin" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectGroup>
                                          {states.map((state) => (
                                            <SelectItem
                                              key={state.value}
                                              value={state.value}
                                            >
                                              {state.name}
                                            </SelectItem>
                                          ))}
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
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
                                name="staff_type"
                                render={({ field }) => (
                                  <FormItem className="space-y-3">
                                    <FormLabel className="lg:text-base">
                                      Are you a teaching staff
                                    </FormLabel>
                                    <FormControl>
                                      <RadioGroup
                                        onValueChange={(selectedValue) =>
                                          setIsTeaching(selectedValue)
                                        }
                                        defaultValue={field.value}
                                        className="flex space-x-1"
                                      >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                          <FormControl>
                                            <RadioGroupItem value="Yes" />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            Yes
                                          </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                          <FormControl>
                                            <RadioGroupItem value="No" />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            No
                                          </FormLabel>
                                        </FormItem>
                                      </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              {isTeaching == "Yes" ? (
                                <FormField
                                  control={form.control}
                                  name="faculty"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="lg:text-base">
                                        Faculty
                                      </FormLabel>
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select your faculty" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectGroup>
                                            {faculties?.map((faculty) => (
                                              <SelectItem
                                                key={faculty.id}
                                                value={faculty.name}
                                              >
                                                {faculty.name}
                                              </SelectItem>
                                            ))}
                                          </SelectGroup>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              ) : (
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
                                          placeholder="Enter your unit"
                                          {...field}
                                          className="lg:text-base"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                    <CarouselItem>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex p-6">
                            <div className="flex flex-col gap-4 w-full">
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
                                        placeholder="Enter your department"
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
                                name="dutyDate"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                    Date of Assumption of Duty
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter Date of Assumption of Duty"
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
                                name="employmentDate"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                    Date of Confirmation of Employment
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter Date of Confirmation of Employment"
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
                                name="present_rank"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                      Present Rank
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter your present rank"
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
                                name="lastPromoDate"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                    Last Promotion Date
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter Date of Last Promotion"
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
                                name="type_of_employment"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                      Type of Employment
                                    </FormLabel>
                                    <Select
                                      onValueChange={(selectedValue) =>
                                        setEmploymentType(selectedValue)
                                      }
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger className="w-full">
                                          <SelectValue placeholder="Select your type of employment" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectGroup>
                                          <SelectLabel>
                                            Employment Type
                                          </SelectLabel>
                                          {employmentTypes.map((type) => (
                                            <SelectItem
                                              key={type.value}
                                              value={type.value}
                                              className="text-base"
                                            >
                                              {type.name}
                                            </SelectItem>
                                          ))}
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              {employmentType === "Others" && (
                                <FormField
                                  control={form.control}
                                  name="type_of_employment"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="lg:text-base">
                                        Others Type of Employment
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Other Type of Employment"
                                          {...field}
                                          className="lg:text-base"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              )}

                              <FormField
                                control={form.control}
                                name="academic_qualification"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                      Academic Qualification
                                    </FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger className="w-full">
                                          <SelectValue placeholder="Select your Academic Qualification" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectGroup>
                                          {academicQualification.map(
                                            (academic) => (
                                              <SelectItem
                                                key={academic.value}
                                                value={academic.value}
                                              >
                                                {academic.name}
                                              </SelectItem>
                                            )
                                          )}
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="professional_qualification"
                                render={({ field }) => (
                                  <FormItem className="space-y-3">
                                    <FormLabel className="lg:text-base">
                                      Professional Qualification
                                    </FormLabel>
                                    <FormControl>
                                      <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex space-x-1"
                                      >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                          <FormControl>
                                            <RadioGroupItem value="Yes" />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            Yes
                                          </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                          <FormControl>
                                            <RadioGroupItem value="No" />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            No
                                          </FormLabel>
                                        </FormItem>
                                      </RadioGroup>
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
                                      Email (Optional)
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

                              <Button
                                type="submit"
                                className="w-full font-headingFont lg:text-lg"
                                disabled={!form.formState.isValid}
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
                  <CarouselPrevious variant="default" />
                  <CarouselNext variant="default" />
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
