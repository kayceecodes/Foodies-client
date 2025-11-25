import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { FieldHookConfig, useField } from 'formik';
import { MailLockOutlined, SvgIconComponent } from '@mui/icons-material';

type FormikTextFieldProps = FieldHookConfig<string> & 
    Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'onBlur'> & {
        startIcon?: SvgIconComponent;
    };

export default function FormikTextField({label, startIcon, ...props}: FormikTextFieldProps): React.JSX.Element {
    const [field, meta] = useField(props);
    const showError = Boolean(meta.touched && meta.error);
    const StartIcon = startIcon;

    return (
        <TextField
            {...field}
            {...props}
            label={label}
            error={showError}
            helperText={showError ? meta.error : props.helperText}
            fullWidth
            slotProps={{
                input: StartIcon ? { 
                    startAdornment: (
                        <InputAdornment position="start">
                            {StartIcon ? 
                                <StartIcon sx={{ fontSize: 18, color: "#87b3ad"}} />
                                :
                                null}
                        </InputAdornment>
                    ),
                } : undefined,
            }}
        />
    )
}
