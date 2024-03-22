# How to test

### 1. npm i

<br />

### 2. npx prisma generate

<br />

### 3. Install Thunder Client extension in VSCode

<br />

### 4. Test the GET and POST endpoints

In Thunder Client for GET users:

- Click new request
- Choose GET
- Enter the URL http://localhost:3000/user
- Click send

In Thunder Client for POST register:

- Click new request
- Choose POST
- Enter the URL http://localhost:3000/register
- Inside of the body:

```json
// Feel free to test the error handlers as well.
// Username is a unique column, password has a minimum length of 8 characters and they're both required.

{
  "username": "John Doe",
  "password": "12345678"
}
```

- Click send

<br />

### 5. Bonus feature: Follow & unfollow user

Authenticate the user first:

- Click new request
- Choose POST
- Enter the URL http://localhost:3000/authenticate
- Inside of the body:

```json
{
  "username": "John Doe",
  "password": "12345678"
}
```

- Click send
- Copy the accessToken value

In Thunder Client for PUT follow/unfollow:

- Click new request
- Choose PUT
- Enter the URL http://localhost:3000/userId/follow/userIdToFollow

Get each id from the GET users endpoint: `/user`

- Inside of the headers:

Authorization: Bearer _paste the accessToken here_

- Click send

Unselect the authorization headers to test the authentication middleware which returns:

```json
{
  "status": 401,
  "error": "Please login first."
}
```
