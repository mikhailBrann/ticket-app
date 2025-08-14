//SessionHallSlice
import {
    buildCreateSlice,
    asyncThunkCreator,
    type PayloadAction,
} from "@reduxjs/toolkit";
import {setFormattedDate} from '../../until/utils'

export type SessionHallType = {
    currentDate: null | string,
    sessionInHall: {},
    sessionInHallLoading: boolean,
    sessionInHallError: string,
}

const initialState: SessionHallType = {
    currentDate: setFormattedDate(
        new Date(Date.now()).toLocaleDateString()
    ),
    sessionInHall: {},
    sessionInHallLoading: false,
    sessionInHallError: '',
}
const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

export const SessionHallSlice = createSliceWithThunk({
    name: "sessionHall",
    initialState,
    selectors: {
        getcurrentDate: (state) => state.currentDate,
    },
    reducers:(create) => ({
        fetchSessionInHall: create.asyncThunk(
            async (searchQuery: string = '', {rejectWithValue}) => {
                try {
                    const queryObject = new URLSearchParams(searchQuery);
                    const hallId = queryObject.get("hallId");
                    const sessionInHallId = queryObject.get("sessionInHallId");

                    if(!hallId) {
                        return rejectWithValue("hallId is empty!");
                    }

                    if(!sessionInHallId) {
                        return rejectWithValue("sessionInHallId is empty!");
                    }
                    
                    const apiPath = import.meta.env.VITE_API_URL + "/hall/" + hallId + "/session/" + sessionInHallId;
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
                    state.sessionInHallLoading = true;
                    state.sessionInHallError = "";
                },
                fulfilled: (state, action: PayloadAction<any>) => {
                    if(action.payload?.Error) {
                        state.sessionInHallError = action.payload?.Error;
                        state.sessionInHall = [];
                        return;
                    }

                    if(action.payload) {
                        state.sessionInHall = action.payload;
                        state.sessionInHallError = "";
                        return;
                    }
                },
                rejected: (state, action: PayloadAction<any>) => {
                    state.sessionInHallError = action.payload as string;
                },
                settled: (state) => {
                    state.sessionInHallLoading = false;
                },
            }
        ),
        setCurrentDate: (state, action: PayloadAction<any>) => {
            const newDate = new Date(action.payload);
            const formattedDateValue = 
                setFormattedDate(newDate.toLocaleDateString());

            state.currentDate = formattedDateValue;
            localStorage.setItem("currentDate", formattedDateValue);
        }
    })
});


export const { setCurrentDate, fetchSessionInHall } = SessionHallSlice.actions;
export default SessionHallSlice.reducer;