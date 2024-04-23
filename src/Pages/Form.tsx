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
import {
  academic,
  base,
  employmentTypes,
  levels,
  nonAcademic,
  states,
  units,
} from "@/utils";
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
import { Textarea } from "@/components/ui/textarea";
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
  present_rank: z.string(),
  grade_level: z.string(),
  academic_qualification: z.string(),
  professional_qualification: z.string(),
  type_of_employment: z.string(),
  challenges: z.string(),
  recommendations: z.string(),
  job_description: z.string(),
});

const FormPage = () => {
  // const [progress, setProgress] = useState(0);
  // const progressCal = (progress / 25) * 100;

  const { toast } = useToast();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [dutyDate, setDutyDate] = useState<Date>();
  const [employmentDate, setEmploymentDate] = useState<Date>();
  const [lastPromoDate, setLastPromoDate] = useState<Date>();

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
      admin_email: localStorage.getItem("admin_email")?.toString(),
      email: values.email,
      nin: values.nin,
      phone_number: values.phoneNumber,
      gender: values.gender,
      dob: date?.toDateString(),
      contact_address: values.address,
      state_of_origin: values.state,
      lga: values.lga,
      town: values.town,
      staff_id: values.staff_id,
      faculty: values.faculty,
      department: values.department,
      unit: values.unit,
      date_of_assumption_of_duty: dutyDate?.toDateString(),
      date_of_confirmation_of_employment: employmentDate?.toDateString(),
      present_rank: values.present_rank,
      grade_level: values.grade_level,
      last_promotion_date: lastPromoDate?.toDateString(),
      academic_qualification: values.academic_qualification,
      professional_qualification: values.professional_qualification,
      type_of_employment: values.type_of_employment,
      challenges: values.challenges,
      recommendations: values.recommendations,
      job_description: values.job_description,
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
                              <div className="grid gap-3">
                                <Label htmlFor="dob" className="text-base">
                                  Date of Birth
                                </Label>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl id="dob" className="!w-full">
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-[240px] justify-start text-left font-normal",
                                          !date && "text-muted-foreground"
                                        )}
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? (
                                          format(date, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    align="start"
                                    className=" w-auto p-0"
                                  >
                                    <Calendar
                                      mode="single"
                                      captionLayout="dropdown-buttons"
                                      selected={date}
                                      onSelect={setDate}
                                      fromYear={1960}
                                      toYear={2030}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Gender</FormLabel>
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
                                          <SelectItem value="male">
                                            Male
                                          </SelectItem>
                                          <SelectItem value="female">
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
                                    <FormLabel>State of Origin</FormLabel>
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
                                name="unit"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-base">
                                      Unit
                                    </FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger className="w-full">
                                          <SelectValue placeholder="Select your unit" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectGroup>
                                          <SelectLabel>
                                            Non-Teaching Staff
                                          </SelectLabel>
                                          {units.map((unit) => (
                                            <SelectItem
                                              key={unit.value}
                                              value={unit.value}
                                              className="text-base"
                                            >
                                              {unit.name}
                                            </SelectItem>
                                          ))}
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>

                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className="grid gap-3">
                                <Label htmlFor="dod" className="text-base">
                                  Date of Assumption of Duty
                                </Label>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl id="dod" className="!w-full">
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-[240px] justify-start text-left font-normal",
                                          !dutyDate && "text-muted-foreground"
                                        )}
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dutyDate ? (
                                          format(dutyDate, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    align="start"
                                    className=" w-auto p-0"
                                  >
                                    <Calendar
                                      mode="single"
                                      captionLayout="dropdown-buttons"
                                      selected={dutyDate}
                                      onSelect={setDutyDate}
                                      fromYear={1950}
                                      toYear={2030}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <div className="grid gap-3">
                                <Label htmlFor="doe" className="text-base">
                                  Date of Confirmation of Employment
                                </Label>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl id="doe" className="!w-full">
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-[240px] justify-start text-left font-normal",
                                          !employmentDate &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {employmentDate ? (
                                          format(employmentDate, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    align="start"
                                    className=" w-auto p-0"
                                  >
                                    <Calendar
                                      mode="single"
                                      captionLayout="dropdown-buttons"
                                      selected={employmentDate}
                                      onSelect={setEmploymentDate}
                                      fromYear={1960}
                                      toYear={2030}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <FormField
                                control={form.control}
                                name="present_rank"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-base">
                                      Present Rank
                                    </FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger className="w-full">
                                          <SelectValue placeholder="Select your present rank" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectGroup>
                                          <SelectLabel>
                                            Non-Academic Staff
                                          </SelectLabel>
                                          {nonAcademic.map((rank) => (
                                            <SelectItem
                                              key={rank.value}
                                              value={rank.value}
                                              className="text-base"
                                            >
                                              {rank.name}
                                            </SelectItem>
                                          ))}
                                        </SelectGroup>
                                        <SelectGroup>
                                          <SelectLabel>
                                            Academic Staff
                                          </SelectLabel>
                                          {academic.map((rank) => (
                                            <SelectItem
                                              key={rank.value}
                                              value={rank.value}
                                              className="text-base"
                                            >
                                              {rank.name}
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
                                name="grade_level"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-base">
                                      Grade Level
                                    </FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger className="w-full">
                                          <SelectValue placeholder="Select your grade level" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectGroup>
                                          <SelectLabel>Grade Level</SelectLabel>
                                          {levels.map((level) => (
                                            <SelectItem
                                              key={level}
                                              value={level}
                                              className="text-base"
                                            >
                                              {level}
                                            </SelectItem>
                                          ))}
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className="grid gap-3">
                                <Label htmlFor="promo" className="text-base">
                                  Last Promotion Date
                                </Label>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl id="promo" className="!w-full">
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-[240px] justify-start text-left font-normal",
                                          !lastPromoDate &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {lastPromoDate ? (
                                          format(lastPromoDate, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    align="start"
                                    className=" w-auto p-0"
                                  >
                                    <Calendar
                                      mode="single"
                                      captionLayout="dropdown-buttons"
                                      selected={lastPromoDate}
                                      onSelect={setLastPromoDate}
                                      fromYear={1950}
                                      toYear={2030}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <FormField
                                control={form.control}
                                name="academic_qualification"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                      Academic Qualification
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter your academic qualification"
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
                                name="professional_qualification"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="lg:text-base">
                                      Professional Qualification
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Enter your Professional qualification"
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
                                    <FormLabel className="text-base">
                                      Type of Employment
                                    </FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
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
                              <FormField
                                control={form.control}
                                name="challenges"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Challlenges</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="In Your View, What do you consider to be the most significant challenges confronting the university?"
                                        className="resize-none"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="recommendations"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Recommendations</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="What Recommendations do you Propose for Addressing these Challenges?"
                                        className="resize-none"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="job_description"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Job Description</FormLabel>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger className="w-full">
                                          <SelectValue placeholder="Select a Job Description" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectGroup>
                                          <SelectItem value="yes">
                                            Yes
                                          </SelectItem>
                                          <SelectItem value="no">No</SelectItem>
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>

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
