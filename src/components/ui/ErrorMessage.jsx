import "../../assets/styles/ui/Messages.css";

const ErrorMessage = ({ message }) => {

    if (!message) return null;
    return (
        <div className="message message_error">
            {message}
        </div>
    );
};

export default ErrorMessage;
