import React from 'react';
import { Modal, Box } from '@mui/material';

// For now, we'll just use a placeholder.
// In the future, we can pass in a list of memes and select one randomly.
const memeUrl = 'https://via.placeholder.com/800x600.png?text=6-7+MEME!';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MemeDisplay = ({ open, onClose }) => {
  if (!open) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="meme-modal-title"
      aria-describedby="meme-modal-description"
    >
      <Box sx={style}>
        <img src={memeUrl} alt="6-7 Meme" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </Box>
    </Modal>
  );
};

export default React.memo(MemeDisplay);
