import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../notification/notification.service';
import { NotifyOpts } from '../notification/notification.model';
import { DocumentsService } from './documents.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  files: File[] = [];
  fileTest
  uploadForm!: FormGroup;

  user = JSON.parse(sessionStorage.getItem('user'))
  listDocuments = []
  formData: FormData = new FormData();


  constructor(private fb: FormBuilder, private notify: NotificationService, private documentService: DocumentsService) {
    this.uploadForm = this.fb.group({
      documentName: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getListDocuments()
  }

  getListDocuments() {
    this.documentService.getListDocumentsUser(this.user.documentId).subscribe((res: any) => {
      this.listDocuments = res.result
    })
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    this.fileTest = event.target.files[0]
    if (input.files) {
      this.files = Array.from(input.files);
  
      this.formData = new FormData();
  
      this.files.forEach((file) => {
        this.formData.append('file', file, file.name);
      });
  
      this.uploadForm.patchValue({
        file: this.files
      });
  
      this.uploadForm.get('file')?.updateValueAndValidity();
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
    if (this.uploadForm.valid) {

      let data = {
        name: this.uploadForm.get('documentName')?.value,
        description: this.uploadForm.get('description')?.value,
        verified: false
      }

      this.documentService.uploadDocument(this.fileTest, data, this.user.documentId).subscribe(res => {
        let notificacion: NotifyOpts = {
          title: 'Documento cargado',
          message: 'El documento ha sido cargado con éxito',
          icon: 'success',
          onAccept: () => {
            this.getListDocuments()
          }
        }
        this.notify.open(notificacion)
        this.uploadForm.reset()
        this.files = []
      }, error => {
        console.error('Error en la subida de archivos:', error);
      });
    }
  }

  verifyDocument(idDocument){
    this.documentService.verifyDocument(idDocument, this.user.documentId).subscribe(res =>{
      this.getListDocuments()
    })
  }

}
