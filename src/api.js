const API_URL = "http://localhost:3000/api";

export async function createGame() {
  const response = await fetch(`${API_URL}/games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create game");
  }

  return response.json();
}

export async function getCharacters() {
  const response = await fetch(`${API_URL}/characters`);

  if (!response.ok) {
    throw new Error("Failed to fetch characters");
  }

  return response.json();
}

export async function makeGuess(gameId, characterId, x, y) {
  const response = await fetch(
    `${API_URL}/games/${gameId}/guesses`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        character_id: characterId,
        x,
        y,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to make guess");
  }

  return response.json();
}

export async function createScore(name, time) {
  const response = await fetch(`${API_URL}/scores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      time,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to save score");
  }

  return response.json();
}

export async function getScores() {
  const response = await fetch(`${API_URL}/scores`);

  if (!response.ok) {
    throw new Error("Failed to fetch scores");
  }

  return response.json();
}