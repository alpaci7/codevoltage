import { Backdrop, CircularProgress } from '@mui/material';
const Loading = () => {
    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open >
            <CircularProgress color="primary" size="100px" />
        </Backdrop>
    );
}
 
export default Loading;