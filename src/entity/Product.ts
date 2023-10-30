import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'float' }) // Use 'float' para representar valores de preço como números de ponto flutuante
  price: number;

  @Column({ nullable: false })
  quantity: number;


  @Column({ nullable: false })
  description: string;
}
