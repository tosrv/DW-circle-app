import { register } from '../src/features/auth/auth.controller';
import * as authRepo from '../src/features/auth/auth.repository';
import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';

jest.mock('../src/features/auth/auth.repository');
jest.mock('bcrypt');

jest.mock('../src/middleawares/async', () => ({
  asyncHandler: (fn: any) => fn,
}));

describe('Auth Controller - register (success)', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
    jest.clearAllMocks();
  });

  test('should register user successfully', async () => {
    req.body = {
      username: 'tosrv',
      fullname: 'Tosrv User',
      email: 'tosrv@example.com',
      password: '123456',
    };

    (authRepo.findUserByUsername as jest.Mock).mockResolvedValue(null);
    (authRepo.findEmail as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpass');
    (authRepo.adduser as jest.Mock).mockResolvedValue({
      id: 1,
      username: 'tosrv',
      fullname: 'Tosrv User',
      email: 'tosrv@example.com',
    });

    await register(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      message: 'Registration successful, please login',
      data: {
        id: 1,
        username: 'tosrv',
        fullname: 'Tosrv User',
        email: 'tosrv@example.com',
      },
    });

    expect(next).not.toHaveBeenCalled();
  });
});
