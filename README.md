# BookShelf Frontend

This is the frontend for the BookShelf application, built with React. Follow the steps below to run it locally.

---

## Prerequisites

Make sure you have:

* Node.js (v16 or higher)
* npm or yarn

---

## Clone the Repository

```bash
git https://github.com/subhankar2524/bookshelf-client
cd bookshelf-client
```

---

## Install Dependencies

```bash
npm install
```

---

## Setup Environment Variables

Create a `.env` file in the root directory:

```
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

Update the URL if your backend is running on a different port or deployed.

---

## Run the Application

```bash
npm start
```

The app will start on:

```
http://localhost:3000
```

---

## Project Structure

```
src/
  components/
  pages/
  hooks/
  styles/
  services/
```

---

## API Configuration

The project uses Axios for API calls.

Example setup:

```js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export default API;
```

---

## Common Issues

### Environment variables not working

* Ensure `.env` is in the root directory
* Restart the dev server after changes
* Variable must start with `REACT_APP_`

---

### API not calling

* Check if backend is running
* Verify `REACT_APP_API_BASE_URL`
* Check browser console for errors

---

### CORS error

* Ensure backend allows frontend origin
* Example (backend):

```js
app.use(cors({
  origin: "http://localhost:3000",
}));
```

---

## Build for Production

```bash
npm run build
```

This creates an optimized build in the `build` folder.

---

## Quick Start

```bash
git clone <repo>
cd <project>
npm install
# add .env
npm start
```

---

The application should now be running locally.
