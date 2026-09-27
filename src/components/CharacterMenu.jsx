export default function CharacterMenu({
characters = [],
onSelect,
foundCharacters = [],
}) {
return ( <div className="character-menu">
{characters.map((character) => {
const alreadyFound = foundCharacters.includes(character.id);

 
    return (
      <button
        key={character.id}
        onClick={() => onSelect(character)}
        disabled={alreadyFound}
      >
        {character.name}
      </button>
    );
  })}
</div>
 

);
}
