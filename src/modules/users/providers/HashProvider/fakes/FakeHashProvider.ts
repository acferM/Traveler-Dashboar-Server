import IHashProvider from '../models/IHashProvider';

class FakeHashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    return `hashed:${payload}`;
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return `hashed:${payload}` === hashed;
  }
}

export default FakeHashProvider;
