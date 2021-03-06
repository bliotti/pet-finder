import React from 'react'
import { ANIMALS } from 'petfinder-client'
import { Consumer } from './SearchContext'

class SearchBox extends React.Component {
  handleFormSubmit = e => {
    e.preventDefault()
    this.props.search()
  }

  render() {
    console.log('props', this.props)
    console.log('state', this.state)
    return (
      <Consumer>
        {context => (
          <div className="search-params">
            {console.log('context', context)}
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor="location">
                Location
                <input
                  onChange={context.handleLocationChange}
                  placeholder="Location"
                  id="location"
                  value={context.location}
                />
              </label>

              <label htmlFor="animal">
                Animal
                <select
                  onChange={context.handleAnimalChange}
                  onBlur={context.handleAnimalChange}
                  placeholder="Animal"
                  id="animal"
                  value={context.animal}
                >
                  <option />
                  {ANIMALS.map(animal => (
                    <option key={animal} value={animal}>
                      {animal}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="breed">
                Breed
                <select
                  onChange={context.handleBreedChange}
                  onBlur={context.handleBreedChange}
                  placeholder="Breed"
                  id="breed"
                  value={context.breed}
                  disabled={!context.breeds.length === 0}
                >
                  <option />
                  {context.breeds.map(breed => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </label>
              <button>Submit</button>
            </form>
          </div>
        )}
      </Consumer>
    )
  }
}

export default SearchBox
