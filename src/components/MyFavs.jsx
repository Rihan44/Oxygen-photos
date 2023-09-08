import Title from "./Title";
import styles from '../styles/general.module.css';

import DownloadIcon from '@mui/icons-material/Download';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import HeightIcon from '@mui/icons-material/Height';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDescription, removePhoto, searchFavorites } from "../features/favoriteSlice";

const MyFavs = () => {

    const[data, setData] = useState(true);
    const [open, setOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState({});
    const [openAlert, setOpenAlert] = useState(false);
    const[description, setNewDescription] = useState('');

    const dispatch = useDispatch();
    const dataFav = useSelector((state) => {
        const favs = state.favorites.data.dataFav;
        const favSearch = state.favorites.data.dataFavSearch;
        
        const value = favSearch?.length > 0 ? favSearch : favs;
        return value;
    });

    console.log(dataFav);

    let contador = 0;

    useEffect(() => {
        if(dataFav.length === 0 || dataFav === undefined){
            setData(false);
        }

    }, [dataFav])

    const handleOnChange = (e, info) => {
        const newDescription = { ...info, alt_description: e.target.value };
        setNewDescription(e.target.value);
        setModalInfo(newDescription);

        dispatch(changeDescription(newDescription,'favorites/addPhotos'));
    }   

    const handleFav = (photo) => {
        setOpenAlert(true);
        const info = {id: photo.id};

        dispatch(removePhoto(info, 'favorites/removePhoto'));
    };

    const handleOpen = (info) => {
        setOpen(true);
        setModalInfo(info);
        setNewDescription(info.alt_description)
    };

    const handleClose = () => setOpen(false);

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

    return(
        <main className={styles.main}>
            {data ? <Title styles={styles.title} title="My Collection"/> : <Title styles={styles.title} title="You haven't added anything to favorites yet"/>}
            <div className={styles.photosMain}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styleModal}>
                        <div className={styles.modalMain}>
                                <img className={styles.imgModal} src={modalInfo.url} alt='image_data'/>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    <div className={styles.modalInfo}>
                                        <div className={styles.modalInfoInput}>
                                            <EditIcon/>
                                            <TextField 
                                                value={description} 
                                                onChange={(e) => handleOnChange(e, modalInfo)}
                                                className={styles.modalInput} 
                                                placeholder="Search description" 
                                            />
                                        </div>  
                                    </div>
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
                                        <p>{modalInfo.dateAdded}</p>
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
                        >Removed from favs!
                    </Alert>
                </Snackbar>
            {data
                ? dataFav?.map((dataPhoto, index) => {
                        return (
                            <div key={dataPhoto.id + contador++} className={styles.photoBox}>
                                <img src={dataPhoto.url} alt='image_fav' />
                                <div className={styles.buttons}>
                                    <button>
                                        <DownloadIcon color="error" fontSize="medium" />
                                    </button>
                                    <div>
                                        <button onClick={() => handleFav(dataPhoto)}>
                                            <BookmarkIcon color='error' fontSize="medium" /> 
                                        </button>
                                        <button onClick={() => handleOpen(dataPhoto)}>
                                            <ZoomOutMapIcon color='error' fontSize="medium" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                })
                : <img src="/no-image.png" alt="no_imageFav"/> 

                }
            </div>
            
        </main>

    )

}

export default MyFavs;