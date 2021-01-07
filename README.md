git clone https://github.com/Alan-Fisher/moood.git

# setup nginx for client and server
// ya know what to do

# setup frontend
cd client 
cp .env.example .env // set base_url
yarn install
yarn build

# setup backend
cd server
cp .env.example .env // set db username, db pass, secret_key
yarn install
yarn pretypeorm
// create moood db
yarn migration:run
yarn start:dev // yes, still in dev mode, didn't figure out on prod problem yet

# register
POST /auth/register 
{
    "username": "",
    "password": "",
    "email": ""
}

# add standard tags and tag categories
// if you will be using account with id: 1 — skip this, else: check if user id in server/src/scripts/seed.ts is equal to your id
yarn seed

