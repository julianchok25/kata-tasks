import '../assets/scss/Login.scss';
import { useState } from 'react';
import axios from 'axios';

function Login({ setToken }: { setToken: (token: string) => void }) {
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<String | any>('');

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
                <label htmlFor="username">Username <span>*</span></label>
                <input type="text" value={username} placeholder="write your username" id='username' onChange={(e) => setUserName(e.target.value)} />

                <label htmlFor="password">Password <span>*</span></label>
                <input type="password" value={password} placeholder="write your password" id="password" onChange={(e) => setPassword(e.target.value)} />

                <button disabled={!username || !password} type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login