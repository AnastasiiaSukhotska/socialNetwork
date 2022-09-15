import { connect } from "react-redux";
import { Navigate } from "react-router";
import {reduxForm, Field} from "redux-form";
import { Input } from "../../common/FormControls";
import { required } from "../../common/validators";
import { login } from "../../redux/reducers/authReducer";
const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Email"} component={Input} validate={[required]} name={"email"}/>
            </div>
            <div>
            <Field placeholder={"Password"} component={Input} validate={[required]} name={"password"} type='password'/>
            </div>
            <div>
            <Field  component={"input"} type={"checkbox"} name={"rememberMe"}/>
            remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const LoginPage = (props) => {

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Navigate to='/profile' />
    }
    return (
        <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

let mapStateToProps = (state) => {
    return{
        isAuth: state.auth.isAuth
    }   
}

export default connect(mapStateToProps, {login}) (LoginPage);