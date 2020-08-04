const express = require("express");
const path = require("path");
const notesService = require("./notes-service");
// const { requireAuth } = require('../middleware/jwt-auth')

const notesRouter = express.Router();
const jsonBodyParser = express.json();

notesRouter
  .route("/")
  .post( jsonBodyParser, (req, res, next) => {
    const { card_id, note } = req.body;
    const newNote = { card_id, note };
    console.log(req.user.id)

    for (const [key, value] of Object.entries(newNote))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    newNote.user_id = 2;

    notesService.insertNote(req.app.get("db"), newNote)
      .then(note => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${note.id}`))
          .json(notesService.serializeNote(note));
      })
      .catch(next);
  });

module.exports = notesRouter;
