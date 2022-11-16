import * as React from 'react'
import { render } from 'react-dom'
import Main from './Main'

const App: React.FunctionComponent = (): JSX.Element => {
  return (
    <Main />
  )
}

render(<App />, document.getElementById('root'))
