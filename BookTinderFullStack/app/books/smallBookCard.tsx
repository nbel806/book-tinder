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
import { useAppSelector } from "~/store/hooks";
import { removeLikedBook } from "./likedBooksHelper";

export default function SmallBookCard(bookInfo: BookInfo) {
  const user = useAppSelector((state) => state.user);
  function onUnlike() {
    if (user) {
      removeLikedBook(user.id, bookInfo.id);
    }
  }

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
        <div className="w-full">
          <CardTitle>{bookInfo.title}</CardTitle>
          <CardDescription>{bookInfo.author}</CardDescription>
          <CardDescription className="line-clamp-2 max-w-full bg-slate-200 mr-2">
            {bookInfo.genres?.slice(0, 5).map((genre: string) => (
              <Badge
                key={genre}
                className="mt-1 border-gray-200 bg-slate-50 mr-1 max-w-auto"
                variant={"secondary"}
              >
                {genre}
              </Badge>
            ))}
          </CardDescription>
        </div>
        <CardAction className="w-full flex">
          <Button
            className="shadow-sm bg-pink-100 hover:bg-pink-200 text-black transition-all ml-auto mr-0"
            onClick={onUnlike}
          >
            <Trash />
          </Button>
        </CardAction>
      </div>
    </Card>
  );
}
