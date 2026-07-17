import "./chatpanel.css";

function MessageCard({ message }) {

    const statusClass = {
        IN_TRANSIT: "status-transit",
        QUEUED: "status-queued",
        DELIVERED: "status-delivered",
        REJECTED: "status-rejected"
    };

    const priorityClass = {
        NORMAL: "priority-normal",
        SOS: "priority-sos"
    };

    return (

        <div className="message-card">

            <div className="card-header">

                <h4>
                    {message.senderId} ➜ {message.receiverId}
                </h4>

            </div>

            <p className="message-text">
                {message.payload}
            </p>

            <div className="card-badges">

                <span className={`status ${statusClass[message.status]}`}>
                    {message.status}
                </span>

                <span className={`priority ${priorityClass[message.priority]}`}>
                    {message.priority}
                </span>

            </div>

            <div className="route">

                <strong>Route:</strong>{" "}
                {message.hopPath.join(" → ")}

            </div>

        </div>

    );
}

export default MessageCard;