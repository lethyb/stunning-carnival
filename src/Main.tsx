import * as React from 'react'
import * as Octokit from 'octokit'
import SearchForm from './Components/SearchForm'
import PaginatedItems from './Components/PaginatedItems'
import LanguageList from './Components/LanguageList'

// DOC: https://octokit.github.io/rest.js/v19

const Main: React.FunctionComponent = (): JSX.Element => {

  const [state, setState] = React.useState('')
  const [repositoryList, setRepositoryList]: any[] = React.useState([])
  const [username, setUsername] = React.useState('')
  const [languageList, setLanguageList]: any[] = React.useState([])
  const [languageListSelected, setLanguageListSelected]: any[] = React.useState([])

  const searchRef = React.useRef<any>()
  const languageListSelectedRef = React.useRef<any>()

  const itemsPerPage = 5
  const octokit = new Octokit.Octokit({
    auth: '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'
  })

  React.useEffect(() => {

    setState('loading')

    if (username === '') {
      setLanguageListState([])
      getPublicRepositories().then((response) => {
        setRepositoryList(response.data)
        setState('')
      })
      return
    }

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
      if (repository.language) {
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

  const getPublicRepositories = async () => await octokit.rest.repos.listPublic()
  const getRepositoriesByUser = async () => await octokit.rest.repos.listForUser({ username })

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