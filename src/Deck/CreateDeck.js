import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createDeck } from "../utils/api/index";
import DeckForm from './DeckForm';

function CreateDeck() {
  const history = useHistory();
  const [deck, setDeck] = useState({ name: '', description: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDeck({ ...deck, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newDeck = await createDeck(deck); // Store the response in 'newDeck'
      history.push(`/decks/${newDeck.id}`); // Redirect to the newly created deck
    } catch (error) {
      console.error('Error creating deck:', error);
    }
  };

  const handleCancel = () => {
    history.push('/');
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
          <li className='breadcrumb-item active' aria-current='page'>
            Create Deck
          </li>
        </ol>
      </nav>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>Create Deck</h5>
          <DeckForm
            deck={deck}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateDeck;