import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "@/firebase/firebase";
import LoginImg from "@/assets/img.png";
import { Loader2 } from "lucide-react";
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

const LoginPage = () => {
  //States
  const [isLoading, setIsLoading] = useState(false);

  //Hooks
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

  const handleRegister = (values: formData) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user: any = userCredential.user;
        console.log(user.accessToken);
        localStorage.setItem("jwt", user.accessToken);
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: `${error.message}`,
        });
      });
  };

  return (
    <div className="w-full h-dvh lg:grid lg:grid-cols-2 font-bodyFont">
      <div className="hidden bg-muted lg:block">
        <img
          src={LoginImg}
          alt="Image"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center h-full">
        <Toaster />
        <Card className="grid w-auto mx-4 xl:mx-auto lg:w-[500px]">
          <CardHeader className="grid text-center">
            <CardTitle className="font-bold text-3xl font-headingFont">
              Login
            </CardTitle>
            <CardDescription className="text-balance text-muted-foreground">
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
                          <FormLabel className="lg:text-lg">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter a valid Email"
                              {...field}
                              type="email"
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
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="lg:text-lg">Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter a password"
                              {...field}
                              type="password"
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
                    Login
                  </Button>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
