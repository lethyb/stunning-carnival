import * as React from 'react'
import axios from 'axios'
import SearchForm from './Components/SearchForm'
import PaginatedItems from './Components/PaginatedItems'
import LanguageList from './Components/LanguageList'

const Main: React.FunctionComponent = (): JSX.Element => {

  const [state, setState] = React.useState('')
  const [repositoryList, setRepositoryList]: any[] = React.useState([])
  const [username, setUsername] = React.useState('lethyb')
  const [languageList, setLanguageList]: any[] = React.useState([])
  const [languageListSelected, setLanguageListSelected]: any[] = React.useState([])

  const searchRef = React.useRef<any>()
  const languageListSelectedRef = React.useRef<any>()

  const itemsPerPage = 5

  React.useEffect(() => {

    setState('loading')

    getRepositoriesByUser().then((response) => {
      const repositoryListFiltered = filterRepositoryListByLanguageList(response.data)
      const repositoryListSorted = sortRepositoryListByStargazersCount(repositoryListFiltered)
      setLanguageListState(response.data)
      setRepositoryList(repositoryListSorted)
      setState('')
    })
  }, [username, languageListSelected]);


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
    const user = searchRef.current ? searchRef.current.value : ''
    setUsername(user)
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

        <SearchForm onSearch={onSearch} searchRef={searchRef} />

        <div className='mt-2'>
          {
            state !== 'loading'
              ? (
                <>
                  <LanguageList languageList={languageList} languageListSelected={languageListSelected} onClick={onLanguageSelected} languageListSelectedRef={languageListSelectedRef} />
                  <PaginatedItems repositoryList={repositoryList} itemsPerPage={itemsPerPage} />
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