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
import { base } from "@/utils";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

const schema = z.object({
  staffId: z.string(),
});

const Address = () => {
  const [isLoading, setIsLoading] = useState(false);

  const progress = (11 / 25) * 100;

  const { toast } = useToast();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    console.log(values);
    setIsLoading(true);

    const payload = {
      staff_id: values.staffId,
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
            description: `Submission failed`,
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
    <div className="w-full h-dvh font-bodyFont flex justify-center items-center">
      <Card className="grid w-[400px] mx-4 xl:mx-auto lg:w-[500px]">
        <Toaster />
        <CardHeader className="grid text-center">
          <CardTitle className="font-bold text-3xl font-headingFont">
            COOU Staff Data
          </CardTitle>
          <CardDescription className="flex justify-center">
            <Progress value={progress} className="w-full" />
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
                    name="staffId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="lg:text-base">
                          Staff Id
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter a Staff Id"
                            {...field}
                            className="lg:text-base"
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

export default Address;
