import './App/App.css';
import { useState, useEffect } from 'react';
import { FormControl, Input } from '@material-ui/core';
import Message from './App/Message';
import db from './App/firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);
	const [userName, setUserName] = useState('');

	useEffect(() => {
		db.collection('messages')
			.orderBy('timestamp', 'desc')
			.onSnapshot(snapshot => {
				setMessages(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
			});
	}, []);

	useEffect(() => {
		setUserName(prompt('Plese enter your name'));
	}, []);

	const sendMessage = e => {
		e.preventDefault();
		db.collection('messages').add({
			text: input,
			username: userName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		});
		setInput('');
	};

	return (
		<div className='App'>
			<h1>Public Chat app by Chanathip</h1>
			<h2>{`Welcome ${userName}`}</h2>
			<form className='app__form'>
				<FormControl className='app__formControl'>
					<Input
						className='app__input'
						placeholder='Enter a message...'
						value={input}
						onChange={e => setInput(e.target.value)}
					/>
					<IconButton
						className='app__iconButton'
						disabled={!input}
						variant='contained'
						color='primary'
						type='submit'
						onClick={sendMessage}>
						<SendIcon />
					</IconButton>
				</FormControl>
			</form>
			<FlipMove>
				{messages.map(({ data, id }) => (
					<Message key={id} message={data} username={userName} />
				))}
			</FlipMove>
		</div>
	);
}

export default App;
