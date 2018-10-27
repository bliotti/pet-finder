import React from 'react'

const SearchContext = React.createContext({
  location: 'Charleston, SC',
  animal: '',
  breed: '',
  breeds: [],
  handleLocationChange() {},
  handleAnimalChange() {},
  handleBreedChange() {},
  getBreeds() {}
})

export const Provider = SearchContext.Provider
export const Consumer = SearchContext.Consumer
