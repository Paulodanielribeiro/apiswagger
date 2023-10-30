import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false })
  price: number

  @Column({ default: true })
  inStock: boolean

  @Column({ nullable: false })
  category: string

  @Column({ nullable: true })
  description: string
}