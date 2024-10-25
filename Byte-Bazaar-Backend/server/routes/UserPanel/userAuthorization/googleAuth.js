const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("../../../models/UserPanel/googleUser");
require("dotenv").config();

// Google OAuth2 credentials
const clientid = process.env.CLIENTID;
const clientsecret = process.env.CLIENTSECRET;

// Configure Google OAuth2 Strategy for passport
passport.use(
  new OAuth2Strategy(
    {
      clientID: clientid,
      clientSecret: clientsecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);

      try {
        let user = await userdb.findOne({ googleId: profile.id });

        if (!user) {
          // Create a new user if not found in the database
          user = new userdb({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });

          await user.save(); // Save the new user to the database
        }

        // const token = user.generateAuthToken();
        // console.log(`Generated Token: ${token}`);

        return done(null, user); // Return the user information
      } catch (error) {
        return done(error, null); // Return error if encountered
      }
    }
  )
);

// Serialize and Deserialize user info for session management
passport.serializeUser((user, done) => {
  done(null, user); //stores user's ID in the session
});

passport.deserializeUser((user, done) => {
  done(null, user); //retrieves the user object from the db using the stored user ID
});

module.exports = {
  initializePassport: () => {
    // Initialize passport and session
    passport.initialize();
    passport.session();
  },

  authenticateGoogle: () => {
    // Authenticate using Google OAuth2
    return passport.authenticate("google", { scope: ["profile", "email"] });
  },

  handleGoogleCallback: () => {
    return async (req, res, next) => {
      passport.authenticate("google", async (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.redirect("http://localhost:5173/bytebazaar/login"); // Redirect on authentication failure
        }

        try {
          const token = user.generateAuthToken();
          res.cookie("authToken", token, {
            secure: false,
            // sameSite: "Strict",
          });

          // return res.status(200).send({ token: token });
          return res.redirect("http://localhost:5173/bytebazaar/"); // Redirect to frontend on successful login
        } catch (error) {
          return next(error);
        }
      })(req, res, next);
    };
  },
};
