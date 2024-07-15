import { useSelector } from 'react-redux';
import { selectTheme } from './reducers/themeSlice';
import { ThemeProvider } from '@mui/material';
import { getThemeByName } from './themes';
import Routes from './routes/routes';
import './App.css';
import "react-quill/dist/quill.snow.css";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
const themeName = useSelector(selectTheme);
const theme = getThemeByName(themeName);
 
  return (    
    <ThemeProvider theme={theme}>
      <Routes />                          
    </ThemeProvider>                     
  );
}

export default App;
