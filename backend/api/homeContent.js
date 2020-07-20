module.exports = app => {
    const { existsOrError } = app.api.validation
    
    const save = async (req, res) => {
        const homeContent = { ...req.body }
        if(req.params.id) homeContent.id = req.params.id

        try {
            existsOrError(homeContent.title, 'Title is Missing')
            existsOrError(homeContent.description, 'Description is Missing')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(homeContent.id) {
            app.db('home')
                .update(homeContent)
                .where ({ id: homeContent.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('home')
                .insert(homeContent)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('home')
            .select('id', 'title', 'description', 'thumbnail', 'externalUrl', 'content')
            .then(homeContent => res.json(homeContent))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('home')
            .where({ id: req.params.id })
            .first()
            .then(homeContent => {
                homeContent.content = homeContent.content.toString()
                return res.json(homeContent)})
            .catch(err => res.status(500).send(err))
    }

    const remove = (req, res) => {
        app.db('home')
            .where({ id: req.params.id })
            .del()
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getById, remove }
}