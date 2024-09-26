import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      url: 'https://www.google.com'
    },
    {
      name: 'Documento 2',
      folder: 'Carpeta 2',
      url: 'https://www.google.com'
    },
    {
      name: 'Documento 3',
      folder: 'Carpeta 1',
      url: 'https://www.google.com'
    },
    {
      name: 'Documento 4',
      folder: 'Carpeta 2',
      url: 'https://www.google.com'
    }
  ]
  

  constructor(private fb: FormBuilder) { 
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

  // Evitar que el navegador abra el archivo al arrastrar
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  // Agregar archivos cuando se sueltan
  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.files = Array.from(event.dataTransfer.files);
    }
  }

  // Resetear el estilo cuando se sale del área
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
  }

  onSubmit(): void {
    if (this.uploadForm.valid && this.files.length > 0) {
      const formData = new FormData();
      formData.append('documentName', this.uploadForm.get('documentName')?.value);
      
      // Agregar los archivos seleccionados al formData
      this.files.forEach(file => {
        formData.append('files', file);
      });

      // Aquí podrías enviar el formData a tu servidor o manejarlo como desees
      console.log('Formulario enviado:', formData);
    }
  }

}
