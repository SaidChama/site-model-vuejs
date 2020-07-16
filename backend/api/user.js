const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError, updatePasswordError, accountTypeOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }
        if(req.params.id) user.id = req.params.id

        try {
            existsOrError(user.name, 'Name is Missing')
            existsOrError(user.email, 'E-mail is Missing')
            updatePasswordError(req.params.id, user.password, 'Password is Missing')
            updatePasswordError(req.params.id, user.confirmPassword, 'Invalid Password Confirmation')
            existsOrError(user.type, 'Account Type is Missing')
            equalsOrError(user.password, user.confirmPassword, 'Passwords are Different')

            const userFromDB = await app.db('users')
                .where({ email: user.email }).first()
            if(!user.id) {
                notExistsOrError(userFromDB, 'User Already Exists')
            }

            // accountTypeOrError(userFromDB.type, user.type, 'superAdmin', "Can't change superAdmin's password")
        } catch(msg) {
            return res.status(400).send(msg)
        }
        
        if(!user.password) delete user.password
        else user.password = encryptPassword(user.password)

        delete user.confirmPassword


        if(user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .whereNull('deleted')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const limit = 10
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('users').whereNull('deleted').count('id').first()
        const count = parseInt(result.count)


        app.db('users')
            .select('id', 'name', 'email', 'type')
            .whereNull('deleted')
            .limit(limit).offset(page * limit - limit)
            .then(users => res.json({ data: users, count, limit}))
            .catch(err => res.status(500).send(err))
    }

    const getUserById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'type')            
            .where({ id: req.params.id })
            .whereNull('deleted')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsUpdated = await app.db('users')
                .update({ deleted: true })
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'User not Found')

            res.status(204).send()
        } catch {
            res.status(400).send(msg)
        }
    }

    

    return { save, get, getUserById, remove }
}