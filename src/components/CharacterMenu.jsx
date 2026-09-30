export default function CharacterMenu({
  characters = [],
  onSelect,
  foundCharacters = [],
}) {
  const icons = {
    Waldo: "🔴",
    Ninja: "🥷",
    Robot: "🤖",
    Wizard: "🧙",
    Alien: "👽",
  };

  return (
    <div className="character-menu">
      <div className="character-menu-title">
        Find:
      </div>

      {characters.map((character) => {
        const alreadyFound = foundCharacters.includes(character.id);

        return (
          <button
            key={character.id}
            onClick={() => onSelect(character)}
            disabled={alreadyFound}
            className={alreadyFound ? "found" : ""}
          >
            <span className="character-icon">
              {icons[character.name] || "❓"}
            </span>

            <span className="character-name">
              {character.name}
            </span>

            {alreadyFound && (
              <span className="character-check">
                ✓
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}