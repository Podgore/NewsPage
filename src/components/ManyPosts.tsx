import { Box } from "@mui/material"
import Post from "../models/Post"
import PostCard from "./PostCard"

const ManyPosts = ({ posts }: { posts: Post[] }) => {
    return (
        <>
            {
                posts.map((card) => (
                    <Box>
                        <PostCard post={card}/>
                    </Box>
                ))
            }
        </>
    )
}

export default ManyPosts;