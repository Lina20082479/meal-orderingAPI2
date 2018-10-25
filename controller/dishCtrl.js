const dishesModel = require('../models/dish');

const dishesController = {
  getAll: (req, res, next) => {
    dishesModel.find({}, (err, dishes) => {
      if (err) return res.json(err);
      res.json(dishes);
    });
  },

  getOne: (req, res, next) => {
    dishesModel.findById(req.params.id, (err, dish) => {
        res.json(dish || {});
    });
  },

  create: (req, res, next) => {
    dishesModel.create(req.body, (err, dish) => {
      if (err) return res.json(err);
      res.json(dish)
    })
  },

  update: (req, res, next) => {
    dishesModel.findOneAndUpdate(req.params.id, req.body, {new: true}, (err, dish) => {
        if (err) return res.json(err);
        res.json(dish)
    });
  },

  delete: (req, res, next) => {
    dishesModel.remove({_id: req.params.id}, (err, ok) => {
        if (err) return res.json(err);
    });
    res.json(true)
  },

  search: (req, res, next) => {
    const searchInfo = req.params;
    switch(searchInfo.type) {
      case 'name':
        dishesModel.find({ 'name': {$regex : `.*${searchInfo.keywords}.*`, $options: '-i' } }, (err, dish) => {
          if (err) return res.json(err);
          res.json(dish);
        })
        break;
    }
  }

}


module.exports = dishesController;