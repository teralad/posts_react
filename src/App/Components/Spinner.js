import React from 'react'

const Spinner = (props) => {
    return(props.show && <div className="Spiner"><div className="loader"></div></div>) 
}
export default Spinner