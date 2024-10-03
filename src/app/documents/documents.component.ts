import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../notification/notification.service';
import { NotifyOpts } from '../notification/notification.model';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  files: File[] = [];
  uploadForm!: FormGroup;
  data= [
    {
      name: 'Documento 1',
      folder: 'Carpeta 1',
      auth: 'no',
      url: 'https://www.google.com'
    },
    {
      name: 'Documento 2',
      folder: 'Carpeta 2',
      auth: 'si',
      url: 'https://www.google.com'
    },
    {
      name: 'Documento 3',
      folder: 'Carpeta 1',
      auth: 'si',
      url: 'https://www.google.com'
    },
    {
      name: 'Documento 4',
      folder: 'Carpeta 2',
      auth: 'si',
      url: 'https://www.google.com'
    }
  ]
  

  constructor(private fb: FormBuilder, private notify: NotificationService) { 
    this.uploadForm = this.fb.group({
      documentName: ['', Validators.required],  // Campo de nombre de documento obligatorio
    });
  }

  ngOnInit(): void {
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.files = Array.from(input.files);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.files = Array.from(event.dataTransfer.files);
    }
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
  }

  onSubmit(): void {
    if (this.uploadForm.valid && this.files.length > 0) {
      const formData = new FormData();
      formData.append('documentName', this.uploadForm.get('documentName')?.value);
      
      this.files.forEach(file => {
        formData.append('files', file);
      });

      console.log('Formulario enviado:', formData);
    }
  }

  openNotify(){
debugger
    let notificacion: NotifyOpts = {
      title:'notificación',
      message: 'Prueba de la notificación',
      icon:'info'

    }

    this.notify.open(notificacion)

  }

}
