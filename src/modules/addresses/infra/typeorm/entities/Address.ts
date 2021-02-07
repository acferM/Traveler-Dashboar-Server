import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('addresses')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  zip_code: string;

  @Column()
  street: string;

  @Column()
  neighborhood: string;

  @Column('integer')
  number?: string;
}

export default Address;
