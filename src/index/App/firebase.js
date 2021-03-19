import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional
	apiKey: 'AIzaSyAsx-ANM8_Ia3kr8vJ6Nj8JAETXBqNMe6g',
	authDomain:
		'messenger-clone-ff016.firebaseapp.com',
	projectId: 'messenger-clone-ff016',
	storageBucket: 'messenger-clone-ff016.appspot.com',
	messagingSenderId: '126840255110',
	appId: '1:126840255110:web:0f7c94b5787839567f9707',
	measurementId: 'G-8YRT7N8TGJ'
});

const db = firebaseApp.firestore();

export default db;
