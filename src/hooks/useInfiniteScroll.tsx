import { useEffect, useRef } from 'react'

interface InfiniteScroll {
  fetchMore: () => void
}

export const useInfiniteScroll = ({ fetchMore }: InfiniteScroll) => {
  const observer = useRef<IntersectionObserver | null>(null)
  const lastDataRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const lastEntry = entries[entries.length - 1]
      if (lastEntry.isIntersecting) fetchMore()
    })

    if (lastDataRef.current) observer.current.observe(lastDataRef.current)

    return () => {
      if (lastDataRef.current && observer.current) {
        observer.current.unobserve(lastDataRef.current)
      }
    }
  }, [fetchMore])

  return <div ref={lastDataRef} />
}
