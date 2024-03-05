# Contact API Spec

## Create Contact

Endpoint : POST /api/contacts

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "first_name": "Rachelle",
  "last_name": "Zhu",
  "email": "rachellezhu@rachellezhu.com",
  "phone": "+6286969696969"
}
```

Response Body {success} :

```json
{
  "data": {
    "id": 1,
    "first_name": "Rachelle",
    "last_name": "Zhu",
    "email": "rachellezhu@rachellezhu.com",
    "phone": "+6286969696969"
  }
}
```

Response Body {failed} :

```json
{
  "errors": "Make sure to fill out the form"
}
```

## Get Contact

Endpoint : GET /api/contacts/:idContact

Request Header :

- X-API-TOKEN : token

Response Body {success} :

```json
{
  "data": {
    "id": 1,
    "first_name": "Rachelle",
    "last_name": "Zhu",
    "email": "rachellezhu@rachellezhu.com",
    "phone": "+6286969696969"
  }
}
```

Response Body {failed} :

```json
{
  "errors": "Contact is not found"
}
```

## Update Contact

Endpoint : PUT /api/contacts/:idContact

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "first_name": "Rachelle",
  "last_name": "Zhu",
  "email": "rachellezhu@rachellezhu.com",
  "phone": "+6286969696969"
}
```

Response Body {success} :

```json
{
  "data": {
    "id": 1,
    "first_name": "Rachelle",
    "last_name": "Zhu",
    "email": "rachellezhu@rachellezhu.com",
    "phone": "+6286969696969"
  }
}
```

Response Body {failed} :

```json
{
  "errors": "Make sure to fill out the form"
}
```

## Delete Contact

Endpoint : DELET /api/contacts/:idContact

Request Header :

- X-API-TOKEN : token

Response Body {success} :

```json
{
  "data": "OK"
}
```

Response Body {failed} :

```json
{
  "errors": "Contact is no found"
}
```

## Search Contact

Endpoint : GET /api/contacts

Query Parameter :

- name : string, contact first name or last name, optional
- phone : string, contact phone, optional
- email : string, contact email, optional
- page : number, default 1
- size : number, default 10

Request Header :

- X-API-TOKEN : token

Response Body {success} :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Rachelle",
      "last_name": "Zhu",
      "email": "rachellezhu@rachellezhu.com",
      "phone": "+6286969696969"
    },
    {
      "id": 2,
      "first_name": "Rachelle2",
      "last_name": "Zhu2",
      "email": "rachellezhu@rachellezhu.com",
      "phone": "+6286969696969"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```

Response Body {failed} :

```json
{
  "errors": "Unauthorized"
}
```
