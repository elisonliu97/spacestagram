import { useState, useEffect } from 'react';
import imgs from '../../assets';
import './card.css';

function Card(props) {

    const [liked, setLiked] = useState(false)

    useEffect(() => {
        if (props.likes.includes(props.item.date)) {
            setLiked(true)
        }
    },[])

    function mediaType(props) {
        if (props.item.media_type === "image") {
            return (
                <img
                    className="card-media"
                    src={props.item.url}
                    alt={props.item.title}
                />
            )
        }
        else if (props.item.media_type === "video") {
            return (
                <div className="outer">
                    <div className="inner">
                        <iframe
                            src={props.item.url}
                            title={props.item.title}
                            allowFullScreen="allowFullScreen"
                            frameBorder='0'
                        />
                    </div>
                </div>

            )
        }
    }

    function saveToClipboard() {
        navigator.clipboard.writeText(props.item.url);
    }

    function likeFunction(event) {
        localStorage.setItem(props.item.date, props.item.title)
        props.changeLikesState((likes) => [...likes, props.item.date])
        setLiked(true)
        heartAnimation(event.target)
    }
    
    function unlikeFunction() {
        localStorage.removeItem(props.item.date)
        props.changeLikesState(props.likes.filter((el) => {
            return (el !== props.item.date)
        }))
        setLiked(false)
    }

    function heartAnimation(target) {
        console.log(target)
        let heart = document.createElement('img')
        heart.className = 'heart-img'
        heart.src = imgs.heart
        target.parentElement.appendChild(heart)
        setTimeout(()=>{
            let heart = document.querySelector('.heart-img')
            heart.remove();
        }, 1000)
    }

    return (
        <div className="card-div">
            {mediaType(props)}
                <div className="card-text">
                    <p>{props.item.title}</p>
                    <p>{props.item.date}</p>
                    <p>{props.item.explanation}</p>
                    {liked ? 
                    <button onClick={() => unlikeFunction()}>Unlike</button>
                    :
                    <button onClick={(event) => likeFunction(event)}>Like</button>
                    }
                    <button onClick={() => saveToClipboard()}>Share</button>
                </div>
        </div>
    )



};

export default Card;