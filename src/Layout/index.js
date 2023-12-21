import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import { listDecks, deleteDeck } from "../utils/api/index";
import StudyDeck from "../screens/StudyDeck";
import CreateDeck from "../screens/CreateDeck";
import Deck from "../screens/Deck";
import EditDeck from "../screens/EditDeck";
import AddCard from "../screens/AddCard";
import EditCard from "../screens/EditCard";

function Layout() {
  // define state variables
  const history = useHistory();
  const [decks, setDecks] = useState([]);
  // fetch decks using util methods
  useEffect(() => {
    const fetchData = async () => {
      const decksData = await listDecks();
      setDecks(decksData);
    };

    fetchData();
  }, []);
  // handle delete button click
  const handleDeleteDeck = async (deckId) => {
    // pop up warining
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this deck?"
    );

    if (isConfirmed) {
      await deleteDeck(deckId);
      setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        {/* create routes for / and page not found */}
        <Switch>
          <Route exact path="/">
            {/* define create button on top */}
            <div>
              <button
                className="btn btn-secondary"
                onClick={() => history.push("/decks/new")}
              >
                Create Deck
              </button>
            </div>
            {decks.length === 0 ? (
              <p>No decks available. Create a new deck!</p>
            ) : (
              <div className="row">
                {decks.map((deck) => (
                  <div key={deck.id} className="col-md-4 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">{deck.name}</h5>
                        <p className="card-text">{`${
                          deck.cards ? deck.cards.length : 0
                        } cards`}</p>
                        <button
                          className="btn btn-primary mr-2"
                          onClick={() =>
                            history.push(`/decks/${deck.id}/study`)
                          }
                        >
                          Study
                        </button>
                        <button
                          className="btn btn-secondary mr-2"
                          onClick={() => history.push(`/decks/${deck.id}`)}
                        >
                          View
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteDeck(deck.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Route>
          {/* StudyDeck component route */}
          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          {/* Create deck route */}
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          {/* Edit deck route */}
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          {/* Add card route */}
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          {/* Edit card route */}
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          {/* Deck route */}
          <Route path="/decks/:deckId">
            <Deck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
