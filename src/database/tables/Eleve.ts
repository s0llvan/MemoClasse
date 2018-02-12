import { Table, PrimaryGeneratedColumn,OneToMany, Column } from 'ionic-orm'
import {Photo} from "./Photo";

@Table()
export class Eleve {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  email1: string;

  @Column("text")
  email2: string;

  @Column("text")
  nom: string;

  @Column("text")
  prenom: string;

  @OneToMany(type => Photo, photo => photo.eleve) // note: we will create author property in the Photo class below
   photos: Photo[];
}
