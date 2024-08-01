import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  movie_id!: number;

  @Column()
  userId!: number;

  @Column("json")
  criteriaRatings!: {
    cast: number;
    plot: number;
    direction: number;
    cinematography: number;
    writing: number;
    themes: number;
  };

  @Column("decimal", { precision: 3, scale: 1 })
  rating!: number;

  @Column("text")
  comment!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
