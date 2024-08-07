import { LinearProgress } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const ReportLoader = () => {
  // Access the loadingProgress from the Redux store
  const loadingProgress = useSelector((state) => state.reportLoader.loadingProgress);

  // Determine the message based on the progress
  const getMessage = () => {
    if (loadingProgress < 25) {
      return "Generating the SEO Audit Report";
    } else if (loadingProgress < 50) {
      return "SEO Audit Report is in Progress";
    } else if (loadingProgress < 75) {
      return "SEO Audit Report is Almost Done";
    } else if (loadingProgress < 100) {
      return "Finalizing SEO Audit Report";
    } else {
      return "SEO Audit Report Completed";
    }
  };

  return (
    <div className='bg-white p-5 rounded-lg'>
      <div className='text-xl m-3 pb-4 font-semibold'>{getMessage()}</div>
      <div className='flex items-center'>
        <LinearProgress 
          className='m-3 flex-grow'
          variant="determinate" 
          value={loadingProgress} 
          style={{ flexGrow: 1 }} // Ensure the LinearProgress fills the remaining space
        />
        <span className='ml-3 text-lg font-semibold'>{loadingProgress}%</span>
      </div>
    </div>
  );
}

export default ReportLoader;
