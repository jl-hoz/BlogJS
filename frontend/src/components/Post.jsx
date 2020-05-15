import React from "react";
import './Style.css';

const Post = props => {
    const {title, description, paragraphs, author, is_important} = props.data;
    return (
        <div className={is_important ? "ImportantPost" : "Post"}>
            <p>{is_important ? "Post Destacado" : null}</p>
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