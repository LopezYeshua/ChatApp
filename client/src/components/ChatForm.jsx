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
                    <div key={index}>
                        <Typography>{username}: {message}</Typography>
                    </div>
                )
            }
        })
    }

    return (
        <>
            <Paper
            className="chatPaper"
            elevation={20}
            sx={{
                width: "50vw", // changes width of paper based on viewwidth
                height: "70vh", // changes height of paper based on viewheight
                margin: "0 auto", // centers paper
                // padding: "10px",
                borderRadius: ".5rem"
            }}>
                <Container>
                    {showChat()}
                </Container>
                <Box className="chatBox">
                    <FormControl className="chatForm" component="form" onSubmit={handleSubmit}>
                        <Fab className="position-in-message" type="submit" variant="extended" size="medium" sx={{backgroundColor: "#4ab599", width: "7em", margin: "0 auto"}} aria-label="add">
                            <NavigationIcon className="navigation" sx={{ color: "white" }} />
                            <p>Send</p>
                        </Fab>
                        <TextField name="username" value={state.username} onChange={(e) => { stateChange(e) }} label="username" />
                        <TextField name="message" value={state.message} onChange={(e) => { stateChange(e) }} label="message" />
                        {/* <Button className="chatButton" type="submit" variant="contained">Submit</Button> */}
                    </FormControl>
                </Box>
            </Paper>
        </>
    )
}