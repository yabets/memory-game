import "./Modal.css";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = ({ display, playAgain }) => {
  if (!display) return null;
  return (
    <>
      <div className="Modal__backdrop"></div>
      <div className="Modal__main">
        <h1>Congratulations!</h1>
        <FontAwesomeIcon
          className="Modal__congratulations--icon"
          icon={faTrophy}
        />
        <p className="Modal__description">
          You have succefully complated the game
        </p>
        <div>
          <button onClick={playAgain} className="Modal--button">
            Play Again
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
