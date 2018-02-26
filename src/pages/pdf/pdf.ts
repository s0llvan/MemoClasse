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
import { SelectImagesPage } from '../select-images/select-images';

@IonicPage()
@Component({
    selector: 'page-pdf',
    templateUrl: 'pdf.html',
})
export class PdfPage {
    letterObj = {
        activite: '',
        text: '',
        addSub: '',
        addText: ''
    }

    pdfObj = null;
    student = {
        firstname: "",
        lastname: "",
        pictures: []
    };

    base64string = "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"

    //Le string, venant des photos par exemple

    docDefinition = {
        content: [
            { text: "Rapport de l'élève " + this.student.firstname + " " + this.student.lastname, style: 'header' },
            { text: new Date().toTimeString(), alignment: 'right' },
            { text: 'Classe Xx', style: 'subheader' },
            { text: 'Enseignant : ', style: 'subheader' },
            { text: 'Activité : ' + this.letterObj.activite, style: 'subheader' },
            { image: "data:image/png;base64," + this.base64string, style:'image' },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
            },
            subheader: {
                fontSize: 14,
                bold: true,
            },
            image: {
                width:200,
                margin: [100, 15, 0, 0]
            },
            text: {
                fontSize: 11
            }
        }
    };

    constructor(public navParams: NavParams, private base64: Base64, public navCtrl: NavController, public plt: Platform, private file: File, private fileOpener: FileOpener,private toastCtrl: ToastController,private emailComposer: EmailComposer)
    {
        this.student = navParams.get("student");
    }

    createPdf() {
        this.pdfObj = pdfMake.createPdf(this.docDefinition);
        this.presentToast();
    }

    addImage(){
      for(var i = 0; i< this.student.pictures.length;i++)
      {
          this.docDefinition.content.push({image: 'data:image/png;base64,' + this.student.pictures[i], style:'image'});
      }
    }

    goToSelectImages(){
      this.navCtrl.push(SelectImagesPage, { student: this.student });
    }

    addChamps()
    {
      //this.goToSelectImages();
        this.addActivite();
        this.addSubHeader();
        this.addText();
        this.addImage();

    }

    addActivite(){
        let ac = this.letterObj.activite;
        this.docDefinition.content.push({text: ac,style:'header'},);
    }

    addSubHeader(){
        let head = this.letterObj.addSub;
        this.docDefinition.content.push({text: head,style:'subheader'},);
    }

    addText(){
        let text = this.letterObj.addText;
        this.docDefinition.content.push({text: text,style:'text'},);
    }

    openPdf() {
        if (this.plt.is('cordova')) {
            this.pdfObj.getBuffer((buffer) => {
                var blob = new Blob([buffer], { type: 'application/pdf' });
                // Save the PDF to the data Directory of our App
                this.file.writeFile(this.file.dataDirectory, 'rapportEleve.pdf', blob, { replace: true }).then(fileEntry => {
                // Open the PDf with the correct OS tools
                this.fileOpener.open(this.file.dataDirectory + 'rapportEleve.pdf', 'application/pdf');
            })
        });
    } else {
        // On a browser simply use download!
        this.pdfObj.download();
    }
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
        to: "test@mail.fr",

        attachments: [
            'file://assets/imgs/nx.png'
        ],
        subject: 'Cordova Icons',
        body: 'How are you? Nice greetings from Leipzig',
        isHtml: true
    };

    // Send a text message using default options
    this.emailComposer.open(email);
}
}
