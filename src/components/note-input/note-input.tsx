import TextField from '@mui/material/TextField';

export const NoteInput = ({ hintText, handleInputChange, noteText }: { hintText: string, handleInputChange: any, noteText: string }) => (
    <TextField
        id="outlined-basic"
        label={hintText}
        variant="outlined"
        sx={{ m: 2, width: '40%' }}
        onChange={handleInputChange} value={noteText}
    />
)
