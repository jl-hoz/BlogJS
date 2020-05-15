import React from 'react';
import NavBar from '../components/NavBar';
import { gql, useQuery } from "@apollo/client";
import MinPost from '../components/MinPost';
import Post from '../components/Post';
import { useState } from 'react';

const FETCH_POSTS = gql`
    {
        getPosts{
            title
            _id
            description
            paragraphs
            author{
                name
            }
            is_important
        }
        getImportantPosts{
            title
            _id
            description
            paragraphs
            author{
                name
            }
            is_important
        }
    }
`;

const Home = () => {

    const { loading, error, data } = useQuery(FETCH_POSTS);
    const [selectedPost, setSelectedPost] = useState(null);

    if (loading) return <div>Cargando...</div>;

    if (error) return <div>Error...</div>;

    const handleClickInPost = post => {
        setSelectedPost(post);
        console.log(post)
    }

    return (
        <div>
            <h1>Home</h1>
            <NavBar></NavBar>
            {data && selectedPost === null? 
                data.getImportantPosts.map(post => {
                    return <MinPost data={post} setSelectedPost={handleClickInPost} key={post._id}></MinPost>
                })
            : null}
            {data && selectedPost === null? 
                data.getPosts.map(post => {
                    const newPost = {...post, is_important: false};
                    return <MinPost data={newPost} setSelectedPost={handleClickInPost} key={post._id}></MinPost>
                }) 
            : null}
            {data && selectedPost ? <Post data={selectedPost} setSelectedPost={handleClickInPost} key={data._id}></Post> : null}
        </div>
    )
};

export default Home;