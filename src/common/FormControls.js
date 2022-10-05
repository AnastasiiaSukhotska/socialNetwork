import style from './FormControls.module.css';
import { Field } from 'redux-form';


const FormControl = ({input, meta, ...props}) => {
    let hasError = meta.touched && meta.error;
    return (
        <div className={style.formControl + ' ' + (hasError ? style.error : '')}>
            {props.children}
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}
export const Textarea = (props) => {
    const {input, meta,  ...restProps} = props;
    return <FormControl {...props}>
        <textarea {...input} {...restProps}/>
    </FormControl>
}

export const Input = (props) => {
    const {input, meta,  ...restProps} = props;
    return <FormControl {...props}>
        <input {...input} {...restProps}/>
    </FormControl>
}

export const createField = (placeholder, component, validate, name, props = {}, text = '') => {
    return (
        <div>
        <Field placeholder={placeholder} component={component} validate={validate} name={name} {...props} />
        {text}
    </div> 
    )
}
