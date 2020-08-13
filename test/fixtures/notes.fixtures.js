function makeNotesArray() {
    return [
      {
        id: 44,
        note: 'yup',
        carddata: 'First test post!',
        favorite: null,
        known: null,
        date_created:'2029-01-22T16:28:32.615Z',
        card_id:2,
        user_id:2,
        author_id: null,
      },
      {
        id: 33,
        note: 'yup',
        carddata: 'second test post!',
        favorite: 'How-to',
        known: 'yes',
        date_created:'2029-01-22T16:28:32.615Z',
        card_id:1,
        user_id:2,
        author_id: null,
      },
      {
        id: 55,
        note: 'yup',
        carddata: 'third test post!',
        favorite: null,
        known: null,
        date_created:'2029-01-22T16:28:32.615Z',
        card_id:1,
        user_id:1,
        author_id: null,
      },

    ];
  }
  
  module.exports = {
    makeNotesArray,
  };