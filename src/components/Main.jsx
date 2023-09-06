import Title from './Title.jsx';
import styles from '../styles/general.module.css';

import DownloadIcon from '@mui/icons-material/Download';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import HeightIcon from '@mui/icons-material/Height';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useEffect, useState } from 'react';
import { useDispatch,useSelector} from 'react-redux';
import { getPhotos } from '../features/searchSlice.js';
import { favorites } from '../features/favoriteSlice.js';


const Home = () => {
    const [open, setOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState({}); 
    const [openAlert, setOpenAlert] = useState(false);
    const [favoriteImages, setFavoriteImages] = useState({});
    const[btnDesactivado, setBtnDesactivado] = useState(false);
    let contador = 0;
    const dispatch = useDispatch();
    const dataPhotos = useSelector((state) => state.search.data)

    useEffect(() => {
        if (dataPhotos.length === 0) {
            dispatch(getPhotos());
        }

    }, [dataPhotos.length, dispatch]);


    const handleToggleFavorite = (photo, index) => {
        setBtnDesactivado(true);
        setOpenAlert(true);
        setFavoriteImages((prevFavorites) => {
            return {
                ...prevFavorites,
                [photo.urls.raw]: !prevFavorites[photo.urls.raw]
            };
        });

        let btnFav = document.getElementsByClassName('btnFav');
        btnFav[index].setAttribute("disabled", btnDesactivado);
        dispatch(favorites(photo, 'favorites/addPhoto'));

    };

    const handleOpen = (info) => {
        setOpen(true);
        setModalInfo(info);
    };

    const handleClose = () => setOpen(false);

    const handleDownload = (src) => {
        console.log(src);
        const link = document.createElement('a');
        link.href = src.links.download;
        link.download = 'imageUnplash.png';
        link.target = '_blank';
        link.click();
    }

    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 250,
        height: 'auto',
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
            <div className={styles.photosMain}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styleModal}>
                        <div className={styles.modalMain}>
                            <img className={styles.imgModal} src={modalInfo.urls?.raw} alt='image_data'/>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {modalInfo.alt_description}
                            </Typography>
                            <div className={styles.modalInfo}>
                                <div className={styles.modalInfoBox}>
                                    <HeightIcon fontSize="medium"/>
                                    <p>{modalInfo.height}px</p>
                                </div>
                                <div className={styles.modalInfoBox}>
                                    <SyncAltIcon fontSize="medium"/>
                                    <p>{modalInfo.width}px</p>
                                </div>
                                <div style={{marginRight: '20px'}} className={styles.modalInfoBox}>
                                    <FavoriteIcon fontSize="medium"/>
                                    <p>{modalInfo.likes}</p>
                                </div>
                                <div className={styles.modalInfoBox}>
                                    <DateRangeIcon style={{marginLeft: '15px'}} fontSize="medium"/>
                                    <p>{modalInfo.updated_at?.split('T')[0]}</p>
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
               {dataPhotos.map((data, index) => {
                    const isFavorite = favoriteImages[data.urls.raw];
                    return (
                        <div key={data.id + contador++} className={styles.photoBox}>
                            <img src={data.urls.raw} alt='image_Data' />
                            <div className={styles.alertContainer}>
                               
                            </div>
                            <div className={styles.buttons}>
                                <button onClick={() => handleDownload(data)}>
                                    <DownloadIcon color="error" fontSize="medium" />
                                </button>
                                <div>
                                    <button className='btnFav' onClick={() => handleToggleFavorite(data, index)}>
                                        {
                                        isFavorite 
                                            ? <BookmarkIcon color='error' fontSize="medium" /> 
                                            : <BookmarkBorderIcon color='error' fontSize="medium" />
                                        }
                                    </button>
                                    <button onClick={() => handleOpen(data)}>
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