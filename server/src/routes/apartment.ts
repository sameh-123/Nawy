import express from 'express';
import multer from 'multer';
import {
  getAllApartments,
  createApartment,
  getApartmentById,
} from '../controllers/apartment.ts';

//configuration of multer for handling uploaded images in form data
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 10,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// setting up the apartment router
const router = express.Router();

// router to get all the apartmets
router.get('/', getAllApartments);

//router to get specific apartmet with id
router.get('/:id', getApartmentById);

//router to create apartment
router.post('/', upload.array('images'), createApartment);

export default router;
