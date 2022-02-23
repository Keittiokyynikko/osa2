import React from 'react'

const Results = ({input, listSize, message}) => {

  const inputSearch = (input === '');

  if(inputSearch === true) {
    return null;

  } else if(inputSearch === false && listSize.length > 10) {
    return null;

  } else {
    return (
      <>
      <p>{message}</p>
      </>
    )
  }


}

export default Results;
