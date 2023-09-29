const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const userModel = require("./model/user.model");
const mongoose = require("mongoose");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, callback) {
      try {
        const existingUser = await userModel.findOne({
          email: profile._json.email,
        });

        if (!existingUser) {
          const userData = profile._json;
          const user = await userModel.create({
            email: userData.email,
            fullname: userData.name,
            photoLink: userData.picture,
            provider: "google",
          });

          callback(null, user);
        } else {
          callback(null, existingUser);
        }
      } catch (e) {
        console.error(e);
        callback(e);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
