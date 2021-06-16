import React from 'react'

const Persons = ({person, newSearch, deletePerson}) => {

  return (
    <>
      <p>{person.content} {person.number} <button type="submit" onClick={deletePerson}>delete</button>
      </p>
    </>
  )
}

export default Persons
