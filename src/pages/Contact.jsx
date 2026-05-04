import "../assets/styles/Contact.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

import ErrorMessage from "../components/ui/ErrorMessage";
import SuccessMessage from "../components/ui/SuccessMessage";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { sendMessage } from "../services/messageService";

const Contact = () => {

    // react-hook-form setup
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // submit handler
    const onSubmit = async (data) => {

        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            await sendMessage(data.name, data.email, data.message);

            setSuccess("Bericht succesvol verzonden!");
            reset(); // form leegmaken

        } catch (err) {
            console.error(err);
            setError("Verzenden mislukt. Probeer later opnieuw.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="contact_page">
            <div className="contact_container">

                <h1>Contact</h1>

                <p className="contact_intro">
                    Heeft u vragen, feedback of opmerkingen? Vul het onderstaande contactformulier in en wij nemen zo snel mogelijk contact met u op.
                </p>
                <ErrorMessage message={error} />
                <SuccessMessage message={success} />
                {loading && <LoadingSpinner />}

                <form className="contact_form" onSubmit={handleSubmit(onSubmit)}>

                    {/* Naam */}
                    <label htmlFor="contact-name">Naam</label>
                    <input
                        id="contact-name"
                        type="text"
                        autoComplete="name"
                        {...register("name", {
                            required: "Naam is verplicht",
                            minLength: {
                                value: 2,
                                message: "Minimaal 2 karakters"
                            }
                        })}/>
                    {errors.name && (
                        <p className="auth_error">{errors.name.message}</p>
                    )}

                    {/* Email */}
                    <label htmlFor="contact-email">Email</label>
                    <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        {...register("email", {
                            required: "Email is verplicht",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Ongeldig emailadres"
                            }
                        })}/>
                    {errors.email && (
                        <p className="auth_error">{errors.email.message}</p>
                    )}

                    {/* Bericht */}
                    <label htmlFor="contact-message">Bericht</label>
                    <textarea
                        id="contact-message"
                        rows="5"
                        autoComplete="off"
                        {...register("message", {
                            required: "Bericht is verplicht",
                            minLength: {
                                value: 10,
                                message: "Minimaal 10 karakters"
                            }
                        })}/>
                    {errors.message && (
                        <p className="auth_error">{errors.message.message}</p>
                    )}

                    <button
                        className="primary_btn"
                        type="submit"
                        disabled={loading}>
                        {loading ? "Versturen..." : "Verstuur bericht"}
                    </button>

                </form>

            </div>
        </section>
    );
};

export default Contact;