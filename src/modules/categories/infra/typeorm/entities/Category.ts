import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import uploadConfig from '@config/upload';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  icon: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'icon' })
  getIconUrl(): string | null {
    switch (uploadConfig.driver) {
      case 'disk': {
        const words = this.icon.split(' ');
        const fixedPath = words.reduce((path, word) => {
          const fixedWord = `%20${word}`;

          return path + fixedWord;
        });

        return `${process.env.APP_API_URL}/files/${fixedPath}`;
      }

      default: {
        return null;
      }
    }
  }
}

export default Category;
