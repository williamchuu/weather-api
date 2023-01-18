import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [location, setLocation] = useState('')
  const [data, setData] = useState({})
  const [weather, setWeather] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url)
        .then((response) => {
          console.clear();
          setData(response.data)
          console.log(response.data)
          setWeather(response.data.weather)
          setErrorMessage("")
        }).catch(err => {
          console.log(err)
          setErrorMessage("Please enter another location")
          setData({})
          setWeather()
        })
      setLocation('');
    }
  }

  var apiKey = "1cd96b010c115576ff2ccd720cd1edde";
  var lang = "en";
  var units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang=${lang}`;

  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.h1}>Weather</h1>
        {errorMessage}
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder="Enter a location"
          onKeyDown={searchLocation}
          type="text"
        />
        <div className={styles.test}>{data.name}</div>
        {
          weather && weather.map((w, index) => {
            return (
              <div key={index}>
                <h1 className={styles.weather_name}>{w.main}</h1>
                <h2 className={styles.weather_description}>{w.description}</h2>
                <div className={styles.weather_info}>Temperature {data.main && data.main.temp}°C</div>
                <div className={styles.weather_info}>Feels Like {data.main && data.main.feels_like}°C</div>
                <div className={styles.weather_info}>Wind Speed {data.wind && data.wind.speed}m/s</div>
              </div>
            )
          })
        }
      </main>
    </>
  )
}
