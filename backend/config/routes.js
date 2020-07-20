const admin = require('./admin')
const superAdmin = require('./superAdmin')

module.exports = app => {
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)
    app.post('/signup', app.api.user.save)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(superAdmin(app.api.user.save))
        .get(admin(app.api.user.get))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getUserById))
        .delete(superAdmin(app.api.user.remove))

    app.route('/deletedUsers')
        .all(app.config.passport.authenticate())
        .get(superAdmin(app.api.deletedUsers.getDeleted))

    app.route('/deletedUsers/:id')
        .all(app.config.passport.authenticate())
        .get(superAdmin(app.api.deletedUsers.getDeletedUserById))
        .put(superAdmin(app.api.deletedUsers.recover))

    app.route('/changePassword/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.changePassword.change)

    app.route('/homeContent')
        // .all(app.config.passport.authenticate())
        .get(app.api.homeContent.get)
        .post(app.api.homeContent.save)

    app.route('/homeContent/:id')
        // .all(app.config.passport.authenticate())
        .get(app.api.homeContent.getById)
        .put(app.api.homeContent.save)
        .delete(app.api.homeContent.remove)
}