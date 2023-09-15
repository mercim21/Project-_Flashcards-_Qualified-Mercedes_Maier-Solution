import React from 'react';

function CardList({ cards }) {
  return (
    <div>
      <h2>Card List</h2>
      <ul>
        {cards.map((card, index) => (
          <li key={index}>
            <strong>Front:</strong> {card.front}, <strong>Back:</strong> {card.back}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CardList;
