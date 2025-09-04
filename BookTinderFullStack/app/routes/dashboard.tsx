import DashboardCarousel from "~/dashboard/dashboardCarousel";
import type { Route } from "./+types/home";
import NavBar from "~/components/navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Swipe to match!" },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-100 via-slate-300 to-blue-100">
      <NavBar />
      <div className="min-h-screen flex items-center justify-center">
        <DashboardCarousel />
      </div>
    </div>
  );
}
