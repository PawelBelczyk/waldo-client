import { useEffect, useState } from "react";

import {
createGame,
createScore,
getCharacters,
getScores,
makeGuess,
} from "./api";

import CharacterMenu from "./components/CharacterMenu";
import Leaderboard from "./components/Leaderboard";
import ScoreForm from "./components/ScoreForm";
import Timer from "./components/Timer";

import "./App.css";

function App() {
const [gameId, setGameId] = useState(null);
const [startedAt, setStartedAt] = useState(null);
const [characters, setCharacters] = useState([]);
const [foundCharacters, setFoundCharacters] = useState([]);
const [target, setTarget] = useState(null);
const [message, setMessage] = useState("");
const [gameFinished, setGameFinished] = useState(false);
const [finalTime, setFinalTime] = useState(null);
const [scores, setScores] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
startGame();
loadScores();
}, []);

async function startGame() {
try {
setLoading(true);
setMessage("");

 
  const [game, characterData] = await Promise.all([
    createGame(),
    getCharacters(),
  ]);

  setGameId(game.id);
  setStartedAt(game.started_at);
  setCharacters(characterData);
  setFoundCharacters([]);
  setTarget(null);
  setGameFinished(false);
  setFinalTime(null);
} catch (error) {
  console.error("Error starting game:", error);
  setMessage("Could not start the game.");
} finally {
  setLoading(false);
}
 
}

async function loadScores() {
try {
const data = await getScores();
setScores(data);
} catch (error) {
console.error("Error loading scores:", error);
}
}

function handleImageClick(event) {
if (gameFinished) {
return;
}

 const rect = event.currentTarget.getBoundingClientRect();

const x =
  ((event.clientX - rect.left) / rect.width) * 100;

const y =
  ((event.clientY - rect.top) / rect.height) * 100;
  console.log("CLICK:", x, y);

setTarget({
  x,
  y,
});

setMessage("");
 

}

async function handleCharacterSelect(character) {
if (!target || !gameId) {
return;
}

 
try {
  const result = await makeGuess(
    gameId,
    character.id,
    target.x,
    target.y
  );

  if (!result.correct) {
    setMessage("Wrong character or location.");
    setTarget(null);
    return;
  }

  setFoundCharacters((previous) => [
    ...previous,
    character.id,
  ]);

  setMessage(`${character.name} found!`);
  setTarget(null);

  if (result.finished) {
    setGameFinished(true);
    setFinalTime(result.time);
  }
} catch (error) {
  console.error("Error making guess:", error);
  setMessage("Something went wrong.");
  setTarget(null);
}
 

}

async function handleScoreSubmit(name) {
try {
await createScore(name, finalTime);
await loadScores();
} catch (error) {
console.error("Error saving score:", error);
setMessage("Could not save score.");
}
}

 

return ( <div className="app"> <header className="header"> <h1>Where's Waldo?</h1>

 
    <Timer
      startedAt={startedAt}
      stopped={gameFinished}
    />

    <p className="progress">
      Found: {foundCharacters.length} / {characters.length}
    </p>
  </header>

  {message && (
    <div className="message">
      {message}
    </div>
  )}

  <main>
          <div className="game-image-container">
            <img
        src="/waldo.png"
        alt="Waldo"
        onClick={handleImageClick}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
        }}
      />

      {foundCharacters.map((characterId) => {
        const character = characters.find(
          (item) => item.id === characterId
        );

        if (!character) {
          return null;
        }

        return (
          <div
            key={character.id}
            className="marker"
            style={{
              left: `${character.x}%`,
              top: `${character.y}%`,
            }}
            title={character.name}
          />
        );
      })}

      {target && (
        <div
          className="target-box"
          style={{
            left: `${target.x}%`,
            top: `${target.y}%`,
          }}
        >
          <CharacterMenu
            characters={characters}
            foundCharacters={foundCharacters}
            onSelect={handleCharacterSelect}
          />
        </div>
      )}
    </div>

    <div className="controls">
      <button
        className="restart-button"
        onClick={startGame}
      >
        Restart game
      </button>
    </div>

    <Leaderboard scores={scores} />
  </main>

  {gameFinished && (
    <ScoreForm
      time={finalTime}
      onSubmit={handleScoreSubmit}
    />
  )}
</div>
 

);
}

export default App;
