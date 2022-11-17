import * as React from 'react'
import axios from 'axios'
import SearchForm from './Components/SearchForm'
import PaginatedItems from './Components/PaginatedItems'
import LanguageList from './Components/LanguageList'

const DEFAULT_USER_NAME = 'octocat'
const ITEMS_PER_PAGE = 5
const SEARCH_ON_KEY_PRESS = 13

const Main: React.FunctionComponent = (): JSX.Element => {

  const [isLoading, setIsLoading] = React.useState(false)
  const [repositoryList, setRepositoryList]: any[] = React.useState([])
  const [repositoryListFiltered, setRepositoryListFiltered]: any[] = React.useState([])
  const [username, setUsername] = React.useState(DEFAULT_USER_NAME)
  const [languageList, setLanguageList]: any[] = React.useState([])
  const [languageListSelected, setLanguageListSelected]: any[] = React.useState([])

  const searchRef = React.useRef<any>()
  const languageListSelectedRef = React.useRef<any>()

  React.useEffect(() => {

    setIsLoading(true)

    getRepositoriesByUser().then((response) => {
      const repositoryListSorted = sortRepositoryListByStargazersCount(response.data)
      setRepositoryList(repositoryListSorted)
      setLanguageListState(repositoryListSorted)
      setLanguageListSelected([])
      setIsLoading(false)
    })
  }, [username])

  React.useEffect(() => {
  }, [languageList])

  React.useEffect(() => {
    const repositoryListFiltered = filterRepositoryListByLanguageList(repositoryList)
    setRepositoryListFiltered(repositoryListFiltered)
  }, [languageListSelected])

  const setLanguageListState = (repositoryList: any[]) => {

    const languageList: string[] = []

    repositoryList.forEach((repository: any) => {
      if (repository.language && !languageList.includes(repository.language)) {
        languageList.push(repository.language)
      }
    })

    setLanguageList(languageList)
  }

  const filterRepositoryListByLanguageList = (repositoryList: any[]) => {
    return languageListSelected.length
      ? repositoryList.filter((repository) => languageListSelected.includes(repository.language))
      : repositoryList
  }

  const sortRepositoryListByStargazersCount = (repositoryList: any[]) => {
    repositoryList.sort((a: any, b: any): number => {
      if (a.stargazers_count < b.stargazers_count) {
        return 1
      }

      if (a.stargazers_count > b.stargazers_count) {
        return -1
      }

      return 0
    })

    return repositoryList
  }

  const onSearch = (event: any) => {
    const user = searchRef.current.value || DEFAULT_USER_NAME
    setUsername(user)
  }

  const onSearchKeyPress = (event: any) => {
    if (event.charCode === SEARCH_ON_KEY_PRESS) {
      onSearch(event)
      searchRef.current.blur()
    }
  }

  const onLanguageSelected = (event: any) => {

    const filterList: string[] = []
    for (let i = 0; i < languageListSelectedRef.current.children.length; i++) {
      const checkbox = languageListSelectedRef.current.children[i].firstChild
      if (checkbox.checked) {
        filterList.push(checkbox.value)
      }
    }

    setLanguageListSelected(filterList)
  }

  const getRepositoriesByUser = () => axios.get('https://api.github.com/users/' + username + '/repos')

  return (
    <main>
      <div className='m-2 p-2'>

        <SearchForm onSearch={onSearch} onKeyPress={onSearchKeyPress} searchRef={searchRef} />

        <div className='mt-2'>
          {
            !isLoading
              ? (
                <>
                  <LanguageList languageList={languageList} languageListSelected={languageListSelected} onClick={onLanguageSelected} languageListSelectedRef={languageListSelectedRef} />
                  <PaginatedItems repositoryList={repositoryListFiltered} itemsPerPage={ITEMS_PER_PAGE} />
                </>
              )
              : (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )
          }

        </div>
      </div>
    </main>
  )
}

export default Main