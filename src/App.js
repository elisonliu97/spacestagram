import { useEffect, useState } from 'react';
import Card from './components/card'
import './App.css';

function App() {

  const [apiData, setApiData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getPictures();
  }, []);

  const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&count=5`

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

    }
  }


  return (
    <div className="App">
      {(loading ?

        <div>
          {apiData.map((item) => {
            return (
              <Card key={item.title} item={item} />
            )
          })}
        </div>
        :
        <div>Finished Load</div>
      )}
    </div>
  );
}

export default App;
