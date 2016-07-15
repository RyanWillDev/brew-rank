// Handle login
module.exports = function handleLogIn(req, res) {
  if (req.user) {
    res.json(req.user._id);
  }
};
