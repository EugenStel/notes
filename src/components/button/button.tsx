import Btn from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';

const iconTypes: any = {
    edit: {
        component: EditIcon,
        variant: 'contained'
    },
    add: {
        component: SendIcon,
        variant: 'contained'
    }
};

export const Button = ({ type, text, handleClick }: { type: string, text?: string, handleClick: any }) => {
    const Icon = iconTypes[type].component;

    return <Btn
                startIcon={<Icon />}
                onClick={handleClick}
                variant={iconTypes[type].variant}
                sx={{m:2}}
            >
                {text}
            </Btn>
};