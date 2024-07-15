import { createTheme } from "@mui/material/styles";
declare module '@mui/material/styles' {
  interface Palette {
    backgroundColor?: Palette['primary'];
    borderColor?: Palette['primary'];
    fontColor?: Palette['primary'];
    btnColor?: Palette['primary'];
    cardBgColor?: Palette['primary'];

  }
  interface PaletteOptions {
    backgroundColor?: Palette['primary'];
    borderColor?: Palette['primary'];
    fontColor?: Palette['primary'];
    btnColor?: Palette['primary'];
    cardBgColor?: Palette['primary'];
  }
  interface BreakpointOverrides {
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    bxs: true,
    bsm: true,
    bmd: true,
    blg: true,
  }
}

export const darkTheme = createTheme({
  palette: {        
    primary: {
      main: "#161c22",            
      dark: '#0e0f12',
      light: '#fff',            
    },
    secondary: {
      main: '#212419',
      dark: '#212419',      
    },
    warning: {
      main: '#c99509',
      light: '#e9d811',
      dark: '#c99509'
    },
    success: {
      main: '#4f802d',
      light: '#2a2a2e'
    },    
    background: {
      default: '#2d3140',
    },                
    fontColor: {
      main: '#fff',
      dark: '#000'   ,
      light: '#fff',
      contrastText: 'font'
    },
    backgroundColor: {
      main: "#000",            
      dark: '#0e0f12',
      light: '#fff',
      contrastText: 'bgColor'
    },
    cardBgColor: {
      main: '#26263a',
      light: '#726f6f',
      dark: '#726f6f',
      contrastText: '#726f6f'
    }
  },  
  breakpoints: {
    values: {
      xs: 0,
      bxs: 400,
      sm: 600,
      bsm: 768,      
      md: 900,
      bmd: 1024,     
      lg: 1200,
      blg: 1400,
      xl: 1536,      
    }
  }
});