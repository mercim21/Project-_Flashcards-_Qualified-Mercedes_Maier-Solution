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
        <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={deck.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={deck.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
        <button
          type="button"
          className="btn btn-secondary ml-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
        /</form>
      </div>
    </div>
    </div>
  );
}

export default CreateDeck;