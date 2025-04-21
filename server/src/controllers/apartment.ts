// controller of the Apartment
import { Request, Response } from 'express';
import { z } from 'zod';
import httpResponse from '../lib/httpResponse.ts';
import uploadImage from '../lib/uploadImage.ts';
import apartment from '../models/apartment.ts';


// number of apartments per page for pagination
const perPage = 6;


// query type
interface Query {
  price?: {
    $gte?: number;
    $lte?: number;
  };
  area?: {
    $gte?: number;
    $lte?: number;
  };
  unitName?: string;
  unitNumber?: number;
  project?: string;
}



// get all the apartments
export const getAllApartments = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      priceFrom = null,
      priceTo = null,
      areaFrom = null,
      areaTo = null,
      unitName = null,
      unitNumber = null,
      project = null,
    } = req.query;

    // creating the query object for filtering
    const query: Query = {};
    if (unitName) query.unitName = unitName as string;
    if (project) query.project = project as string;
    if (unitNumber) query.unitNumber = Number(unitNumber);
    if (priceFrom) {
      query.price = { $gte: Number(priceFrom) };
    }
    if (priceTo) {
      query.price = { ...query.price, $lte: Number(priceTo) };
    }
    if (areaFrom) {
      query.area = { $gte: Number(areaFrom) };
    }
    if (areaTo) {
      query.area = { ...query.area, $lte: Number(areaTo) };
    }

    // quering in parallel for better performance
    const [total, data] = await Promise.all([
      //1- total number of documents in database
      //2- quering database with the queries and pagination
      apartment.countDocuments(query),
      apartment
        .find(query)
        .skip(((Number(page) || 1) - 1) * perPage)
        .limit(perPage),
    ]);

    httpResponse(
      200,
      'data retrieved successfully',
      {
        data,
        pagination: {
          perPage,
          total,
          currentPage: Number(page),
          lastPage: Math.ceil(total / perPage) || 1,
        },
      },
      res
    );
  } catch (err) {
    httpResponse(500, 'internal server error', {}, res);
  }
};

//get a specific apartment from database by its id
export const getApartmentById = async (req: Request, res: Response) => {
  try {
    // recieving the id from request params
    const id = req.params.id;
    const data = await apartment.findById(id);
    httpResponse(200, 'data retrieved successfully', { data }, res);
  } catch (err) {
    httpResponse(500, 'internal server error', {}, res);
  }
};

// create a new apartment

// validation schema
const apartmentSchema = z.object({
  unitName: z.string().min(3),
  unitNumber: z.coerce.number().int().min(1),
  price: z.coerce.number().min(500000),
  area: z.coerce.number().min(10),
  bedRooms: z.coerce.number().int().min(1),
  bathRooms: z.coerce.number().int().min(1),
  project: z.string().min(3),
  location: z.string().min(3),
  description: z.string().optional(),
});
export const createApartment = async (req: Request, res: Response) => {
  try {
    const images = req.files as Express.Multer.File[];

    // validation of request data
    const result = apartmentSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        errors: result.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      });
      return;
    }

    if (!images || images.length == 0)
      httpResponse(400, 'upload at least one image of the apartment', {}, res);

    // uploading images
    const uploads = images.map((image) => uploadImage(image));
    const imageUrls = await Promise.all(uploads);

    // saving to database
    const apartmentDoc = new apartment({ ...req.body, images: imageUrls });
    await apartmentDoc.save();

    //sending response
    httpResponse(
      201,
      'apartment created successfully',
      { ...req.body, images: imageUrls },
      res
    );
  } catch (err) {
    httpResponse(500, 'internal server error', {}, res);
  }
};
