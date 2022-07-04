import { setLocale, SchemaOf, object, string, number } from 'yup'

import { TravelLog } from '../types/travel-log'
import locale from './locale/id-ID'

setLocale(locale)

export const travelLogValidationSchema: SchemaOf<TravelLog> = object({
  user_nik: string().length(16).matches(/^\d+$/gm).required(),
  date: string().matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/gm).required(),
  time: string().matches(/^([0-1]?[0-9]|2[0-3])-[0-5][0-9]$/gm).required(),
  location: string().min(1).required(),
  bodyTemperature: number().required()  
})