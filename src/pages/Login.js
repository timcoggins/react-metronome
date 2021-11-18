import NavBar from "../components/molecules/NavBar";
import MainWindow from "../components/atoms/MainWindow";
import UserMessage from "../components/molecules/UserMessage";

const Login = () => {

    const loginHandler = (e) => {
        e.preventDefault()
    }

    return(
        <>
            <NavBar />
            <MainWindow/>
            <UserMessage title={'Login'}>
                <form onSubmit={loginHandler}>
                    <input type={'text'} placeholder={'Username'}/>
                    <input type={'password'} placeholder={'Password'}/>
                    <input type={'submit'} value={'Login'}/>
                </form>
            </UserMessage>
        </>
    )
}

export default Login;