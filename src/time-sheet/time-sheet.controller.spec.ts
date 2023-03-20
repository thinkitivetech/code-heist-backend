import { HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TimeSheetController } from './time-sheet.controller';
import { TimeSheetService } from './time-sheet.service';

describe('TimeSheetController', () => {
  let timeSheetController: TimeSheetController;
  let timeSheetService: TimeSheetService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TimeSheetController],
      providers: [TimeSheetService],
    }).compile();

    timeSheetService = moduleRef.get<TimeSheetService>(TimeSheetService);
    timeSheetController = moduleRef.get<TimeSheetController>(TimeSheetController);
  });

  describe('status', () => {
    it('should update time sheet status', async () => {
      const timeSheetReq: any = { };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(timeSheetService, 'updateStatus').mockResolvedValue(undefined);

      await timeSheetController.status(timeSheetReq, response);

      expect(timeSheetService.updateStatus).toHaveBeenCalledWith(timeSheetReq, response);
      expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        message: 'Time sheet status updated successfully',
        data: null,
      });
    });

    it('should return error response if service throws an error', async () => {
      const timeSheetReq: any = { };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const error = new Error('Test error');

      jest.spyOn(timeSheetService, 'updateStatus').mockRejectedValue(error);

      await timeSheetController.status(timeSheetReq, response);

      expect(timeSheetService.updateStatus).toHaveBeenCalledWith(timeSheetReq, response);
      expect(response.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(response.json).toHaveBeenCalledWith({
        success: false,
        message: 'It seems there is some technical glitch at our end, Unable to un',
        error_code: HttpStatus.INTERNAL_SERVER_ERROR,
        data: error.message,
      });
    });
  });

  describe('getTimeSheet', () => {
    it('should get time sheet', async () => {
      const timeSheetRequest: any = { };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.spyOn(timeSheetService, 'getTimeSheet').mockResolvedValue(undefined);

      await timeSheetController.getTimeSheet(timeSheetRequest, response);

      expect(timeSheetService.getTimeSheet).toHaveBeenCalledWith(timeSheetRequest, response);
      expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        message: 'Time sheet fetched successfully',
        data: null,
      });
    });

    it('should return error response if service throws an error', async () => {
      const timeSheetRequest: any = { };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const error = new Error('Test error');

      jest.spyOn(timeSheetService, 'getTimeSheet').mockRejectedValue(error);

      await timeSheetController.getTimeSheet(timeSheetRequest, response);

    });
  })
})