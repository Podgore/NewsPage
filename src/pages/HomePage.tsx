import { useEffect, useState } from "react";
import Post from "../models/Post";
import API from "../service/API";
import PostCard from "../components/PostCard";
import { Box } from "@mui/material";
import ManyPosts from "../components/ManyPosts";

const HomePage = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [post, setPosts] = useState<Post[] | undefined>(undefined);

    const fetchPost = async () => {
        setLoading(true);
        const response = await API.get<Post[]>('/posts');
        if (response.data)
            setPosts(response.data);
        setLoading(false);
    }


    useEffect(() => {
        fetchPost();
    }, []);


    if (loading) {
        return <div>
            Loading...
        </div>
    }

    return (
        <>
            <div>
                <h1>Posts</h1>
            </div>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                <ManyPosts posts = {post!}/>
            </Box>
        </>
    )
}

export default HomePage;