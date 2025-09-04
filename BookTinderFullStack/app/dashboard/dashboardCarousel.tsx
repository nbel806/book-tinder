import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import BookCard from "./bookCard";
import { use, useEffect, useState } from "react";
import type { BookInfo } from "~/lib/types";
import { loadBooks } from "./dashboardHelper";

export default function DashboardCarousel() {
  const [books, setBooks] = useState<BookInfo[]>([]);

  useEffect(() => {
    const books = loadBooks();
    setBooks(books);
  }, []);

  return (
    <Carousel className="w-full max-w-3xl">
      <CarouselContent>
        {books.map((book, index) => (
          <CarouselItem key={index}>
            <BookCard {...book} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
