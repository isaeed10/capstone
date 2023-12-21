import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import CardForm from "./shared-components/CardForm";

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(null);
  const [cardData, setCardData] = useState({
    front: "",
    back: "",
  });
  //   dependencies are listed in the dependency array.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const deckData = await readDeck(deckId);
        const card = await readCard(cardId);
        // State not directly mutated, rather its updated via setState()
        setDeck(deckData);
        setCardData({
          front: card.front,
          back: card.back,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [deckId, cardId]);

  const handleChange = (event) => {
    setCardData({
      ...cardData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard({
      ...cardData,
      id: cardId,
    });
    history.push(`/decks/${deckId}`);
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  if (!deck) {
    return <p>Loading...</p>;
  }

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
            Edit Card {cardId}
          </li>
        </ol>
      </nav>

      <h2>Edit Card</h2>
      {/* using shared form component same as in AddCard.js */}
      <CardForm
        cardData={cardData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleOther={handleCancel}
        submitButtonText="Save"
        otherButtonText="Cancel"
      />
    </div>
  );
}

export default EditCard;
