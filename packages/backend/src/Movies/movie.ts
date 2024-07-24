import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("movies")
export class Movie {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  movie_id!: number;

  @Column()
  title!: string;

  @Column()
  poster_path!: string;

  @Column()
  release_date!: string;

  @Column("decimal", { precision: 2, scale: 1 })
  vote_average!: number;

  @Column("simple-array", { nullable: true })
  genre_ids!: number[];
}
