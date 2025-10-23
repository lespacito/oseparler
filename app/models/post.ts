import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { Opaque } from '@adonisjs/core/types/helpers'
import User, { type UserId } from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { PostStatus } from '#enums/post_status'

export type PostId = Opaque<'postId', string>

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: PostId

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare deletedAt: DateTime | null

  @column()
  declare title: string

  @column()
  declare content: string

  @column()
  declare slug: string

  @column()
  declare isAnonymous: boolean

  @column()
  declare displayName: string | null

  @column()
  declare status: PostStatus

  @column()
  declare userId: UserId

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  /**
   * Personnaliser la sérialisation pour cacher userId et user si le post est anonyme
   */
  serialize() {
    const data = super.serialize()

    if (this.isAnonymous) {
      delete data.userId
      delete data.user
    }

    return data
  }

  /**
   * Récupère le nom d'auteur à afficher
   * - Si anonyme : retourne displayName ou "Anonyme"
   * - Sinon : retourne le fullName de l'utilisateur ou son email
   *
   * Note: La relation 'user' doit être préchargée avec .preload('user') dans votre query
   */
  getAuthorName(): string {
    if (this.isAnonymous) {
      return this.displayName || 'Anonyme'
    }

    return this.user?.fullName || this.user?.email || 'Utilisateur'
  }
}
