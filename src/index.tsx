import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// require("dotenv").config({
//   path: "./.env.local",
// });
// const app = require("./app");
// const db = require("./knex");
// const insertTables = require("../data/import");

// const PORT = process.env.PORT || 9000;

// (async () => {
//   try {
//     console.log("Running migrations...");
//     await db.migrate.latest();

//     await insertTables.insertLocationTable();
//     await insertTables.insertRestaurantsTable();
//     await insertTables.insertLocationsRestaurantsTable();

//     console.log("Starting express...");
//     app.listen(PORT, () => {
//       console.log(`App listening on port ${PORT}!`);
//     });
//   } catch (err) {
//     console.error("Error starting app!", err);
//     process.exit(-1);
//   }
// })();
