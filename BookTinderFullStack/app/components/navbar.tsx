import { Link, useLocation } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";

export default function NavBar() {
  const location = useLocation();

  const navItems = [
    { to: "/dashboard", label: "Home" },
    { to: "/books", label: "Past Books" },
    { to: "/profile", label: "Profile" },
  ];

  return (
    <NavigationMenu className="bg-slate-100 shadow-md rounded-xl rounded-t-none px-6 py-3 min-w-full">
      <NavigationMenuList className="flex gap-6">
        {navItems.map((item) => (
          <NavigationMenuItem key={item.to}>
            <NavigationMenuLink asChild>
              <Link
                to={item.to}
                className={`px-4 py-2 rounded-xl text-lg font-medium transition-colors duration-200 
                  ${
                    location.pathname === item.to
                      ? "bg-pink-200 text-slate-800 shadow-sm"
                      : "text-slate-800 hover:bg-slate-200"
                  }`}
              >
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
