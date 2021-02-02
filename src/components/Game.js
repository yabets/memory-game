import { useEffect, useState } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tile from "./Tile";
import Stat from "./Stat";
import Modal from "./Modal";
import "./Game.css";
import { generateTiles } from "../utilities";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAirFreshener,
  faAnchor,
  faArchway,
  faBaby,
  faBinoculars,
  faBone,
} from "@fortawesome/free-solid-svg-icons";

library.add(faAirFreshener, faAnchor, faArchway, faBaby, faBinoculars, faBone);

const Game = ({ children }) => {
  const [tiles, setTiles] = useState(generateTiles);
  const [up, setUptiles] = useState([]);
  const [mismatched, setMismatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [minutes, setMinute] = useState(0);
  const [seconds, setSecond] = useState(0);

  const onClick = (id) => {
    if (mismatched.length === 2) return;
    const tilesCopy = [...tiles];
    let upCopy = [...up];
    const mismatchedCopy = [];

    if (tilesCopy[id].status === "down") {
      tilesCopy[id].status = "active";
      upCopy.push(id);
      if (upCopy.length === 2) {
        checkOpenedTiles(upCopy[0], upCopy[1], tilesCopy, mismatchedCopy);
        if (checkWin(tilesCopy)) setWon(true);
        upCopy = [];
      }
    }
    setTiles(tilesCopy);
    setUptiles(upCopy);
    setMismatched(mismatchedCopy);
    setMoves(moves + 1);
  };

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

  useEffect(() => {
    if (mismatched.length === 2) removeMismatch();
  });

  const removeMismatch = () => {
    return new Promise(() => {
      setTimeout(() => {
        const tilesCopy = [...tiles];
        tilesCopy[mismatched[0]].status = "down";
        tilesCopy[mismatched[1]].status = "down";
        setTiles(tilesCopy);
        setMismatched([]);
      }, 1000);
    });
  };

  const reset = () => {
    setTiles(generateTiles());
    setUptiles([]);
    setMismatched([]);
    setMoves(0);
    setWon(0);
    setMinute(0);
    setSecond(0);
  };

  return (
    <>
      <Modal display={won} playAgain={reset} />
      <Stat moves={moves} won={won} minutes={minutes} seconds={seconds} />
      <div className="Game">
        {tiles.map((tile, index) => (
          <Tile key={index} clickHandler={onClick} id={index} {...tile}>
            {tile.status !== "down" ? (
              <FontAwesomeIcon icon={tile.value} />
            ) : null}
          </Tile>
        ))}
      </div>
    </>
  );
};

export default Game;

function checkOpenedTiles(tile1Id, tile2Id, tilesCopy, mismatched) {
  if (tilesCopy[tile1Id].value === tilesCopy[tile2Id].value) {
    tilesCopy[tile1Id].status = "matched";
    tilesCopy[tile2Id].status = "matched";
  } else {
    tilesCopy[tile1Id].status = "mismatched";
    tilesCopy[tile2Id].status = "mismatched";
    mismatched.push(tile1Id);
    mismatched.push(tile2Id);
  }
}

function checkWin(tiles) {
  return (
    tiles.reduce((sum, el) => sum + (el.status === "matched" ? 1 : 0), 0) === 16
  );
}
