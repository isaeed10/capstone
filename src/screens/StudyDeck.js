import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";

function StudyDeck() {
  const { deckId } = useParams();
  // props passed from parent are not mutated
  const history = useHistory();
  const [deck, setDeck] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showRestartPrompt, setShowRestartPrompt] = useState(false);
//   dependencies are listed in the dependency array.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const deckData = await readDeck(deckId);
            // State not directly mutated, rather its updated via setState()
        setDeck(deckData);
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    };

    fetchData();
  }, [deckId]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (cardIndex < deck.cards.length - 1) {
      setCardIndex((prevIndex) => prevIndex + 1);
      setIsFlipped(false);
    } else {
      setShowRestartPrompt(true);
    }
  };

  const handleRestart = () => {
    setCardIndex(0);
    setIsFlipped(false);
    setShowRestartPrompt(false);
  };

  const handleHome = () => {
    history.push("/");
  };

  if (!deck) {
    return <p>Loading...</p>;
  }

  const currentCard = deck.cards[cardIndex];

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>

      <h2>{`Study: ${deck.name}`}</h2>

      {deck.cards.length < 3 ? (
        <div>
          <p>Not enough cards to study. Add more cards to the deck.</p>
          <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
            Add Cards
          </Link>
        </div>
      ) : (
        <div>
          <div>
            <h3>{`Card ${cardIndex + 1} of ${deck.cards.length}`}</h3>
            <p>{isFlipped ? currentCard.back : currentCard.front}</p>
          </div>

          <button className="btn btn-secondary mr-2" onClick={handleFlip}>
            Flip
          </button>

          {isFlipped ? (
            <button className="btn btn-primary" onClick={handleNext}>
              Next
            </button>
          ) : null}
        </div>
      )}

      {showRestartPrompt && (
        <div className="mt-4">
          <p>Congratulations! You've completed the deck.</p>
          <button className="btn btn-primary" onClick={handleRestart}>
            Restart
          </button>
          <button className="btn btn-secondary ml-2" onClick={handleHome}>
            Home
          </button>
        </div>
      )}
    </div>
  );
}

export default StudyDeck;
