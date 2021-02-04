import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import uploadConfig from '@config/upload';

@Entity('cities')
class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @Expose({ name: 'image' })
  getImageUrl(): string | null {
    switch (uploadConfig.driver) {
      case 'disk': {
        const names = this.image.split(' ');
        const fixedName = names.reduce((name, word) => {
          const fixedWord = `%20${word}`;

          return name + fixedWord;
        });

        return `${process.env.APP_API_URL}/files/${fixedName}`;
      }

      default: {
        return null;
      }
    }
  }
}

export default City;
