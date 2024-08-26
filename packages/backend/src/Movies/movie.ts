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

  @Column({ nullable: true })
  backdrop_path!: string;

  @Column()
  release_date!: string;

  @Column("decimal", { precision: 2, scale: 1 })
  vote_average!: number;

  @Column("simple-array", { nullable: true })
  genre_ids!: number[];

  @Column("json", {
    default: {
      like_count: 0,
      love_count: 0,
      smile_count: 0,
      wow_count: 0,
      sad_count: 0,
      angry_count: 0,
    },
  })
  fastReactions!: {
    like_count: number;
    love_count: number;
    smile_count: number;
    wow_count: number;
    sad_count: number;
    angry_count: number;
  };
}
