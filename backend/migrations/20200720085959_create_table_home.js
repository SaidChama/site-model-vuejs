
exports.up = function(knex, Promise) {
    return knex.schema.createTable('home', table => {
        table.increments('id').primary()
        table.string('title').notNull()
        table.string('description').notNull()
        table.string('imageUrl')
        table.string('externalUrl')
        table.string('content')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.droptable('home')
};
