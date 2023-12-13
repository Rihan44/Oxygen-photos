import Title from './Title.jsx';
import styles from '../styles/general.module.css';

import DownloadIcon from '@mui/icons-material/Download';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import HeightIcon from '@mui/icons-material/Height';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useEffect, useState } from 'react';
import { useDispatch,useSelector} from 'react-redux';
import { getPhotos } from "../features/search/searchSlice.js";
import { addPhoto } from '../features/favorites/favoriteSlice.js';
import { AlertModal } from './AlertModal.jsx';
import { saveAs } from 'file-saver';

export const Home = () => {
    const[open, setOpen] = useState(false);
    const[modalInfo, setModalInfo] = useState({}); 
    const[openAlert, setOpenAlert] = useState(false);
    const[favoriteImages, setFavoriteImages] = useState({});
    const[data, setData] = useState([]);

    const status = useSelector((state) => state.search.status);
    const dataPhotos = useSelector((state) => state.search.data);

    const dispatch = useDispatch();
    const localFavs = localStorage.getItem('favs');
    const parseFavs = JSON.parse(localFavs) || [];
    const time = Date.now();
    const dateToday = new Date(time);
    let contador = 0;

    useEffect(() => {

        if(status === 'pending'){
            dispatch(getPhotos());
        } else {
            let datas = [];
            dataPhotos.forEach(photo => {
                datas.push(photo);
            });
    
            setData(datas);
        }

    }, [dataPhotos.length, dispatch, dataPhotos, status]);

    const handleToggleFavorite = (photo) => {
        setOpenAlert(true);

        const updatedFavoriteImages = ((prevFavorites) => {
            return {
                ...prevFavorites,
                [photo.id]: !prevFavorites[photo.id]
            };
        });

        setFavoriteImages(updatedFavoriteImages);

        const photoDataFilter = {
            id: photo.id,
            alt_description: photo.alt_description,
            url: photo.urls.raw,
            likes: photo.likes,
            height: photo.height,
            width: photo.width,
            update_at: photo.updated_at,
            dateAdded: dateToday.toISOString().split('T')[0],
            isAdded: true
        }

        dispatch(addPhoto(photoDataFilter)); 

    };

    const handleOpen = (info) => {
        setOpen(true);
        setModalInfo(info);
    };

    const handleClose = () => setOpen(false);

    const handleDownload = (src) => {
        // data.urls.full
        // const link = document.createElement('a');
        // link.href = src.links.download;
        // link.download = 'imageUnplash.png';
        // link.target = '_blank';
        // link.click();
        const url = src.urls.full;

        fetch(url)
            .then(response => response.blob())
            .then((blob) => {
                saveAs(blob, src.alt_description)
            })
    }

    return (
        <main className={styles.main}>
            { status === 'pending' ? <div className={styles.loader}></div> : <></> }
            <Title title="Home" styles={styles.title} />
            <div className={styles.photosMain}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className={styles.styleModalBox}>
                        <div className={styles.modalMain}>
                            <img className={styles.imgModal} src={modalInfo.urls?.regular} alt='image_data'/>
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
                <AlertModal 
                    alertContent='Added to favs!' 
                    openAlert={openAlert}
                    onClose={handleClose}
                    setOpenAlert={() => setOpenAlert(false)}
                /> 
               {data.map((data) => {
                    const favControler = parseFavs?.some(fav => fav.id === data.id);
                    const isFavorite = favoriteImages[data.id];
                    return (
                        <div key={data.id + contador++} className={styles.photoBox}>
                            <img src={data.urls.regular} alt='image_Data' />
                            <div className={styles.buttons}>
                                <button onClick={() => handleDownload(data)}>
                                    <DownloadIcon color="error" fontSize="medium" />
                                </button>
                                <div>
                                    <button className='btnFav' onClick={() => handleToggleFavorite(data)} disabled={favControler}>
                                        {
                                            favControler
                                            ? (<BookmarkIcon color='error' fontSize="medium" /> ) 
                                            : isFavorite 
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
