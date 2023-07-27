import { noteActionsTypes } from "./notesActionTypes";

interface INotesState {
    notes: string[]
}

const initialState: INotesState = {
    notes: []
}

export const notesReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case noteActionsTypes.ADD_NOTE:
            return {
                notes: [...state.notes, { ...action.payload }]
            }

        case noteActionsTypes.DELETE_NOTE:
            return {
                notes: state.notes.filter((note: any) => note.id !== action.payload.toDeleteId)
            }
        case noteActionsTypes.UPDATE_NOTE:
            return {
                notes: state.notes.map((note: any) => ({
                    ...note,
                    text: note.id === action.payload.toEditId ? action.payload.text : note.text
                  }))
            }
        default:
            return state;
    }
}