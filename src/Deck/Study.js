import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck } from '../utils/api/index';

function Study() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [cardNumber, setCardNumber] = useState(1);
  const [frontCard, setFrontCard] = useState(true);

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

  const handleFlipCard = () => {
    setFrontCard(!frontCard);
  };

  const nextCard = (index) => {
    if (index < cards.length) {
      setCardNumber(index + 1);
      setFrontCard(true);
    } else {
      if (
        window.confirm(
          `Restart cards? Click 'cancel' to return to the home page`
        )
      ) {
        setCardNumber(1);
        setFrontCard(true);
      } else {
        history.push('/');
      }
    }
  };

  const showNextButton = (index) => {
    if (frontCard) {
      return null;
    }

    return (
      <button
        type='button'
        className='btn btn-primary ml-2 mt-3'
        onClick={() => nextCard(index + 1)}
      >
        <i className='fa-solid fa-angles-right' />
        <span className='ml-2'>Next</span>
      </button>
    );
  };

  const renderCard = (card, index) => (
    <div className='card-body' key={card.id}>
      <div className='card-title font-weight-bold'>{`Card ${index + 1} of ${cards.length}`}</div>
      <div className='card-text'>{frontCard ? card.front : card.back}</div>
      <button onClick={handleFlipCard} className='btn btn-secondary mt-3'>
        <i className='fa-solid fa-rotate' />
        <span className='ml-2'>Flip</span>
      </button>
      {showNextButton(index)}
    </div>
  );

  const enoughCards = () => (
    <div className='card'>
      {cards.map((card, index) =>
        index === cardNumber - 1 ? renderCard(card, index) : null
      )}
    </div>
  );

  const notEnoughCards = () => (
    <div>
      <div>
        <h2>Not enough cards.</h2>
        <p>{`You need at least 3 cards to study. There are ${cards.length} cards in this deck.`}</p>
        <Link to={`/decks/${deck.id}/cards/new`} className='btn btn-primary mx-1'>
          Add Cards
        </Link>
      </div>
    </div>
  );

  return (
    <div>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/' className='text-decoration-none'>
              <i className='fa-solid fa-house' /> Home
            </Link>
          </li>
          <li className='breadcrumb-item'>
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className='breadcrumb-item active'>Study</li>
        </ol>
      </nav>
      <div className='container'>
        <h2>{`${deck.name}: Study`}</h2>
        <div>{cards.length > 2 ? enoughCards() : notEnoughCards()}</div>
      </div>
    </div>
  );
}

export default Study;
