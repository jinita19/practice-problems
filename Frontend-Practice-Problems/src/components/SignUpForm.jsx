import React, { useState } from "react";
import "./SignUpForm.scss";

const configs = [
  { id: "name", label: "Username", type: "text" },
  { id: "email", label: "Email", type: "text" },
  { id: "password", label: "Password", type: "password" },
  { id: "conPassword", label: "Confirm Password", type: "password" },
];

export default function SignUpForm() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    conPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validateInput = () => {
    const { name, email, password, conPassword } = input;
    const newErrors = {};
    const userRegex = /^[a-zA-Z](?:[a-zA-Z0-9_]{3,20})$/;
    const emailRegex = /^[a-zA-Z0-9._]{3,30}@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    const pwdRegex = /^[a-zA-Z0-9$%._!]{6,12}$/;
    if (name.trim() === "" || !userRegex.test(name)) {
      newErrors.name =
        "Name should be length between 4 to 20 and should start with letter";
    }
    if (email.trim() === "" || !emailRegex.test(email)) {
      newErrors.email = "Enter correct email!";
    }
    if (password.trim() === "" || !pwdRegex.test(password)) {
      newErrors.password = "Password should be between 6 to 12";
    }
    if (conPassword !== password) {
      newErrors.conPassword = "Password is not getting matched!";
    }
    return newErrors;
  };

  const handleInputChange = (e, key) => {
    setInput((prev) => {
      return {
        ...prev,
        [key]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateInput();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      alert("User Signed Up!");
      setErrors({});
      setInput({
        name: "",
        email: "",
        password: "",
        conPassword: "",
      });
    }
  };
  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      {configs.map((key, index) => {
        return (
          <div className="input-row">
            <label htmlFor={key.id}>{key.label}</label>
            <input
              type={key.type}
              value={input[key.id]}
              onChange={(e) => handleInputChange(e, key.id)}
              id={key.id}
              name={key.id}
            />
            {errors[key.id] && <div>{errors[key.id]}</div>}
          </div>
        );
      })}
      <button type="submit">Sign Up!</button>
    </form>
  );
}
