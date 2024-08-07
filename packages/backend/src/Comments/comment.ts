import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../Users/user";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  movie_id!: number;

  @Column()
  text!: string;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;

  @Column()
  like_count!: number;

  @Column()
  dislike_count!: number;

  @Column("int", { array: true, default: () => "ARRAY[]::INTEGER[]" })
  user_likes!: number[];

  @Column("int", { array: true, default: () => "ARRAY[]::INTEGER[]" })
  user_dislikes!: number[];

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: "userId" })
  user!: User;
}
