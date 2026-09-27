export default function Leaderboard({ scores }) {
  return (
    <section className="leaderboard">
      <h2>Leaderboard</h2>

      {scores.length === 0 ? (
        <p>No scores yet.</p>
      ) : (
        <ol>
          {scores.map((score) => (
            <li key={score.id}>
              <span>{score.name}</span>
              <strong>{score.time}s</strong>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}