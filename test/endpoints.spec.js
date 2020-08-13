const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const { makeUsersArray } = require('./fixtures/user.fixtures');
const { makeCardsArray } = require('./fixtures/cards.fixtures');
const { makeNotesArray } = require('./fixtures/notes.fixtures');
const authHelper = require('./authHelper')

describe('notes Endpoints', function() {
    let db;
  
    before('make knex instance', () => {
      db = knex({
        client: 'pg',
        connection: process.env.TEST_DATABASE_URL,
      });
      app.set('db', db);
    });
  
    after('disconnect from db', () => db.destroy());
  
    before('clean the table', () => db.raw('TRUNCATE vocabulab_users, vocabulab_cards, vocabulab_notes RESTART IDENTITY CASCADE'))

    afterEach('cleanup',() => db.raw('TRUNCATE vocabulab_users, vocabulab_cards, vocabulab_notes RESTART IDENTITY CASCADE'))

    
  describe('GET /api/cards TEST', () =>{
      context(`Given no notes`, () => {
          
          it(`responds with 200 and an empty list`, () => {
              return supertest(app)
              .get('/api/cards')
              .expect(200, []);
          });
          });
      context('Given there are notes in the database', () => {
          const testUsers =  makeUsersArray();
          const testCards = makeCardsArray();
          
              
          beforeEach('insert users', () => {
            return db
            .into('vocabulab_users')
            .insert(testUsers)
            .then(()=>{
              return db
              .into('vocabulab_cards')
              .insert(testCards);
            })

          });

          it('GET /api/notes responds with 200 and spanish and english content', () => {
                
                  return supertest(app)
                  .get('/api/cards')
                  .expect(200,)
                  .expect(res=>{
                    expect(res.body.eng_content).to.eql(testCards.eng_content)
                    expect(res.body.spa_content).to.eql(testCards.spa_content)
                  })
          });
      });
  });
  describe('GET /api/cards/mycards TEST', () =>{
    
    context(`Given no notes`, () => {
      const testUsers =  makeUsersArray();
      const testCards = makeCardsArray();
      
          
      beforeEach('insert users', () => {
        return db
        .into('vocabulab_users')
        .insert(testUsers)
        .then(()=>{
          return db
          .into('vocabulab_cards')
          .insert(testCards);
        })
      });
        
        it(`responds with 200 and an empty list`, () => {
            return supertest(app)
            .get('/api/cards/mycards')
            .set("Authorization", authHelper.makeAuthHeader(testUsers[0]))
            .expect(200, []);
        });
        });
    context('Given there are notes in the database', () => {
        const testUsers =  makeUsersArray();
        const testCards = makeCardsArray();
        
            
        beforeEach('insert users', () => {
          return db
          .into('vocabulab_users')
          .insert(testUsers)
          .then(()=>{
            return db
            .into('vocabulab_cards')
            .insert(testCards);
          })
        });

        it('GET /api/notes responds with 200 and spanish and english content', () => {
              
                return supertest(app)
                .get('/api/cards/mycards')
                .set("Authorization", authHelper.makeAuthHeader(testUsers[0]))
                .expect(200,)
                .expect(res=>{
                  expect(res.body.id).to.eql(testCards.id)
                  expect(res.body.eng_content).to.eql(testCards.eng_content)
                  expect(res.body.spa_content).to.eql(testCards.spa_content)
                })
        });
    });
});
describe('POST /api/cards/fav/:card_id TEST', () =>{
    
  context(`select note as favorite`, () => {
    const testUsers =  makeUsersArray();
    const testCards = makeCardsArray();
    const testNotes = makeNotesArray()

    const testNote = 
    {
      favorite: "yes",
      card_id:3,
      user_id:1 
    }
    
        
    beforeEach('insert users', () => {
      return db
      .into('vocabulab_users')
      .insert(testUsers)
      .then(()=>{
        return db
        .into('vocabulab_cards')
        .insert(testCards)
      .then(()=>{
        return db
        .into('vocabulab_notes')
        .insert(testNotes)
      })
      })
    });
      
      it(`responds with 200 and adds to my cards list`, () => {
          return supertest(app)
          .post('/api/cards/fav/4')
          .send(testNote)
          .set("Authorization", authHelper.makeAuthHeader(testUsers[0]))
          .expect(204);
      });
      });
});


describe('PATCH /api/notes/ TEST', () =>{
    
  context(`select note as favorite`, () => {
    const testUsers =  makeUsersArray();
    const testCards = makeCardsArray();
    const testNotes = makeNotesArray()

    const newNote = 
    {
      note: "testing my note table",
      card_id:2,
     
    }
    
        
    beforeEach('insert users', () => {
      return db
      .into('vocabulab_users')
      .insert(testUsers)
      .then(()=>{
        return db
        .into('vocabulab_cards')
        .insert(testCards)
      .then(()=>{
        return db
        .into('vocabulab_notes')
        .insert(testNotes)
      })
      })
    });
      
      it(`responds with 204 and updates note`, () => {
          return supertest(app)
          .patch('/api/notes/')
          .send(newNote)
          .set("Authorization", authHelper.makeAuthHeader(testUsers[0]))
          .expect(204)
          .expect(res=>{
            expect("posted!")

           })
      });
      });
  });

  describe('DELETE /api/notes/ TEST', () =>{
    
    context(`select note as favorite`, () => {
      const testUsers = makeUsersArray();
      const testCards = makeCardsArray();
      const testNotes = makeNotesArray()
  
      const newNote = 
      {
        note: "testing my note table",
        card_id:2,
       
      }
      
          
      beforeEach('insert users', () => {
        return db
        .into('vocabulab_users')
        .insert(testUsers)
        .then(()=>{
          return db
          .into('vocabulab_cards')
          .insert(testCards)
        .then(()=>{
          return db
          .into('vocabulab_notes')
          .insert(testNotes)
        })
        })
      });
        
        it(`responds with 204 and updates note`, () => {
            return supertest(app)
            .patch('/api/notes/')
            .send(newNote)
            .set("Authorization", authHelper.makeAuthHeader(testUsers[0]))
            .expect(204)
            .expect(res=>{
              expect("posted!")
  
             })
        });
        });
    });

    describe(`DELETE CARD /api/notes/:id`, () => {

       
                context('Given there are cards in the database', () => {
                  const testUsers = makeUsersArray();
                  const testCards = makeCardsArray();
                  const testNotes = makeNotesArray()
            
                  beforeEach('insert users', () => {
                    return db
                    .into('vocabulab_users')
                    .insert(testUsers)
                    .then(()=>{
                      return db
                      .into('vocabulab_cards')
                      .insert(testCards)
                    .then(()=>{
                      return db
                      .into('vocabulab_notes')
                      .insert(testNotes)
                    })
                    })
                  });
            
                  it('responds with 204 and removes the card', () => {
                    const idToRemove = 2
                    const expectedcard = testNotes.filter(note => note.id !== idToRemove)
                    return supertest(app)
                      .delete(`/api/notes/${idToRemove}`)
                      .set("Authorization", authHelper.makeAuthHeader(testUsers[0]))
                      .expect(204)
                      .expect(res=>{
                        expect("posted!")
            
                      })
                      
                  })
                })
            })
})
      

    
