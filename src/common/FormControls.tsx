
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import { ValidatorsType } from './validators';

const style =require('./FormControls.module.css');

type FormControlPropsType = {
   meta: WrappedFieldMetaProps
   children: React.ReactNode
}
const FormControl = ({meta, ...props}: FormControlPropsType) => {
    let hasError = meta.touched && meta.error;
    return (
        <div className={style.formControl + ' ' + (hasError ? style.error : '')}>
            {props.children}
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}
export const Textarea = (props: WrappedFieldProps) => {
    const {input, meta,  ...restProps} = props;
    return <FormControl {...props}>
        <textarea {...input} {...restProps}/>
    </FormControl>
}

export const Input = (props: WrappedFieldProps) => {
    const {input, meta,  ...restProps} = props;
    return <FormControl {...props}>
        <input {...input} {...restProps}/>
    </FormControl>
}

export function createField<T extends string>  (placeholder: string | undefined, component: React.FC<WrappedFieldProps>, validate: Array<ValidatorsType>, name: T, props = {}, text = '')  {
    return (
        <div>
        <Field placeholder={placeholder} component={component} validate={validate} name={name} {...props} />
        {text}
    </div> 
    )
}
