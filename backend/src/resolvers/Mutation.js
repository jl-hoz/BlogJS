import { ObjectID, PubSub } from "mongodb";
import * as uuid from 'uuid';

const Mutation =  {
    register: async(parent, args, ctx, info) => {
        const { db } = ctx;
        const authorsCollection = db.collection('authors');
        const { name, email, password } = args;
        if(await authorsCollection.findOne({email})){
            throw new Error(`${email} already exists!`);
        }
        const result = await authorsCollection.insertOne({
            name,
            email,
            password,
        });
        return result.ops[0];
    },

    login: async(parent, args, ctx, info) => {
        const { db } = ctx;
        const authorsCollection = db.collection('authors');
        const { email, password } = args;
        const token = uuid.v4();
        const author = await authorsCollection.findOne({email});
        if(author && author.password === password){
            await authorsCollection.updateOne({ _id: ObjectID(author._id) }, { $set: { token } });
            // setTimeout( async () => {
            //     // 30 min * 60 seg/min * 1000 ms/s = 1800000 ms de timeout
            //     await authorsCollection.updateOne({ _id: ObjectID(author._id) }, { $set: { token: undefined } });
            // }, 1800000);
        }else{
            throw new Error('Username or password are incorrect!');
        }
        return token;
    },

    logout: async(parent, args, ctx, info) => {
        const { db } = ctx;
        const { email, token } = args;
        const authorsCollection = db.collection('authors');
        const author = await authorsCollection.findOne({email});
        if(author && author.token === token){
            await authorsCollection.updateOne({ email }, { $set: { token: undefined } });
        }else{
            throw new Error('Username or password are incorrect!');
        }
        return token;
    },

    publish: async(parent, args, ctx, info) => {
        const { db } = ctx;
        const postsCollection = db.collection('posts');
        const {title, description, paragraphs, email, token } = args;
        const usersCollection = db.collection('authors');
        const user = await usersCollection.findOne({email});
        let post;
        if(user && user.token === token){
            post = await postsCollection.insertOne({
                title,
                description,
                author: ObjectID(user._id),
                paragraphs,
                is_important: false,
            });
        }else{
            throw new Error('Your session has timed out, log in again!');
        }
        return post.ops[0];
    },

    setPostImportance: async(parent, args, ctx, info) => {
        const { db } = ctx;
        const postsCollection = db.collection('posts');
        const {id, is_important, email, token } = args;
        const usersCollection = db.collection('authors');
        const user = await usersCollection.findOne({email});
        let post;
        if(user && user.token === token){
            post = await postsCollection.findOneAndUpdate({"_id": ObjectID(id)}, {$set: {"is_important": is_important}}, {new: true});
        }else{
            throw new Error('Your session has timed out, log in again!');
        }
        return post.value;
    },

    remove: async (parent, args, ctx, info) => {
        const { db } = ctx;
        const {email , token } = args;
        const post_id = args.id;
        const usersCollection = db.collection('authors');
        const user = await usersCollection.findOne({email});
        let post;
        if(user && user.token === token){
            const postsCollection = db.collection('posts');
            post = await postsCollection.findOne({_id: ObjectID(post_id)});
            if((post.author).toString() === (user._id).toString()){ // Check if post was created by user
                await postsCollection.deleteOne({_id: ObjectID(post_id)});
            }else{
                throw new Error('You do not have permissions!');
            }
        }else{
            throw new Error('Your session has timed out, log in again!');
        }
        return post;
    },

};

export {Mutation as default}