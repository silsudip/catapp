import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { ALL_CATS_LOAD, SET_FAVOURITE, SET_MESSAGE, UPLOAD_CAT, VOTE_UP_DOWN } from '../types/cat';
import { ICat } from '../../models/ICat';
import { CatService } from '../../services/CatService';

export const getAllCats = (): ThunkAction<Promise<boolean>, {}, {}, AnyAction> =>
    (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        return new Promise<boolean>((resolve) => {

            CatService.GetAllCats().then(data => {
                console.log('Got data from api', data);
                let tmpCats: ICat[] = [];
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        tmpCats.push({
                            id: data[i].id,
                            sub_id: data[i].sub_id,
                            url: data[i].url,
                            isFavorite: true,
                            isVoteUp: false,
                            scores: 1
                        });
                    }
                }
                dispatch({ type: ALL_CATS_LOAD, payload: tmpCats });
            }).catch((exception) => {
                console.log('Error: ', exception);
                resolve(false);
            });
        });
    };

export const uploadImage = (file: File): ThunkAction<Promise<string>, {}, {}, AnyAction> =>
    (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        return new Promise<string>((resolve) => {
            CatService.UploadFile(file).then(data => {
                console.log('Got data from api', data);
                if (data.status && data.status == 400) {
                    dispatch({
                        type: SET_MESSAGE, payload: {
                            isError: true,
                            message: data.message
                        }
                    });
                    resolve(data.message);
                }
                else {
                    dispatch({
                        type: SET_MESSAGE, payload: {
                            isError: false,
                            message: 'Image uploaded successfully!'
                        }
                    });
                    getAllCats();
                    resolve('Image uploaded successfully!');
                }
            }).catch((exception) => {
                console.log('Error: ', exception);
                dispatch({
                    type: SET_MESSAGE, payload: {
                        isError: true,
                        message: `Error: ${exception}`
                    }
                });
                resolve(`Error: ${exception}`);
            });
        });
    };
export const setMessage = (isError: boolean, message: string): any => {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        dispatch({
            type: SET_MESSAGE, payload: {
                isError: true,
                message: message
            }
        });
    };
};

export const setFavourite = (cat: ICat): ThunkAction<Promise<boolean>, {}, {}, AnyAction> =>
    (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        return new Promise<boolean>((resolve) => {
            if (cat.isFavorite) {
                CatService.SetFavourite(cat).then(data => {
                    console.log('Set Favourite', data);
                    dispatch({ type: SET_FAVOURITE, payload: cat });
                });
            }
        });
    };

export const setVoteUpDown = (cat: ICat): ThunkAction<Promise<boolean>, {}, {}, AnyAction> =>
    (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        return new Promise<boolean>((resolve) => {
            CatService.SetVoteUpDown(cat).then(data => {
                console.log('Set Vote up', data);
                dispatch({ type: VOTE_UP_DOWN, payload: cat });
            });

            dispatch({ type: VOTE_UP_DOWN, payload: cat });
        });
    };

