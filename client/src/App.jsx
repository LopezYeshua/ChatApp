import './App.css'
import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import {
  Routes,
  Route,
  Link as RouterLink
} from 'react-router-dom'
import {
  Link,
  Typography
} from '@mui/material'
import Main from './views/Main'

function App() {

  return (
    <>
      <Typography variant="h4" sx={{fontFamily: 'rubik'}}>
        <Link
        sx={{
          textAlign: "center",
          color: "#4ab599"
        }}
        component={RouterLink}
        to="/"
        underline="none">
          <h1>Hello Chat</h1>
        </Link>
      </Typography>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
