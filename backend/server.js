const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const myDb = require("./config/db");


require("./passport"); 

const app = express();
myDb();

app.use(session({
    secret: process.env.SECRET || "secret-key",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
    }),
    (req, res) => {
        res.send("login success");
    }
);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});


// J3HDXEX9SAE198X8ZB172YYR