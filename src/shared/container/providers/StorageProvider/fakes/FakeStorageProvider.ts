import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private files: string[] = [];

  async saveFile(file: string): Promise<string> {
    this.files.push(file);

    return file;
  }

  async deleteFile(file: string): Promise<void> {
    const findIndex = this.files.findIndex(fileName => fileName === file);

    this.files.splice(findIndex, 1);
  }
}

export default FakeStorageProvider;
