export async function loadUserRecommendedBooks(
  userId: number,
  numberOfRecommendations: number = 10,
  excludedIds: number[] = []
) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/users/${userId}/recommended/${numberOfRecommendations}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ excludedIds }),
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function updateSeen(id: number, bookId: number) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/users/${id}/${bookId}/seen`,
      {
        method: "PUT",
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
}
