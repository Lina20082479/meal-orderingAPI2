const usersModel = require('../models/user');

const usersController = {
  getAll: (req, res, next) => {
    usersModel.find({}, (err, users) => {
      if (err) return res.json(err);
      res.json(users);
    });
  },

  getOne: (req, res, next) => {
    usersModel.findById(req.params.id, (err, user) => {
        res.json(user || {});
    });
  },

  create: (req, res, next) => {
    usersModel.create(req.body, (err, user) => {
      if (err) return res.status(404).json(err);
      res.json(user)
    })
  },

  update: (req, res, next) => {
    usersModel.findOneAndUpdate({ _id:req.params.id}, req.body, {new: true}, (err, user) => {
      if (err) return res.status(404).json(err);
        res.json(user)
    });
  },

  delete: (req, res, next) => {
    usersModel.remove({_id: req.params.id}, (err, ok) => {
        if (err) return res.json(err);
    });
    res.json(true)
  },

  getByEmail: (req, res, next) => {
    usersModel.findOne({email: req.params.email}, (err, user) => {
        res.json(user || {});
    });
  },

  createRootUser: () => {
    usersModel.findOne({email: 'root@meal.ie'}, (err, user) => {
      if (err) return res(err);
      if (!user) {
        let newUser = new usersModel();
        newUser.email = 'root@meal.ie';
        newUser.isAdmin = true;
        usersModel.create(newUser, (err, user) => {
          if (err) throw Error('Failed to create root user due to ', err);
          console.info('Root User Created');
        })
      }
    });
  }
}


module.exports = usersController;