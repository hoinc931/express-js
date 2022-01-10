const categories = require('./category_route');
const products = require('./product_route');


const routes = (app) => {
    app.use('/categories', categories);
    app.use('/products', products);

    app.use('/', (req, res) => res.json({
        message: "Not Found",
        data: null,
        status: false,
    }))
}


module.exports = routes;