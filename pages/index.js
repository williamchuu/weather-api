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
  const [errorMessageStyles, setErrorMessageStyles] = useState({ color: "#FF7676", fontSize: "16px", fontFamily: "Roboto", fontWeight: "400" });

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url)
        .then((response) => {
          console.clear();
          setData(response.data)
          console.log(response.data)
          setWeather(response.data.weather)
          setErrorMessage("")
          setErrorMessageStyles({ color: "#FF7676", fontSize: "16px", fontFamily: "Roboto", fontWeight: "400" });
        }).catch(err => {
          console.log(err)
          setErrorMessage("Please enter another location")
          setErrorMessageStyles({ color: "#FF7676", fontSize: "14px", fontFamily: "Roboto", fontWeight: "400" });
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
      <Head>
        <title>Weather Checker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />

      </Head>
      <main className={styles.main}>
        <div className={styles.cont}>

          <h1 className={styles.h1}>Weather Checker &#x1F324;</h1>
          <div style={errorMessageStyles}>{errorMessage}</div>
          <input
            className={styles.input}
            value={location}
            onChange={event => setLocation(event.target.value)}
            placeholder="Enter a city or location"
            onKeyDown={searchLocation}
            type="text"
          />
          <div className={styles.result}>{data.name}</div>
          {
            weather && weather.map((w, index) => {
              return (
                <div key={index}>
                  <div className={styles.weather_name}>{w.main}</div>
                  <div className={styles.weather_description}>"{w.description}."</div>

                  <div className={styles.weather_info}>Temperature </div>
                  <div className={styles.number_unit}>
                    <div className={styles.number}>{data.main && data.main.temp}</div>
                    <div className={styles.unit}>°C</div>
                  </div>

                  <div className={styles.weather_info}>Feels Like </div>
                  <div className={styles.number_unit}>
                    <div className={styles.number}>{data.main && data.main.feels_like}</div>
                    <div className={styles.unit}>°C</div>
                  </div>

                  <div className={styles.weather_info}>Wind Speed</div>
                  <div className={styles.number_unit}>
                    <div className={styles.number}>{data.wind && data.wind.speed}</div>
                    <div className={styles.unit}>m/s</div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className={styles.myName}>&#169; William Chu</div>
      </main>
    </>
  )
}
