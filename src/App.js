import './App.css';
import { useState, useEffect } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Message from './component/Message';
import db from './config/firebase';
import firebase from 'firebase';

function App() {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);
	const [userName, setUserName] = useState('');

	useEffect(() => {
		db.collection('messages')
			.orderBy('timestamp', 'asc')
			.onSnapshot(snapshot => {
				setMessages(snapshot.docs.map(doc => doc.data()));
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
			<h2>Welcome {userName}</h2>
			<form>
				<FormControl>
					<InputLabel>Enter a message....</InputLabel>
					<Input value={input} onChange={e => setInput(e.target.value)} />
					<Button disabled={!input} variant='contained' color='primary' type='submit' onClick={sendMessage}>
						Send Message
					</Button>
				</FormControl>
			</form>

			{messages.map(obj => (
				<Message message={obj} username={userName} />
			))}
		</div>
	);
}

export default App;
