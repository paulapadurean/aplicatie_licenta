const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const i18n = require("i18n");
const path = require("path");
const cookieParser = require("cookie-parser");
const {request} = require("express");



i18n.configure({
    locales: ["ro", "en"],
    directory: path.join(__dirname, "locales"),
    defaultLocale: "ro",
    cookie: "lang",
    getQueryParameter: "lang",

});

app.use(cookieParser());
app.use(i18n.init);
app.use(express.static("public"));
app.use(cors());
app.use(express.json());


app.set("view engine", "ejs");

app.use((req,res,next) =>{
    let lang = req.query.lang || req.cookies.lang || "ro";
    res.cookie("lang", lang, {maxAge: 900000, httpOnly: true});
    i18n.setLocale(req, lang);
    next();
});



app.get("/", (req, res) =>{
    res.render("index", {
        __: res.__,
        locale: req.locale
    });
});

app.get('/prezentare', (req, res) => {
    res.render('/');
});

app.get('/rapoarte', (req, res) => {
    res.render('rapoarte');
});

app.get('/comparatii', (req, res) => {
    res.render('comparatii');
});

app.get('/scoruri-esg', (req, res) => {
    res.render('scoruri-esg');
});

app.get('/contribuitori', (req, res) => {
    res.render('contribuitori');
});

app.get('/subscribe', (req, res) => {
    res.render('subscribe');
});

app.get("/termeni", (req, res) => {
    res.render("termeni", {__: res.__});
});

app.get("/politica", (req, res) => {
    res.render("politica", {__: res.__});
});

app.get('/contribuitor_nou', (req, res) => {
    res.render('contribuitor_nou');
});

app.get('/infobot', (req, res) => {
    res.render('infobot');
});



app.listen(3000, () =>{
    console.log("Serverul ruleaza pe http://localhost:3000");
});