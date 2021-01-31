import { useEffect, useState } from "react";
import "./Stat.css";

const Stat = ({ moves, won }) => {
  const [minutes, setMinute] = useState(0);
  const [seconds, setSecond] = useState(0);

  useEffect(() => {
    if (moves === 0) return;
    const timer = setTimeout(updateTime, 1000);
    return () => clearTimeout(timer);
  });

  const updateTime = () => {
    if (won) return;
    if (seconds === 60) {
      setMinute(minutes + 1);
      setSecond(0);
    } else {
      setSecond(seconds + 1);
    }
  };
  return (
    <div className="Stat">
      <span className="Stat__moves">
        {won ? "You won in " : null}
        {moves} moves
      </span>
      <span className="Stat__stopwatch">
        {minutes} min : {seconds} sec
      </span>
    </div>
  );
};

export default Stat;
