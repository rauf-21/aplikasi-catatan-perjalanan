import { setLocale, SchemaOf, object, string } from 'yup'

import type { User } from '../types/user' 
import locale from './locale/id-ID'

setLocale(locale)

export const userValidationSchema: SchemaOf<User> = object().shape({
  nik: string().length(16).matches(/^\d+$/gm).required(),
  name: string().min(2).matches(/^[a-zA-Z]+$/gm).required()
})