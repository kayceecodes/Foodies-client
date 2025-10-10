import { FieldHookConfig, useField } from 'formik';

interface Option {
  label: string;
  value: string;
}

type SelectProps = FieldHookConfig<string> & {
  options: Option[],
  selectProps?: React.SelectHTMLAttributes<HTMLSelectElement>,
}

export function FormikSelect({ options, selectProps, ...fieldProps }: SelectProps ) {
      const [field, meta, helpers] = useField(fieldProps as FieldHookConfig<string>);
      const { setValue } = helpers;

      const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(event.target.value);
      };

      return (
        <select {...field} {...selectProps} onChange={handleChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }