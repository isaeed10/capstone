// Deck.js
import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";

function Deck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(null);
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

  const handleDeleteDeck = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this deck? All associated cards will be deleted as well."
    );

    if (isConfirmed) {
      await deleteDeck(deckId);
      history.push("/");
    }
  };

  if (!deck) {
    return <p>Loading...</p>;
  }

  const handleDeleteCard = async (cardId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this card?"
    );

    if (isConfirmed) {
      // call deleteCard function from API util
      await deleteCard(cardId);

      // Refresh deck data after card deletion
      const updatedDeck = await readDeck(deckId);
      setDeck(updatedDeck);
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>

      <div className="mb-3">
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
      </div>

      <div className="mb-3">
        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mr-2">
          Edit
        </Link>
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary mr-2">
          Study
        </Link>
        <Link
          to={`/decks/${deckId}/cards/new`}
          className="btn btn-primary mr-2"
        >
          Add Cards
        </Link>
        <button className="btn btn-danger" onClick={() => handleDeleteDeck()}>
          Delete
        </button>
      </div>

      <h3>Cards</h3>
      {deck.cards && deck.cards.length > 0 ? (
        <div>
          {deck.cards.map((card) => (
            <div key={card.id} className="card mb-2">
              <div className="card-body">
                <p className="card-text">{card.front}</p>
                <p className="card-text">{card.back}</p>
                <Link
                  to={`/decks/${deckId}/cards/${card.id}/edit`}
                  className="btn btn-secondary mr-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteCard(card.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No cards in this deck.</p>
      )}
    </div>
  );
}

export default Deck;
