const xss = require('xss')
const notesRouter = require('../notes/notes-router')

let num1 = Math.floor((Math.random() * 189) + 1)
let num2 = Math.floor((Math.random() * 189) + 1)
let num3 = Math.floor((Math.random() * 189) + 1)
let num4 = Math.floor((Math.random() * 189) + 1)
let num5 = Math.floor((Math.random() * 189) + 1)
let num6 = Math.floor((Math.random() * 189) + 1)
let num7 = Math.floor((Math.random() * 189) + 1)
let num8 = Math.floor((Math.random() * 189) + 1)
let num9 = Math.floor((Math.random() * 189) + 1)
let num10 = Math.floor((Math.random() * 189) + 1)
let num11 = Math.floor((Math.random() * 189) + 1)
let num12 = Math.floor((Math.random() * 189) + 1)

const cardsService = {
  // randomNumObject() {
  //   return
  //   Math.floor((Math.random() * 189) + 1);
   
  // },
 
  getAllCards(db) {
    return db
      .from('vocabulab_cards AS card')
      .select(
        'card.id',
        'card.spa_content',
        'card.eng_content',
        'card.date_created',
        'card.difficulty',
        db.raw(
           `count(DISTINCT notes) AS number_of_notes`
        ),
        // db.raw(
        //   `json_strip_nulls(
        //     json_build_object(
        //       'id', usr.id,
        //       'user_name', usr.user_name,
        //       'full_name', usr.full_name,
        //       'nickname', usr.nickname,
        //       'date_created', usr.date_created,
        //       'date_modified', usr.date_modified
        //     )
        //   ) AS "author"`
        // ),
      )
      .whereIn('card.id', [1,5,num3,num4,num5,num6,num7,num8,num9,num10,num11,num12])
      .leftJoin(
        'vocabulab_notes AS notes',
        'card.id',
        'notes.card_id',
      )
      // .leftJoin(
      //   'vocabulab_users AS usr',
      //   'card.author_id',
      //   'usr.id',
      // )
      .groupBy('card.id')
      .limit(12)
      
  },

  getAllUserCards(db, user) {
    return db
      .from('vocabulab_cards AS card')
      .leftJoin(
        'vocabulab_notes AS notes',
        'card.id',
        'notes.card_id',
      )
      .select(
        'card.id',
        'card.spa_content',
        'card.eng_content',
        'card.date_created',
        'card.difficulty',
        'notes.note',
        db.raw(
           `count(DISTINCT notes) AS number_of_notes`
        ),
        // db.raw(
        //   `json_strip_nulls(
        //     json_build_object(
        //       'id', usr.id,
        //       'user_name', usr.user_name,
        //       'full_name', usr.full_name,
        //       'nickname', usr.nickname,
        //       'date_created', usr.date_created,
        //       'date_modified', usr.date_modified
        //     )
        //   ) AS "author"`
        // ),
      )
      .where('notes.user_id', 2)
      .groupBy('card.id' , 'notes.note') 
  },

  getById(db, id) {
    return cardsService.getAllCards(db)
      .where('card.id', id)
      .first()
  },

  getNotesForCard(db, card_id) {
    return db
      .from('vocabulab_notes AS note')
      .select(

        'note.note',
        'note.date_created',
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
      .where('note.card_id', card_id)
      .leftJoin(
        'vocabulab_users AS usr',
        'note.user_id',
        'usr.id',
      )
  },

  serializeCard(card) {
    const { author } = card
    return {
      id: card.id,
      spa_content: card.spa_content,
      eng_content: card.eng_content,
      date_created: new Date(card.date_created),
      difficulty: card.difficulty,
      number_of_notes: Number(card.number_of_noteents) || 0,
      note: card.note
    }
  },

  serializeCardNote(note) {
    const { user } = note
    return {
     
      card_id: note.card_id,
      note: xss(note.note),
      date_created: new Date(note.date_created),
      user: {
        id: user.id,
        user_name: user.user_name,
        full_name: user.full_name,
        nickname: user.nickname,
        date_created: new Date(user.date_created),
        date_modified: new Date(user.date_modified) || null
      },
    }
  },
}

module.exports = cardsService
