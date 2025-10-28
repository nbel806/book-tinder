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
  const seenIdsRef = useRef<number[]>([]);

  useEffect(() => {
    if (!user?.id) return;
    console.log("Loading initial books for user", user?.id);
    loadUserRecommendedBooks(user.id, 10, []).then((result) => {
      result.forEach((b: { id: number }) => seenIdsRef.current.push(b.id));
      setBooks(result);
    });
  }, [user?.id]);

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    try {
      const excludeIds = Array.from(seenIdsRef.current);
      const result = await loadUserRecommendedBooks(user!.id, 10, excludeIds);
      seenIdsRef.current = [];
      result.forEach((b: { id: number }) => seenIdsRef.current.push(b.id));
      if (result.length) {
        setBooks((prev) => [...prev, ...result]);
      }
    } finally {
      isLoadingRef.current = false;
    }
  }, [user?.id]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const index = api.selectedScrollSnap();
      const total = api.scrollSnapList().length;
      if (index >= total - 5) loadMore();
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
      {isLoadingRef.current && (
        <div className="text-gray-400 text-sm mt-2 animate-pulse">
          Loading more...
        </div>
      )}
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
