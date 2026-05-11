const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/userMod");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.ClientID,
            clientSecret: process.env.ClientSecret,
            callbackURL: "/auth/google/callback",
        },
        async (accesstoken, refreshToken, profile, done) => {
            const email = profile.emails[0].value

            let user = await User.findOne({ email });
            if (!user) {
                user = await User.create({ email });
            }

            return done(null, user);
        }
    )
)

passport.serializeUser(async (user, done) => {
    done(null,user.id)
})


passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
})
