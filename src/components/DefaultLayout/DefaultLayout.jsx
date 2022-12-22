import React from 'react';
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import axiosClient from "../../configs/axios";
import {toastError} from "../../configs/toasts";

const DefaultLayout = ({children}) => {
    const [isLogin, setIsLogin] = React.useState(false);
    const [username, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');

    React.useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, [children]);

    const handleSubmit = () => {
        const info = {
            username,
            password
        }
        const check = async () => {
            try {
                const user = await axiosClient.post('auth/login', info);
                if (user._id) setIsLogin(true);
            } catch (e) {
                toastError(e.response.data)
            }
        }

        check()
    }

    return (
        <>
            {!isLogin ? <div className="main">

                    <form action="" method="POST" className="form" id="form-1">
                        <h3 className="heading">Đăng nhập</h3>
                        <div className="spacer"></div>
                        <div className="form-group">
                            <label htmlFor="fullname" className="form-label">Tên tài khoản</label>
                            <input id="fullname" name="fullname" type="text" placeholder="Nhập tên tài khoản"
                                   onChange={event => setUserName(event.target.value)}
                                   className="form-control"/>
                            <span className="form-message"></span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Mật khẩu</label>
                            <input id="password" name="password" type="password" placeholder="Nhập mật khẩu"
                                   className="form-control"
                                   onChange={event => setPassword(event.target.value)}
                            />
                            <span className="form-message"></span>
                        </div>
                        <button type={'button'} className="form-submit" onClick={handleSubmit}>Đăng nhập</button>
                    </form>
                </div>
                : <div>
                    <div className='sidebar'><Sidebar/></div>
                    <section className='home-section'>
                        <nav><Navbar/></nav>
                        <div className='home-content'>
                            {children}
                        </div>
                    </section>
                </div>}
        </>
    )
}


export default DefaultLayout;