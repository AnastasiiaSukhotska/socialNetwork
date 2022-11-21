import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FC } from 'react';
import { FilterType } from '../../redux/reducers/usersPageReducer';

type PropsType = {
    onFilterChange: (filter: FilterType) => void
}

type FormType = {
    term: string
    friend: 'true' | 'false' | 'null'
}

export const UsersSearchingFilter: FC<PropsType> = ({ onFilterChange }) => {
    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
       onFilterChange(filter);
        setSubmitting(false)
    }
    return <div>
        <Formik
            initialValues={{ term: '', friend: 'null' }}
            validate={values => {
                const errors = {};
                return errors;
            }}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Followed</option>
                        <option value="false">Unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>
    </div>
};

