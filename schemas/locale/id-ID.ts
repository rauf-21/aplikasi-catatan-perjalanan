import type { LocaleObject } from 'yup/lib/locale'

const locale: LocaleObject = {
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
}

export default locale