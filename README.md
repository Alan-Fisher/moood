git clone https://github.com/Alan-Fisher/moood.git

# setup nginx for client and server
```
// ya know what to do
```

# setup frontend
```
cd client 
cp .env.example .env // set base_url
yarn install
yarn build
```

# setup backend
```
cd server
cp .env.example .env // set db username, db pass, secret_key
yarn install
yarn pretypeorm
// create moood db
yarn migration:run
yarn start:dev // yes, still in dev mode, didn't figure out on prod problem yet
```

# register
```
POST /auth/register

{
    "username": "",
    "password": "",
    "email": ""
}
```

### add example tags and tag categories (recommended)
```
// if you just registred and will be using account with id: 1 — skip this go to the next line, else: check if user id in server/src/scripts/seed.ts is equal to your id
cd server
yarn seed
```

