// import pool from "./database";
// export async function seedBooks() {
//   const books = [
//     {
//       title: "The Night Circus",
//       author: "Erin Morgenstern",
//       genres: JSON.stringify(["Fantasy", "Romance"]),
//       description:
//         "A phantasmagorical novel about a mysterious circus that appears without warning and the duel between two magicians destined to fall in love.",
//       image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
//     },
//     {
//       title: "Educated",
//       author: "Tara Westover",
//       genres: JSON.stringify(["Memoir", "Non-fiction"]),
//       description:
//         "A memoir about growing up in a survivalist family in rural Idaho and pursuing education against all odds.",
//       image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93",
//     },
//     {
//       title: "Dune",
//       author: "Frank Herbert",
//       genres: JSON.stringify(["Science Fiction", "Adventure"]),
//       description:
//         "A sprawling epic set on the desert planet Arrakis, exploring politics, religion, and ecology.",
//       image: "https://images.unsplash.com/photo-1544937961-3b6f53f3ed1e",
//     },
//     {
//       title: "The Goldfinch",
//       author: "Donna Tartt",
//       genres: JSON.stringify(["Fiction", "Drama"]),
//       description:
//         "A young boy in New York loses his mother in a bombing and is drawn into a world of art and crime.",
//       image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
//     },
//     {
//       title: "Becoming",
//       author: "Michelle Obama",
//       genres: JSON.stringify(["Autobiography", "Inspiration"]),
//       description:
//         "An intimate, powerful memoir by the former First Lady of the United States.",
//       image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
//     },
//     {
//       title: "Atomic Habits",
//       author: "James Clear",
//       genres: JSON.stringify(["Self-help", "Productivity"]),
//       description:
//         "An evidence-based guide to building better habits and breaking bad ones.",
//       image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
//     },
//     {
//       title: "The Hobbit",
//       author: "J.R.R. Tolkien",
//       genres: JSON.stringify(["Fantasy", "Adventure"]),
//       description:
//         "Bilbo Baggins embarks on an unexpected journey with dwarves to reclaim their homeland.",
//       image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
//     },
//     {
//       title: "The Martian",
//       author: "Andy Weir",
//       genres: JSON.stringify(["Science Fiction", "Thriller"]),
//       description:
//         "An astronaut stranded on Mars must rely on his ingenuity to survive.",
//       image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
//     },
//     {
//       title: "Circe",
//       author: "Madeline Miller",
//       genres: JSON.stringify(["Mythology", "Fantasy"]),
//       description:
//         "A feminist retelling of the story of Circe, the enchantress from Greek mythology.",
//       image: "https://images.unsplash.com/photo-1473187983305-f615310e7daa",
//     },
//     {
//       title: "Project Hail Mary",
//       author: "Andy Weir",
//       genres: JSON.stringify(["Science Fiction", "Adventure"]),
//       description:
//         "A lone astronaut must save Earth from disaster in this gripping space survival story.",
//       image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
//     },
//     {
//       title: "The Silent Patient",
//       author: "Alex Michaelides",
//       genres: JSON.stringify(["Thriller", "Psychological"]),
//       description:
//         "A psychotherapist tries to unravel the mystery behind a woman who stopped speaking after committing a shocking act.",
//       image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c",
//     },
//     {
//       title: "Sapiens: A Brief History of Humankind",
//       author: "Yuval Noah Harari",
//       genres: JSON.stringify(["History", "Non-fiction"]),
//       description:
//         "An exploration of how Homo sapiens came to dominate the world.",
//       image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93",
//     },
//     {
//       title: "The Alchemist",
//       author: "Paulo Coelho",
//       genres: JSON.stringify(["Fiction", "Philosophy"]),
//       description:
//         "A shepherd travels in search of a worldly treasure and discovers his personal legend.",
//       image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
//     },
//     {
//       title: "1984",
//       author: "George Orwell",
//       genres: JSON.stringify(["Dystopian", "Political Fiction"]),
//       description:
//         "A chilling depiction of a totalitarian regime that watches and controls every aspect of life.",
//       image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
//     },
//     {
//       title: "Where the Crawdads Sing",
//       author: "Delia Owens",
//       genres: JSON.stringify(["Mystery", "Fiction"]),
//       description:
//         "A coming-of-age mystery about a young woman who grows up alone in the marshlands.",
//       image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
//     },
//     {
//       title: "The Subtle Art of Not Giving a F*ck",
//       author: "Mark Manson",
//       genres: JSON.stringify(["Self-help", "Humour"]),
//       description:
//         "A counterintuitive approach to living a good life by focusing on what really matters.",
//       image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
//     },
//     {
//       title: "To Kill a Mockingbird",
//       author: "Harper Lee",
//       genres: JSON.stringify(["Classic", "Social Commentary"]),
//       description:
//         "A timeless novel exploring racial injustice in the Deep South through the eyes of a child.",
//       image: "https://images.unsplash.com/photo-1544937961-3b6f53f3ed1e",
//     },
//     {
//       title: "Normal People",
//       author: "Sally Rooney",
//       genres: JSON.stringify(["Romance", "Drama"]),
//       description:
//         "A nuanced portrayal of love and friendship between two Irish teenagers as they grow into adults.",
//       image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
//     },
//     {
//       title: "The Midnight Library",
//       author: "Matt Haig",
//       genres: JSON.stringify(["Fiction", "Fantasy"]),
//       description:
//         "Between life and death lies a library that allows one woman to explore all her possible lives.",
//       image: "https://images.unsplash.com/photo-1473187983305-f615310e7daa",
//     },
//     {
//       title: "The Power of Habit",
//       author: "Charles Duhigg",
//       genres: JSON.stringify(["Psychology", "Self-help"]),
//       description:
//         "An exploration of how habits form and how we can change them to improve our lives.",
//       image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
//     },
//   ];

//   const query = `
//     INSERT INTO books (title, author, genres, description, image)
//     VALUES (?, ?, ?, ?, ?)
//   `;

//   for (const book of books) {
//     await pool.query(query, [
//       book.title,
//       book.author,
//       book.genres,
//       book.description,
//       book.image,
//     ]);
//   }

//   console.log(`✅ Inserted ${books.length} books successfully.`);
// }

// seedBooks().catch((err) => console.error("❌ Error seeding books:", err));
