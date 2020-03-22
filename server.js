import express from 'express';
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js'
import { handleImage, handleApiCall } from './controllers/image.js'

const db = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-polished-97439',
    user : 'postgres',
    password : 'Password',
    database : 'smartbrain'
  }
});

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
	res.send('it is working');
})
app.post('/signin', handleSignin(db, bcrypt))
app.post('/register', (req, res) => {
	handleRegister(req, res, db, bcrypt)
})
app.get('/profile/:id', (req, res) => {
	handleProfileGet(req, res, db)
})
app.put('/image', (req, res) => {
	handleImage(req, res, db)
})
app.post('/imageurl', (req, res) => {
	handleApiCall(req, res)
})

app.listen(process.env.PORT || 4000, () => {
	console.log(`app is running on port ${process.env.PORT}`)
})