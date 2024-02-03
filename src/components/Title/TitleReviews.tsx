import React, { useState } from 'react'
import { ReviewsData } from '../../types/ReviewsData'
import { useFetchTMDB } from '../../hooks/useFetchTMDB'

type ReviewProps = {
  review: string
}

const Review: React.FC<ReviewProps> = ({ review }) => {
  const [readMore, setReadMore] = useState<boolean>(false)
  const words: string[] = review.split(' ')
  const shortReview: string = words.slice(0, 20).join(' ') + '...'

  const handleReview = (content: string): JSX.Element[] => {
    const filterReview = content

    return filterReview.split(/\r\n|\n/).map((line, key) => (
      <React.Fragment key={key}>
        {line}
        <br />
      </React.Fragment>
    ))
  }

  return (
    <>
      <p className='mb-2 text-white/70'>{readMore ? handleReview(review) : shortReview}</p>
      {words.length > 20 && (
        <span
          className='font-semibold cursor-pointer text-zinc-700 hover:text-zinc-500 transition-all'
          onClick={() => setReadMore(!readMore)}
        >
          {readMore ? 'Show Less' : 'Show More'}
        </span>
      )}
    </>
  )
}

type Reviews = {
  locale: string
  type: string
  id: string | number
}

export const TitleReviews: React.FC<Reviews> = ({ locale, type, id }) => {
  const url = `https://api.themoviedb.org/3/${type}/${id}/reviews?language=${locale}&page=1`
  const { data, loading, error } = useFetchTMDB<ReviewsData>(url)

  if (error || !data) return null

  const results = data.results

  return (
    <section className='flex justify-center p-8'>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className='max-w-5xl w-full'>
          {results.map((element, key) => (
            <div key={key} className='flex  mb-8 overflow-x-auto'>
              <div className='pr-4'>
                <h1 className='w-10 h-10 rounded-[50%] capitalize flex items-center justify-center bg-zinc-700 text-white'>
                  {element.author[0]}
                </h1>
              </div>
              <div>
                <h1 className='text-zinc-700'>@{element.author_details.username}</h1>
                <Review review={element.content} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
