import z from "zod";

export const GameSchema = z.object(
  {
    id: z.number(),
    slug: z.string(),
    name: z.string(),
    name_original: z.string(),
    description: z.string(),
    metacritic: z.number(),
    metacritic_platforms: [
      {
        metascore: z.number(),
        url: z.string(),
      }
    ],
    released: z.string(),
    tba: z.boolean(),
    updated: z.string(),
    background_image: z.string(),
    background_image_additional: z.string(),
    website: z.string(),
    rating: z.number(),
    rating_top: z.number(),
    ratings: z.object( {} ),
    reactions: z.object( {} ),
    added: z.number(),
    added_by_status: z.object( {} ),
    playtime: z.number(),
    screenshots_count: z.number(),
    movies_count: z.number(),
    creators_count: z.number(),
    achievements_count: z.number(),
    parent_achievements_count: z.string(),
    reddit_url: z.string(),
    reddit_name: z.string(),
    reddit_description: z.string(),
    reddit_logo: z.string(),
    reddit_count: z.number(),
    twitch_count: z.string(),
    youtube_count: z.string(),
    reviews_text_count: z.string(),
    ratings_count: z.number(),
    suggestions_count: z.number(),
    alternative_names: z.array( z.string() ),
    metacritic_url: z.string(),
    parents_count: z.number(),
    additions_count: z.number(),
    game_series_count: z.number(),
    esrb_rating: z.object( {
      id: z.number(),
      slug: z.string(),
      name: z.string(),
    } ),
    platforms: z.array(
      z.object( {
        platform: z.object( {
          id: z.number(),
          slug: z.string(),
          name: z.string(),
        } ),
        released_at: z.string(),
        requirements: z.object( {
          minimum: z.string(),
          recommended: z.string(),
        } )
      } )
    )
  }
)
export type Game = z.infer<typeof GameSchema>
export const GameListSchema = z.array( GameSchema )
export type GameList = z.infer<typeof GameListSchema>

export const ResponseGameListSchema = z.object( {
  count: z.number(),
  next: z.string(),
  previous: z.string(),
  results: z.array( GameSchema )
} )
export type ResponseGameList = z.infer<typeof ResponseGameListSchema>