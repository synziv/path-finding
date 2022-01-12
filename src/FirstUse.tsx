import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Button, Dialog, DialogContentText } from '@mui/material';




export default function FirstUse() {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Path finding visualization</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span>
                You can visualize the Djkstra algorithm using this web app:)
            </span>
            <br />
            <span>
                Using the menu, on your left, you can modify the grid. 
                You can move aroung the menu if it's in your way.
            </span>
            <br />
            <span>
                You can add walls by selecting the 
                <Button variant='outlined'>Wall</Button>
                button and drawing on the grid.
                To remove them ,simply click an already placed wall with the button selected
            </span>
            <br />
            <span>
                You can reposition the origin and the finish position by selecting their respecting button 
                <Button variant='outlined'>Origin</Button>
                and clicking anywhere on the grid.
            </span>
            <br />
            <span>
                You can reset everything by using the 
                <Button  variant='outlined' color="error">Clear</Button>
                button.
            </span>
            <br />
            <span>
                To start the visualization use the 
                <Button variant='outlined' >START!</Button> 
                button
            </span>
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Got it!</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}