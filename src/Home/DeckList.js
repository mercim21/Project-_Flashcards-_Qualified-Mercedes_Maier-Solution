import React from 'react';
import { Link } from 'react-router-dom';

function DeckList({ decks }) {
    return (
      <div className='deck-list-container'>
        {decks.map((deck) => (
          <div className='deck-card' key={deck.id}>
            <h3 className='deck-title'>{deck.name}</h3>
            <p className='deck-description'>{deck.description}</p>
            {/* Add more deck information as needed */}
            <Link to={`/decks/${deck.id}`} className='deck-link'>
              View Deck
            </Link>
          </div>
        ))}
      </div>
    );
  }
  
  export default DeckList;
  