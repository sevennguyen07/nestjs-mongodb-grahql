## Description

A backend application made by Nest.js, MongoDB, GraphQL, Docker.

## Running the app

```bash
$ docker-compose up

```

## Test GraphQL
  http://localhost:3000/graphql

Get all users:
```ts
{
  users {
    _id
    full_name
    phone
    email
    age
    gender
    total_amount
  }
}
```

Get user by id:
```ts
{
  user(_id: "62b41aac77ec9e999d5eb0d7") {
    _id
    full_name
    phone
    email
    age
    gender
    total_amount
  }
}
```

Create new user:
```ts
mutation {
 	createUser(
    input: {
        full_name: "nguyen ngoc bao anh",
        phone: "09369876789",
        email: "phuocnv@foobla.com",
        gender: "male"
  	})
    {
      _id
      full_name
      phone
      email
      age
      gender
    }
}
```

Update user:
```ts
mutation {
 	 	updateUser(
      _id: "62b41aac77ec9e999d5eb0d7",
      input: {
    		full_name: "nguyen ngoc bao anh"
        phone: "0936044187"
        gender: "olala"
        age: 10
  		}
    ){
      _id
      full_name
      phone
      email
      age
      gender
  }
}
```

Get all orders:
```ts
{
  orders {
    _id
    code
    amount
    interest_rate
    accrued_amount
    user{
      _id
      full_name
    }
  }
}
```

Get order by id:
```ts
{
  order(_id: "62b4a765010584c6eb3b5126") 
  {
    _id
    code
    amount
    interest_rate
    user {
      _id
      full_name
      phone,
      email,
      gender
    }
  }
}
```

Get order by user:
```ts
{
  orderByUser(user: "62b41aac77ec9e999d5eb0d7") 
  {
    _id
    code
    amount
    interest_rate
    user {
      _id
      full_name
      email
      phone
    }
  }
}
```

Create new order:
```ts
mutation {
  createOrder(
    input: {
   	 	amount: 500000
    	interest_rate: 0.05
    	user: "62b41aac77ec9e999d5eb0d7"
    }) {
     _id
    amount
    interest_rate
    user {
      _id
      full_name
      phone,
      email,
      gender
    } 
  }
}
```