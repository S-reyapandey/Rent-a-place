import React, { useEffect } from 'react'

const Requests = ({ setSelectedLink, link }) => {
    useEffect(() => {
        setSelectedLink(link);
    }, []);
  return (
    <div>
      Request
    </div>
  )
}

export default Requests
