import './Quiz.scss'
import { styled } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { decode } from "html-entities";
import { motion } from "framer-motion"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useAxios from '../../hooks/useAxios'
import { handleScoreChange } from '../../redux/actions'

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(deepPurple[500]),
  backgroundColor: deepPurple[200],
  '&:hover': {
    backgroundColor: deepPurple[300],
  },
}));

const Quiz = () => {

  const {
    question_category, 
    question_difficulty, 
    question_type, 
    amount_of_questions,
    score,
  } = useSelector(state => state)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  let apiURL = `/api.php?amount=${amount_of_questions}`
  if(question_category){
    apiURL = apiURL.concat(`&category=${question_category}`)
  }
  if(question_difficulty){
    apiURL = apiURL.concat(`&difficulty=${question_difficulty}`)
  }
  if(question_type){
    apiURL = apiURL.concat(`&type=${question_type}`)
  }

  const { response, loading, error } = useAxios({url: apiURL})

  const [questionIndex, setQuestionIndex] = useState(0)
  const [options, setOptions] = useState([])

  useEffect(() => {
    if(response?.results.length){
      const question = response.results[questionIndex]
      let answers = [...question.incorrect_answers]
      answers.splice(
        getRandomInt(question.incorrect_answers.length), 
        0,
        question.correct_answer
      )
      setOptions(answers)
    }
  }, [response, questionIndex]) //need to put a dependency
  
 
  if(loading){
    return(
      <Box mt={20}>
          <CircularProgress />
      </Box>
    )
  }

  const handleClickAnswer = (e) => {
    const question = response.results[questionIndex];
    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 1));
     
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      navigate("/score");
    }
  }

  return (
    <Box>
      
      <p>{decode(response.results[questionIndex].question)}</p>
      {options.map((data, id) => (
        <Box mt={2} key={id}>
          <ColorButton  className='button' onClick={handleClickAnswer} variant="contained" width> 
          {decode(data)} 
          </ColorButton>
        </Box>
      ))}
      <Box mt={4}> 
        Score: {score} / {response.results.length} 
      </Box>

    </Box>
  )
}

export default Quiz