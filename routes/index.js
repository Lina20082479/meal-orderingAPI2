let userRoute = require('./users');
let orderRoute = require('./order');
let dishRoute = require('./dish');

let routes = (route) => {
  route.get('/', function(req, res, next) {
    res.render('index', { title: 'Online Meal Ordering' });
  });


  userRoute(route);

  orderRoute(route);

  dishRoute(route);
}


module.exports = routes;
