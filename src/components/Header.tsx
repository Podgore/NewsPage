import { useEffect, useState } from "react";
import API from "../service/API";
import User from "../models/User";
import { Avatar, CardHeader } from "@mui/material";

const Header = ({ userId }: { userId: number }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUsers] = useState<User | undefined>(undefined);

    const fetchUser = async () => {
        setLoading(true);
        const response = await API.get<User>('/users/' + userId);
        if (response.data)
            setUsers(response.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
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
            title={user?.name}
            subheader={user?.email}
        />
    )
}

export default Header;