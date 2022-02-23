import React, {useState, useEffect} from 'react';
import Results from './components/Results';
import EmptyResult from './components/EmptyResult';
import lands from './services/lands';

const App = () => {

  const [showResult, setShowResult] = useState('')
  const [allLands, setAllLands] = useState([])
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    lands
      .getAll()
      .then(initialContacts => {
        setAllLands(initialContacts)
      })
  }, [])

  const landRend = () => {
    const newLand = lands.getLand(newSearch);
    setShowResult(newLand);
  }


  const handleLandSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  return (

    <div className="App">
    <p>find countries <input onChange={handleLandSearch}/></p>
    <EmptyResult list={allLands} input={newSearch}/>

    {allLands.filter(land =>
      land.name.includes(newSearch))
      .map((filteredName) =>
      <Results
        key={filteredName.name}
        input={newSearch}
        listSize={filteredName}
        message={filteredName.name}
      />
      )
    }

    </div>
  )
}

export default App;
