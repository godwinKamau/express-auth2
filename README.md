# Secret Messages (express-auth2)

A full-stack web app used to place notes only available in certain geolocations (within 1km from the place of posting). Users also get to see the notes made locally. All data is stored in MongoDB, making the app scalable for future character additions and features.

<hr>

## Tech Stack

| Category  | Tools                               |
| --------- | ----------------------------------- |
| Backend   | Node.js, Express, Mongoose, MongoDB |
| Frontend  | EJS, HTML, CSS, JavaScript          |
| Dev Tools | Nodemon, dotenv                     |

<hr>

## Live Demo

https://express-auth2.onrender.com

<hr>

### Installation & Setup

Make sure you have Node.js and MongoDB (or MongoDB Atlas) set up.

```
git clone <your-repo-url>
cd <project-folder>
npm install
```
### Environment Variables
Create a .env file:

```
MONGODB_URL=<your_mongo_connection_string>
```
<hr>

## Run the App

```
npm run dev
```

This runs the server using nodemon for automatic reload during development.

<hr>

## Features
- Know your geolocation using the geolocation API
- Store messages securely on the server
- MongoDB-backed storage for all entries
- Full-stack made from Express
- Passport with local strategies for logging in and storing cookies

<hr>

## Future Improvements
- Ability to delete your own messages
- Use geocode API to display city/landmark instead of geolocation
- Also use geocode for database organization. Place "city data" in a specific room in the database (Not sold on this idea yet).
- Use leaflet API for a nice UI interface.
- Google/Facebook/X Auth with more passport strategies.

<hr>
PRs and contributions are welcome!
<hr>
License
ISC