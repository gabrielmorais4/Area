import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Cache extends BaseModel {
  @column({ isPrimary: true })
  public uuid: string

  @column()
  public lastCommit: string

  @column()
  public twitchInLive: string | null

  @column()
  public twitchFollowers: number | null

  @column()
  public spotifyLikedSongs: number | null

  @column()
  public spotifyListening: boolean | null

  @column()
  public spotifySongUri: string | null

  @column()
  public timerActive: boolean | null

  @column()
  public githubLatestActionId: string | null

  @column()
  public cryptoReachValue: boolean | null

  @column()
  public latestLikedVideoId: string | null

  @column()
  public latestNumberOfLikes: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
