import * as React from 'react'
import { render } from 'react-dom'
import boot from './boot'
import Main from './Main'

const App: React.FunctionComponent = (): JSX.Element => {

  boot()

  return (
    <Main />
  )
}

render(<App />, document.getElementById('root'))
