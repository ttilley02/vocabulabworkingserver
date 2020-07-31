const xss = require('xss')

const cardsService = {
  getAllCards(db) {
    return db
      .from('vocabulab_cards AS card')
      .select(
        'card.id',
        // 'card.spa_content',
        // 'card.eng_content',
        // 'card.date_created',
        // 'card.difficulty',
        // db.raw(
        //    `count(DISTINCT comm) AS number_of_notes`
        // ),
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
      // .leftJoin(
      //   'vocabulab_notes AS notes',
      //   'card.id',
      //   'notes.card_id',
      // )
      // .leftJoin(
      //   'vocabulab_users AS usr',
      //   'card.author_id',
      //   'usr.id',
      // )
      // .groupBy('card.id', 'usr.id')
  },

  getById(db, id) {
    return cardsService.getAllCards(db)
      .where('card.id', id)
      .first()
  },

  getNotesForCard(db, card_id) {
    return db
      .from('vocabulab_notes AS comm')
      .select(
        'comm.id',
        'comm.text',
        'comm.date_created',
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
      .where('comm.card_id', card_id)
      .leftJoin(
        'vocabulab_users AS usr',
        'comm.user_id',
        'usr.id',
      )
      .groupBy('comm.id', 'usr.id')
  },

  serializeCard(card) {
    const { author } = card
    return {
      id: card.id,
      // spa_content: card.spa_content,
      // eng_content: card.eng_content,
      // date_created: new Date(card.date_created),
      // difficulty: card.difficulty,
      // number_of_notes: Number(card.number_of_notes) || 0,
      // author: {
      //   id: author.id,
      //   user_name: author.user_name,
      //   full_name: author.full_name,
      //   nickname: author.nickname,
      //   date_created: new Date(author.date_created),
      //   date_modified: new Date(author.date_modified) || null
      // },
    }
  },

  serializeCardnote(note) {
    const { user } = note
    return {
      id: note.id,
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
