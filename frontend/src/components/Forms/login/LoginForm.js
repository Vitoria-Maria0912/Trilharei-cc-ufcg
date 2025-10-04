import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { getTokenByUserEmailRoute } from '../../../routes/LoginRoutes';
import './style.css';
import Input from "../../Input"
import { useNotificationApi } from '../../Alert';

const CreateLogin = () => {
    const notification = useNotificationApi();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const resetValues = () => {
        setEmail("")
        setPassword("")
    }

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await getTokenByUserEmailRoute({ email, password });
            localStorage.setItem("token", response.data.login.token);
            setTimeout(() => {
                navigate('/planning');
            }, 2000);

            notification.success({
                message: 'Success!',
                description: response.data.message,
            });
            
            resetValues();
        } catch (error) { 
            const data = error.response.data;
            const message = data.error ?? data.message ?? "Server is not running!";
            notification.error({
                message: 'Error!',
                description: message,
            });
        }
    };

    return (
        <div className="login-wrapper">
            <div className='login'>
                <h1>Login</h1>
                <form onSubmit={handleLogin} className='login-form'>
                    <Input
                        label={"Email"}
                        inputType={"text"}
                        placeholder={"e-mail"}
                        icon={<UserOutlined className='input-icon' />}
                        data={email}
                        setData={setEmail}
                    />
                    <Input
                        label={"Password"}
                        inputType={"password"}
                        placeholder={"senha"}
                        duplicatedPass={false}
                        icon={<LockOutlined className='input-icon' />}
                        data={password}
                        setData={setPassword}
                    />
                    <button onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default CreateLogin;