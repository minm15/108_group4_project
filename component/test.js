//仍在測試中

//import React from "react";
//import { palette } from '@material-ui/system';
import { createTheme } from '@mui/material/styles';

//setting
/*
const Chiptheme = createTheme({
    components: {
      MuiChip: {
        variants: [
          {
            //props: { variant: 'dashed' },
            
            style: {
                bgcolor: "#757575",
                color: "info",
                size:"small"
            },
          },
          
        ],
      },
    },
  });

  export default Chiptheme;

*/



//
export const list = createTheme({
  components: {
    MuiListItem: {
      styleOverrides: {
      root: {
        backgroundColor: "yellow",
        
        "&$selected": {
          backgroundColor: "red",
          "&:hover": {
            backgroundColor: "orange",
          },
        },
      },

      button: {
        "&:hover": {
          backgroundColor: "yellow",
        },
      },
      }
    },
  },
});



//export default list;
/*






import * as React from 'react';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const CustomizedSlider = styled(Slider)`
  color: #20b2aa;

  :hover {
    color: #2e8b57;
  }

  & .MuiSlider-thumb {
    border-radius: 1px;
  }
`;

export default function StyledComponentsDeep() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider defaultValue={30} />
      <CustomizedSlider defaultValue={30} />
    </Box>
  );
}
*/