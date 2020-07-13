module.exports = app => {
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .post(app.api.user.save)
        .get(app.api.user.get)    

    app.route('/users/:id')
        .put(app.api.user.save)        
        .get(app.api.user.getUserById)
        .delete(app.api.user.remove)

    app.route('/deletedUsers')
        .get(app.api.deletedUsers.getDeleted)

    app.route('/deletedUsers/:id')
        .get(app.api.deletedUsers.getDeletedUserById)
        .put(app.api.deletedUsers.recover)

    app.route('/changePassword/:id')
        .put(app.api.changePassword.change) 
}