import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { listDecks, deleteDeck } from '../utils/api/index';
import "../Home/App.css"

function Home() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await listDecks();
        setDecks(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  async function handleDeleteDeck(deckId) {
    if (window.confirm(`Delete this deck? You will not be able to recover it`)) {
      history.go(0);
      await deleteDeck(deckId);
    }
  }

  const truncate = (str, length) => (str.length > length ? `${str.substring(0, length)}...` : str);

  return (
    <div className='container'>
      <Link className='btn btn-secondary mb-2' to='/decks/new'>
        <i className='fa-solid fa-plus' />
        <span className='ml-1'>Create Deck</span>
      </Link>
      <div className='card-deck'>
        {decks.map((deck) => (
          <div className='card cardstyle' key={deck.id}>
            <div className='card-body'>
              <div className='d-flex justify-content-between align-items-center'>
                <h5 className='card-title'>{truncate(deck.name, 50)}</h5>
                <p className='card-subtitle text-muted' style={{ fontSize: '0.9rem' }}>
                  {`${deck.cards.length} cards`}
                </p>
              </div>
              <p className='card-text'>{truncate(deck.description, 100)}</p>
              <div className='mt-2'>
                <Link className='btn btn-secondary' to={`/decks/${deck.id}`}>
                  <i className='fa-solid fa-eye' />
                  <span className='ml-1'>View</span>
                </Link>
                <Link className='btn btn-primary ml-2' to={`/decks/${deck.id}/study`}>
                  <i className='fa-solid fa-book' />
                  <span className='ml-1'>Study</span>
                </Link>
                <button
                 className='btn btn-danger float-right'
                   onClick={() => handleDeleteDeck(deck.id)}
                   >
                   <span>Delete</span> {/* Add the "Delete" text here */}
                      <i className='fa-solid fa-trash-can' />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
