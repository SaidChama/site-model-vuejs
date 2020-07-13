module.exports = app => {

    const getDeleted = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'type', 'deleted')
            .whereNotNull('deleted')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getDeletedUserById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'type')            
            .where({ id: req.params.id })
            .whereNotNull('deleted')
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const recover = (req, res) => {
        const user = { ...req.body }
        delete user.name
        delete user.email
        delete user.password
        delete user.confirmPassword
        delete user.type

        app.db('users')
            .update(user)
            .where({ id: req.params.id })
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))

    }

    return { getDeleted, getDeletedUserById, recover }
}