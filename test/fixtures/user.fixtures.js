function makeUsersArray() {
   //testing tools:dummy entries for test database
   return [
      {
         id: 1,
         user_name: "testperson1",
         full_name: "Caesar Salad",
         password: "password",
         nickname: "TT",
         date_created: "2020-08-08 18:26:51",
         date_modified: "2020-08-08 18:26:51",
      },
      {
         id: 2,
         user_name: "testperson2",
         full_name: "Joey Jammy",
         password: "password",
         nickname: "TT",
         date_created: "2020-08-08 18:26:51",
         date_modified: "2020-08-08 18:26:51",
      },
   ];
}

module.exports = {
   makeUsersArray,
};
