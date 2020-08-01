const express = require('express')
const cardsService = require('./cards-service')
// const { requireAuth } = require('../middleware/jwt-auth')


const cardsRouter = express.Router()

cardsRouter
  .route('/')
  .get((req, res, next) => {
    cardsService.getAllCards(req.app.get('db'))
      .then(cards => {
        res.json(cards.map(cardsService.serializeCard))
      })
      .catch(next)
  })

cardsRouter
.route('/:user_id/cards')
.all(checkUserExists)
.get((req, res, next) => {
  cardsService.getAllUserCards(req.app.get('db'))
    .then(cards => {
      res.json(cards.map(cardsService.serializeCard))
    })
    .catch(next)
})

cardsRouter
  .route('/:card_id')
  // .all(requireAuth)
  .all(checkCardExists)
  .get((req, res) => {
    res.json(cardsService.serializeCard(res.card))
  })

cardsRouter.route('/:card_id/notes/')
  // .all(requireAuth)
  .all(checkCardExists)
  .get((req, res, next) => {
    cardsService.getNotesForCard(
      req.app.get('db'),
      req.params.card_id
    )
      .then(notes => {
        res.json(notes.map(cardsService.serializeCardNote))
      })
      .catch(next)
  })

/* async/await syntax for promises */
async function checkCardExists(req, res, next) {
  try {
    const card = await cardsService.getById(
      req.app.get('db'),
      req.params.card_id
    )

    if (!card)
      return res.status(404).json({
        error: `card doesn't exist`
      })

    res.card = card
    next()
  } catch (error) {
    next(error)
  }
}

async function checkUserExists(req, res, next) {
  try {
    const user = await cardsService.getAllUserCards(
      req.app.get('db'),
      req.params.user_id
    )

    if (!user)
      return res.status(404).json({
        error: `user doesn't exist`
      })

    res.user = user
    next()
  } catch (error) {
    next(error)
  }
}


module.exports = cardsRouter
