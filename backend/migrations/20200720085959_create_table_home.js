
exports.up = function(knex, Promise) {
    return knex.schema.createTable('home', table => {
        table.increments('id').primary()
        table.string('title').notNull()
        table.string('description').notNull()
        table.binary('thumbnail')
        table.string('externalUrl')
        table.binary('content')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('home')
};
