import React, { useContext, useEffect, useState } from "react";
import { setstate } from "./context";
import { db } from "./firebase";
import Post from "./Post";

function Posts() {
    const [Post1, setPost1] = useState([]);

    useEffect(() => {

        document.title = "instagram";
        db.collection("posts")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setPost1(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        post: doc.data(),
                    }))
                );
            });
    }, []);

    return (
        <div>
            {Post1.map(({ id, post }) => (
                <Post
                    key={id}
                    postId={id}
                    username={post.username}
                    caption={post.caption}
                    imageurl={post.imageurl}
                    userimage={post.userimg}
                    postid={id}
                />
            ))}
        </div>
    );
}

export default Posts;
