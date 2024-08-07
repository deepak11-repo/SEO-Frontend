import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressCircle = ({score, pathColor}) => {
  const roundedScore = Math.round(score);
  return (
    <div className='w-[75px]'>
        <CircularProgressbar 
            value={roundedScore} 
            text={`${roundedScore}`} 
            counterClockwise
            styles={buildStyles({
                pathColor: pathColor,
                textSize: '25px',
                textColor: 'black',
            })}
            className='font-semibold'
        />
    </div>
  )
}

export default ProgressCircle