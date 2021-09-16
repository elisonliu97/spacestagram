import { useEffect, useState } from 'react';
import Card from './components/card/card';
import Masonry from 'react-masonry-css';
import './App.css';

function App() {

  const [apiData, setApiData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getPictures();
  }, []);

  const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&start_date=2021-08-26&end_date=2021-09-05`

  async function getPictures() {
    try {
      const response = await fetch(apiURL);

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const items = await response.json();
      setApiData(items)
      setLoading(true)
      console.log(items)

    } catch (err) {
      console.error(err)
    }
  }

  const breakpointColumnsObj = {
    default: 3,
    1400: 2,
    800: 1
  }


  return (
    <div className="App">
      {(loading ?

        <Masonry 
        breakpointCols={breakpointColumnsObj}
        className="card-container"
        columnClassName="my-masonry-grid_column"
        >
          {apiData.map((item) => {
            return (
              <Card key={item.title} item={item} />
            )
          })}
        </Masonry>
        :
        <div>LOADING</div>
      )}
    </div>
  );
}

export default App;
