const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const change = async (req, res) => {
        const user = await app.db('users')
            .where({ id: req.params.id} )
            .first()

        try {
            existsOrError(req.body.oldPassword, 'Current Password is Missing')
            existsOrError(req.body.newPassword, 'New Password is Missing')
            existsOrError(req.body.confirmNewPassword, 'Password Confirmation is Missing')
            equalsOrError(req.body.newPassword, req.body.confirmNewPassword, 'Passwords are Different')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        const isMatch = bcrypt.compareSync(req.body.oldPassword, user.password)
        if(!isMatch) return res.status(401).send('Incorrect Current Password')


        user.password = encryptPassword(req.body.newPassword)
        delete user.oldPassword
        delete user.newPassword
        delete user.confirmNewPassword

        app.db('users')
            .update(user)
            .where({ id: user.id })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    return { change }
}