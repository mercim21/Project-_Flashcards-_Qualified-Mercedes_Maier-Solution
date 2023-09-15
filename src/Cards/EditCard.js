import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import NotFound from  "../Layout/NotFound";
import CardForm from  "../Cards/CardForm";

function EditCard(props) {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    
    async function fetchData() {
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        setDeck(deckResponse);
        const card = deckResponse.cards.find(
          (card) => card.id === parseInt(cardId)
        );
        setCard(card);
      } catch (error) {
        console.error("Error fetching deck:", error);
        return <NotFound />;
      }
      
    }

    fetchData();

    return () => abortController.abort();
  }, [deckId, cardId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedCard = {
      id: card.id,
      front: card.front,
      back: card.back,
    };

    updateCard(updatedCard)
      .then(() => {
        window.alert("Card was updated");
        history.push(`/decks/${deckId}`);
      })
      .catch((error) => {
        console.error("Error updating card:", error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };

  if (!deck.id) {
    return <NotFound />;
  }

 return (
    <div>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/' className='text-decoration-none'>
              <i className='fa-solid fa-house' /> Home
            </Link>
          </li>
          <li className='breadcrumb-item active'>Edit Card</li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      <CardForm
        card={card}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonGrayText={'Cancel'}
        buttonBlueText={'Submit'}
      />
    </div>
  );
}

export default EditCard;