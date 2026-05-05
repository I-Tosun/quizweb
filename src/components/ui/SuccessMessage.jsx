import "../../assets/styles/ui/Messages.css";

const SuccessMessage = ({ message }) => {

    if (!message) return null;
    return (
        <div className="message message_success">
            {message}
        </div>
    );
};

export default SuccessMessage;