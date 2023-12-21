import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

function EditDeck() {
  const { deckId } = useParams();
  console.log(deckId);
  const history = useHistory();
  const [deckData, setDeckData] = useState({
    name: "",
    description: "",
  });
//   dependencies are listed in the dependency array.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const deck = await readDeck(deckId);
            // State not directly mutated, rather its updated via setState()
        setDeckData({
          name: deck.name,
          description: deck.description,
        });
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    };

    fetchData();
  }, [deckId]);

  const handleChange = (event) => {
    setDeckData({
      ...deckData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDeck({
      ...deckData,
      id: deckId,
    });
    history.push(`/decks/${deckId}`);
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deckData.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>

      <h2>Edit Deck</h2>

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
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditDeck;
