import { useState, useEffect } from 'react';
import Card from './components/card/card';
import Header from './components/header/header';
import Masonry from 'react-masonry-css';
import './App.css';
import imgs from './assets';

function App() {

  // state to keep track of data
  const [apiData, setApiData] = useState([])
  // state to check if data is still being fetched
  const [loading, setLoading] = useState(false)
  // state to keep track of all likes
  const [likes, setLikes] = useState([])

  // on load, get all likes from localstorage and make initial fetch request
  useEffect(() => {
    let likeArr = [];
    for (let i = 0; i < localStorage.length; i++) {
      likeArr.push(localStorage.key(i))
    }

    setLikes(likeArr)
    getPictures();
  }, [])

  // API URL
  let apiURL = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&count=15`

  // function to allow for pagination
  function applyEventListener() {
    const scrolling_function = () => {
      // if at bottom of the screen
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 10) {
        // remove event listener to make sure it only runs once
        window.removeEventListener('scroll', scrolling_function)
        getPictures();
      }
    }
    // after done loading, add back event listener
    if (!loading) {
      window.addEventListener('scroll', scrolling_function);
    }
  }

  // function to fetch from API
  async function getPictures() {
    setLoading(true)
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

  // amount of columns depending on screen size
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
