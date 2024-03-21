## Mongo, Express, and Node GraphQL

<img src="https://plus.unsplash.com/premium_photo-1661910502731-b5e0a0c306bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA1fHxhdG9tfGVufDB8fDB8fHww" alt="GraphQL" width="350" />

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
