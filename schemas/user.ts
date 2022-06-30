import { setLocale, SchemaOf, string } from 'yup'
import { object } from 'yup'

import type { User } from '../types/user' 

setLocale({
  mixed: {
    required: '${path} harus diisi'
  },
  string: {
    length: '${path} harus memiliki ${length} karakter',
    min: '${path} harus memiliki minimal ${min} karakter',
    matches: ({ path, regex }: any) => {
      if (String(regex) === String(/^\d+$/gm)) {
        return `${path} harus berupa angka`
      }
      if (String(regex) === String(/^[a-zA-Z]+$/gm)) {
        return `${path} harus berupa huruf! Angka dan simbol tidak diperbolehkan`
      }
      return `${path} harus sesuai dengan pola: ${regex}`    
    }
  }
})

export const userValidationSchema: SchemaOf<User> = object().shape({
  nik: string().length(16).matches(/^\d+$/gm).required(),
  name: string().min(2).matches(/^[a-zA-Z]+$/gm).required()
})