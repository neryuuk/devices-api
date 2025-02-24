import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenEditException } from '../errors';
import { ForbiddenEditExceptionFilter } from './forbidden-edit.exception-filter';

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

describe('ForbiddenEditExceptionFilter', () => {
  let filter: ForbiddenEditExceptionFilter

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForbiddenEditExceptionFilter],
    }).compile()

    filter = module.get(ForbiddenEditExceptionFilter)
  })

  it('should be defined', () => {
    expect(filter).toBeDefined()
  })

  it('should respond with appropriate error', async () => {
    filter.catch(
      new ForbiddenEditException(),
      mockArgumentsHost,
    )
    expect(mockStatus).toBeCalledWith(HttpStatus.BAD_REQUEST)
    expect(mockJson).toBeCalledWith({
      statusCode: HttpStatus.BAD_REQUEST,
      message: `Cannot alter devices while in-use`,
    })
  })
})
