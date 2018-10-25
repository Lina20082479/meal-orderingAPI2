let orderCtrl = require('../controller/orderCtrl');

const routes = (route) =>{
    route.route('/orders')
        .post(orderCtrl.create)
        .get(orderCtrl.getAll)

    route.route('/orders/:id')
        .get(orderCtrl.getOne)
        .put(orderCtrl.update)
        .delete(orderCtrl.delete)
}

module.exports = routes;