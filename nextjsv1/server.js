import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const buildPath = path.join(path.resolve(__dirname, './dist'))

app.use('/', express.static(buildPath, { index: false }))

app.use('/robots.txt', function (req, res, next) {
    res.type('text/plain')
    res.send("User-agent: *\nAllow: /");
});

app.get('/isalive', (req, res) => {
    res.send('OK')
})

app.get('/isready', (req, res) => {
    res.send('OK')
})

app.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) => res.sendFile(`${buildPath}/index.html`))

app.listen(8080, () => { console.log('Listening on port 8080') })