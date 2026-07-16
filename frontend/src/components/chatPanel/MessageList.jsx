import MessageCard from "./MessageCard";

function MessageList({ messages }) {

    if (messages.length === 0) {
        return (
            <div className="empty-state">
               
            </div>
        );
    }

    return (
        <div className="message-list">

            <h3 className="message-log-title">
                Live Message Log
            </h3>

            {messages.map((message) => (
                <MessageCard
                    key={message.messageId}
                    message={message}
                />
            ))}

        </div>
    );
}

export default MessageList;