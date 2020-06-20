import React from 'react'
import PropTypes from 'prop-types'

const Credit = ({name}) => {
  return (
    <>
        <blockquote style={{width:'fit-content', margin:'2em auto'}}>Made With <span className="red-text">{'\u2764'}</span> by {name}</blockquote>
    </>
  )
}

Credit.propTypes = {
    name: PropTypes.string.isRequired,
}

export default Credit;
