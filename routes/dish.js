let dishCtrl = require('../controller/dishCtrl');

const routes = (route) =>{
    route.route('/dishes')
        .post(dishCtrl.create)
        .get(dishCtrl.getAll)

    route.route('/dishes/:id')
        .get(dishCtrl.getOne)
        .put(dishCtrl.update)
        .delete(dishCtrl.delete)

    route.route('/dish-search/:type/:keywords')
        .get(dishCtrl.search)
}

module.exports = routes;