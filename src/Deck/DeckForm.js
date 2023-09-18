import React from 'react';

function DeckForm({ 
  deck, 
  handleChange, 
  handleSubmit, 
  handleCancel 
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='name' className='d-flex justify-content-between'>
          Name
        
        </label>

        <input
          type='text'
          className='deck-input' 
          id='name'
          name='name'
          value={deck.name}
          onChange={handleChange}
          placeholder='Deck Name'
          maxLength='100'
          required
        />
      </div> 

      
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="3"
          placeholder="Brief description of the deck"
          value={deck.description}
          onChange={handleChange}
        ></textarea>
      </div> 
      
      <button className='btn btn-secondary' onClick={handleCancel}>
        Cancel
      </button>
      <button type='submit' className='btn btn-primary mx-2'>
        Submit
      </button>
    </form>
  );
}

export default DeckForm;