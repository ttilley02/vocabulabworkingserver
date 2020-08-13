# Vocabulab: Spanish
Powered by the University of Texas Austin.

The database holds spanish to english translations of grammer, vocab and phrases from the curriculum and provides is built around scalability
for future languages and study card archetypes


## Current card count #189

### card additions made periodcally to the database.


#### npm start 
to run on port 8080

Also hosted via Heroku:
https://shielded-sea-55188.herokuapp.com/


## Endpoints
### api/cards
gets all cards and brings forth random 3

#### /mycards
grabs user favorited cards with an ability to add a note.  If the user has no favorites will be blank.

#### /fav/:card_id
assgins favorite to current user card profile.  Notes exclusive to them per a many to many relationship

### api/notes
general patch and delete for cards

### api/users
User backend with JWT Auth
Test Users available
