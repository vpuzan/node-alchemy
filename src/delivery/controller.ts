import express, { Request, Response, NextFunction } from 'express';
import { validateRequest } from '#/validation/validation';
import { meteorSchema, roverPhotoSchema } from '#/validation/schemas';
import { getLatestPhoto } from '#/use_case/photos';
import { getSortedAndFilteredMeteors } from '#/use_case/meteors';
import { isBoolean } from '#/utils/boolean_utils';
import Exception from '../exception/exception';

const router = express.Router();

router.get('/meteors',
  validateRequest(meteorSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { startDate, endDate, count, wereDangerousMeteors } = req.query;
      const filteredData = await getSortedAndFilteredMeteors(
        startDate as string,
        endDate as string,
        <boolean>isBoolean(count as string),
        <boolean>isBoolean(wereDangerousMeteors as string)
      );
      res.render('../templates/meteors.njk', filteredData);

    } catch (error) {
      if (error instanceof Exception) {
        next(new Exception(error.status, `Error fetching data: ${(error as Error).message}`));
      } else {
        next(new Exception(500, `Error fetching data: ${(error as Error).message}`));
      }
    }
  }
);

router.post(
  '/rover-photo',
  validateRequest(roverPhotoSchema),
  async (req, res, next) => {
    try {
      const {userId, userName, userApiKey} = req.body;
      const {photoUrl, camera} = await getLatestPhoto(userApiKey);
      res.render('../templates/photo.njk', {
        userId,
        userName,
        photoUrl,
        camera,
      });
    } catch (error) {
      if (error instanceof Exception) {
        next(new Exception(error.status, `Error fetching data: ${(error as Error).message}`));
      } else {
        next(new Exception(500, `Error fetching data: ${(error as Error).message}`));
      }
    }
  }
);


export default router;
