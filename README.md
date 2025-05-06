# Afghan Proverbs & Sayings API

A RESTful API for storing and retrieving Afghan proverbs in Dari, Pashto, and English.

## Features

- Full CRUD operations
- Filter by category
- Search by keyword
- Get a random proverb

## Getting Started

```bash
git clone <repo_url>
cd afghan-proverbs-api
npm install
node app.js
```

## Endpoints

use curl for postman:
curl http://localhost:3000/proverbs

Get All
GET /proverbs

Get By ID
GET /proverbs/:id

Add
POST /proverbs

Update
PUT /proverbs/:id

Delete
DELETE /proverbs/:id

Get Random
GET /proverbs/random
