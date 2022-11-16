import * as React from 'react'

interface SearchFormProps {
  onSearch: (event: any) => void
  searchRef: any
}

function SearchForm(props: SearchFormProps): JSX.Element {
  return (
    <>
      <input placeholder="Github username" type="text" ref={props.searchRef} />
      <button onClick={props.onSearch}>Search</button>
    </>
  )
}

export default SearchForm