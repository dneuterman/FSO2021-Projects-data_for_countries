import React, { useState, useEffect } from 'react'
import axios from 'axios'

// const data = [
//   {
//   languages: [
//   {
//   iso639_1: "ps",
//   iso639_2: "pus",
//   name: "Pashto",
//   nativeName: "پښتو"
//   },
//   {
//   iso639_1: "uz",
//   iso639_2: "uzb",
//   name: "Uzbek",
//   nativeName: "Oʻzbek"
//   },
//   {
//   iso639_1: "tk",
//   iso639_2: "tuk",
//   name: "Turkmen",
//   nativeName: "Türkmen"
//   }
//   ],
//   flag: "https://restcountries.eu/data/afg.svg",
//   name: "Afghanistan",
//   capital: "Kabul",
//   population: 27657145
//   },
//   {
//   languages: [
//   {
//   iso639_1: "sv",
//   iso639_2: "swe",
//   name: "Swedish",
//   nativeName: "svenska"
//   }
//   ],
//   flag: "https://restcountries.eu/data/ala.svg",
//   name: "Åland Islands",
//   capital: "Mariehamn",
//   population: 28875
//   },
//   {
//   languages: [
//   {
//   iso639_1: "sq",
//   iso639_2: "sqi",
//   name: "Albanian",
//   nativeName: "Shqip"
//   }
//   ],
//   flag: "https://restcountries.eu/data/alb.svg",
//   name: "Albania",
//   capital: "Tirana",
//   population: 2886026
//   },
//   {
//   languages: [
//   {
//   iso639_1: "ar",
//   iso639_2: "ara",
//   name: "Arabic",
//   nativeName: "العربية"
//   }
//   ],
//   flag: "https://restcountries.eu/data/dza.svg",
//   name: "Algeria",
//   capital: "Algiers",
//   population: 40400000
//   }]

const Country = ({country}) => {
  return (
    <>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt=""/>
    </>
  )
}

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <><p>Too many matches. Make your filter more specific.</p></>
  } else if (countries.length > 1) {
    return (
      countries.map(country => {
        return (
          <>
          <p key={country.name}>{country.name}</p>
          </>
        )
    })
    )
  } else if (countries.length === 1) {
    console.log(countries)
    return (
      <Country country={countries[0]} />
    )
  } else {
    return (
      <><p>No Countries Match</p></>
    )
  }
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ countriesFilter, setCountriesFilter ] = useState(countries)

  useEffect(() => {
    axios
      .get("http://restcountries.eu/rest/v2/all?fields=name;capital;population;languages;flag")
      .then(res => {
        console.log('promise fulfilled')
        setCountries(res.data)
        setCountriesFilter(res.data)
      })
  }, [])

  const handleFilter = (event) => {
    const value = event.target.value
    if (value === '') {
      setCountriesFilter(countries)
    } else {
      const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(value))
      setCountriesFilter(filteredCountries)
    }
  }

  return (
    <div>
      <div>
        Find Countries: <input onChange={handleFilter}/>
      </div>
      <div>
        <Countries countries={countriesFilter} />
      </div>
    </div>
  )
}

export default App;
