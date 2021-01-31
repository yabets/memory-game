import "./Tile.css";

const Tile = ({ status, children, clickHandler, id }) => {
  const classes = "Tile Tile--" + status;
  return (
    <div className={classes} onClick={() => clickHandler(id)}>
      <span className="Title__content">{children}</span>
    </div>
  );
};

export default Tile;
