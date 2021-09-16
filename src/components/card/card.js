import { useState, useEffect } from 'react';
import imgs from '../../assets';
import './card.css';

function Card(props) {
    // state to keep track of liked status
    const [liked, setLiked] = useState(false)

    // on load, check if already liked
    useEffect(() => {
        if (props.likes.includes(props.item.date)) {
            setLiked(true)
        }
    },[])

    // function to differentiate between images and videos
    function mediaType(props) {
        // image
        if (props.item.media_type === "image") {
            return (
                <img
                    className="card-media"
                    src={props.item.url}
                    alt={props.item.title}
                />
            )
        }
        // video
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

    // function to save url to clipboard
    function saveToClipboard(event) {
        navigator.clipboard.writeText(props.item.url);
        clipboardAnimation(event.target)
    }

    // function to like
    function likeFunction(event) {
        localStorage.setItem(props.item.date, props.item.title)
        props.changeLikesState((likes) => [...likes, props.item.date])
        setLiked(true)
        heartAnimation(event.target)
    }
    
    // function to unlike
    function unlikeFunction() {
        localStorage.removeItem(props.item.date)
        props.changeLikesState(props.likes.filter((el) => {
            return (el !== props.item.date)
        }))
        setLiked(false)
    }

    // function to create heart animation
    function heartAnimation(target) {
        let heart = document.createElement('img')
        heart.className = 'heart-img'
        heart.src = imgs.heart
        target.parentElement.appendChild(heart)
        // remove heart after 1s
        setTimeout(()=>{
            let heart = document.querySelector('.heart-img')
            heart.remove();
        }, 1000)
    }

    // function to create clipbaord animation
    function clipboardAnimation(target) {
        let clipboard = document.createElement('img')
        clipboard.className = 'clipboard-img'
        clipboard.src = imgs.clipboard
        target.parentElement.appendChild(clipboard)
        // remove clipboard after 1s
        setTimeout(()=>{
            let clipboard = document.querySelector('.clipboard-img')
            clipboard.remove();
        }, 1000)
    }

    return (
        <div className="card-div">
            {mediaType(props)}
                <div className="card-body">
                    <p className="card-title">{props.item.title}</p>
                    <p className="card-date">{props.item.date}</p>
                    <p className="card-text">{props.item.explanation}</p>
                    {liked ? 
                    <button className="unlike-btn" onClick={() => unlikeFunction()}>Unlike</button>
                    :
                    <button className="like-btn" onClick={(event) => likeFunction(event)}>Like</button>
                    }
                    <button className="share-btn" onClick={(event) => saveToClipboard(event)}>Share</button>
                </div>
        </div>
    )
};

export default Card;