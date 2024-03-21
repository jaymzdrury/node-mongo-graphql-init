## Mongo, Express, Node, GraphQL

<img src="https://plus.unsplash.com/premium_photo-1658506952924-d3ebaeca8139?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80" alt="GraphQL" width="350" />

### Setup

`npm i` for node_modules

`npx tsc --init` to manually install `tsconfig.json`

`.env` file:

```JavaScript
URI= "Mongo Uri..."
ORIGIN= "http://localhost:4000/graphql"
KEY= "JWT Key..."
```

---

_ApolloServerPluginLandingPageGraphQLPlayground_

`settings` change "request.credentials" to "include"

---

### Data Routes

#### GET:

```JavaScript
query get {
  get {
    name
    _id
  }
}
```

---

#### GETONE:

```JavaScript
query getOne($id:DataID!) {
  getOne(id:$id) {
    name
    _id
  }
}
```

#### INPUT:

```JavaScript
{
	"id":{
        "_id": "Mongo ID"
    }
}
```

---

#### POST:

```JavaScript
mutation post($input:DataInput!){
  post(input:$input){
    name
  }
}
```

#### INPUT:

```JavaScript
{
	"input": {
        "name": "New name"
    }
}
```

---

#### PUT:

```JavaScript
mutation put($id:DataID!,$update:DataInput!){
  put(id:$id,update:$update){
    name
  }
}
```

#### INPUT:

```JavaScript
{
    "id": {
        "_id": "Mongo ID"
    },
    "update": {
        "name": "Edited name"
    }
}
```

---

#### DELETE:

```JavaScript
mutation remove($id:DataID!){
  remove(id:$id)
}
```

#### INPUT:

```JavaScript
{
    "id": {
        "_id": "Mongo ID"
    }
}
```

---

### Auth Routes

#### SIGNUP:

```JavaScript
mutation signUp($input:SignUpInput!){
	signUp(input: $input){
        name
        email
    }
}
```

#### INPUT:

```JavaScript
{
	"input": {
        "name": "",
        "email": "",
        "password": ""
    }
}
```

---

#### LOGIN:

```JavaScript
mutation login($input: LoginInput!){
  login(input: $input)
}
```

#### INPUT:

```JavaScript
{
	"input": {
        "email": "",
        "password": ""
    }
}
```

---

#### LOGOUT:

```JavaScript
mutation logout {
  logout
}
```
