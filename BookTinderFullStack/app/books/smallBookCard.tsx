import { Trash } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardTitle,
} from "~/components/ui/card";
import type { BookInfo } from "~/lib/types";

export default function SmallBookCard(bookInfo: BookInfo) {
  return (
    <Card className="w-full max-w-sm bg-slate-50 flex flex-row p-4">
      <div className="flex-shrink-0">
        <img
          src={bookInfo.image || "~/../public/testCover.webp"}
          alt={bookInfo.title}
          className="w-20 object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="flex flex-col justify-between text-left w-full">
        <div>
          <CardTitle>{bookInfo.title}</CardTitle>
          <CardDescription>{bookInfo.author}</CardDescription>
          <CardDescription>
            <Badge
              className="mt-2 border-gray-200 bg-slate-50"
              variant={"secondary"}
            >
              {bookInfo.genre}
            </Badge>
          </CardDescription>
        </div>
        <CardAction className="w-full flex">
          <Button className="shadow-sm bg-pink-100 hover:bg-pink-200 text-black transition-all ml-auto mr-0">
            <Trash />
          </Button>
        </CardAction>
      </div>
    </Card>
  );
}
