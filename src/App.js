import { useState, useEffect } from 'react';
import Card from './components/card/card';
import Header from './components/header/header';
import Masonry from 'react-masonry-css';
import './App.css';
import imgs from './assets';

function App() {

  const [apiData, setApiData] = useState([])
  const [loading, setLoading] = useState(false)
  const [likes, setLikes] = useState([])

  useEffect(() => {
    let likeArr = [];
    for (let i = 0; i < localStorage.length; i++) {
      likeArr.push(localStorage.key(i))
    }

    setLikes(likeArr)
    getPictures();
  }, [])

  let apiURL = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&count=15`

  function applyEventListener() {
    const scrolling_function = () => {
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 10) {
        window.removeEventListener('scroll', scrolling_function)
        getPictures();
      }
    }
    if (!loading) {
      window.addEventListener('scroll', scrolling_function);
    }
  }

  async function getPictures() {
    setLoading(true)
    console.log('here')
    try {
      const response = await fetch(apiURL);

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const items = await response.json();
      setLoading(false)
      setApiData(apiData => [...apiData, ...items])
      applyEventListener()

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

  return (
    <div className="App">
      <Header />
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="card-container"
        columnClassName="masonry-grid-column"
      >
        {apiData.map((item) => {
          return (
            <Card key={item.date} item={item} likes={likes} changeLikesState={setLikes} />
          )
        })}
      </Masonry>
      {(loading ?
        <div className="loader-container">
          <img className="loader-img" src={imgs.rocket} alt="rocket-loader"></img>
        </div>
        :
        null
      )}
    </div>
  );
}

export default App;
