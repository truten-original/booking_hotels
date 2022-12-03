const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const initDataBase = require('./startUp/initDataBase')
const routes = require('./routes')
const app = express()
// if(process.env.NODE_ENV === 'production'){
//     console.log("production")
// } else {
//     console.log('development')
// }

app.use(express.json(), express.urlencoded({extended: false}))
app.use('/api', routes)
const PORT = config.get('port') ?? 8080
async function start () {
    try {
        mongoose.connection.once('open', () => {
            initDataBase()
        })
       await mongoose.connect(config.get('mongoUri'))
        app.listen(PORT, () => {
            console.log(chalk.green(`mongo db conected`))
            console.log(chalk.green(`server started on port ${PORT}...`))
        })
    }
    catch (error) {
        console.log(chalk.red(error.message))
        process.exit(1)
    }
}
start()