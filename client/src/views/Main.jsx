import React, { useState } from 'react'
import {
    Box, FormControl,
    TextField, Button,
    Grid, Typography,
    Paper, Fab,
    Container
} from '@mui/material'
import NavigationIcon from '@mui/icons-material/Navigation'
import { useEffect } from 'react'
import io from 'socket.io-client'

export default () => {
    const [state, setState] = useState({message: '', username: ''})
    const [messages, setMessages] = useState([])
    const [socket] = useState(() => io(':8000'))


    useEffect(() => {
        socket.on('message', ({message, username}) => {
            setMessages([...messages, {message, username}])
        })
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const {message, username} = state
        socket.emit("message", {message, username})
        console.log(socket)
        setState({message: '', username})
        return () => socket.disconnect(true);
    }

    const stateChange = ( e ) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    const showChat = () => {
        return messages.map(({message, username}, index) => {
            if (username === state.username) {
                return (
                    <div className="styleUserOneText" key={index}>
                        <p>
                            {message}
                        </p>
                    </div>
                )
            }
            else
                return (
                    <div key={index}>
                        <p className="styleUserTwoText" >{message}</p>
                        <p>
                            From: {username}
                        </p>
                    </div>
                )
        })
    }

    return (
        <Paper
            className="chatPaper"
            elevation={20}>
                <div className="chatDisplay">
                    {showChat()}
                </div>
                <FormControl 
                    className="chatForm" 
                    component="form" 
                    onSubmit={handleSubmit}>
                    <Fab 
                        className="fab"
                        type="submit" 
                        variant="extended" 
                        size="medium"
                        aria-label="add">
                        <NavigationIcon 
                            className="navigation"/>
                        <p>Send</p>
                    </Fab>
                    <TextField 
                        className="mui-text"
                        name="username" 
                        value={state.username} 
                        onChange={(e) => { stateChange(e) }}
                        label="username" />
                    <TextField 
                        className="mui-text"
                        name="message"
                        value={state.message}
                        onChange={(e) => { stateChange(e) }} 
                        label="message" />
                </FormControl>
        </Paper>
    )
}