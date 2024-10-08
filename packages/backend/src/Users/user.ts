import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ReactionType } from "../Interfaces/types";
@Entity("users")
export class User {
  [x: string]: any;
  static findById(userId: string) {
    throw new Error("Method not implemented.");
  }
  static findByIdAndUpdate(_id: any, arg1: { refreshToken: any }) {
    throw new Error("Method not implemented.");
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: true })
  email!: string;

  @Column({ nullable: true })
  name!: string;

  @Column({ nullable: true })
  aboutMe!: string;

  @Column({ nullable: true })
  country!: string;

  @Column({ nullable: true, select: false })
  password!: string;

  @Column({ default: false })
  isAdmin!: boolean;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: "text", nullable: true })
  refreshToken!: string | null;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt!: Date;

  @Column("simple-array", { nullable: true })
  bookmarkedMovies!: number[];

  @Column("simple-array", { nullable: true })
  recentActivity!: string[];

  @Column("simple-array", { nullable: true })
  ratedMovies!: number[];

  @Column("simple-array", { nullable: true })
  watchLaterMovies!: number[];

  @Column("json", { nullable: true })
  reactions!: { [movieId: number]: ReactionType };
}
