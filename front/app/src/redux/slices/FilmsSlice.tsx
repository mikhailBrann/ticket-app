//FilmsSlice
import {
    buildCreateSlice,
    asyncThunkCreator,
    type PayloadAction,
} from "@reduxjs/toolkit";

export type FilmsStateType = {
    filmsList: [],
    filmsLoading: boolean,
    filmsError: string,
};

const initialState: FilmsStateType = {
    filmsList: [],
    filmsLoading: false,
    filmsError: '',
};
const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

export const FilmsSlice = createSliceWithThunk({
    name: "films",
    initialState,
    selectors: {
        gethitSales: (state) => state.filmsList,
        gethitSalesLoading: (state) => state.filmsLoading,
        gethitSalesError: (state) => state.filmsError,
    },
    reducers: (create) => ({
        fetchFilms: create.asyncThunk(
            async (searchQuery: string = '', {rejectWithValue}) => {
                try {
                    const queryObject = new URLSearchParams(searchQuery);
                    const queryParam = queryObject.toString() ? "?" + queryObject.toString() : "";
                    const apiPath = import.meta.env.VITE_API_URL + "/films" + queryParam;
                    const response = await fetch(apiPath);

                    if(!response.ok) {
                        return rejectWithValue("Loading error!");
                    }

                    return await response.json();
                } catch (error) {
                    return rejectWithValue(error);
                }
            },
            {
                pending: (state) => {
                    state.filmsLoading = true;
                    state.filmsError = "";
                },
                fulfilled: (state, action: PayloadAction<any>) => {
                    if(action.payload?.Error) {
                        state.filmsError = action.payload?.Error;
                        state.filmsList = [];
                        return;
                    }

                    if(action.payload) {
                        state.filmsList = action.payload;
                        state.filmsError = "";
                        return;
                    }
                },
                rejected: (state, action: PayloadAction<any>) => {
                    state.filmsError = action.payload as string;
                },
                settled: (state) => {
                    state.filmsLoading = false;
                },
            }
        )
    })
});

export const { fetchFilms } = FilmsSlice.actions;
export default FilmsSlice.reducer;