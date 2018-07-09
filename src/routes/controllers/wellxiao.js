module.exports = {
  count: {
    name: "/count",
    method: "get",
    async handler(req, res, next) {
      try {
        res.json({ wellxiao: "xiaowei" });
      } catch (err) {
        next(err);
      }
    }
  }
};
