import Chip from '@mui/material/Chip';

export const Tag = ({tagData, handleFilter} : {tagData: string, handleFilter?: any}) => {

    const chipTagStyles = {
        fontSize: 16, 
        padding: 2.2, 
        minWidth: 120
    }

    return (
        <Chip label={tagData} variant="outlined" sx={chipTagStyles} onClick={(e) => handleFilter(e)}/>
    )
}