import { RegisterCard } from "~/register/registerCard";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register" },
    { name: "description", content: "Sign up to your account" },
  ];
}

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-slate-300 to-blue-100">
      <RegisterCard />
    </div>
  );
}
