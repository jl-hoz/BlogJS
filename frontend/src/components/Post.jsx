import React from "react";
import './Style.css';

const Post = props => {
    const {title, description, paragraphs, author} = props.data;
    return (
        <div className="Post">
            <h2>{title}</h2>
            {description ? <h3>{description}</h3> : null}
            <p>Author: <b>{author.name}</b></p>
            {paragraphs ? 
                paragraphs.map((paragraph, index) => {
                    return <p key={index}>{paragraph}</p>
                }) 
            : null}
            <br></br>
            <a href="http://localhost:3000/"><button>Back</button></a>
        </div>
    );
};

export default Post;