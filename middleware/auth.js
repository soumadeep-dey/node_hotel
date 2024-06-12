const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("../models/Person");

passport.use(
  new LocalStrategy(async (usr, pwd, done) => {
    try {
      const user = await Person.findOne({ username: usr });

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const isPwdMatch = await user.comparePassword(pwd);

      if (!isPwdMatch) {
        return done(null, false, { message: "Incoorect password" });
      }

      return done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

module.exports = passport;
