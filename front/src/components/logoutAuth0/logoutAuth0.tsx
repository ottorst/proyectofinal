import { useEffect } from 'react';
import LoadingPage from '../LoadingPage/loading';

export default function Logout() {
    useEffect(() => {
        const handleLogout = () => {
            const auth0LogoutUrl = `https://dev-fn7ponuffmtdsgxd.us.auth0.com/v2/logout?returnTo=${encodeURIComponent('http://localhost:3000/')}&client_id=uHDJXNkx12Blk0w3PgCUTvfdIS384YAA`;
            window.location.href = auth0LogoutUrl;
        };

        handleLogout();
    }, []);

    return < LoadingPage/>;
}
