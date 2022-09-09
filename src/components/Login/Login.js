import {reduxForm, Field} from "redux-form";
const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"} component={"input"} name={"login"}/>
            </div>
            <div>
            <Field placeholder={"Password"} component={"input"} name={"pass"}/>
            </div>
            <div>
            <Field  component={"input"} type={"checkbox"} name={"checkbox"}/>
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
        console.log(formData);
    }
    return (
        <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

export default LoginPage;