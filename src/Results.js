/*
8888888888                       888    8888888888               888      888b     d888                   888
888                              888    888                      888      8888b   d8888                   888
888                              888    888                      888      88888b.d88888                   888
8888888 888d888 .d88b.  88888b.  888888 8888888    88888b.   .d88888      888Y88888P888  8888b.  .d8888b  888888 .d88b.  888d888 .d8888b
888     888P"  d88""88b 888 "88b 888    888        888 "88b d88" 888      888 Y888P 888     "88b 88K      888   d8P  Y8b 888P"   88K
888     888    888  888 888  888 888    888        888  888 888  888      888  Y8P  888 .d888888 "Y8888b. 888   88888888 888     "Y8888b.
888     888    Y88..88P 888  888 Y88b.  888        888  888 Y88b 888      888   "   888 888  888      X88 Y88b. Y8b.     888          X88
888     888     "Y88P"  888  888  "Y888 8888888888 888  888  "Y88888      888       888 "Y888888  88888P'  "Y888 "Y8888  888      88888P'
*/

import React from 'react'
import pf from 'petfinder-client'
import Pet from './Pet'
import SearchBox from './SearchBox'
import { Consumer } from './SearchContext'

const petfinder = pf({
  key: process.env.REACT_APP_API_KEY,
  secret: process.env.REACT_APP_API_SECRET
})

class Results extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pets: []
    }
  }

  componentDidMount() {
    this.search()
  }

  search = () => {
    petfinder.pet
      .find({
        output: 'full',
        location: this.props.searchParams.location,
        animal: this.props.searchParams.animal,
        breed: this.props.searchParams.breed
      })
      .then(data => {
        let pets
        console.log('d', data)

        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet
            console.log('1')
          } else {
            pets = [data.petfinder.pets.pet]
            console.log('2')
          }
        } else {
          pets = []
          console.log('3')
        }

        this.setState(
          {
            pets
          },
          console.log(pets)
        )
      })
  }

  //region kkk

  render() {
    console.log('PET', this.state.pets)
    return (
      <div className="search">
        <SearchBox search={this.search} />
        {this.state.pets.map(pet => {
          let breed

          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(', ')
          } else {
            breed = pet.breeds.breed
          }

          return (
            <Pet
              key={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
              id={pet.id}
            />
          )
        })}
      </div>
    )
  }
}

export default function ResultsWithContext(props) {
  return (
    <Consumer>
      {context => <Results {...props} searchParams={context} />}
    </Consumer>
  )
}
