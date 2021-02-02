import "./Stat.css";

const Stat = ({ moves, won, minutes, seconds }) => {
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
