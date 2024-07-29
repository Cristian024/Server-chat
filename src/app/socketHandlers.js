import { insertMessage, updateMessagesState } from '../controllers/eventController.js'

export default function socketHandlers(io) {
    io.on('connection', (socket) => {
        console.log('User has connected!');

        socket.on('disconnect', () => {
            console.log('User has disconnected!');
        })

        socket.on('message_event', async (event) => {
            switch (event.type) {
                case 'insert': {
                    io.emit(`incoming_message_event_${event.message.conversation_id}`, await insertMessage(event.message));
                    break;
                }
                case 'update_state_to_viewed':{
                    console.log(`emite evento ${event.messages.conversation_id}`);
                    io.emit(`state_message_event_${event.messages.conversation_id}`, await updateMessagesState(event.messages))
                    break;
                }
            }
        })
    })
}