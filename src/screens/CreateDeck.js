// CreateDeck.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck() {
  // props passed from parent
  const history = useHistory();
  const [deckData, setDeckData] = useState({
    name: "",
    description: "",
  });
  // const [deckData, setDeckData] = useState(null);
    // const [deckData, setDeckData] = useState(undefined);


  const handleChange = (event) => {
    // State not directly mutated, rather its updated via setState()
    setDeckData({
      ...deckData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newDeck = await createDeck(deckData);

      if (newDeck.id) {
        // Assuming newDeck has an 'id' property
        history.push(`/decks/${newDeck.id}`);
      } else {
        console.error("Deck creation failed. Unexpected response:", newDeck);
        // You might want to display an error message to the user here
      }
    } catch (error) {
      console.error("Error creating deck:", error);
      // You might want to display an error message to the user here
    }
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <button
              type="button"
              className="btn btn-link"
              onClick={() => history.push("/")}
            >
              Home
            </button>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

      <h2>Create Deck</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleChange}
            value={deckData.name}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            onChange={handleChange}
            value={deckData.description}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary ml-2"
          onClick={() => history.push("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
