import * as React from 'react'

interface ProfileProps {
  user: any|null
}

function Profile(props: ProfileProps) {

  if(!props.user) {
    return null
  }

  return (
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div className="offcanvas-header">
        <h3 className="offcanvas-title" id="offcanvasRightLabel">
          <a className="text-danger text-decoration-none" target="_blank" href={props.user.html_url}>{props.user.login} <i className='bi bi-box-arrow-up-right'></i></a>
        </h3>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <img src={props.user.avatar_url} className="w-100"/>
      </div>
    </div>
  )
}

export default Profile