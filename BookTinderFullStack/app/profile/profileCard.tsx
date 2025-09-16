import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { UserInfo } from "~/lib/types";
import { getUserInfo } from "./profileHelper";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { useEffect, useState } from "react";

export default function ProfileCard() {
  const [userinfo, setUserinfo] = useState<UserInfo>({
    id: 0,
    name: "temp",
    email: "tempgmail.com",
    image: "",
    likedBooks: [],
    dislikedBooks: [],
  });
  useEffect(() => {
    setUserinfo(getUserInfo());
  });
  return (
    <Card className="w-full max-w-sm bg-slate-50">
      <div className="flex flex-row justify-between pr-4">
        <div className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="text-md text-gray-600">Name:{userinfo.name}</h1>
            <h1 className="text-md text-gray-600">Email:{userinfo.email}</h1>
          </CardContent>
        </div>
        <Avatar className="w-16 h-16">
          <AvatarImage src={userinfo.image} />
          <AvatarFallback className="bg-pink-100 text-lg">
            {userinfo.name[0]}
          </AvatarFallback>
        </Avatar>
      </div>
      <CardFooter>
        <Button>Log Out</Button>
      </CardFooter>
    </Card>
  );
}
