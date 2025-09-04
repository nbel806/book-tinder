import { Link, redirect } from "react-router";
import { Button } from "~/components/ui/button";

export function Welcome() {
  return (
    <div className="p-10 text-center max-w-lg w-full">
      <h1 className="text-5xl font-bold text-gray-800 mb-6">
        Welcome to Book Tinder
      </h1>
      <p className="text-lg text-gray-500 mb-8">
        Discover your next favourite read by swiping through books that match
        your vibe.
      </p>
      <Link to="/login">
        <Button className="w-full text-lg py-6 rounded-xl shadow-md bg-pink-50 hover:bg-pink-100 text-black transition-all">
          Login or Signup
        </Button>
      </Link>
    </div>
  );
}
