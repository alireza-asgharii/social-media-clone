import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useToast } from "../../hooks/use-toast";

import { SigninValidation } from "../../lib/validation";
import { z } from "zod";
import Loader from "../../components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";

//react-query
import { useSignInAccount } from "../../lib/react-query/queriesAndMutation";
import { useUserContext } from "../../context/AuthContext";

const SigninForm = () => {
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: signInAccount, isPending: signInPending } =
    useSignInAccount();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    const session = await signInAccount(
      { email: values.email, password: values.password },
      {
        onError: () =>
          toast({
            title: "Sign In failed. please try again",
          }),
      }
    );

    if (!session) return;

    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({
        title: "Sign In failed. please try again",
      });
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Wellcome back! Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary w-full">
            {signInPending ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign in"
            )}
          </Button>
          <p className="small-regular text-light-2 text-center">
            Dont't have an account?
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Log up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
