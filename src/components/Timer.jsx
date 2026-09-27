import { useEffect, useState } from "react";

export default function Timer({ startedAt, stopped }) {
const [elapsed, setElapsed] = useState(0);

useEffect(() => {
if (!startedAt || stopped) {
return;
}

  
const interval = setInterval(() => {
  const start = new Date(startedAt).getTime();
  const now = Date.now();

  setElapsed(Math.floor((now - start) / 1000));
}, 1000);

return () => clearInterval(interval);


}, [startedAt, stopped]);

const minutes = Math.floor(elapsed / 60);
const seconds = elapsed % 60;

return ( <div className="timer">
Time: {minutes}:{seconds.toString().padStart(2, "0")} </div>
);
}
