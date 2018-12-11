let userCtrl = require('../controller/userCtrl');
let authCtrl = require('../controller/authCtrl');

const routes = (route) =>{
  route.route('/login')
    .post(authCtrl.login);
  route.route('/register')
    .post(authCtrl.register);

  route.route('/users')
    .post(userCtrl.create)
    .get(userCtrl.getAll)

  route.route('/users/:id')
    .get(userCtrl.getOne)
    .put(userCtrl.update)
    .delete(userCtrl.delete)

  route.route('/user-search/:email')
    .get(userCtrl.getByEmail)
}

userCtrl.createRootUser();
module.exports = routes;
