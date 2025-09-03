import { Link, redirect } from "react-router";
import { Button } from "~/components/ui/button";

export function Welcome() {
  return (
    <div>
      <h1>Welcome to Book Tinder</h1>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
    </div>
  );
}
