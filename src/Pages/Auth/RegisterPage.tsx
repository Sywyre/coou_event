import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword } from "@/firebase/firebase";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

const schema = z.object({
  email: z.string().email({ message: "Enter a Valid Email Address" }),
  password: z
    .string()
    .min(6, { message: "Password must be more than 6 characters" }),
});

type formData = z.infer<typeof schema>;

const RegisterPage = () => {
  //States
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  //React hook form
  const form = useForm<formData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //Register Handler
  const handleRegister = (values: formData) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user: any = userCredential.user;
        setIsLoading(false);
        localStorage.setItem("jwt", user.accessToken);
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `${error.message}`,
        });
      });
  };

  return (
    <div className="h-dvh flex justify-center items-center font-bodyFont">
      <Card className="mx-4 grid w-[400px] lg:w-[500px] xl:mx-auto">
        <Toaster />
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-headingFont">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleRegister)}
                className="space-y-8"
              >
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="lg:text-base">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter a valid Email"
                            {...field}
                            type="email"
                            className="lg:text-base"
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
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="lg:text-base">Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter a password"
                            {...field}
                            type="password"
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
                  Create an account
                </Button>
              </form>
            </Form>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
