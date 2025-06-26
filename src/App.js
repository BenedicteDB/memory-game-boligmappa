import Card from "./components/Card";
import lettersArray from "./data/lettersArray";
import { useState, useEffect, useCallback } from "react";
import { useBeforeUnload } from "./hooks/useBeforeUnload";
import { shuffleCards } from "./utils/shuffleCards";

import "./App.css";

const App = () => {
  const [memoryCards, setMemoryCards] = useState([]);
  const [firstSelectedCard, setFirstSelectedCard] = useState(null);
  const [secondSelectedCard, setSecondSelectedCard] = useState(null);
  const [disableClick, setDisableClick] = useState(false);
  const [turns, setTurns] = useState(0);
  const [matched, setMatched] = useState(0);

  const handleCardSelect = (card) => {
    const isSameCardClicked =
      firstSelectedCard && card.id === firstSelectedCard.id;
    if (isSameCardClicked) return;

    firstSelectedCard
      ? setSecondSelectedCard(card)
      : setFirstSelectedCard(card);
  };

  const markMatchedCards = useCallback((cards, letterToMatch) => {
    return cards.map((card) =>
      card.letter === letterToMatch ? { ...card, matched: true } : card
    );
  }, []);

  const resetSelectedCards = useCallback(() => {
    setFirstSelectedCard(null);
    setSecondSelectedCard(null);
    setDisableClick(false);
  }, []);

  const handleMatchedCards = useCallback(() => {
    setMemoryCards((prevCards) =>
      markMatchedCards(prevCards, firstSelectedCard.letter)
    );
    setMatched((matched) => matched + 1);
    resetSelectedCards();
  }, [firstSelectedCard, resetSelectedCards, markMatchedCards]);

  const handleNewGame = useCallback(() => {
    setTurns(0);
    setMatched(0);
    setMemoryCards(shuffleCards(lettersArray));
    resetSelectedCards();
  }, [resetSelectedCards]);

  const isFlipped = (card) => {
    return (
      card === firstSelectedCard || card === secondSelectedCard || card.matched
    );
  };

  useEffect(() => {
    if (firstSelectedCard && secondSelectedCard) {
      setTurns((turns) => turns + 1);
      setDisableClick(true);
      if (firstSelectedCard.letter === secondSelectedCard.letter) {
        handleMatchedCards();
      } else {
        setTimeout(() => resetSelectedCards(), 500);
      }
    }
  }, [
    firstSelectedCard,
    secondSelectedCard,
    handleMatchedCards,
    resetSelectedCards,
  ]);

  useEffect(() => {
    handleNewGame();
  }, [handleNewGame]);

  useBeforeUnload();

  return (
    <div className="game-container">
      <h1>Memory Game</h1>
      <button onClick={handleNewGame}>New Game</button>

      <p className="scoreboard">Turns: {turns}</p>
      <p className="scoreboard">Matched: {matched}</p>

      <div className="cards-container">
        <div className="card-grid">
          {memoryCards.map((card) => (
            <Card
              key={card.id}
              card={card}
              handleCardSelect={handleCardSelect}
              flipped={isFlipped(card)}
              disableClick={disableClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
