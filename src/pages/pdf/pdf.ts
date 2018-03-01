  import { Component } from '@angular/core';
  import { IonicPage, NavController,Platform,NavParams } from 'ionic-angular';
  import pdfMake from 'pdfmake/build/pdfmake';
  import pdfFonts from 'pdfmake/build/vfs_fonts';
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  import { File } from '@ionic-native/file';
  import { FileOpener } from '@ionic-native/file-opener';
  import { ToastController } from 'ionic-angular';
  import { EmailComposer } from '@ionic-native/email-composer';
  import { Base64 } from '@ionic-native/base64';

  import { DataProvider } from '../../providers/data-provider/data-provider';
  import { AddActivityPage } from '../add-activity/add-activity';

  @IonicPage()
  @Component({
      selector: 'page-pdf',
      templateUrl: 'pdf.html',
  })
  export class PdfPage {
      test = null;

      pdfObj = null; //objet pdf

      student = {  //etudiant actuel
          firstname: "",
          lastname: "",
          pictures: [],
          mails: []
      };

      selections = null; //la sélections d'images choisies

      activities = [];  //toutes les activités crées


  ///PDF

      docDefinition = {
          content: [


          ],
          styles: {  //styles pour le pdf
              header: {
                  fontSize: 18,
                  bold: true,
              },
              subheader: {
                  fontSize: 14,
                  bold: true,
              },
              text: {
                  fontSize: 11
              }
          }
      };



      destroyImages = true;

      opened = false;
      gotActivities = false;

  /////

      constructor(public navParams: NavParams, public navCtrl: NavController, public plt: Platform, private file: File, private fileOpener: FileOpener,private toastCtrl: ToastController,private emailComposer: EmailComposer,private dataProvider: DataProvider)
      {
          this.student = navParams.get("student");
          this.dataProvider.resetActivities();
          this.docDefinition.content = [];

      }

      createPdf() {

        this.docDefinition.content = [];
        this.selections = this.dataProvider.activities;

        this.addInfos();
        this.addContenus(); //texte et images

          this.pdfObj = pdfMake.createPdf(this.docDefinition);
          this.presentToast();

          if(this.destroyImages == true)
          {
            this.dataProvider.removeImages(this.student);
            this.student.pictures=null;
          }


          this.pdfObj.getBuffer((buffer) => {
              var blob = new Blob([buffer], { type: 'application/pdf' });

              this.file.writeFile(this.file.externalRootDirectory, 'rapportEleve.pdf', blob, { replace: true }).then(fileEntry => {

              this.test = this.file.externalRootDirectory + 'rapportEleve.pdf';
          })
          });
      }

      addInfos(){
        this.docDefinition.content.push(
        { text: "Rapport de l'élève " + this.student.firstname + " " + this.student.lastname, style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },
        { text: 'Classe : Xx', style: 'subheader' },
        { text: 'Enseignant : Xxxx ', style: 'subheader' },);

      }

      addContenus(){

          for(var j = 0;j<this.selections.length;j++)
          {
            this.docDefinition.content.push({ text: "Activité : " + this.selections[j].activite, style: 'header',pageBreak: 'before'});

            for(var i = 0; i< this.student.pictures.length;i++)
            {
              for(var k = 0;k<this.selections[j].pictures.length;k++)
              {
                   if(this.selections[j].pictures[k] == i)
                   {
                     this.docDefinition.content.push({ image: 'data:image/png;base64,' + this.student.pictures[i][1], width: 500 },);
                   }
              }
            }

        }
      }


      goToAddActivity(){

        this.navCtrl.push(AddActivityPage, { student: this.student});
        this.selections=[];
        this.gotActivities = true;
      }


      openPdf() {
        this.opened = true;
        this.pdfObj.getBuffer((buffer) => {
            var blob = new Blob([buffer], { type: 'application/pdf' });

            this.file.writeFile(this.file.externalRootDirectory, 'rapportEleve.pdf', blob, { replace: true }).then(fileEntry => {

            this.fileOpener.open(this.file.externalRootDirectory + 'rapportEleve.pdf', 'application/pdf');
            this.test = this.file.externalRootDirectory + 'rapportEleve.pdf';
        })
        });
  }

  presentToast() {
      let toast = this.toastCtrl.create({
          message: 'Le pdf a bien été généré',
          duration: 3000,
          position: 'top',
          cssClass: "toast"
      });
      toast.present();
  }



  sendMail() {

      let email = {
          to: this.student.mails[0],

            attachments: [this.test],

          subject: "Rapport de l'élève "+this.student.firstname+" "+this.student.lastname,
          body: 'Madame, Monsieur, veuillez trouver ci-joint un rapport contenant les travaux de votre enfant lors de la dernière période scolaire.   Cordialement, le professeur',
          isHtml: true
      };

      // Send a text message using default options
      this.emailComposer.open(email);
  }
  }
