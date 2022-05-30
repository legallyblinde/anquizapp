import React from 'react'
import './Home.scss'
import { motion } from 'framer-motion'
import { useNavigate} from "react-router-dom" //replaces useHistory
import { styled } from '@mui/material/styles';
import { Button, CircularProgress, Typography } from '@mui/material'
import { purple } from '@mui/material/colors';
import { Box } from '@mui/system'
import useAxios from '../../hooks/useAxios';
import Field from '../../components/Field/Field'
import TextFieldComp from '../../components/TextFieldComp/TextFieldComp';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[200],
  '&:hover': {
    backgroundColor: purple[300],
  },
}));

const Home = () => {
  
  const { response, error, loading } = useAxios({url:'/api_category.php'})
 
  const navigate = useNavigate()

  if(loading){
    return(
      <Box mt={20}>
          <CircularProgress />
      </Box>
    )
  }

  if(error){
    return(
       <Typography variant='h5' mt={20} color='red'>
          Watch out watch out watch out!
       </Typography>
    )
  }

  const DifficultyOptions = [
    { id: 'easy', name: 'Easy'},
    { id: 'medium', name: 'Medium'},
    { id: 'hard', name: 'Hard'},
  ]

  const TypeOptions = [
    {id: 'multiple', name: 'Multiple Choice'},
    {id: 'boolean', name: 'True or False'},
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/quiz')
  }

  return (
      <Box>
        <motion.h2  
        initial={{x: -65}}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.5 },
          color: "#a746f2"
        }}>
          Quiz App
        </motion.h2>
        <motion.form 
        className='form'
        onSubmit={handleSubmit}
        initial={{x: -65}}
        animate={{ x: 0 }}
        transition={{ duration: 0.7 }}
        >
          <Field className='field' label='Category' options={response.trivia_categories} />
          <Field className='field' label='Difficulty' options={DifficultyOptions} />
          <Field className='field' label='Type' options={TypeOptions} />
          <TextFieldComp />
          <Box>
            <ColorButton fullWidth variant='contained' type='submit'>Less Go</ColorButton>
          </Box>
        </motion.form>
      </Box>
  )
}

export default Home