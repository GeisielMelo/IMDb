import React, { useState } from 'react'
import { ReviewsData } from '../../types/ReviewsData'

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
      <p className='mb-2'>{readMore ? handleReview(review) : shortReview}</p>
      {words.length > 20 && (
        <span className='font-semibold cursor-pointer' onClick={() => setReadMore(!readMore)}>
          {readMore ? 'Show Less' : 'Show More'}
        </span>
      )}
    </>
  )
}

type ReviewsProps = {
  reviews: ReviewsData
}

const TitleReviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <div className='max-w-5xl w-full'>
      {reviews.results.map((element, key) => (
        <div key={key} className='flex  mb-8 overflow-x-auto'>
          <div className='pr-4'>
            <h1 className='w-10 h-10 rounded-[50%] capitalize flex items-center justify-center bg-[#032541] text-white'>
              {element.author[0]}
            </h1>
          </div>
          <div>
            <h1>@{element.author_details.username}</h1>
            <Review review={element.content} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default TitleReviews
