import Title from './Title.jsx';
import styles from '../styles/general.module.css';
import DownloadIcon from '@mui/icons-material/Download';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Collapse } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import HeightIcon from '@mui/icons-material/Height';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Home = () => {

    const navigation = useNavigate();
    const [open, setOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState(''); /* pasarle un objeto en su momento */
    const [openAlert, setOpenAlert] = useState(false);
    const [favoriteImages, setFavoriteImages] = useState({});

    const handleToggleFavorite = (photo) => {
        /* TODO QUE SI LE DOY OTRA VEZ NO SALGA EL ALERT */
        setOpenAlert(true);
        setFavoriteImages((prevFavorites) => {
            return {
                ...prevFavorites,
                [photo]: !prevFavorites[photo]
            };
        });
        /* AQUI VA EL DISPATCH DE AÑADIR A FAVS */
    };

    const handleOpen = (info) => {
        setOpen(true);
        setModalInfo(info);
    };

    const handleClose = () => setOpen(false);

    const srcs = [
        '/image-prueba.jpeg',
        '/image-prueba2.jpg',
        '/image-prueba3.jpg',
        '/image-prueba4.jpg'
    ]

    const handleDownload = (src) => {
        /* QUE SE DESCARGUE LA IMAGEN */
        console.log(src);
    }

    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 250,
        height: 350,
        bgcolor: '#F2E2DE',
        color: '#EB3223',
        border: '1px solid #000',
        borderRadius: '10px',
        boxShadow: 24,
        p: 4,
    };

    const alertStyle = {
        width: '50%',
        position: 'absolute',
        top: '-300px',
        left: '20%'
    }

    return (
        <main className={styles.main}>
            <Title title="Home" styles={styles.title} />
            {/* el component de cada photo que viene del servidor */}
            <div className={styles.photosMain}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styleModal}>
                        <img className={styles.imgModal} src={modalInfo} alt='image'/>
                        <div className={styles.modalMain}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Titulo de la imagen
                            </Typography>
                            <div className={styles.modalInfo}>
                                <div className={styles.modalInfoBox}>
                                    <HeightIcon fontSize="medium"/>
                                    <p>250px</p>
                                </div>
                                <div className={styles.modalInfoBox}>
                                    <SyncAltIcon fontSize="medium"/>
                                    <p>350px</p>
                                </div>
                                <div className={styles.modalInfoBox}>
                                    <FavoriteIcon fontSize="medium"/>
                                    <p>2.5M</p>
                                </div>
                                <div className={styles.modalInfoBox}>
                                    <DateRangeIcon style={{marginLeft: '15px'}} fontSize="medium"/>
                                    <p>20/09/22</p>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>
                <Snackbar open={openAlert} autoHideDuration={1000} onClose={handleClose}>
                    <Alert
                        sx={alertStyle}
                        severity="success"
                        color="error"
                        onClose={() => { setOpenAlert(false) }}
                        >Added to favs!
                    </Alert>
                </Snackbar>

                {srcs.map((photo) => {
                    const isFavorite = favoriteImages[photo];
                    return (
                        <div key={photo} className={styles.photoBox}>
                            <img src={photo} alt='image' />
                            <div className={styles.alertContainer}>
                                {/*  */}
                            </div>
                            <div className={styles.buttons}>
                                <button onClick={() => handleDownload(photo)}>
                                    <DownloadIcon color="error" fontSize="medium" />
                                </button>
                                <div>
                                    <button onClick={() => handleToggleFavorite(photo)}>
                                        {
                                        isFavorite 
                                            ? <BookmarkIcon color='error' fontSize="medium" /> 
                                            : <BookmarkBorderIcon color='error' fontSize="medium" />
                                        }
                                    </button>
                                    <button onClick={() => handleOpen(photo)}>
                                        <ZoomOutMapIcon color='error' fontSize="medium" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </main>
    )
}

export default Home;