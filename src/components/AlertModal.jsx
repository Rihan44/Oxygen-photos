import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const AlertModal = ({ alertContent, openAlert, handleClose, setOpenAlert }) => {
    const alertStyle = {
        width: '50%',
        position: 'absolute',
        top: '-300px',
        left: '20%'
    }

    return (
        <Snackbar style={{ width: '100%' }} open={openAlert} autoHideDuration={1000} onClose={handleClose}>
            <Alert
                sx={alertStyle}
                severity="success"
                color="error"
                onClose={setOpenAlert}
            >{alertContent}
            </Alert>
        </Snackbar>
    )
}