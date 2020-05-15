const Query =  {
    ok: (parent, args, ctx, info) => {
        return "HOLA";
    }, 

    getPosts: async (parent, args, ctx, info) => {
        const { db } = ctx;
        // const { number } = args;
        const postsCollection = db.collection('posts');
        const posts = await postsCollection.find().sort({ $natural: -1 }).limit(10).toArray();
        console.log(posts[0].paragraphs)
        return posts;
    },

    // postsByAuthor: async (parent, args, ctx, info) => {
    //     const { db } = ctx;
    //     const { email, token, author } = args;
    //     const postsCollection = db.collection('posts');
    //     const usersCollection = db.collection('authors');
    //     const user = await usersCollection.findOne({email});
    //     let posts;
    //     if(user && user.token === token){
    //         posts = await postsCollection.find({author: ObjectID(author)}).toArray();
    //     }else{
    //         throw new Error('You need a session!');
    //     }
    //     return posts;
    // },

    // post: async (parent, args, ctx, info) => {
    //     const { db } = ctx;
    //     const { email, token } = args;
    //     const post_id = args.post;
    //     const postsCollection = db.collection('posts');
    //     const usersCollection = db.collection('authors');
    //     const user = await usersCollection.findOne({email});
    //     let post;
    //     if(user && user.token === token){
    //         post = await postsCollection.findOne({_id: ObjectID(post_id)});
    //     }else{
    //         throw new Error('You need a session!');
    //     }
    //     return post;
    // },
};

export {Query as default}

