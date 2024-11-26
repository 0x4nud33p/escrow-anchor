# URL Shortener API

This is a simple URL Shortener API built using **Node.js**, **Express**, and **MongoDB**. It allows users to shorten URLs, retrieve the original URL, and track usage statistics.

## Features

- Shorten a long URL to a unique short ID.
- Redirect users to the original URL using the short ID.
- Track the number of times a shortened URL is accessed.
- Get statistics like click count and the last accessed time for a specific short URL.
- Rate limiting to restrict requests per minute.

---

## Table of Contents

- [Endpoints](#endpoints)
- [Requirements](#requirements)
- [Usage Instructions](#usage-instructions)
- [Testing the API](#testing-the-api)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)

---

## Endpoints

### **1. POST `/api/shorten`**
Shortens a given URL.

- **Request Body:**
  ```json
  {
    "url": "https://example.com/long-url"
  }
  ```
- **Response:**
  ```json
  {
    "shortUrl": "http://<domain>/<shortId>"
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "Invalid URL format"
  }
  ```

---

### **2. GET `/:shortId`**
Redirects the user to the original URL.

- **Behavior:**  
  - Redirects the user to the original URL associated with the given `shortId`.
- **Error Response:**
  ```json
  {
    "error": "URL not found"
  }
  ```

---

### **3. GET `/api/stats/:shortId`**
Retrieves usage statistics for a specific shortened URL.

- **Response:**
  ```json
  {
    "originalUrl": "https://example.com/long-url",
    "shortId": "abcd1234",
    "clicks": 5,
    "lastAccessed": "2024-11-26T12:34:56Z"
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "URL not found"
  }
  ```

---

## Requirements

- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud instance)

---

## Usage Instructions

1. **Clone the repository:**
   ```bash
   git clone [https://github.com//url-shortener.git](https://github.com/anudeep009/url-shortener-api.git)
   cd url-shortener
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   BASE_URL=http://localhost:5000
   RATE_LIMIT=100
   ```

4. **Start the application:**
   ```bash
   npm start
   ```

---

## Testing the API

Use **Postman** or any other API testing tool to interact with the API.

- **POST `/api/shorten`**: Test with valid and invalid URLs.
- **GET `/:shortId`**: Test with existing and non-existing short IDs.
- **GET `/api/stats/:shortId`**: Check statistics after visiting the short URL.

---

## Deployment

This application is deployed on render.com
Access the live application here: **(https://url-shortener-api-1-riwc.onrender.com**

---

## Environment Variables

- **PORT**: The port on which the server runs (default: 3000).
- **MONGO_URI**: Connection string for MongoDB.
- **BASE_URL**: The base URL of your application (e.g., `http://localhost:3000`).
- **RATE_LIMIT**: Maximum requests per minute for a client.

---

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Deployment**: Render

---

## Folder Structure

```
url-shortener/
│
├── controllers/
├── middlewares/
├── models/
├── routes/
└── config/
│
├── .env
├── package.json
├── README.md
└── server.js
```

## Author

- **Anudeep Avula**  
- [GitHub Profile]([(https://github.com/anudeep009/url-shortener-api/)])

---
