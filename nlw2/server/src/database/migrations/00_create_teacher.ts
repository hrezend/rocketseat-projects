import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('teachers', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('biografia').notNullable();
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('teachers');
}