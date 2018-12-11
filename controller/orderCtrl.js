const ordersModel = require('../models/order');

const ordersController = {
  getAll: (req, res, next) => {
    ordersModel.find({}).populate('dishes.dish').populate('customer').exec((err, orders) => {
      if (err) return res.json(err);


      const orderWithTotalPrice = orders.map(order => {
        let totalPrice = 0;

        order.dishes.forEach(dish => {
          totalPrice += dish.dish.price * dish.quantity;
        });
        const dishInfo = {
          dishDetails: order,
          totalPrice: totalPrice
        }
        return dishInfo;
      });

      res.json(orderWithTotalPrice);
    });
  },

  getByUserId: (req, res, next) => {
    ordersModel.find({customer: req.params.userId}).populate('dishes.dish').populate('customer').exec((err, orders) => {
      if (err) return res.json(err);


      const orderWithTotalPrice = orders.map(order => {
        let totalPrice = 0;

        order.dishes.forEach(dish => {
          totalPrice += dish.dish.price * dish.quantity;
        });
        const dishInfo = {
          dishDetails: order,
          totalPrice: totalPrice
        }
        return dishInfo;
      });

      res.json(orderWithTotalPrice);
    });
  },

  getOne: (req, res, next) => {
    ordersModel.findById(req.params.id).populate('dishes.dish').exec((err, order) => {
      let totalPrice = 0;

      order.dishes.forEach(dish => {
        totalPrice += dish.dish.price * dish.quantity;
      });

      const dishInfo = {
        dishDetails: order,
        totalPrice: totalPrice
      }
      res.json(dishInfo || {});
    });
  },

  create: (req, res, next) => {
    ordersModel.create(req.body, (err, order) => {
      if (err) return res.status(404).json(err);
      res.json(order)
    })
  },

  update: (req, res, next) => {
    ordersModel.findOneAndUpdate(req.params.id, req.body, {new: true}, (err, order) => {
        if (err) return res.json(err);
        res.json(order)
    });
  },

  delete: (req, res, next) => {
    ordersModel.remove({_id: req.params.id}, (err, ok) => {
        if (err) return res.json(err);
    });
    res.json(true)
  }

}


module.exports = ordersController;