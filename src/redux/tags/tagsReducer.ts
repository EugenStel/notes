import { tagsActionsTypes } from "./tagsActionTypes";


interface ITagsState {
    tags: string[]
}

const initialState: ITagsState = {
    tags: []
}

export const tagsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case tagsActionsTypes.ADD_TAG:
            return {
                tags: [...state.tags, { ...action.payload }]
            }
        case tagsActionsTypes.DELETE_TAG:
            return {
                tags: state.tags.filter((tag: any) => tag.text !== action.payload.toDeleteTag)
            }
        default:
            return state;
    }
}