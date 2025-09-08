import express from 'express';
import 'dotenv/config';
import { setLocale } from 'yup';
import { fr } from 'yup-locales';
import users from "./routes/user.route.js"
import auth from 'basic-auth'


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept')
    next(); 
})

const basicAuth = (req, res, next) => {

    const userBase64 = req.headers["authorization"]
    const unknowUser = auth(req)

    console.log(userBase64);
    console.log(unknowUser);
    
    
    next()

}

app.use(basicAuth)


app.use(express.json())

app.use(express.static('public'))

setLocale(fr)

app.use("/users", users)


app.set('view engine', 'ejs')
app.set('views', import.meta.dirname + '/templates')
app.set('view options', { delimiter: '?' })


app.all('/*splat', (req, res) => {
    res
        .status(404)
        .end("Page introuvable")
})

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
    console.log(`Adresse serveur : http://localhost:${PORT}`);

})