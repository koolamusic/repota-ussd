var options = {
  AT : {
    username: process.env.AT_USERNAME,
    apiKey: process.env.AT_APIKEY,
    format: 'json'
  },
  mysql: {
    host: process.env.DB_HOST,
    db: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
  },
  redis: {
    port: 6709,
    host: 'localhost'
  }
};



// You have successfully created a new database. The details are below.
// Username: dngienJY6G
// Database name: dngienJY6G
// Password: xkYwEAMCbd
// Server: remotemysql.com
// Port: 3306
// These are the username and password to log in to your database and phpMyAdmin
// Make sure you keep your password secure. Ensure you keep back ups of your database in case it gets deleted.

// var options = {
//   AT : {
//     username: 'sandboxm',
//     apiKey: 'c06e578d8dab84ec90a78bb92047ba077781a61a6a3f4c323f8547725fe8e298',
//     format: 'json'
//   },
//   mysql: {
//     host: process.env.DB_HOST,
//     db: process.env.DB_NAME,
//     user: process.env.DB_USER,
//     pass: process.env.DB_PASS
//   },
//   redis: {
//     port: 6709,
//     host: 'localhost'
//   }
// };





module.exports = options;
