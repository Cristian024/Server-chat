import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { executeInsert, executeUpdate } from '../service/api.js'

const timeZone = 'America/Bogota';

export const insertMessage = async (msg) => {
    const date = new Date();
    const zonedDate = toZonedTime(date, timeZone);
    const formattedDate = format(zonedDate, 'yyyy-MM-dd HH:mm:ss');

    const message_obj = {
        cdate: formattedDate,
        phrase: msg.phrase,
        user_post: msg.user_sender.user_id,
        conversation_id: msg.conversation_id,
        state: 'sended'
    }

    const message_event = {}

    await executeInsert('message', message_obj).then(
        function (value) {
            message_obj.id = value.data;
            message_event.message = message_obj;
            message_event.msg_temp_id = msg.msg_temp_id
        },
        function (error) {
            message_obj.id = null;
            message_obj.state = 'failed'
            message_event.message = message_obj;
            message_event.error_message = error.error
            message_event.msg_temp_id = msg.msg_temp_id
        }
    )

    return message_event;
}

export const updateMessagesState = async (msgs) => {
    const obj = {
        state: 'viewed',
        list: msgs.list
    }

    var response = {
        affected_rows: 0,
        list: null,
        state: null
    };

    await executeUpdate('messages_state_list', obj, null).then(
        function (value) {
            response.affected_rows = value.data.affected_rows
            response.list = value.data.messages
            response.state = value.data.state
        }, function (error) {

        }
    )

    return response
}