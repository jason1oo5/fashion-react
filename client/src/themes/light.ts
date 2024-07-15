import { createTheme } from '@mui/material/styles';
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


export const lightTheme = createTheme({
  palette: {        
    primary: {
      main: "#23507c",            
      light: '#0e0f12',
      dark: '#f9f8fb',            
    },
    secondary: {
      main: '#212419',
      dark: '#fff',      
      light: '#939ca2'
    },
    warning: {
      main: '#c99509',
      light: '#3c3a3a',
      dark: '#444141'
    },
    success: {
      main: '#4f802d',
      light: '#4f802d'
    },    
    background: {
      default: '#eef0f8',      
    },                
    fontColor: {
      main: '#fff',
      dark: '#000',
      light: '#3c3a3a',
      contrastText: 'font'
    },
    backgroundColor: {
      main: "#000",            
      light: '#4fa116',
      dark: '#f9f8fb',            
      contrastText: 'bgColor'
    },
    cardBgColor: {
      main: '#726f6f',
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