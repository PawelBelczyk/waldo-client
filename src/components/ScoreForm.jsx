 export default function ScoreForm({ time, onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name").trim();

    if (!name) {
      return;
    }

    onSubmit(name);
  }

  return (
    <div className="victory-screen">
      <div className="victory-card">
        <h2>🏆 You found them all!</h2>

        <p>Great job!</p>

        <p className="final-time">
          Your time: <strong>{time} s</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Enter your name:</label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            maxLength="20"
            required
          />

          <button type="submit">
            Save score
          </button>
        </form>
      </div>
    </div>
  );
}

