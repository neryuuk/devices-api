import { HttpStatus, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundExceptionFilter } from './not-found.exception-filter';

const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({
    json: mockJson
}));
const mockGetResponse = jest.fn().mockImplementation(() => ({
    status: mockStatus
}));
const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
    getResponse: mockGetResponse,
    getRequest: jest.fn()
}));
const mockArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn()
};

describe('NotFoundExceptionFilter', () => {
  let filter: NotFoundExceptionFilter

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotFoundExceptionFilter],
    }).compile()

    filter = module.get(NotFoundExceptionFilter)
  })

  it('should be defined', () => {
    expect(filter).toBeDefined()
  })

  it('should respond with appropriate error', async () => {
    filter.catch(
      new NotFoundException(),
      mockArgumentsHost,
    )
    expect(mockStatus).toBeCalledWith(HttpStatus.NOT_FOUND)
    expect(mockJson).toBeCalledWith({
      statusCode: HttpStatus.NOT_FOUND,
      message: "Entry not found",
    })
  })
})
