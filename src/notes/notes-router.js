const express = require("express");
const path = require("path");
const notesService = require("./notes-service");
// const { requireAuth } = require('../middleware/jwt-auth')

const notesRouter = express.Router();
const jsonBodyParser = express.json();

notesRouter
  .route("/")
  .post( jsonBodyParser, (req, res, next) => {
    const { card_id, text } = req.body;
    const newnote = { card_id, text };

    for (const [key, value] of Object.entries(newnote))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    newnote.user_id = req.user.id;

    notesService.insertNote(req.app.get("db"), newnote)
      .then(note => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${note.id}`))
          .json(notesService.serializeNote(note));
      })
      .catch(next);
  });

module.exports = notesRouter;
