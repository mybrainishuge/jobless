// user:
//  id: integer
//  firstName: string
//  lastName: string
//  email:  string
const db = require('./../db');

module.exports = {
  get: (id, cb) => {
    if (id) {
      db.User.findOne({ where: { id } })
        .then(user => cb(null, user))
        .catch(cb);
    } else {
      db.User.findAll()
        .then(users => cb(null, users))
        .catch(cb);
    }
  },
  post: (newUser, cb) => {
    db.User.create(newUser)
      .then(() => cb())
      .catch(cb);
  },
  put: (userChanges, cb) => {
    db.User.findOne({ where: { id: userChanges.id } })
      .then(user => user.update(userChanges))
      .then(() => cb())
      .catch(cb);
  },
};
