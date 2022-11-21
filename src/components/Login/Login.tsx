import { connect } from "react-redux";
import { Navigate } from "react-router";
import { reduxForm, InjectedFormProps } from "redux-form";
import { createField, Input } from "../../common/FormControls";
import { required } from "../../common/validators";
import { login } from "../../redux/reducers/authReducer";
import { AppStateType } from "../../redux/redux-store";
import style from './Login.module.css';

type MapStateToPropsType = {
    isAuth: boolean,
    captchaUrl: string | null
}
type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}

type LoginFormOwnProps = {
    captchaUrl: string | null
}

type LoginFormValuesType = {
    email: string, 
    password: string, 
    rememberMe: boolean, 
    captcha: string | null
}

type LoginFormKeys = Extract <keyof LoginFormValuesType, string>

const LoginForm = (props :InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps ) => {
    return (
        <form onSubmit={props.handleSubmit} className={style.loginForm}>
            {createField<LoginFormKeys>("Email", Input, [required], "email", {className: [style.loginFormItem]})}
            {createField<LoginFormKeys>("Password", Input, [required], "password", {className: [style.loginFormItem], type: 'password'}) }
            {createField<LoginFormKeys>(undefined, Input, [], "rememberMe", {className: [style.loginFormCheckbox], type: 'checkbox'}, "remember me") }

            {props.error && <div className={style.error}>{props.error}</div>}
            {props.captchaUrl && <img src={props.captchaUrl} />}
            {props.captchaUrl && createField<LoginFormKeys>("Symbols", Input, [required], "captcha")}
            <div>
                <button className={style.loginFormButton +' ' + 'generalButton'}>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm);

const LoginPage: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Navigate to='/profile' />
    }
    return (
        <div className={style.loginContainer}>
            <h1>Login</h1>
            <LoginReduxForm  onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    )
}

let mapStateToProps = (state: AppStateType) : MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps, { login })(LoginPage);