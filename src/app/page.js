'use client'

import { AiOutlineMenu } from 'react-icons/ai';
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Date from './Components/Date/Date';
import InfoBox from './Components/InfoBox/InfoBox';
import Temperature from './Components/Temperature/Temperature';
import styles from './page.module.css';
import ShowIcon from './Components/ShowIcon/ShowIcon';

export default function Home() {
  const [unOffCanvas, setUnOffCanvas] = useState(false);
  const [dateChecked, setDateChecked] = useState(true);
  const [precipChecked, setPrecipChecked] = useState(true);
  const [minChecked, setMinChecked] = useState(true);
  const [maxChecked, setMaxChecked] = useState(true);

  const [ville, setVille] = useState("quebec");

  const villeSelect = {
    quebec: { latitude: 46.81, longitude: -71.21 },
    troisri: { latitude: 46.35, longitude: -72.55 },
    sher: { latitude: 45.40, longitude: -71.90 },
    mtl: { latitude: 45.51, longitude: -73.59 }
  };

  const [tempMin, setTempMin] = useState(null);
  const [tempMax, setTempMax] = useState(null);
  const [day, setDay] = useState(null);
  const [weatherCode, setWeatherCode] = useState(null);
  const [precip, setPrecip] = useState(null);
  const [hourlyMin, setHourlyMin] = useState(null);

  const setDateCheckedState = (value) => {
    setDateChecked(value);
    Cookies.set('dateChecked', value);
  };

  const setPrecipCheckedState = (value) => {
    setPrecipChecked(value);
    Cookies.set('precipChecked', value);
  };

  const setMinCheckedState = (value) => {
    setMinChecked(value);
    Cookies.set('minChecked', value);
  };

  const setMaxCheckedState = (value) => {
    setMaxChecked(value);
    Cookies.set('maxChecked', value);
  };


  useEffect(() => {
    const storedDateChecked = Cookies.get('dateChecked');
    const storedPrecipChecked = Cookies.get('precipChecked');
    const storedMinChecked = Cookies.get('minChecked');
    const storedMaxChecked = Cookies.get('maxChecked');

    if (storedDateChecked !== undefined) {
      setDateChecked(storedDateChecked === 'true');
    }
    if (storedPrecipChecked !== undefined) {
      setPrecipChecked(storedPrecipChecked === 'true');
    }
    if (storedMinChecked !== undefined) {
      setMinChecked(storedMinChecked === 'true');
    }
    if (storedMaxChecked !== undefined) {
      setMaxChecked(storedMaxChecked === 'true');
    }
  }, []);

  useEffect(() => {
    const { latitude, longitude } = villeSelect[ville];
    const urlApi = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=GMT`;

    fetch(urlApi)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setTempMin(Math.round(data.daily.temperature_2m_min[0]));
      setTempMax(Math.round(data.daily.temperature_2m_max[0]));
      setDay(data.daily.time[0]);
      setWeatherCode(data.hourly.weathercode[0]);
      setPrecip(data.hourly.precipitation_probability[0]);
      setHourlyMin(Math.round(data.hourly.temperature_2m[0]));
    });
  }, [ville]);

  return (
    <main className={styles.main}>

      <div className={styles.header}>
        <h1 className={styles.titre}>MÉTÉO</h1>
        <button className={styles.button} type="button" onClick={() => setUnOffCanvas(!unOffCanvas)}><AiOutlineMenu /></button>
      </div>

      <div className={unOffCanvas ? '' : styles.hide}>
        <div className={styles.overlay} >
          <div className={styles.offcanvas} >
            <div className={styles.headerOffCanvas}>
              <h3>Settings</h3>
              <button onClick={() => setUnOffCanvas(!unOffCanvas)} className={styles.buttonOffCanvas}>x</button>
            </div>
            <div className={styles.bodyOffCanvas}>
              <div>
                <label>Afficher la date</label>
                <input type="checkbox" checked={dateChecked} onChange={() => setDateCheckedState(!dateChecked)} />
              </div>
              <div>
                <label>Afficher Précipitation</label>
                <input type="checkbox" checked={precipChecked} onChange={() => setPrecipCheckedState(!precipChecked)} />
              </div>
              <div>
                <label>Afficher Température Minimum</label>
                <input type="checkbox" checked={minChecked} onChange={() => setMinCheckedState(!minChecked)} />
              </div>
              <div>
                <label>Afficher Température Maximum</label>
                <input type="checkbox" checked={maxChecked} onChange={() => setMaxCheckedState(!maxChecked)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.centreContainer}>
        <div className={styles.centre}>
          <div className={styles.selectBox}>
            <select className={styles.selectBalise} value={ville} onChange={(e) => setVille(e.target.value)}>
              <option value="quebec">Québec</option>
              <option value="troisri">Trois-rivière</option>
              <option value="sher">Sherbrook</option>
              <option value="mtl">Montréal</option>
            </select>
          </div>

          <div className={styles.dateBox}>
            {dateChecked && (
              <div>
                <p>Nous sommes le</p>
                <Date jour={day}></Date>
              </div>
            )}
          </div>
          <div>
            <div className={styles.iconBox}>
              <ShowIcon showCode={weatherCode} />
            </div>
            <Temperature valeur={hourlyMin} leCode={weatherCode} />
          </div>

        </div>
      </div>

      <div className={styles.infoContainerBox}>
        <div className={styles.infoContainer}>
          {precipChecked && (
            <div>
              <InfoBox titre="Précipitation" value={precip} unity="%" />
            </div>
          )}
          {minChecked && (
            <div>
              <InfoBox titre="Minimum" value={tempMin} unity="°" />
            </div>
          )}
          {maxChecked && (
            <div>
              <InfoBox titre="Maximum" value={tempMax} unity="°" />
            </div>
          )}
        </div>
      </div>

    </main>
  );
}
