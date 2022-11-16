import * as React from 'react'

interface PaginationProps {
  onPrevious: (event: any) => void
  onNext: (event: any) => void
  page: number
}

function Pagination(props: PaginationProps): JSX.Element {
  return (
    <>
      <button onClick={props.onPrevious} disabled={props.page === 1}>Previous</button>
      <button onClick={props.onNext}>Next</button>
    </>
  )
}

export default Pagination