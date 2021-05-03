import { IStore } from "./IStore";

const initialState: IStore = {
    catState: {
        cats: [],
        isError: false,
        message: ''
    }
}

export default initialState;