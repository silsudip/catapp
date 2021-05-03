import {
    ICatState,
    ICatActionTypes,
    ALL_CATS_LOAD,
    UPLOAD_CAT,
    SET_FAVOURITE,
    VOTE_UP_DOWN,
    SET_MESSAGE
} from '../types/cat';
import { ICat } from '../../models/ICat';
import { stat } from 'node:fs';
import { isError } from 'node:util';

const initialState: ICatState = {
    cats: [],
    isError: false,
    message: ''
};

export function catReducer(state = initialState, action: ICatActionTypes): ICatState {
    if (action.type == ALL_CATS_LOAD) {
        return {
            ...state,
            cats: action.payload
        };
    }
    else if (action.type == SET_FAVOURITE) {
        let tmpCats: ICat[] = [];
        for (let i = 0; i < state.cats.length; i++) {
            if (state.cats[i].id == action.payload.id) {
                tmpCats.push({ ...action.payload });
            }
            else {
                tmpCats.push({ ...state.cats[i] });
            }
        }
        return {
            ...state,
            cats: tmpCats
        };
    }
    else if (action.type == VOTE_UP_DOWN) {
        let tmpCats: ICat[] = [];
        for (let i = 0; i < state.cats.length; i++) {
            if (state.cats[i].id == action.payload.id) {
                tmpCats.push({ ...action.payload });
            }
            else {
                tmpCats.push({ ...state.cats[i] });
            }
        }
        return {
            ...state,
            cats: tmpCats
        };
    }
    else if (action.type == UPLOAD_CAT) {
        let tmpCats: ICat[] = [...state.cats];
        if (action.payload) {
            tmpCats.push({ ...action.payload });
        }
        return {
            ...state,
            cats: tmpCats
        };
    }
    else if (action.type == SET_MESSAGE) {
        return {
            ...state,
            isError: action.payload.isError,
            message: action.payload.message
        };
    }
    else {
        return state;
    }
}