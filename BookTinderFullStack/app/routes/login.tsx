import { LoginCard } from "~/login/loginCard";
import type { Route } from "./+types/login";
import { validateLogin } from "~/login/loginHelper";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Login to your account" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.VALUE_FROM_EXPRESS };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-slate-300 to-blue-100">
      <LoginCard />
    </div>
  );
}
