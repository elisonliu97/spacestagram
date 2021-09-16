
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

    return (
        <div className="card-div">
            {mediaType(prop)}
                <div className="card-text">
                    <p>{prop.item.title}</p>
                    <p>{prop.item.explanation}</p>
                </div>
        </div>
    )



};

export default Card;