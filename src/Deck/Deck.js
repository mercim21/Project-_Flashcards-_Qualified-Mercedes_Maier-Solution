import React, { useState, useEffect } from 'react';
import { Link, useParams, useRouteMatch, useHistory } from 'react-router-dom';
import { readDeck, deleteDeck, deleteCard } from '../utils/api/index';


function Deck() {
  const { deckId } = useParams();
  const history = useHistory();
  const { url } = useRouteMatch();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    async function fetchData() {
      try {
        const response = await readDeck(deckId, signal);
        setDeck(response);
        setCards(response.cards);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    return () => abortController.abort();
  }, [deckId]);

  const handleDeleteDeck = async (event) => {
    if (
      window.confirm(`Delete this deck? You will not be able to recover it.`)
    ) {
      history.push('/');
      return await deleteDeck(deckId);
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (
      window.confirm(`Delete this card? You will not be able to recover it.`)
    ) {
      history.go(0);
      return await deleteCard(cardId);
    }
  };

  if (cards.length > 0) {
    return (
      <div>
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>
              <Link to='/' className='text-decoration-none'>
                <i className='fa-solid fa-house' /> Home
              </Link>
            </li>
            <li className='breadcrumb-item active'>{deck.name}</li>
          </ol>
        </nav>
        <div>
          <div>
            <h2 className='card-title'>{deck.name}</h2>
            <p>{deck.description}</p>
          </div>
          <Link to={`${url}/edit`} className='btn btn-secondary mb-2'>
            <i className='fa-solid fa-edit' />
            <span className='ml-1'>Edit</span>
          </Link>
          <Link to={`${url}/study`} className='btn btn-primary mb-2 ml-2'>
            <i className='fa-solid fa-book' />
            <span className='ml-1'>Study</span>
          </Link>
          <Link to={`${url}/cards/new`} className='btn btn-success mb-2 ml-2'>
            <i className='fa-solid fa-plus' />
            <span className='ml-1'>Add Card</span>
          </Link>
          <button
            className='btn btn-danger float-right'
            onClick={handleDeleteDeck}
          >
            <i className='fa-solid fa-trash-can' />
            <span className='ml-1'>Delete</span>
          </button>
        </div>
        <h2 className='mt-4'>Cards</h2>
        {cards.map((card) => {
          return (
            <div className='card-deck mb-4' key={card.id}>
              <div className='card cardstyle'>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col'>{card.front}</div>
                    <div className='col'>{card.back}</div>
                  </div>
                  <div className='container row d-flex justify-content-end mt-4'>
                    <Link
                      to={`/decks/${deckId}/cards/${card.id}/edit`}
                      className='btn btn-secondary mb-2'
                    >
                      <i className='fa-solid fa-pen' />
                      <span className='ml-1'>Edit</span>
                    </Link>

                    <button
                      className='btn btn-danger mb-2 ml-2'
                      onClick={() => handleDeleteCard(card.id)}
                    >
                      <i className='fa-solid fa-trash-can' />
                      <span className='ml-1'>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        {deckId && (
          <div>
            <ol className='breadcrumb'>
              <li className='breadcrumb-item'>
                <Link to='/' className='text-decoration-none'>
                  <i className='fa-solid fa-house' /> Home
                </Link>
              </li>
              <li className='breadcrumb-item active'>{deck.name}</li>
            </ol>
            <div className='card'>
              <div className='card-body'>
                <h2 className='card-title'>{deck.name}</h2>
                <p>{deck.description}</p>
                <Link to={`${url}/edit`} className='btn btn-secondary mb-2'>
                  <i className='fa-solid fa-edit' />
                  <span className='ml-1'>Edit</span>
                </Link>
                <Link to={`${url}/study`} className='btn btn-primary mb-2 ml-2'>
                  <i className='fa-solid fa-book' />
                  <span className='ml-1'>Study</span>
                </Link>
                <Link
                  to={`${url}/cards/new`}
                  className='btn btn-success mb-2 ml-2'
                >
                  <i className='fa-solid fa-plus' />
                  <span className='ml-1'>Add Card</span>
                </Link>

                <button
                  className='btn btn-danger float-right'
                  onClick={handleDeleteDeck}
                >
                  <i className='fa-solid fa-trash-can' />
                  <span className='ml-1'>Delete</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {cards.length === 0 && (
          <div className='mt-4 alert alert-warning' role='alert'>
            Deck ID: {deckId} has no cards.
          </div>
        )}
      </div>
    );
  }
}

export default Deck;