import { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { createUserRoute } from '../../../routes/UserRoutes';
import { useNotificationApi } from "../../Alert"
import { createLoginRoute } from '../../../routes/LoginRoutes';
import { useNavigate } from 'react-router-dom';
import Input from "../../Input"
import './style.css';

const Register = () => {
    const notification = useNotificationApi();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRetype, setPasswordRetype] = useState('');

    const navigate = useNavigate();

    const resetValues = () => {
        setName("")
        setEmail("")
        setPassword("")
        setPasswordRetype("")
    }

    const handleRegister = async (event) => {
        event.preventDefault()

        try {
            const response = await createUserRoute({ name, email, password });
            if (response) { await createLoginRoute({ email, password });}
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
    }

    return (
        <div className="register-wrapper">
            <div className="register">
                <h1>Cadastro</h1>
                <form onSubmit={handleRegister} className="register-form">
                    <div className="form-group">
                        <Input
                            label={"Nome"}
                            inputType={"text"}
                            placeholder={"nome"}
                            icon={<UserOutlined className='input-icon' />}
                            data={name}
                            setData={setName}
                        />
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
                            icon={<LockOutlined className='input-icon' />}
                            data={[password, passwordRetype]}
                            setData={[setPassword, setPasswordRetype]}
                        />

                        <button onClick={handleRegister}>Cadastrar novo usuário</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;