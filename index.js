const express = require('express');
const sequelize = require('./database/database');
const cors = require('cors');
const User = require('./database/models/user');
const Category = require('./database/models/category');
const Site = require('./database/models/site');
const Seasonal = require('./database/models/seasonal');
const Adunit = require('./database/models/adunit');
const Discount = require('./database/models/discount');
const Adformat = require('./database/models/adformat');
const Image = require('./database/models/image');

// Routes
const site = require('./routes/sites')
const category = require('./routes/categories')
const seasonal = require('./routes/seasonals')
const user = require('./routes/users')
const discount = require('./routes/discounts')
const adformat = require('./routes/adformats')
const adunit = require('./routes/adunits')
const image = require('./routes/images')

const PORT = 4444;

//** Определение связей сущностей БД */
User.hasMany(Site);
Site.belongsTo(User);

Category.hasMany(Site);
Site.belongsTo(Category);

Site.hasMany(Seasonal, {onDelete: 'CASCADE'});
Seasonal.belongsTo(Site);

Site.hasMany(Discount, {onDelete: 'CASCADE'});
Discount.belongsTo(Site);

Site.hasMany(Image, {onDelete: 'CASCADE'});
Image.belongsTo(Site);

Adformat.hasMany(Adunit);
Adunit.belongsTo(Adformat);

Adformat.belongsToMany(Site, {through: Adunit});
Site.belongsToMany(Adformat, {through: Adunit});

Site.hasMany(Adunit, {onDelete: 'CASCADE'});
Adunit.belongsTo(Site);

Adformat.hasOne(Adunit);
Adunit.belongsTo(Adformat);

const app = express();
app.use(express.static('public'))
app.use(cors({
    origin: '*'
}));

//** Подключение маршрутов API */
app.use('adoffice/sites', site);
app.use('/categories', category);
app.use('/seasonals', seasonal);
app.use('/users', user);
app.use('/discounts', discount);
app.use('/adformats', adformat);
app.use('/adunits', adunit);
app.use('/images', image);

app.use(express.json());

const start = async () =>{
    try{
        await sequelize.sync().then(
            result => {},
            err => console.log(err)
        );
        
        app.listen(PORT, ()=>{
            console.log(`\n\nServer started on http://localhost:${PORT} port...`)
        })
    }catch(err){
        console.log(err);
    }
}
start();