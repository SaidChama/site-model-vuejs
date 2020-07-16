module.exports = app => {

    const limit = 10
    const getDeleted = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('users').whereNotNull('deleted').count('id').first()
        const count = parseInt(result.count)


        app.db('users')
            .select('id', 'name', 'email', 'type', 'deleted')
            .whereNotNull('deleted')
            .limit(limit).offset(page * limit - limit)
            .then(users => res.json({ data: users, count, limit}))
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