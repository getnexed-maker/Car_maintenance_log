import React from "react";
import {useNavigate} from "react-router-dom"



function Login () {
    const navigate = useNavigate()
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = React.useState("")


function handleEmail(event) {
    const newValue = event.target.value;
    setEmail(newValue)
  }

  function handlePassword(event) {
    const newValue = event.target.value;
    setPassword(newValue)
  }

async function handleSubmit () {
    const url = "http://localhost:3000/auth/login"
    try {
        const response = await fetch(url, {method: "POST",  headers: {
    "Content-Type": "application/json"}, body: JSON.stringify({email, password})
  })
            
    if (response.ok) {
            const token = await response.json();
            localStorage.setItem("token", token.token)
            navigate("/cars")
            setEmail("")
            setPassword("")

    } else {
        setError("Wrong email or password")
    }
       
        
           
    } catch (err) {
        console.log(err)
    }
}

return (
<div>
  <h1>Car maintenance log</h1>
    <div>
    <form>
        <input name="email" value={email} onChange={handleEmail}/>
        <input name="password"value={password} onChange={handlePassword}/>
        <button onClick={handleSubmit}>submit</button>
        <p>{error}</p>
    </form>
  </div>
  </div>
)
}

export default Login