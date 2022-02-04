import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import firebaseApp from './config/Firebase_config';
import Sesion from './componentes/Sesion';
import Registro from './componentes/Registro';
import Respuesta from './componentes/Respuesta';
import Themes from './theme/Themes';
import { ThemeProvider } from 'styled-components';
import './App.css';
import SwitchTheme from './componentes/SwitchTheme';

const auth = getAuth(firebaseApp);

export default function App () {
  const [user, setUser] = useState(null);
  const [ theme, setTheme ] = useState('light');

  onAuthStateChanged( auth, ( usuarioFirebase ) => {
    if ( usuarioFirebase ) {
      setUser(usuarioFirebase)
    }else{
      setUser(null);
    }
  });

  return (
    <>
      <ThemeProvider theme={Themes[theme]} >
        <SwitchTheme theme={theme} setTheme={setTheme} />
        <Router>
          <Routes>
            <Route exact path='/' element={ <Sesion/> } />

            <Route path='/registro' element={ <Registro/> } />

            <Route path='/respuesta' element={ <Respuesta/> } />

          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}
