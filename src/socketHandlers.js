import { executeConsult, executeInsert } from "./api.js";
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const timeZone = 'America/Bogota';

export default function socketHandlers(io) {
    io.on('connection', (socket) => {
        console.log('User has connected!');

        socket.on('disconnect', () => {
            console.log('User has disconnected!');
        })

        socket.on('message_event', async (msg) => {
            const date = new Date();
            const zonedDate = toZonedTime(date, timeZone);
            const formattedDate = format(zonedDate, 'yyyy-MM-dd HH:mm:ss');

            const message_obj = {
                cdate: formattedDate,
                phrase: msg.message,
                user_post: msg.user_sender.user_id,
                conversation_id: msg.conversation_id,
                state: 'sended'
            }

            const message_event = {}

            await executeInsert('message', message_obj).then(
                function (value) {
                    message_obj.id = value.data.id;
                    message_event.message = message_obj;
                    message_event.msg_temp_id = msg.msg_temp_id
                },
                function (error) {
                    message_obj.id = null;
                    message_event.message = message_obj;
                    message_event.error_message = error.error
                    message_event.msg_temp_id = msg.msg_temp_id
                }
            ).finally(
                function () {
                    io.emit(`message_event_${msg.conversation_id}`, message_event);
                }
            )
        })
    })
}