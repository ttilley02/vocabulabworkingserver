const express = require("express");
const path = require("path");
const notesService = require("./notes-service");
const { requireAuth } = require('../middleware/jwt-auth')

const notesRouter = express.Router();
const jsonBodyParser = express.json();

notesRouter
  .route("/")
  .post( requireAuth, jsonBodyParser, (req, res, next) => {
    const { card_id, note } = req.body;
    const newNote = { card_id, note };

      for (const [key, value] of Object.entries(newNote))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    newNote.user_id = req.user.id

    notesService.insertNote(req.app.get("db"), newNote)
      .then(note => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${note.id}`))
          .json(notesService.serializeNote(note));
      })
      .catch(next);
  })
  .patch( requireAuth, jsonBodyParser, (req, res, next) => {
    const { card_id, note } = req.body;
    const newNoteFields = { card_id, note };
      for (const [key, value] of Object.entries(newNoteFields))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });
  
    newNoteFields.user_id = req.user.id

    notesService.updateNote(req.app.get("db"), req.user.id, newNoteFields)
      .then(()=> {
        res.status(204).end()
      })
      .catch(next)
  });

  notesRouter
  .route('/:card_id')
  .delete(requireAuth, jsonBodyParser,(req, res, next) => {
    notesService.deleteNote(
           req.app.get('db'),
           req.params.card_id,
           req.user.id
         )
           .then(() => {
             res.status(204).end()
           })
           .catch(next)
    })

  
  
  

module.exports = notesRouter;
