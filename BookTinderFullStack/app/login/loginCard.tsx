import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { validateLogin } from "./loginHelper";

export function LoginCard() {
  let navigate = useNavigate();
  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = (event.target as HTMLFormElement).password.value;
    const email = (event.target as HTMLFormElement).email.value;

    //Check login info
    if (validateLogin(email, password)) {
      console.log("Login successful");
      navigate("/dashboard");
    } else {
      alert("Invalid login info");
    }
  }
  return (
    <Card className="w-full max-w-sm bg-slate-50">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email and password below to login to your account
        </CardDescription>
        <CardAction>
          <Link to="/register">
            <Button variant="link">Sign Up</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} id="login-form">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" form="login-form">
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
