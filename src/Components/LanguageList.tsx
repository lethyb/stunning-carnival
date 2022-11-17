import * as React from 'react'

interface LanguageListProps {
  onClick: (event: any) => void
  languageList: string[]
  languageListSelected: string[]
  languageListSelectedRef: any
}

function LanguageList(props: LanguageListProps) {
  return (
    <ul ref={props.languageListSelectedRef} className="p-0">
      {
        props.languageList.map((language: string) => (
          <li key={language} className='d-inline-block me-2'>
            <input type="checkbox" className="btn-check" id={language} name={language} value={language} onChange={props.onClick} checked={props.languageListSelected.includes(language)} />
            <label className='btn btn-outline-primary' htmlFor={language}>{language}</label>
          </li>
        ))
      }
    </ul>
  )
}

export default LanguageList