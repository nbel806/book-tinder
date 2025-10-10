export async function loadLikedBooks(id: number) {
  try {
    const listOfLikedBookIds = await fetch(
      `http://localhost:3000/api/users/${id}/liked`,
      {
        method: "GET",
      }
    );
    return listOfLikedBookIds.json();
  } catch (error) {
    console.log(error);
  }
}

export async function addLikedBook(id: number, bookId: number) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/user/${id}/${bookId}/liked`,
      {
        method: "GET",
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function removeLikedBook(id: number, bookId: number) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/user/${id}/${bookId}/unliked`,
      {
        method: "GET",
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
}
