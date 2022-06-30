import { SchemaOf, ValidationError } from 'yup'

export const validate = async <T = Record<string, any>>(
  scheme: SchemaOf<T>, 
  data: Record<string, any> | null
) => {
  try {
    await scheme.validate(data, { abortEarly: false })
    return {
      isValid: true,
      errors: null
    }
  }
  catch (error) {
    if (error instanceof ValidationError) {
      const { errors } = error
  
      return {
        isValid: false,
        errors
      }
    }
    return {
      isValid: false,
      errors: error
    }
  }
}