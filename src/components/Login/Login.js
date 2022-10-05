import { connect } from "react-redux";
import { Navigate } from "react-router";
import { reduxForm, Field } from "redux-form";
import { createField, Input } from "../../common/FormControls";
import { required } from "../../common/validators";
import { login } from "../../redux/reducers/authReducer";
import style from './Login.module.css';
const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={style.loginForm}>
            {createField("Email", Input, [required], "email", {className: [style.loginFormItem]})}
            {createField("Password", Input, [required], "password", {className: [style.loginFormItem], type: 'password'}) }
            {createField("", Input, [], "rememberMe", {className: [style.loginFormCheckbox], type: 'checkbox'}, "remember me") }

            {props.error && <div className={style.error}>{props.error}</div>}
            {props.captchaUrl && <img src={props.captchaUrl} />}
            {props.captchaUrl && createField("Symbols", Input, [required], "captcha")}
            <div>
                <button className={style.loginFormButton +' ' + 'generalButton'}>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const LoginPage = (props) => {
    const onSubmit = (formData) => {
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

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
}

export default connect(mapStateToProps, { login })(LoginPage);