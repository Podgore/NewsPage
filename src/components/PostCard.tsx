import { Alert, Avatar, Box, CardActions, CardHeader, Collapse, Divider, IconButton, IconButtonProps, Snackbar, styled } from "@mui/material";
import Post from "../models/Post";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Header from "./Header";
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Comments from "../components/Comments"

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const PostCard = ({ post }: { post: Post }) => {
    const [clicked, setClicked] = useState<boolean>(false)
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        setOpen(true);
        navigator.clipboard.writeText('https://jsonplaceholder.typicode.com/posts/' + post.id)
    };

    const handleFavoriteClick = () => {
        setClicked((prevClicked) => !prevClicked);
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Card sx={{
            maxWidth: 500
        }}>
            <CardContent>
                <Header userId={post.userId} />
                <Box sx={{
                    gap: 2,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Typography textTransform="uppercase" variant="h5">
                        {post.title}
                    </Typography>
                    <Divider />
                    <Typography variant="body1">
                        {post.body}
                    </Typography>
                </Box>
                <CardActions sx={{
                    pl: 0,
                    mt: 2
                }} disableSpacing>
                    <IconButton
                        aria-label="add to favorites"
                        onClick={handleFavoriteClick}
                        sx={{ color: clicked ? 'red' : '' }}
                    >
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share" onClick={handleClick}>
                        <ShareIcon />
                    </IconButton>
                    <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                        <Alert
                            onClose={handleClose}
                            severity="success"
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            Link successfully copied
                        </Alert>
                    </Snackbar>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <Typography variant='body1'>
                            Comments
                        </Typography>
                        <ExpandMoreIcon />

                    </ExpandMore>

                </CardActions>
            </CardContent>
            <Divider />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    
                    <Comments postId={post.id} />
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default PostCard;