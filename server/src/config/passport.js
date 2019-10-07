const LocalStrategy = require('passport-local').Strategy;
let User = require('../../models/user.js');
const bcrypt = require('bcryptjs');

module.exports = function (passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function (email, password, done){
    User.findOne({email: email}, function (err, user){
      if (err) throw err;
      if (!user) {
        return done(null, false, {message: 'Пользователь не найден.'});
      }
      bcrypt.compare(password, user.password, function(err, isMatch){
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Неверный пароль.'});
        }
      });
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });  
}
