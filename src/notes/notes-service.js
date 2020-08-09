const xss = require('xss')

const notesService = {
  getById(db, id) {
    return db
      .from('vocabulab_notes AS note')
      .select(
        'note.note',
        'note.carddata',
        'note.favorite',
        'note.known',
        'note.date_created',
        'note.card_id',
        'note.user_id',
        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                SELECT
                  usr.id,
                  usr.user_name,
                  usr.full_name,
                  usr.nickname,
                  usr.date_created,
                  usr.date_modified
              ) tmp)
            )
          ) AS "user"`
        )
      )
      .leftJoin(
        'vocabulab_users AS usr',
        'note.user_id',
        'usr.id',
      )
      .first()
  },

  insertNote(db, newNote) {
    return db
      .insert(newNote)
      .into('vocabulab_notes')
      .returning('*')
      .then(([note]) => note)
      .then(note =>
        notesService.getById(db, note.id)
      )
  },

  updateNote(db, id, newNoteFields) {
    return db('vocabulab_notes')
      .where({ id })
      .update(newNoteFields);
   },


  deleteNote(db, id, user) {
    db.raw(`delete from vocabulab_notes where card_id = 1 and user_id = 3` )
},

   

  serializeNote(note) {
    const { user } = note
    return {
      note: note.note,
      carddata: note.carddata,
      known: note.known,
      favorite: note.favorite ,
      date_created: new Date(note.date_created),
      card_id: note.card_id,
      user: {
        id: user.id,
        user_name: user.user_name,
        full_name: user.full_name,
        nickname: user.nickname,
        date_created: new Date(user.date_created),
        date_modified: new Date(user.date_modified) || null
      },
    }
  }
}

module.exports = notesService
