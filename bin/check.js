const colors = require('colors')
const fs = require('fs')
const mongoose = require('mongoose');
const process  = require('process')
const redis = require('redis')

colors.enable()

require('dotenv').config()


async function run() {
    console.log('Hello and welcome to MetaPay'.green)

    // check if .env exists
    try {
        fs.statSync('.env')
        console.log('.env found[', '✔'.green, ']')
    } catch (e) {
        console.log('.env found[', '❌'.red, ']')
        console.log('.env not found, cp .env.example .env'  )
        process.exit(0)
    }

    // test database connexion
    const database = process.env.DB_DATABASE
    const port = process.env.DB_PORT
    const user = process.env.DB_USER
    const password = process.env.DB_PASSWORD

    try {
        const database = process.env.DB_DATABASE
        const port = process.env.DB_PORT
        const user = process.env.DB_USER
        const password = process.env.DB_PASSWORD

        await mongoose.connect(`mongodb://localhost:${port}/${database}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })

        console.log('mongodb connected[', '✔'.green, ']')
        await mongoose.disconnect()
    } catch (e) {
        console.log('mongodb not connected', '❌'.red, ']')
        process.exit(0)
    }

    // test redis connexion
    const client = redis.createClient()
    client.on('connect', () => console.log('redis connected[', '✔'.green, ']'))
    client.on('error', () =>  console.log('redis not connected', '❌'.red, ']'))
    client.quit()
}

run()
