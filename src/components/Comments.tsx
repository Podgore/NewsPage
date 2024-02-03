import { useEffect, useState } from "react";
import API from "../service/API";
import { Avatar, Box, CardContent, CardHeader, Collapse, Divider, Typography } from "@mui/material";
import UserComment from "../models/UserComment";

const Comments = ({ postId }: { postId: number }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [comments, setComments] = useState<UserComment[] | undefined>(undefined);

    const fetchComment = async () => {
        setLoading(true);
        const response = await API.get<UserComment[]>('/comments?postId=' + postId);
        if (response.data)
            setComments(response.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchComment();
    }, []);
    return (
        <>
            {comments?.map((comment) => (
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        
                        <CardHeader sx={{
                            paddingLeft: '4px',
                            paddingRight: '16px',
                            paddingTop: '0px',
                            paddingBottom: '16px'
                        }}
                            avatar={
                                <Avatar sx={{ bgcolor: 'red' }} aria-label='recipe'>
                                    R
                                </Avatar>
                            }
                            title={comment.email}
                            subheader={''}
                        />
                        <Typography variant='body1'>
                            {comment.body}
                        </Typography>
                        <Divider sx={{margin: 3}}/>
                    </Box>
                    
            ))
            }
        </>
    )
}

export default Comments;