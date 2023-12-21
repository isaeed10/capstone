import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index";
import CardForm from "./shared-components/CardForm";

function AddCard() {
  const { deckId } = useParams();
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
        setDeck(deckData);
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    };

    fetchData();
  }, [deckId]);

  const handleChange = (event) => {
    // State not directly mutated, rather its updated via setState()
    setCardData({
      ...cardData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createCard(deckId, cardData);
    // Clear the form
    setCardData({
      front: "",
      back: "",
    });
  };

  const handleDone = () => {
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
            Add Card
          </li>
        </ol>
      </nav>

      <h2>{`Add Card to ${deck.name}`}</h2>
      {/* same form component as in EditCard.js */}
      <CardForm
        cardData={cardData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleOther={handleDone}
        submitButtonText="Save"
        otherButtonText="Done"
      />
    </div>
  );
}

export default AddCard;
