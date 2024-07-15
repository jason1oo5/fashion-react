import { m } from 'framer-motion';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, SxProps } from '@mui/material';

import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from '@mui/material/CircularProgress';

// import ProgressBar from './ProgressBar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  right: 0,
  bottom: 0,
  zIndex: 99999,
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#2c3241',
}));

// ----------------------------------------------------------------------

type Props = {
  isDashboard?: boolean;
  sx?: SxProps;  
  circularProps?: CircularProgressProps;
};

export default function LoadingScreen({ isDashboard, circularProps, ...other }: Props, ) {
  return (
    <>      
      {isDashboard && (
        <RootStyle {...other}>
          <Box sx={{ textAlign: 'center' }}>
            <m.div
              animate={{
                scale: [1, 0.9, 0.9, 1, 1],
                opacity: [1, 0.48, 0.48, 1, 1],
              }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                repeatDelay: 1,
                repeat: Infinity,
              }}
            >
              <img src='/assets/images/navbar/eflogo.png' />            
            </m.div>          
            {/* <CircularProgress 
              sx={{ 
                color: 'white', 
                width: '25px !important', 
                height: '25px !important', 
                mt: 1
                }} /> */}    
              <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                  color: 'white',
                  animationDuration: '550ms',
                  // position: 'absolute',
                  // left: 0,
                  [`& .${circularProgressClasses.circle}`]: {
                    strokeLinecap: 'round',
                  },
                }}
                size={25}
                thickness={4}
                {...circularProps}
              />
          </Box>
        </RootStyle>
      )}
    </>
  );
}
