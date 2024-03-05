# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "rachelle",
  "password": "password",
  "name": "Rachelle Zhu"
}
```

Response Body {success} :

```json
{
  "data": {
    "username": "rachelle",
    "name": "Rachelle Zhu"
  }
}
```

Response Body {error} :

```json
{
  "errors": "Username, password, and name must not blank"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "rachelle",
  "password": "password"
}
```

Response Body {success} :

```json
{
  "data": {
    "username": "rachelle",
    "name": "Rachelle Zhu",
    "token": "uuid"
  }
}
```

Response Body {error} :

```json
{
  "errors": "Username or password wrong"
}
```

## Get User

Endpoint : GET /api/users/current

Request Header :

- X-API-TOKEN : token

Response Body {success} :

```json
{
  "data": {
    "username": "rachelle",
    "name": "Rachelle Zhu"
  }
}
```

Response Body {error} :

```json
{
  "errors": "Unauthorized"
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :

- X-API-TOKEN: token

Request Body :

```json
{
  "password": "password", // optional
  "name": "Rachelle Zhu" // optional
}
```

Response Body {success} :

```json
{
  "data": {
    "username": "Rachelle",
    "name": "Rachelle Zhu"
  }
}
```

Response Body {error} :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header :

- X-API-TOKEN: token

Request Body :

```json
{
  "data": "OK"
}
```

Response Body {success} :

```json
{
  "data": {
    "username": "Rachelle",
    "name": "Rachelle Zhu"
  }
}
```

Response Body {error} :

```json
{
  "errors": "Unauthorized"
}
```
