import './Score.scss'
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { handleAmountChange, handleScoreChange } from "../../redux/actions";
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { motion } from "framer-motion"


const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[200],
  paddingLeft: 10,
  paddingRight: 10,
  '&:hover': {
    backgroundColor: purple[300],
  },
}))


const Score = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { score } = useSelector((state) => state);

  const handleBackToSettings = () => {
    dispatch(handleScoreChange(0));
    dispatch(handleAmountChange(10));
    navigate("/");
  };

  return (
    <Box mt={10}>
      <Typography variant="h3" fontWeight="bold" mb={3}>
        You Got <br/> 
        <motion.h1
        className='score'
        initial={{x: -35}}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.5 },
          color: "#a746f2"
        }}>
        {score}
        </motion.h1> <br/>
        Points
      </Typography>
      <ColorButton onClick={handleBackToSettings}>
        Go at it again
      </ColorButton>
      <Typography fontSize={10} mt={10}>Cand Dev</Typography>
    </Box>
  );
};

export default Score;