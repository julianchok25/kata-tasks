import '../assets/scss/Login.scss';
import { useState } from 'react';
import axios from 'axios';

function Login({ setToken }: { setToken: (token: string) => void }) {
    const [username, setUserName] = useState<string>();
    const [password, setPassword] = useState<String>();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        axios.post('http://localhost:3000/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                username,
                password
            }
        })
        .then((response) => {
            const { token } = response.data;
            setToken(token);
        })
        .catch(error => {
            console.error(error);
        });
      }

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form className='form-container' onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder="write your username" id='username' onChange={(e) => setUserName(e.target.value)} />

                <label htmlFor="username">Username</label>
                <input type="password" placeholder="write your password" id="password" onChange={(e) => setPassword(e.target.value)} />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login