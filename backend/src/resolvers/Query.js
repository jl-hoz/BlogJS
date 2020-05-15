const Query =  {
    
    getPosts: async (parent, args, ctx, info) => {
        const { db } = ctx;
        // const { number } = args;
        const postsCollection = db.collection('posts');
        const posts = await postsCollection.find().sort({ $natural: -1 }).toArray();
        return posts;
    },

    getImportantPosts: async (parent, args, ctx, info) => {
        const { db } = ctx;
        // const { number } = args;
        const postsCollection = db.collection('posts');
        const posts = await postsCollection.find({is_important: true}).toArray();
        return posts;
    },
};

export {Query as default}

