import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).nullable()
      table.timestamp('deleted_at', { useTz: false }).nullable()
      table.string('title').notNullable()
      table.text('content').notNullable()
      table.string('slug').notNullable().unique()
      table.boolean('is_anonymous').defaultTo(false)
      table.string('display_name').nullable()
      table.smallint('status').notNullable()

      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')

      // Index pour les performances
      table.index('user_id')
      table.index('status')
      table.index('deleted_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
