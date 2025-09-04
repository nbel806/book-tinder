export function loadBooks() {
  //fetch book data
  //setBooks
  const books = [
    {
      title: "The Midnight Library",
      author: "Matt Haig",
      genre: "Fiction",
      description:
        "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. Would you make different choices, if you could?",
      image: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg",
      tags: ["Fiction", "Thriller", "Mystery"],
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-Help",
      description:
        "A practical and proven framework for developing better habits and breaking bad ones. Learn how small changes can compound into remarkable results over time.",
      image: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg",
      tags: ["Self-Help", "Productivity", "Motivation"],
    },
    {
      title: "Project Hail Mary",
      author: "Andy Weir",
      genre: "Science Fiction",
      description:
        "Ryland Grace is the sole survivor on a desperate, last-chance mission. If he fails, humanity and the Earth itself will perish. An irresistible interstellar adventure from the author of The Martian.",
      image: "https://images-na.ssl-images-amazon.com/images/I/81wFMY9OAFL.jpg",
      tags: ["Science Fiction", "Fiction", "Adventure"],
    },
    {
      title: "Circe",
      author: "Madeline Miller",
      genre: "Fantasy",
      description:
        "In the house of Helios, god of the sun, and Perse, a nymph, a daughter is born. Circe’s story reimagines the myths of gods and heroes from her perspective in a tale of power, identity, and defiance.",
      image: "https://images-na.ssl-images-amazon.com/images/I/91b0C2YNSrL.jpg",
      tags: ["Fantasy", "Fiction", "Magic"],
    },
    {
      title: "Educated",
      author: "Tara Westover",
      genre: "Memoir",
      description:
        "An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
      image: "https://images-na.ssl-images-amazon.com/images/I/81WojUxbbFL.jpg",
      tags: ["Memoir", "Self-Help", "Psychology"],
    },
  ];
  return books;
}
