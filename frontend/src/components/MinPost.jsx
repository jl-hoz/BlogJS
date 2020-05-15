import React from "react";
import './Style.css';

const MinPost = props => {
    const {title, description, paragraphs, author} = props.data;
    return (
        <div className="Post" onClick={() => props.setSelectedPost(props.data)}>
            <h2>{title}</h2>
            {description ? <h3>{description}</h3> : null}
            {paragraphs ? paragraphs[0] : null}
            <p>Author: <b>{author.name}</b></p>
        </div>
    );
};

export default MinPost;