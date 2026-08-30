export interface Meme {
  title: string
  url: string
  subreddit: string
  author: string
  nsfw: boolean
  spoiler: boolean
  postLink: string
  ups: number
}

const MEME_API_URL = 'https://meme-api.com/gimme'

export async function getRandomMeme(subreddit: string): Promise<Meme> {
  const response = await fetch(
    `${MEME_API_URL}/${encodeURIComponent(subreddit)}`
  )

  if (!response.ok) {
    throw new Error(
      `Meme API returned ${response.status}: ${response.statusText}`
    )
  }

  const meme = (await response.json()) as Meme

  if (meme.nsfw) {
    throw new Error('Meme API returned an NSFW meme')
  }

  return meme
}
