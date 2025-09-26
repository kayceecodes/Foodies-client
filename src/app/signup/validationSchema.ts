import * as Yup from 'yup';


const stateAbbreviations = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA",
    "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT",
    "VA", "WA", "WV", "WI", "WY"
  ];

const passwordSchema = Yup.string()
  .matches(/^[A-Z]/, 'Password must start with an uppercase letter')
  .matches(/(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])/, 'Password must contain at least one special character')
  .matches(/(?=(.*\d){2,})/, 'Password must contain at least two digits')
  .min(8, 'Password must be at least 8 characters long')
  .required('Password is required');



const addressSchema = {      
  address: Yup.object({
    street: Yup.string()
      .matches(
        /^[a-zA-Z0-9\s.,'-]+$/,
        'Street address is invalid (only letters, numbers, spaces, and .,- are allowed)'
      )
      .required('Street address is required'),
    
    city: Yup.string()
      .matches(
        /^[a-zA-Z\s-]+$/,
        'City name is invalid (only letters, spaces, and hyphens are allowed)'
      )
      .required('City is required'),
      
    state: Yup.string()
      .oneOf(stateAbbreviations, 'State must be a valid U.S. state abbreviation')
      .required('State is required'),
  
    zip: Yup.string()
      .matches(
        /^\d{5}(-\d{4})?$/,
        'ZIP code must be 5 digits or in the 5+4 format (e.g., 12345 or 12345-6789)'
      )
      .required('ZIP code is required'),
  })
}
  
const ValidationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: passwordSchema,
  address: addressSchema.address
});

export default ValidationSchema