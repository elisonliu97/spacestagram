

function Card(prop) {

    if (prop.item.media_type === "image") {
        return (
                <img src={prop.item.url} alt={prop.item.title}></img>
        )
    }

    else if (prop.item.media_type === "video") {
        return (
                <iframe src={prop.item.url} title={prop.item.title} />
        )

    }

    
};

export default Card;