import {useEffect, useState} from 'react'
import './App.css'

function App() {
  const [country, setCountry] = useState('DE');
  const [holidaysData, setHolidaysData] = useState([]);
  const [options, setOptions] = useState([]);

    useEffect(() => {
        console.log(`Country changed to: ${country}`);
        fetch(`https://openholidaysapi.org/PublicHolidays?countryIsoCode=${country}&validFrom=2025-01-01&validTo=2025-12-31&languageIsoCode=EN`)
            .then((res) => res.json())
            .then((data) => setHolidaysData(data));
    }, [country]);

    useEffect(() => {
        fetch(`https://openholidaysapi.org/Countries?languageIsoCode=EN`)
            .then((res) => res.json())
            .then((data) => {
                const countryOptions = data.map((item) => ({
                    value: item.isoCode,
                    label: item.name.find((n) => n.language === 'EN') ?.text || item.isoCode,
                }));
                setOptions(countryOptions);
            })
    },[]);


  return (
    <>
      <div className="dropdown">
          <label htmlFor="country-select">Select Country:</label>
          <select
              id="country-select"
              value={country}
              onChange={(e) => setCountry(e.target.value)}>
              {options.map((option) => (
                  <option key={option.value} value={option.value}>
                      {option.label}
                  </option>
              ))}
          </select>
      </div>
      <ul>
          {holidaysData.map((item) => {
              const enName = item.name.find((n) => n.language === 'EN');
              return <li key={item.id}>{item.startDate} - {enName.text}</li>;
          })}
      </ul>
    </>
  )
}

export default App
