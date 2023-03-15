import { ResultSetHeader } from 'mysql2/promise';
import { IUser, INewUser } from '../utils/interfaces';
import mysql from './connection';

class UserModel {
  private connection = mysql;

  public async insertUser(user: INewUser): Promise<IUser> {
    const { username, classe, level, password } = user;

    const [result] = await this.connection.execute<ResultSetHeader>(
      `INSERT INTO Trybesmith.Users (username, classe, level, password)
      VALUES (?, ?, ?, ?)`,
      [username, classe, level, password],
    );

    const { insertId } = result;

    return { id: insertId, ...user };
  }
}

export default UserModel;
