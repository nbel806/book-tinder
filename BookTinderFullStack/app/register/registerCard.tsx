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
import { registerUser } from "../store/authActions";
import { useAppDispatch } from "~/store/hooks";

export function RegisterCard() {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = (event.target as HTMLFormElement).password.value;
    const confirmPassword = (event.target as HTMLFormElement).confirmpassword
      .value;
    const email = (event.target as HTMLFormElement).email.value;
    const name = (event.target as HTMLFormElement).usersName.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(registerUser({ name, email, password })).then((result) => {
      if (result.type === "auth/register/fulfilled") {
        navigate("/dashboard");
      } else {
        alert("Registration failed, User may have and account");
      }
    });
  }
  return (
    <Card className="w-full max-w-sm bg-slate-50">
      <CardHeader>
        <CardTitle>Sign up for an account</CardTitle>
        <CardDescription>
          Enter an email and password below to sign up
        </CardDescription>
        <CardAction>
          <Link to="/login">
            <Button variant="link">Log In</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} id="signup-form">
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="usersName">Name</Label>
              <Input
                id="usersName"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@example.com"
                required
              />
            </div>
            <div className="grid gap-2 mt-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="confirmpassword">Confirm Password</Label>
              </div>
              <Input id="confirmpassword" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" form="signup-form">
          Sign Up
        </Button>
      </CardFooter>
    </Card>
  );
}
