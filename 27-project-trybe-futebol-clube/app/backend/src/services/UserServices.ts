import { compareSync } from 'bcryptjs';
import { IUser, IResult } from '../Utils/Interfaces';
import Users from '../database/models/Users';
import TokenJWT from '../Utils/JWT';
import statusCode from '../Utils/errorMap';

export default class UserService {
  constructor(
    private _JWT = new TokenJWT(),
    private _userModel = Users,
  ) {}

  postLogin = async (login: IUser): Promise<IResult> => {
    const { email, password } = login;

    if (!email || !password) {
      return { status: statusCode.badRequest, message: { message: 'All fields must be filled' } };
    }

    const result = await this._userModel.findOne({ where: { email } });

    if (!result) {
      return { status: statusCode.unauthorized,
        message: { message: 'Incorrect email or password' },
      };
    }

    const passwordMatches = compareSync(password, result.password);

    if (!passwordMatches) {
      return { status: statusCode.unauthorized,
        message: { message: 'Incorrect email or password' },
      };
    }

    const token = this._JWT.createToken(login);
    return { status: statusCode.ok, message: { token } };
  };

  getRole = async (token: string): Promise<IResult> => {
    const { email } = this._JWT.authentication(token);

    if (!email) {
      return { status: statusCode.unauthorized, message: { message: 'Unauthorized' } };
    }

    const result = await this._userModel.findOne({ where: { email } });

    if (!result) {
      return { status: statusCode.unauthorized, message: { message: 'Unauthorized' } };
    }

    return { status: statusCode.ok, message: { role: result.role } };
  };
}
