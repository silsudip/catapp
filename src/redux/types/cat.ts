import { ICat } from "../../models/ICat";

export interface ICatState{
    cats: ICat[];
    isError: boolean;
    message: string;
}

export const ALL_CATS_LOAD = 'ALL_CATS_LOAD';
export const SET_FAVOURITE = 'SET_FAVOURITE';
export const VOTE_UP_DOWN = 'VOTE_UP_DOWN';
export const UPLOAD_CAT = 'UPLOAD_CAT';
export const SET_MESSAGE = 'SET_MESSAGE';


export interface IAllCatsLoadAction{
    type: typeof ALL_CATS_LOAD;
    payload: ICat[];
}

export interface ISetFavouriteAction{
    type: typeof SET_FAVOURITE;
    payload: ICat;
}

export interface IVoteUpDownAction{
    type: typeof VOTE_UP_DOWN;
    payload: ICat;
}

export interface ICatUploadAction{
    type: typeof UPLOAD_CAT;
    payload: ICat;
}

export interface ISetMessageAction{
    type: typeof SET_MESSAGE;
    payload: {
        isError: boolean,
        message: string
    };
}

export type ICatActionTypes = IAllCatsLoadAction | ISetFavouriteAction | IVoteUpDownAction | ICatUploadAction | ISetMessageAction;
