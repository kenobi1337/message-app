import { Typography } from '@material-ui/core';
import React, { forwardRef } from 'react';
import './Message/Message.css';
import { Card, CardContent } from '@material-ui/core';

const Message = forwardRef(({ message, username }, ref) => {
	const isUser = username === message.username;

	return (
		<div ref={ref} className={`message ${isUser && 'message__user'}`}>
			<Card className={isUser ? 'message__userCard' : 'message__guestCard'}>
				<CardContent>
					<Typography color='white' variant='h5' component='h2'>
						{!isUser && `${message.username || 'Unknown'}: `} {message.text}
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
});

export default Message;
