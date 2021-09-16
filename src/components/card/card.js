
import './card.css';

function Card(prop) {

    function mediaType(prop) {
        if (prop.item.media_type === "image") {
            return (
                <img
                    className="card-media"
                    src={prop.item.url}
                    alt={prop.item.title}
                />
            )
        }
        else if (prop.item.media_type === "video") {
            return (
                <div className="outer">
                    <div className="inner">
                        <iframe
                            src={prop.item.url}
                            title={prop.item.title}
                            allowFullScreen="allowFullScreen"
                            frameBorder='0'
                        />
                    </div>
                </div>

            )
        }
    }

    function saveToClipboard() {
        navigator.clipboard.writeText(prop.item.url);
        alert("Copied Link")
    }

    function likeFunction() {
        localStorage.setItem(prop.item.date, prop.item.title)
    }

    return (
        <div className="card-div">
            {mediaType(prop)}
                <div className="card-text">
                    <p>{prop.item.title}</p>
                    <p>{prop.item.date}</p>
                    <p>{prop.item.explanation}</p>
                    <button onClick={() => likeFunction()}>Like</button>
                    <button onClick={() => saveToClipboard()}>Share</button>
                </div>
        </div>
    )



};

export default Card;