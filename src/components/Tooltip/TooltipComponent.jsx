import React from 'react';
import { IconButton, Typography } from '@mui/material';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#4B4E53',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#4B4E53',
  },
}));

const TooltipComponent = ({ msg }) => {
  // Split the msg based on <br/> to handle line breaks
  const messageParts = msg.split('<br/>');

  return (
    <BootstrapTooltip
      title={
        <React.Fragment>
          {messageParts.map((part, index) => (
            <Typography key={index} variant="body2" sx={{ letterSpacing: '1px' }}>
              {part}
            </Typography>
          ))}
        </React.Fragment>
      }
      placement="top"
    >
      <IconButton>
        <FaRegQuestionCircle className='text-[#757575] text-sm'/>
      </IconButton>
    </BootstrapTooltip>
  );
}

export default TooltipComponent;
