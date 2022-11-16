import * as React from 'react'

interface ItemsProps {
  repositoryList: any[]
  currentItems: any[]
}

function Items(props: ItemsProps) {
  return (
    <ul className='list-group'>
      {
        props.currentItems && props.currentItems.map((repository: any) => (
          <li className='list-group-item' key={repository.name}>
            {repository.stargazers_count !== undefined ? <><i className="bi bi-star"></i> <span className='text-success'>{repository.stargazers_count}</span></> : ''}
            <span className='ms-2'>{repository.name}</span>
          </li>
        ))
      }
    </ul>
  );
}

export default Items