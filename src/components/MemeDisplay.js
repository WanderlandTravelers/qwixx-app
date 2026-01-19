import React from 'react';
import { Modal, Box } from '@mui/material';

import meme1 from '../assets/meme1.gif';
import meme2 from '../assets/meme2.gif';
import meme3 from '../assets/meme3.gif';
import meme4 from '../assets/meme4.gif';
import meme5 from '../assets/meme5.gif';
import meme6 from '../assets/meme6.gif';
import meme7 from '../assets/meme7.gif';

const memes = [meme1, meme2, meme3, meme4, meme5, meme6, meme7];

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

  const randomMeme = memes[Math.floor(Math.random() * memes.length)];

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="meme-modal-title"
      aria-describedby="meme-modal-description"
    >
      <Box sx={style}>
        <img src={randomMeme} alt="Random Meme" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </Box>
    </Modal>
  );
};

export default React.memo(MemeDisplay);
