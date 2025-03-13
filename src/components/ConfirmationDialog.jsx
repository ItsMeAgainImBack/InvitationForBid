import { useState } from 'react';
import { Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';


export default function ConfirmationDialog({message, handleResult }) {
    const [open, setOpen] = useState(true);

    const confirm = () => {
        setOpen(false);
        handleResult(true);
    }

    const abort = () => {
        setOpen(false);
        handleResult(false);
    }

    return  <>
            <Dialog open={open} >
                <DialogTitle>Confirmação</DialogTitle>
                <DialogContent>
                    <span>{message}</span>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={confirm} >Sim</Button>
                    <Button variant="outlined" onClick={abort}   >Não</Button>
                </DialogActions>
            </Dialog>
		</>;
}
