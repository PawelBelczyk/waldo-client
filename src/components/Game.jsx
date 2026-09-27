import { useEffect, useState } from "react";
import {
  createGame,
  getCharacters,
  makeGuess,
} from "../api";

export default function Game() {
  const [gameId, setGameId] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [foundCharacters, setFoundCharacters] = useState([]);

  const [target, setTarget] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function startGame() {
      const game = await createGame();
      const characters = await getCharacters();

      setGameId(game.id);
      setCharacters(characters);
    }

    startGame();
  }, []);

  
  // ...
}