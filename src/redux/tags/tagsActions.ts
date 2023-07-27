import { v4 as uuidv4 } from 'uuid';
import { tagsActionsTypes } from './tagsActionTypes';

export const addTag = (tag: string) => ({
    type: tagsActionsTypes.ADD_TAG,
    payload: {
        text: tag,
        id: uuidv4()
    }
})

export const deleteTag = (tag: any) => ({
    type: tagsActionsTypes.DELETE_TAG,
    payload: {
        toDeleteTag: tag
    }
})