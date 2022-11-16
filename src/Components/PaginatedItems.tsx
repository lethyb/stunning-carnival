import * as React from 'react'
import ReactPaginate from 'react-paginate'
import Items from './Items';

interface PaginatedItemsProps {
  itemsPerPage: number
  repositoryList: any[]
}

function PaginatedItems(props: PaginatedItemsProps): JSX.Element {

  const [itemOffset, setItemOffset] = React.useState(0)

  const endOffset = itemOffset + props.itemsPerPage
  const currentItems = props.repositoryList.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(props.repositoryList.length / props.itemsPerPage)

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * props.itemsPerPage) % props.repositoryList.length
    setItemOffset(newOffset)
  }

  return (
    <>
      <Items currentItems={currentItems} repositoryList={props.repositoryList} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
      />
    </>
  )
}

export default PaginatedItems