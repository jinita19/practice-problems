import React, { useState } from 'react';
import './styles.css'

function ContactForm() {
    const [submitScreen, setSubmitScreen] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) { newErrors.name = "Name is required"; }

        if (!form.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
            newErrors.email = "Invalid email format"
        }

        if (!form.message.trim()) {
            newErrors.message = "Message is required"
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
        } else {
            setSubmitScreen(true);
            setErrors({});
            setForm({ name: "", email: "", message: "" });
        }
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    return (
        <div style={{
            padding: "10px", maxWidth: "400px", border: "1px solid gray",
            borderRadius: "2px",
            boxShadow: "0 4px 8px gray",
            margin: "10px auto"
        }}>
            {submitScreen ? (
                <h2> Thank you, {form.name || "User"}!</h2>
            ) :
                (<form onSubmit={handleSubmit}>
                    <div style= {{marginBottom: "10px"}}>
                        <label htmlFor="name"> Name: </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "3px" }}
                        />
                        {errors.name && (
                            <p style={{ color: "red" }}>{errors.name}</p>
                        )}
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                        <label htmlFor="email"> Email: </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "3px" }}
                        />
                        {errors.email && (
                            <p style={{ color: "red" }}>{errors.email}</p>
                        )}
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                        <label htmlFor="message"> Message: </label>
                        <textarea
                            id="message"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            style={{ width: "100%", padding: "3px" }}
                        />
                        {errors.message && (
                            <p style={{ color: "red" }}>{errors.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "5px",
                            backgroundColor: "#007bff",
                            border:"none",
                            color: "white",
                            cursor: "pointer",
                            borderRadius: "4px"
                        }}
                    >
                    Submit
                    </button>

                </form >)}
        </div>
    );
}

export default ContactForm;