import { TextField, TextFieldProps } from '@mui/material';
import { FieldHookConfig, useField } from 'formik';


type FormikTextFieldProps = FieldHookConfig<string> & Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur'>;

export default function FomikTextField({label, ...props}:FormikTextFieldProps): React.JSX.Element {
    const [field, meta] = useField(props);
    const showError = Boolean(meta.touched && meta.error);

    return (
        <TextField
            {...field}
            {...props}
            label={label}
            error={showError}
            helperText={showError ? meta.error : props.helperText}
            fullWidth
        />
    )

}



