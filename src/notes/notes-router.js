const express = require("express");
const path = require("path");
const notesService = require("./notes-service");
const { requireAuth } = require("../middleware/jwt-auth");

const notesRouter = express.Router();
const jsonBodyParser = express.json();



//update a note for card that is favorited.  You can only add notes to cards you have saved as a favorite
notesRouter.route("/").patch(requireAuth, jsonBodyParser, (req, res, next) => {
  const { card_id, note } = req.body;
  const newNoteFields = { card_id, note };
  for (const [key, value] of Object.entries(newNoteFields))
    if (value == null)
      return res.status(400).json({
        error: `Missing '${key}' in request body`
      });

  newNoteFields.user_id = req.user.id;

  //updates note table
  notesService
    .updateNote(req.app.get("db"), req.user.id, card_id, newNoteFields)
    .then(() => {
      return res.status(204).json({
        message: "posted!"
      });
    })
    .catch(next);
});

//deletes notes for user table and then deletes the corresponding card reference for the user only(many to many)
notesRouter
  .route("/:card_id")
  .delete(requireAuth, jsonBodyParser, (req, res, next) => {
    notesService
      .deleteNote(req.app.get("db"), req.params.card_id, req.user.id)
      .then(() => {
        res.status(204).json({
          message: "deleted!"
        });
      })
      .catch(next);
  });

module.exports = notesRouter;
