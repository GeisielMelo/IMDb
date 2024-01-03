type Author = {
  username:string
}

type Reviews = {
  author_details: Author
  author: string
  content: string
}

export type ReviewsData = {
  id: number
  results: Reviews[]
}