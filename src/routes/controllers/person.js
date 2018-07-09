const {User} = require('../../models');
module.exports = {
    getById: {
      name: "/:uid",
      method: "get",
      async handler(req, res, next) {
        try {
            const result =await User.findById(parseInt(req.params.uid));
            res.json(result);
        } catch (err) {
          next(err);
        }
      }
    }
  };
  