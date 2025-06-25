import "./Card.css";

const Card = ({ card, handleCardSelect, flipped, disableClick }) => {
  const handleClick = () => {
    if (disableClick) return;

    handleCardSelect(card);
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <div className="front-card">
          <p className="letter">{card.letter}</p>
        </div>
        <div className="back-card" onClick={handleClick}></div>
      </div>
    </div>
  );
};

export default Card;
