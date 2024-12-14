const { request } = require('express');
const express = require('express');
const sequelize = require('./database/database');
const cors = require('cors')
const Category = require('./database/models/category')
const Site = require('./database/models/site')
const Seasonal = require('./database/models/seasonal')
const Adunit = require('./database/models/adunit')
const Discount = require('./database/models/discount')

// Routes
const site = require('./routes/sites')
const category = require('./routes/categories')
const seasonal = require('./routes/seasonals')


const PORT = 4444;

Category.hasMany(Site)
Site.belongsTo(Category)

Site.hasMany(Seasonal)
Seasonal.belongsTo(Site)

Site.hasMany(Adunit)
Adunit.belongsTo(Site)

Site.hasMany(Discount)
Discount.belongsTo(Site)

const app = express();
app.use(express.static('public'))
app.use(cors({
    origin: '*'
}));

// Не уверен, что это ни на что не влияет - давало предупреждение deprecated
// app.use(express.urlencoded());


app.use('/sites', site)
app.use('/categories', category)
app.use('/seasonals', seasonal)


app.use(express.json());

const start = async () =>{
    try{
        await sequelize.sync().then(
            result => {/*console.log(result) */},
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