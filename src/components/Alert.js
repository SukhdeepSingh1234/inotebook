import React from 'react'

function Alert(props) {


  return (
    <div>
        <div className='alert alert-primary' role="alert"> 
        { props.message}
        {/* <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
    </div>
    </div>
  )
}

export default Alert
