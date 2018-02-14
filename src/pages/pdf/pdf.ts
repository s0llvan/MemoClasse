import { Component } from '@angular/core';
import { IonicPage, NavController,Platform } from 'ionic-angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { ToastController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';


@IonicPage()
@Component({
    selector: 'page-pdf',
    templateUrl: 'pdf.html',
})
export class PdfPage {
    letterObj = {
        to: '',
        text: ''
    }
    test =null;
    pdfObj = null;
    constructor(public navCtrl: NavController, public plt: Platform, private file: File, private fileOpener: FileOpener,private toastCtrl: ToastController,private emailComposer: EmailComposer) { }

    createPdf() {
        var docDefinition = {
            content: [
                { text: 'PDF GENERE', style: 'header' },
                { text: new Date().toTimeString(), alignment: 'right' },


                { text: 'To', style: 'subheader' },
                this.letterObj.to,

                { text: 'Texte' + this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },

                {
                    ul: [
                        'Bacon',
                        'Rips',
                        'BBQ',
                    ]
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                },
                subheader: {
                    fontSize: 14,
                    bold: true,
                    margin: [0, 15, 0, 0]
                },
                story: {
                    italic: true,
                    alignment: 'center',
                    width: '50%',
                }
            }
        }
        this.pdfObj = pdfMake.createPdf(docDefinition);
        this.presentToast();
    }

    openPdf() {
        if (this.plt.is('cordova')) {
            this.pdfObj.getBuffer((buffer) => {
                var blob = new Blob([buffer], { type: 'application/pdf' });

                // Save the PDF to the data Directory of our App
                this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
                // Open the PDf with the correct OS tools

                this.test = fileEntry;


                this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
            });
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
    this.lolToast();
}

lolToast() {
    let toast = this.toastCtrl.create({
        message: this.file.dataDirectory,
        duration: 10000,
        position: 'top',
        cssClass: "toast"
    });
    toast.present();
}

sendMail() {
    let email = {
        to: this.letterObj.to,

        attachments: [
            this.test
        ],
        subject: 'Cordova Icons',
        body: 'How are you? Nice greetings from Leipzig',
        isHtml: true
    };

    // Send a text message using default options
    this.emailComposer.open(email);
}

}
