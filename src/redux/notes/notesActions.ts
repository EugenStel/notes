import { v4 as uuidv4 } from 'uuid';
import { noteActionsTypes } from './notesActionTypes';

export const addNote = (noteText: string) => ({
    type: noteActionsTypes.ADD_NOTE,
    payload: {
        text: noteText,
        id: uuidv4()
    }
})

export const deleteNote = (id: any) => ({
    type: noteActionsTypes.DELETE_NOTE,
    payload: {
        toDeleteId: id
    }
})

export const updateNote = (id: any, noteText: any) => ({
    type: noteActionsTypes.UPDATE_NOTE,
    payload: {
        toEditId: id,
        text: noteText
    }
})