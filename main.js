//Load libraries
const express = require('express')
const fortuneCookie = require('fortune-cookie')
const morgan = require('morgan')
const cors = require('cors')

//Configure Port
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

//Function to get cookies
function getCookies(count=1) {
    if(count == 1) {
        return {'cookie': fortuneCookie[Math.floor(Math.random() * fortuneCookie.length)]}
    }
    else {
        let cookieCollection = []
        let randNumArray = []
        while(cookieCollection.length < count) {
            let num = Math.floor(Math.random() * fortuneCookie.length)
            if(!randNumArray.includes(num)) {
                randNumArray.push(num)
                cookieCollection.push({'cookie': fortuneCookie[num]})
            }
        }
        return cookieCollection
    }
}

//Create an instance of express
const app = express()

//Middlewares
app.use(morgan('combined'))

//app.use(cors())

app.use(express.static(__dirname + '/frontend'))

app.get('/', (req, resp) => {
    resp.status(200)
    resp.type('text/html')
    resp.send('Homepage')
})

app.get('/api/cookie', cors(), (req, resp) => {
    let count = req.query['count']
    let cookie = []
    if(count == undefined) {
        cookie = getCookies()
    }
    else {
        count = parseInt(count)
        cookie = getCookies(count)
    }
    
    resp.status(200)
    resp.type('application/json')
    resp.json(cookie)
})

//Start the app
app.listen(PORT, () => {
    console.info(`App has started on port ${PORT} at ${new Date()}`)
})