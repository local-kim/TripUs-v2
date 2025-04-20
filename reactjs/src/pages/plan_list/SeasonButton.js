import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const SeasonButton = ({season, setSeason, handleSeason}) => {
  
  return (
    <div className='season-btns'>
      <StyledToggleButtonGroup
        value={season}
        onChange={handleSeason}
        aria-label="season"
        exclusive
      >
        <ToggleButton value="spring" aria-label="spring">
          봄
        </ToggleButton>
        <ToggleButton value="summer" aria-label="summer">
          여름
        </ToggleButton>
        <ToggleButton value="autumn" aria-label="autumn">
          가을
        </ToggleButton>
        <ToggleButton value="winter" aria-label="winter">
          겨울
        </ToggleButton>
      </StyledToggleButtonGroup>
    </div>
  );
};

export default SeasonButton;