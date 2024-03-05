# Address API Spec

## Create Address

Endpoint : POST /api/contacts/:idContact/adresses

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "street": "Jalan Apa",
  "city": "Kota Apa",
  "province": "Provinsi Apa",
  "country": "Negara Apa",
  "postal_code": "123123"
}
```

Response Body {success} :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan Apa",
    "city": "Kota Apa",
    "province": "Provinsi Apa",
    "country": "Negara Apa",
    "postal_code": "123123"
  }
}
```

Response Body {failed} :

```json
{
  "errors": "...is required"
}
```

## Get Address

Endpoint : POST /api/contacts/:idContact/adresses/:idAddress

Request Header :

- X-API-TOKEN : token

Response Body {success} :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan Apa",
    "city": "Kota Apa",
    "province": "Provinsi Apa",
    "country": "Negara Apa",
    "postal_code": "123123"
  }
}
```

Response Body {failed} :

```json
{
  "errors": "Address is not found"
}
```

## Update Address

Endpoint : PUT /api/contacts/:idContact/adresses/:idAddress

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "street": "Jalan Apa",
  "city": "Kota Apa",
  "province": "Provinsi Apa",
  "country": "Negara Apa",
  "postal_code": "123123"
}
```

Response Body {success} :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan Apa",
    "city": "Kota Apa",
    "province": "Provinsi Apa",
    "country": "Negara Apa",
    "postal_code": "123123"
  }
}
```

Response Body {failed} :

```json
{
  "errors": "...is required"
}
```

## Delete Address

Endpoint : DELETE /api/contacts/:idContact/adresses/:idAddress

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
  "errors": "Address is not found"
}
```

## List Address

Endpoint : POST /api/contacts/:idContact/adresses

Request Header :

- X-API-TOKEN : token

Response Body {success} :

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jalan Apa",
      "city": "Kota Apa",
      "province": "Provinsi Apa",
      "country": "Negara Apa",
      "postal_code": "123123"
    },
    {
      "id": 2,
      "street": "Jalan Apa",
      "city": "Kota Apa",
      "province": "Provinsi Apa",
      "country": "Negara Apa",
      "postal_code": "123123"
    }
  ]
}
```

Response Body {failed} :

```json
{
  "errors": "Contact is not found"
}
```
