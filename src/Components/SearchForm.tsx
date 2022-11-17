import * as React from 'react'

interface SearchFormProps {
  onSearch: (event: any) => void
  onKeyPress: (event: any) => void
  searchRef: any
}

function SearchForm(props: SearchFormProps): JSX.Element {
  return (
    <>
      <div className="input-group mb-3">
        <span className="input-group-text">https://github.com/</span>
        <div className="form-floating">
          <input type="text" className="form-control" id="floatingInputGroup1" placeholder="Enter a username (ex: octocat)" ref={props.searchRef} onKeyPress={props.onKeyPress}/>
            <label htmlFor="floatingInputGroup1">Enter a username (ex: octocat)</label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={props.onSearch}>Search</button>
      </div>
    </>
  )
}

export default SearchForm