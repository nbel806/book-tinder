import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { type CarouselApi } from "~/components/ui/carousel";
import BookCard from "./bookCard";
import { useEffect, useState, useCallback, useRef } from "react";
import type { BookInfo } from "~/lib/types";
import { loadUserRecommendedBooks, updateSeen } from "./dashboardHelper";
import { addLikedBook } from "~/books/likedBooksHelper";
import { useAppSelector } from "~/store/hooks";

export default function DashboardCarousel() {
  const [books, setBooks] = useState<BookInfo[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const user = useAppSelector((state) => state.user);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    loadUserRecommendedBooks(user!.id, 5).then((result) => {
      setBooks(result);
    });
  }, []);

  const loadMore = useCallback(() => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    setBooks((prev) => {
      loadUserRecommendedBooks(user!.id, 5).then((result) => {
        return result.length ? [...prev, ...result] : prev;
      });
      isLoadingRef.current = false;
      return prev;
    });
  }, []);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const index = api.selectedScrollSnap();
      const total = api.scrollSnapList().length;
      if (index >= total - 3) loadMore();
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, loadMore]);

  const handleLiked = () => {
    const index = api?.selectedScrollSnap();
    if (user) {
      addLikedBook(user.id, books[index!].id);
    }
    handleNext();
  };
  const handleDisliked = () => {
    handleNext();
  };
  const handleNext = () => {
    const index = api?.selectedScrollSnap();
    if (user) {
      updateSeen(user.id, books[index!].id);
      console.log("user seen", user.id, books[index!].title);
    }

    api?.scrollNext();
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-6">
      <Carousel className="w-full max-w-3xl" setApi={setApi}>
        <CarouselContent>
          {books.map((book, i) => (
            <CarouselItem key={i}>
              <BookCard
                bookInfo={book}
                handleLiked={handleLiked}
                handleDisliked={handleDisliked}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex gap-6 mt-2"></div>
    </div>
  );
}
