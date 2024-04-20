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
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { base } from "@/utils";

const schema = z.object({
  surname: z.string().min(2).max(20),
  othername: z.string().min(2).max(50),
  email: z.string().email(),
});

const FormPage = () => {
  const [isLoading, setIsLoading] = useState(false);
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
          return;
        }
        records?.forEach(function () {
          //reset();
        });
        // setToast("success");
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="w-full h-dvh font-bodyFont flex justify-center items-center">
      <Card className="grid w-[400px] mx-4 xl:mx-auto lg:w-[500px]">
        <CardHeader className="grid text-center">
          <CardTitle className="font-bold text-3xl font-headingFont">
            COOU Staff Form
          </CardTitle>
          <CardDescription className="text-balance text-muted-foreground">
            Enter your information correctly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="surname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="lg:text-lg">Surname</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter a surname"
                            {...field}
                            className="lg:text-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="othername"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="lg:text-lg">
                          Other Names
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your other names"
                            {...field}
                            className="lg:text-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="lg:text-lg">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your Email"
                            {...field}
                            className="lg:text-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full font-headingFont lg:text-lg"
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormPage;
