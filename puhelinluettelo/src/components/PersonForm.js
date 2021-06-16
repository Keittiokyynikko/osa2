import React from 'react'

const PersonForm = ({adder, name, nameHand, num, numHand}) => {
  return (
    <>
    <h3>add a new</h3>
    <form onSubmit={adder}>
      <div>
        name: <input
          value={name}
          onChange={nameHand}
          />
      </div>
      <div>
        number: <input
          value={num}
          onChange={numHand}
          />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </>
  )
}

export default PersonForm
