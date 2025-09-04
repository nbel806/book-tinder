import DashboardCarousel from "~/dashboard/dashboardCarousel";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Swipe to match!" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-slate-300 to-blue-100">
      <DashboardCarousel />
    </div>
  );
}
