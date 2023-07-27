import Chip from '@mui/material/Chip';
import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '../button/button';


export const Note = ({
    text,
    ID,
    handleNoteDelete,
    handleNoteEdit,
    handleHighlight
}:
    {
        text: string,
        ID: any,
        handleNoteDelete?: any,
        handleNoteEdit?: any,
        handleHighlight?: any
    }) => {

    const iconStyles = {
        "&:hover": {
            cursor: 'pointer'
        },
    }

    const chipStyles = {
        border: 'none',
        textAlign: 'center',
        padding: 1,
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)'
    }

    const boxStyles = {
        fontSize: 18,
        padding: 2,
        minWidth: 300,
        border: '1px solid lightgray',
        borderRadius: 15,
        position: 'relative'
    }

    return (
        <Box
            sx={{ display: 'flex', alignItems: 'center' }}
        >
            <Box sx={boxStyles}>
                <Box
                    onKeyUp={(e) => handleHighlight(e)}
                    sx={{ outline: 'none' }}
                >
                    {text}
                </Box>
                <Chip
                    icon={<DeleteIcon sx={iconStyles} color="error"
                        onClick={() => { handleNoteDelete(ID, text) }} />}
                    variant="outlined"
                    sx={chipStyles}
                />
            </Box>
            <Button type='edit' text='edit' handleClick={(e: any) => handleNoteEdit(ID, e)} />
        </Box>
    )
}