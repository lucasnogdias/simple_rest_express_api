# REST API example with Node.js and Express

## Purpose and Origin

  A very basic nodejs API built as part of the Udemy Node.js Course by Victor Lima.

## Endpoints

### GET /games

This endpoint returns a listing with all games registered to the DB.

#### Parameters

  None

#### Responses

##### OK - 200

  Returns a listing with all games
  Example:

  ```json
  [
    {
        "id": 23,
        "title": "Hades",
        "year": 2020,
        "price": 25
    },
    {
        "id": 20,
        "title": "Hollow Knight",
        "year": 2018,
        "price": 28
    },
    {
        "id": 1234,
        "title": "New Game",
        "price": "20",
        "year": "1999"
    }
  ]
  ```

##### Auth Failure - 401

  Authentication failed for the request. Invalid or expired token.
  Example:

  ```json
  {
    "err": "Invalid Credentials"
  }
  ```

### POST /auth

This endpoint signs users in and returns a token

#### Parameters

  email: user registered email
  password: user registered password

  Example:

  ```json
  {
    "email": "some_test_email@email.com",
    "password": "1234"
  }
  ```

#### Responses

##### OK - 200
  Returns a JWT token that authenticates the user.
  Example:

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzb21lX3Rlc3RfZW1haWxAZW1haWwuY29tIiwiaWF0IjoxNjU1NDgyMDI2LCJleHAiOjE2NTU2NTQ4MjZ9.XNX3vGHEvjiO9WSrjMPBZcClkF4Oh0KsvjtE2LfJfIQ"
  }
  ```

##### Invalid User - 400

  Invalid email and/or password
  Example:

  ```json
  {
    "err": "Invalid email and/or password"
  }
  ```

##### Auth Failure - 401

  Authentication failed for the request. Invalid email or password.
  Example:

  ```json
  {
    "err": "Invalid Credentials!"
  }
  ```

##### User not found - 404

  No user with the given email was found on the database.
  Example:

  ```json
  {
    "err": "User not found"
  }
  ```

##### Error Generating token - 500

  There was an Error while generating a JWT token for this user.

### GET /game/:id

Gets data for one specific game, identified by the ID provided on the url.

#### Parameters

  id: identifies which entry to retrieve data for

#### Responses

##### OK - 200

  Returns a json that contains data for the desired game.
  Example:

  ```json
  {
    "id": 2,
    "title": "Metroid Dread",
    "year": 2021,
    "price": 55
  }
  ```

##### Invalid ID - 400

  Invalid ID provided. The ID must be an Integer.
  Example:

  ```json
  {
    "Bad Request"
  }
  ```

##### Entry Not Found - 404

  No game with the given id was found on the database.
  Example:

  ```json
  {
    "Not found"
  }
  ```

### POST /game

Register a new game with the desired properties.

#### Parameters

  title: Game name/title
  price: Game Price
  year: Game release year

  Example:

  ```json
  {
    "title": "Game Name",
    "year": 2022,
    "price": 60
  }
  ```

#### Responses

##### OK - 200
  Game Registered successfully.

### DELETE /game/:id

Deletes the game with the given ID from the DB.

#### Parameters

  id: ID for the game that has to be deleted, passed on the URL.

#### Responses

##### OK - 200

  Game Removed successfully.

##### Invalid ID - 400

  Invalid ID provided. The ID must be an Integer.
  Example:

  ```json
  {
    "Bad Request"
  }
  ```

##### Entry Not Found - 404

  No game with the given id was found on the database.
  Example:

  ```json
  {
    "Not found"
  }
  ```

### PUT /game/:id

Edits the game with the given ID from the DB.

#### Parameters

  id: ID for the game that has to be deleted, passed on the URL.
  title: Updated game name/title
  price: Updated game Price
  year: Updated game release year

  Example:

  ```json
  {
    "title": "Updated Game Name",
    "year": 2022,
    "price": 55
  }
  ```

#### Responses

##### OK - 200

  Game Updated successfully.

##### Invalid ID - 400

  Invalid ID provided. The ID must be an Integer.
  Example:

  ```json
  {
    "Bad Request"
  }
  ```

##### Entry Not Found - 404

  No game with the given id was found on the database.
  Example:

  ```json
  {
    "Not found"
  }
  ```