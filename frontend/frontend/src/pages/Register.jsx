import React from "react";
import {useNavigate} from "react-router-dom"



function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")

  
function handleEmail(event) {
    const newValue = event.target.value;
    setEmail(newValue)
  }

  function handlePassword(event) {
    const newValue = event.target.value;
    setPassword(newValue)
  }

  function handleConfirmPassword(event) {
    const newValue = event.target.value;
    setConfirmPassword(newValue)
  }

  async function handleRegister() {
    const url = "http://localhost:3000/auth/register"
    try {
      if (password === confirmPassword) {
        const response = await fetch(url, {method: "POST",  headers: {
    "Content-Type": "application/json"}, body: JSON.stringify({email, password}) 
    })
    if (response.ok) {          
          navigate("/login")
          setEmail("")
          setPassword("")
          setConfirmPassword("")
        } else {
          setError("Registration failed")
        }
} else {
    setError("Passwords do not match") 
  } 
  
  } catch (err) {
    setError("Registration failed")
    console.log(err)
  }
  }

  return (
    <div>
      <h1>Register</h1>
      <input name="email" value={email} onChange={handleEmail} autoComplete="on" placeholder="email"/>
      <input name="password" type="password" value={password} onChange={handlePassword} autoComplete="off" placeholder="password"/>
      <input name="confirmPassword" type="password" value={confirmPassword} onChange={handleConfirmPassword} autoComplete="off" placeholder="confirm password"/>
      <button type="button" onClick={handleRegister}>Register</button>
      <p>{error}</p>
      <a href="/login">Already have an account?</a>
    </div>
  )
}

export default Register