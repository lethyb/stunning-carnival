import * as React from 'react'

interface LanguageListProps {
  onClick: (event: any) => void
  languageList: string[]
  languageListSelected: string[]
  languageListSelectedRef: any
}

function LanguageList(props: LanguageListProps) {
  return (
    <ul ref={props.languageListSelectedRef}>
      {
        props.languageList.map((language: string) => (
          <li key={language}>
            <input type="checkbox" id={language} name={language} value={language} onChange={props.onClick} checked={props.languageListSelected.includes(language)} />
            <label className='ps-1' htmlFor={language}>{language}</label>
          </li>
        ))
      }
    </ul>
  )
}

export default LanguageList