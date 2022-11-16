import UserModel from '../models/user.model';
import { INewUser } from '../utils/interfaces';
import TokenJWT from '../utils/tokenJWT';

class UserService {
  public user = new UserModel();

  public tokenJWT = new TokenJWT();

  public async insertUser(user: INewUser): Promise<string> {
    const result = await this.user.insertUser(user);
    const token = this.tokenJWT.generateToken(result);

    return token;
  }
}

export default UserService;
