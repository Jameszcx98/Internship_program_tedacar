import mutations from './mutations.js'
let Parse = require('../common/parse.js');


const actions = {
	async getHotItems( context ){
		context.state.hotItems = await Parse.Cloud.run('hotItems').then()
	},

	// Add user both to firebase and local state
	addUser (userid, firstname, lastname) {
		let userRef = state.db.collection('users')

		// Add to remote database
		userRef.doc(userid).set({
			firstName : firstname,
			lastName : lastname,
		})

		// Add to local state
		state.allUsers[userid] = {
			firstName : firstname,
			lastName : lastname,
		}

		console.log("Users info: ", state.allUsers);
		console.log("Users count: ", Object.keys(state.allUsers).length);
	},

	// Initialize a conversation
	initConversation ({ rootState }, {user1, user2}) {
		let convoRef = rootState.db.collection('conversations')

		convoRef.add({
			created: Date.now(),
			users: [user1, user2],
			messages: [],
		})
	},

}

export default actions
