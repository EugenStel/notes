import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import { Note } from "../components/note/note";
import { Tag } from '../components/tag/tag';
import { NoteInput } from "../components/note-input/note-input";
import { Button } from '../components/button/button';
import { addNote, deleteNote, updateNote } from '../redux/notes/notesActions';
import { addTag, deleteTag } from '../redux/tags/tagsActions';
import { getNotes } from '../redux/notes/notesSelectors';
import { getTags } from '../redux/tags/tagsSelectors';
import { parseString } from '../utils/parseString';
import { setCaret } from '../utils/setCaret';

import './notes.css';

export const NotesPage = () => {
    const [noteText, setNoteText] = useState('');
    const [currentTags, setCurrentTags] = useState([] as any);
    const [filteredNotes, setFilteredNotes] = useState([] as any)

    const dispatch = useDispatch();

    const notes = useSelector(getNotes);
    const tags = useSelector(getTags);
    const mappedTages = tags.map((tag: any) => tag.text.toLowerCase())

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setNoteText(value);
        const tag: any = parseString(value);
        setCurrentTags(tag);
    }

    const handleAddNote = () => {
        dispatch(addNote(noteText));
        setNoteText('');
        setCurrentTags([]);
        if (currentTags) {
            currentTags.forEach((curTag: any) => {
                if (!mappedTages.includes(curTag.toLowerCase())) {
                    dispatch(addTag(curTag.toLowerCase()))
                }
            })
        }
    }

    const handleDeleteNote = (ID: any, textFromNote: string) => {
        const tagsFromDeletedNote: any = parseString(textFromNote);
        if (tagsFromDeletedNote) {
            const remainingNotesText = notes.filter((note: any) => note.id !== ID).map((note: any) => note.text);
            tagsFromDeletedNote.forEach((tag: any) => {
                const isShouldBeRemoved = remainingNotesText.some((elem: any) => elem.includes(tag));
                if (!isShouldBeRemoved) {
                    dispatch(deleteTag(tag));
                }
            })
        }
        setFilteredNotes(filteredNotes.filter((note: any) => note.id !== ID))
        dispatch(deleteNote(ID));
    }

    const handleEditNote = (id: any, event: any) => {
        const { currentTarget } = event;
        const editedELement = currentTarget?.previousSibling?.firstChild;
        const prevNoteText = notes.find((note: any) => note.id === id);
        const prevTagsFromEditedNote = parseString(prevNoteText.text);
        if (currentTarget?.textContent === 'edit') {
            editedELement.setAttribute('contenteditable', 'true');
            editedELement?.focus();
            setCaret(editedELement);
            currentTarget.childNodes[1].textContent = 'save';
        } else {
            editedELement.removeAttribute('contenteditable');
            currentTarget.childNodes[1].textContent = 'edit';
            const newNoteText = editedELement?.textContent;
            if (!(prevNoteText.text.toLowerCase().trim() === newNoteText.toLowerCase().trim())) {
                editedELement.textContent = newNoteText;
                const tagsFromNewString: any = parseString(newNoteText);
                const remainingNotesText = notes.filter((note: any) => note.id !== id).map((note: any) => note.text);
                prevTagsFromEditedNote?.forEach((tag: any) => {
                    const isShouldBeRemoved = [...remainingNotesText, newNoteText].some((elem: any) => elem.includes(tag));
                    if (!isShouldBeRemoved) {
                        dispatch(deleteTag(tag));
                    }
                })
                if (tagsFromNewString) {
                    tagsFromNewString.forEach((curTag: any) => {
                        if (!mappedTages.includes(curTag)) {
                            dispatch(addTag(curTag));
                        }
                    })
                }
                dispatch(updateNote(id, newNoteText));
            }
            setFilteredNotes([]);
        }
    }

    const handleFilterNotesByTags = (event: any) => {
        const filtered = notes.filter((note: any) => Object.values(note).some((value: any) => value.includes(event?.target?.textContent)));
        setFilteredNotes(filtered);
    }

    const handleHighlight = (event: any) => {
        const { target } = event;
        const text = target.textContent;
        const highlighted = text.replaceAll(/(#\w+)/g, `<span class="highlighted">$1</span>`)
        target.innerHTML = highlighted;
        setCaret(target);
    }

    return (
        <>
            <Stack
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center">
                <NoteInput
                    hintText='What note would you like to leave? You can use the # symbol to create tags'
                    handleInputChange={handleInputChange}
                    noteText={noteText}
                />
                <Button type='add' text='add' handleClick={handleAddNote} />
            </Stack>
            <Box sx={{ width: '50%', m: '0 auto' }}>
                {currentTags?.map((tagData: any) => <Tag tagData={tagData} key={tagData} />)}
            </Box>
            <h2 className='title'>All Tags</h2>
            <Stack
                direction="row"
                marginTop={3}
                spacing={5}
                justifyContent="center"
                alignItems="center" >
                {tags?.map((tagData: any) => <Tag tagData={tagData.text} key={tagData.id} handleFilter={handleFilterNotesByTags} />)}
            </Stack>
            <Stack
                marginTop={3}
                spacing={3}
                justifyContent="center"
                alignItems="center" >
                <h2>Filtered notes</h2>
                {filteredNotes.map((note: any) =>
                    <Note
                        text={note.text}
                        key={note.id}
                        handleNoteDelete={handleDeleteNote}
                        ID={note.id}
                        handleNoteEdit={handleEditNote}
                    />)}
            </Stack>
            <Stack
                marginTop={3}
                spacing={3}
                justifyContent="center"
                alignItems="center" >
                <h2>Notes</h2>
                {notes.map((note: any) =>
                    <Note
                        text={note.text}
                        key={note.id}
                        handleNoteDelete={handleDeleteNote}
                        ID={note.id}
                        handleNoteEdit={handleEditNote}
                        handleHighlight={handleHighlight}
                    />)}
            </Stack>
        </>
    )
}