import { Table, PrimaryGeneratedColumn,ManyToOne, Column } from 'ionic-orm'
import {Eleve} from "./Eleve";

@Table()
export class Photo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @ManyToOne(type => Eleve, eleve => eleve.photos)
    eleve: Eleve;

}
