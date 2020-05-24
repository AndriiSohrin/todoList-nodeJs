const express = require('express');
const mongoose = require('mongoose');
const path = require('path')

const expHbs = require('express-handlebars');
const todoRoutes = require('./Routes/todos');

const PORT = process.env.PORT || 3005;

const app = express();
const hbs = expHbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(todoRoutes);

async function start() {
    try {
        await mongoose.connect('mongodb+srv://sav9996:27746613@cluster0-ophdx.mongodb.net/todos', {
            useNewUrlParser: true,
            useFindAndModify: false
        });
        app.listen(PORT, () => {
            console.log('Server has been started')
        });
    } catch (e) {
        console.log(e)
    }
}

start();




