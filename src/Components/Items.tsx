import * as React from 'react'

interface ItemsProps {
  repositoryList: any[]
  currentItems: any[]
  username: string
}

function Items(props: ItemsProps) {

  return (
    <table className="table table-hover">
      <caption>List of repositories of the user <button className="btn btn-outline-danger btn-sm" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">{props.username}</button></caption>
      <thead>
        <tr>
          <th scope="col"><i className="bi bi-star"></i></th>
          <th scope="col">Repository</th>
          <th scope="col">Description</th>
          <th scope="col">Language</th>
          <th scope="col"><i className="bi bi-diagram-2"></i></th>
          <th scope="col"><i className="bi bi-eye"></i></th>
          <th scope="col">Last update</th>
        </tr>
      </thead>
      <tbody>
        {
          props.currentItems && props.currentItems.map((repository: any) => (
            <tr key={repository.name}>
              <th className='text-primary' scope="row">{repository.stargazers_count}</th>
              <td><a target="_blank" href={repository.html_url} className='text-success text-decoration-none'><i className='bi bi-box-arrow-up-right'></i> {repository.name}</a></td>
              <td>{repository.description}</td>
              <td>{repository.language}</td>
              <td>{repository.forks_count}</td>
              <td>{repository.watchers_count}</td>
              <td>{new Date(repository.updated_at).toLocaleString()}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default Items