import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CitySelect = ({city, setCity, handleCity}) => {

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-standard-label">도시</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={city}
          onChange={handleCity}
          label="City"
        >
          <MenuItem value="">
            <em>전체</em>
          </MenuItem>
          <MenuItem value={101}>춘천</MenuItem>
          <MenuItem value={105}>강릉</MenuItem>
          <MenuItem value={108}>서울</MenuItem>
          <MenuItem value={115}>울릉도</MenuItem>
          <MenuItem value={119}>수원</MenuItem>
          <MenuItem value={133}>대전</MenuItem>
          <MenuItem value={136}>안동</MenuItem>
          <MenuItem value={140}>군산</MenuItem>
          <MenuItem value={146}>전주</MenuItem>
          <MenuItem value={159}>부산</MenuItem>
          <MenuItem value={168}>여수</MenuItem>
          <MenuItem value={184}>제주도</MenuItem>
          <MenuItem value={201}>인천</MenuItem>
          <MenuItem value={221}>제천</MenuItem>
          <MenuItem value={247}>남원</MenuItem>
          <MenuItem value={283}>경주</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default CitySelect;