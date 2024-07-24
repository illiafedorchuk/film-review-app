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
  movieId!: number;

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

  @Column()
  rating!: number;

  @Column("text")
  comment!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
