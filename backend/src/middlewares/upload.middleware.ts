import multer from 'multer';
import { Request } from 'express';

const storage = multer.memoryStorage();

// const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
//   // Optional: validate file types
//   const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type.'));
//   }
// };

const disallowed = [
  'application/x-msdownload', // exe
  'application/x-sh',         // sh
  'application/x-bat',        // bat
  'application/x-msi'         // msi
];

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (disallowed.includes(file.mimetype)) {
    cb(new Error('Invalid file type.'));
  } else {
    cb(null, true); // allow everything else
  }
};


export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit
  },
  fileFilter,
});
