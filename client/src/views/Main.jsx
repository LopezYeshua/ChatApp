import React, { useState, useEffect} from 'react'
import {
    TextField,
    Button,
    Box
} from '@mui/material'
import axios from 'axios'
import ChatForm from '../components/ChatForm'

export default () => {


    return (
        <Box>
            <ChatForm />
        </Box>
    )
}