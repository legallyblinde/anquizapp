import './Field.scss'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { styled, createTheme } from '@mui/material/styles'
import { purple, red } from '@mui/material/colors'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleCategoryChange, handleDifficultyChange, handleTypeChange } from '../../redux/actions'
import TextFieldComp from '../TextFieldComp/TextFieldComp'

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#f44336',
    },
  },
});


const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[0],
  '&:hover': {
    backgroundColor: purple[50]
  },
}));

const Field = props => {

    const { label, options } = props
    const dispatch = useDispatch();
    const [value, setValue] = useState('')

    const handleChange = (e) => {
      setValue(e.target.value)
      switch (label) {
          case 'Category':
            dispatch(handleCategoryChange(e.target.value))
            break;
          case 'Type':
            dispatch(handleTypeChange(e.target.value))
            break;
          case 'Difficulty':
            dispatch(handleDifficultyChange(e.target.value))
            break;
          default:
            return;
      }
    }

  return (
    <Box marginBottom={3}>
        <FormControl fullWidth size='small'>
            <InputLabel> {label} </InputLabel>
            <Select value= {value} label={label} onChange={handleChange}>
                {options.map(({id, name}) => (
                  <CustomMenuItem className='menuItems' value={id} key={id} style={{ color: "#881ab9" }}>
                     {name} 
                  </CustomMenuItem>
                ))}
            </Select>
        </FormControl>
        </Box>
  )
}

export default Field