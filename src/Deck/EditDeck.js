import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api/index';
import DeckForm from './DeckForm';


function EditDeck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ name: '', description: '' });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchData() {
      try {
        const response = await readDeck(deckId, signal);
        setDeck(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    return () => abortController.abort();
  }, [deckId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDeck((prevDeck) => ({
      ...prevDeck,
      [name]: value,
    }));
  };
  

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (deck.name.length === 0 || deck.description.length === 0) {
      alert('Please enter a deck name and description');
      return;
    }

    const abortController = new AbortController();
    const signal = abortController.signal;

    try {
      await updateDeck(deck, signal);
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.log(error);
    }
  };

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
            <Link to={`/decks/${deckId}`} className='text-decoration-none'>
              {deck.name}
            </Link>
          </li>
          <li className='breadcrumb-item active'>Edit Deck</li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <DeckForm
        deck={deck}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={() => history.push(`/decks/${deckId}`)}
      />
    </div>
  );
}

export default EditDeck;
