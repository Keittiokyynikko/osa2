import React from 'react';

const EmptyResult = ({list, input}) => {

  const inputCheck = input === '';

  if(inputCheck === false && list.length > 10) {
    return(
      <>
      <p>too many</p>
      </>
    )
  } else {
    return null;

  }
}

export default EmptyResult
