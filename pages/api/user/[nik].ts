import type { NextApiRequest, NextApiResponse } from 'next'

import { getUserByNik } from '../../../libs/user'

const handler = (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const nik = req.query.nik as string

  const user = getUserByNik(nik)

  if (!user) {
    res
      .status(404)
      .json({
        success: false,
        errors: ['nik belum terdaftar! Masukkan ulang nik atau daftar terlebih dahulu'],
        data: {
          user,
          nik
        }
      })
    return
  }

  res
    .status(200)
    .json({
      success: true,
      errors: []
    })
  return
}

export default handler