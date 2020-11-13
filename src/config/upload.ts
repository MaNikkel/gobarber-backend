import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename(req, file, callback) {
      // trata o filename
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}=${file.originalname}`;
      return callback(null, fileName); // retorna isso para o próximo middleware em req.file
    },
  }),
};
