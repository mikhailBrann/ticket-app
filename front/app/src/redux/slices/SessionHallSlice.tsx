//SessionHallSlice
import {
    buildCreateSlice,
    asyncThunkCreator,
    type PayloadAction,
} from "@reduxjs/toolkit";
import {setFormattedDate} from '../../until/utils'

export type SessionHallType = {
    currentDate: null | string,
}

const initialState: SessionHallType = {
    currentDate: setFormattedDate(
        new Date(Date.now()).toLocaleDateString()
    )
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
    reducers: {
        setCurrentDate: (state, action: PayloadAction<any>) => {
            const newDate = new Date(action.payload);
            const formattedDateValue = 
                setFormattedDate(newDate.toLocaleDateString());

            state.currentDate = formattedDateValue;
            localStorage.setItem("currentDate", formattedDateValue);
        }
    }
});


export const { setCurrentDate } = SessionHallSlice.actions;
export default SessionHallSlice.reducer;