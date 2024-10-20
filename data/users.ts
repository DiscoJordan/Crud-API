import { type User } from '../interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';

export class Users {
  private users: User[] = [];

  public getUsers(): User[] {
    return this.users;
  }

  public addUser(data: User): void {
    const newUser = { id: uuidv4(), ...data };
    this.users = [...this.users, newUser];
  }

  public getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  public deleteUserById(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  public updateUserById(id: string, data: User): void {
    this.users = this.users.map((user) => (user.id === id ? { ...user, ...data } : user));
  }
}