function makeCardsArray() {
   //testing tools:dummy entries for test database
   return [
      {
         id: 1,
         spa_content: "spanish stuff",
         eng_content: "english stuff",
         difficulty: "b",
         user_id: null,
      },
      {
         id: 2,
         spa_content: "spanish stuff2",
         eng_content: "english stuff2",
         difficulty: "b",
         user_id: null,
      },
      {
         id: 3,
         spa_content: "spanish stuff3",
         eng_content: "english stuff3",
         difficulty: "b",
         user_id: null,
      },
   ];
}

module.exports = {
   makeCardsArray,
};
