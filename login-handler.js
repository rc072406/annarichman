// GitHub OAuth login handler
const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
    clientID: 'Ov23liaZJn9avvkhTz14',
    clientSecret: 'YOUR_GITHUB_CLIENT_SECRET',
    callbackURL: '/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

const app = express();

app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
});

// Export the app
module.exports = app;
