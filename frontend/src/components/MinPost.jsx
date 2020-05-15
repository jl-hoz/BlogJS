import React from "react";
import './Style.css';

const MinPost = props => {
    const {title, description, paragraphs, author, is_important} = props.data;
    return (
        <div className={is_important ? "ImportantPost" : "Post"} onClick={() => props.setSelectedPost(props.data)}>
            <p>{is_important ? "Post Destacado" : null}</p>
            <h2>{title}</h2>
            {description ? <h3>{description}</h3> : null}
            {paragraphs ? paragraphs[0] : null}
            <p>Author: <b>{author.name}</b></p>
        </div>
    );
};

export default MinPost;