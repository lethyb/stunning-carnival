import * as React from 'react'
import ReactPaginate from 'react-paginate'
import Items from './Items';

interface PaginatedItemsProps {
  itemsPerPage: number
  repositoryList: any[]
  username: string
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
      <Items currentItems={currentItems} repositoryList={props.repositoryList} username={props.username}/>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={props.itemsPerPage}
        pageCount={pageCount}
        previousLabel="< Previous"
        containerClassName='pagination mt-3'
        pageClassName='page-item'
        activeClassName='active'
        pageLinkClassName='page-link'
        activeLinkClassName='active'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        disabledClassName='disabled'
        disabledLinkClassName='disabled'
      />
    </>
  )
}

export default PaginatedItems