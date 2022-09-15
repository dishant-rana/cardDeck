import React, { useEffect } from "react";
import { useState } from "react";
import "./Cards.css";

const Cards = () => {
  const [deck1, setDeck1] = useState([]);
  const [deck2, setDeck2] = useState([]);
  const [deck3, setDeck3] = useState([]);
  const [deck4, setDeck4] = useState([]);
  const [deck5, setDeck5] = useState([]);
  const [cardCount, setCardCount] = useState(0);
  const [card1, setCard1] = useState({});
  const [card2, setCard2] = useState({});
  const [card3, setCard3] = useState({});
  const [card4, setCard4] = useState({});
  const [card5, setCard5] = useState({});
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const setDecks = () => {
    const suits = ["Spades", "Diamonds", "Club", "Heart"];
    const values = [
      "Ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
    ];
    let deck = [];
    for (let i = 0; i < suits.length; i++) {
      for (let x = 0; x < values.length; x++) {
        let card = { Value: values[x], Suit: suits[i] };
        deck.push(card);
      }
    }
    for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      let temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
    let i = 0;
    while (i < 5) {
      let temp = [];
      for (let j = i * 10; j < i * 10 + 10; j++) {
        temp.push(deck[j]);
      }
      if (i == 0) setDeck1([...temp]);
      else if (i == 1) setDeck2([...temp]);
      else if (i == 2) setDeck3([...temp]);
      else if (i == 3) setDeck4([...temp]);
      else setDeck5([...temp]);
      i++;
    }
  };
  useEffect(() => {
    setDecks();
  }, []);

  const getCard = (cDeck) => {
    let card = cDeck[cDeck.length - 1];
    // console.log(cDeck);
    cDeck.splice(cDeck.length - 1, 1);
    if (cDeck === deck1) {
      setDeck1([...cDeck]);
    } else if (cDeck === deck2) {
      setDeck2([...cDeck]);
    } else if (cDeck === deck3) {
      setDeck3([...cDeck]);
    } else if (cDeck === deck4) {
      setDeck4([...cDeck]);
    } else {
      setDeck5([...cDeck]);
    }
    if (
      deck1.length == 0 ||
      deck2.length == 0 ||
      deck3.length == 0 ||
      deck4.length == 0 ||
      deck5.length == 0
    ) {
      setGameOver(true);
    }
    if (cardCount == 0) setCard1({ ...card });
    else if (cardCount == 1) setCard2({ ...card });
    else if (cardCount == 2) setCard3({ ...card });
    else if (cardCount == 3) setCard4({ ...card });
    else if (cardCount == 4) {
      setCard5({ ...card });
      getScore();
    } else {
      setCard1({ ...card });
      setCard2({});
      setCard3({});
      setCard4({});
      setCard5({});
      setCardCount(1);
      return;
    }
    setCardCount((prev) => prev + 1);
  };
  const getScore = () => {
    const colorCode = {
      Diamonds: "red",
      Club: "black",
      Heart: "red",
      Spades: "black",
    };
    let red = 0,
      black = 0;
    if (colorCode[card1.Suit] == "black") black++;
    else red++;
    if (colorCode[card2.Suit] == "black") black++;
    else red++;
    if (colorCode[card3.Suit] == "black") black++;
    else red++;
    if (colorCode[card4.Suit] == "black") black++;
    else red++;
    if (colorCode[card5.Suit] == "black") black++;
    else red++;
    if ((red == 0 && black == 5) || (red == 5 && black == 0))
      setScore((prev) => prev + 4);
    else if ((red == 4 && black == 1) || (red == 1 && black == 4))
      setScore((prev) => prev + 1);
    else if ((red == 2 && black == 3) || (red == 3 && black == 2))
      setScore((prev) => prev + 2);
  };
  const resetGame = () => {
    setDecks();
    setScore(0);
    setCardCount(0);
    setCard1({});
    setCard2({});
    setCard3({});
    setCard4({});
    setCard5({});
    setGameOver(false);
  };
  return (
    <>
      {!gameOver && (
        <div className="deck-container">
          <h2>Score: {score}</h2>
          Cards
          <label>Select 5 Cards from the Deck</label>
          <div className="show-decks">
            <div onClick={() => getCard(deck1)}>
              Deck 1<br />
              <span>{deck1.length}</span>
            </div>
            <div onClick={() => getCard(deck2)}>
              Deck 2<br />
              <span>{deck2.length}</span>
            </div>
            <div onClick={() => getCard(deck3)}>
              Deck 3<br />
              <span>{deck3.length}</span>
            </div>
            <div onClick={() => getCard(deck4)}>
              Deck 4 <br />
              <span>{deck4.length}</span>
            </div>
            <div onClick={() => getCard(deck5)}>
              Deck 5<br />
              <span>{deck5.length}</span>
            </div>
          </div>
          <div className="show-cards">
            <div
              className={
                card1.Suit == "Diamonds" || card1.Suit == "Heart"
                  ? "red"
                  : "black"
              }
            >
              <p>{card1.Value}</p>{" "}
              <p style={{ textAlign: "center" }}>{card1.Suit}</p>
              <p style={{ textAlign: "right" }}>{card1.Value}</p>
            </div>
            <div
              className={
                card2.Suit == "Diamonds" || card2.Suit == "Heart"
                  ? "red"
                  : "black"
              }
            >
              {" "}
              <p>{card2.Value}</p>{" "}
              <p style={{ textAlign: "center" }}>{card2.Suit}</p>
              <p style={{ textAlign: "right" }}>{card2.Value}</p>
            </div>
            <div
              className={
                card3.Suit == "Diamonds" || card3.Suit == "Heart"
                  ? "red"
                  : "black"
              }
            >
              {" "}
              <p>{card3.Value}</p>{" "}
              <p style={{ textAlign: "center" }}>{card3.Suit}</p>
              <p style={{ textAlign: "right" }}>{card3.Value}</p>
            </div>
            <div
              className={
                card4.Suit == "Diamonds" || card4.Suit == "Heart"
                  ? "red"
                  : "black"
              }
            >
              {" "}
              <p>{card4.Value}</p>{" "}
              <p style={{ textAlign: "center" }}>{card4.Suit}</p>
              <p style={{ textAlign: "right" }}>{card4.Value}</p>
            </div>
            <div
              className={
                card5.Suit == "Diamonds" || card5.Suit == "Heart"
                  ? "red"
                  : "black"
              }
            >
              {" "}
              <p>{card5.Value}</p>{" "}
              <p style={{ textAlign: "center" }}>{card5.Suit}</p>
              <p style={{ textAlign: "right" }}>{card5.Value}</p>
            </div>
          </div>
          <button className="reset-button" onClick={resetGame}>
            Reset
          </button>
        </div>
      )}
      {gameOver && (
        <div className="score-popup">
          <h2>Your Score is:{score}</h2>
          <button onClick={resetGame}>Restart</button>
        </div>
      )}
    </>
  );
};

export default Cards;
