import { useState } from 'react';
import Card from './components/card/card';
import Masonry from 'react-masonry-css';
import './App.css';

function App() {

  const [apiData, setApiData] = useState([])
  const [loading, setLoading] = useState(false)

  let date1
  let date2

  let apiURL = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&start_date=${date1}&end_date=${date2}`

  async function getPictures() {
    console.log('here')
    try {
      const response = await fetch(apiURL);

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const items = await response.json();
      setApiData(items)
      setLoading(false)
      console.log(items)

    } catch (err) {
      setLoading(false)
      console.error(err)
    }
  }

  const breakpointColumnsObj = {
    default: 3,
    1400: 2,
    800: 1
  }

  function submitHandler() {
    date1 = document.querySelector("#date-picker-1").value
    date2 = document.querySelector("#date-picker-2").value

    if (!date1 || !date2) {
      alert("please enter proper dates")
      return
    }

    if (date1 > date2) {
      alert('please have your end date after your start date')
      return
    }

    apiURL = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&start_date=${date1}&end_date=${date2}`
    setLoading(true)
    getPictures();
  }

  return (
    <div className="App">
      <input id="date-picker-1" type="date"></input>
      <input id="date-picker-2" type="date"></input>
      <button onClick={() => submitHandler()}
      disabled={loading}>SUBMIT</button>

      {(loading ?
        <div>Loading</div>
        :

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="card-container"
          columnClassName="my-masonry-grid_column"
        >
          {apiData.map((item) => {
            return (
              <Card key={item.date} item={item} />
            )
          })}
        </Masonry>
      )}
    </div>
  );
}

export default App;
