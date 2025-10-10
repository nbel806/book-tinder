import type { BookInfo } from "~/lib/types";
import SmallBookCard from "./smallBookCard";
import { useEffect, useState } from "react";
import { useAppSelector } from "~/store/hooks";
import { redirect } from "react-router";
import { loadLikedBooks } from "./likedBooksHelper";

export default function LikedBooksGrid() {
  const [books, setBooks] = useState<BookInfo[]>([]);

  const user = useAppSelector((state) => state.user);
  if (!user) {
    throw redirect("/");
  }

  useEffect(() => {
    loadLikedBooks(user.id).then((result) => {
      setBooks(result);
    });
  }, []);

  if (books.length === 0) {
    return (
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="m-auto">No books liked yet</div>
      </div>
    );
  }
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((bookInfo) => (
        <SmallBookCard key={bookInfo.id} {...bookInfo} />
      ))}
    </div>
  );
}
