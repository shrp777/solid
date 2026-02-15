export type User = {
  id: string;
  firstname: string;
  lastname: string;
};

export type UserId = string;

export interface Repository<T, U> {
  save(record: T): Promise<T>;
  update(record: T): Promise<T>;
  delete(id: U): Promise<boolean>;
  findOne(id: U): Promise<T | null>;
  findAll(): Promise<Array<T>>;
  count(): Promise<number>;
  exportCSV(): Promise<string>;
}

export class UserRepository implements Repository<User, UserId> {
  async save(record: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async update(record: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async findOne(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  async count(): Promise<number> {
    throw new Error("Method not implemented.");
  }
  async exportCSV(): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
