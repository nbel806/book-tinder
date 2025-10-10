import { Check, X } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardAction, CardContent } from "~/components/ui/card";
import type { BookInfo } from "~/lib/types";

interface BookCardProps {
  bookInfo: BookInfo;
  handleLiked: () => void;
  handleDisliked: () => void;
}
export default function BookCard({
  bookInfo,
  handleLiked,
  handleDisliked,
}: BookCardProps) {
  const genres = JSON.parse(bookInfo.genres);

  return (
    <Card className="max-w-4xl p-8 rounded-2xl shadow-md">
      <CardContent className="flex gap-6 p-2">
        {/* Book Cover */}
        <div className="flex-shrink-0">
          <img
            src={bookInfo.image || "~/../public/testCover.webp"}
            alt={bookInfo.title}
            className="w-50 object-cover rounded-lg shadow-sm"
          />
        </div>
        {/* Book Details */}
        <div className="flex flex-col justify-between text-left">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {bookInfo.title}
            </h1>

            <h2 className="text-xl text-gray-600">{bookInfo.author}</h2>
            {genres.map((genre: string) => (
              <Badge
                key={genre}
                className="mr-2 bg-gray-200"
                variant={"secondary"}
              >
                {genre}
              </Badge>
            ))}

            <p className="text-gray-700 line-clamp-4 my-4">
              {bookInfo.description}
            </p>
          </div>
          <CardAction className="flex w-full gap-8">
            <Button
              onClick={handleDisliked}
              className="ml-auto w-1/3 relative bg-slate-100 text-slate-800 p-6 px-8 rounded-lg shadow-lg transition transform hover:scale-105 hover:bg-slate-200 mr-2
             before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-2 before:bg-red-400 before:rounded-l-lg"
            >
              Skip Book
            </Button>

            <Button
              onClick={handleLiked}
              className="mr-auto w-1/3 relative bg-slate-100 text-slate-800 p-6 px-8 rounded-lg shadow-lg transition transform hover:scale-105 hover:bg-slate-200
             before:content-[''] before:absolute before:left-0 before:top-0 before:h-full before:w-2 before:bg-blue-400 before:rounded-l-lg"
            >
              Like Book
            </Button>
          </CardAction>
        </div>
      </CardContent>
    </Card>
  );
}
