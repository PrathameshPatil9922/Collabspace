import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-note-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './note-dialog.component.html',
  styleUrl: './note-dialog.component.css'
})
export class NoteDialogComponent {
  noteTitle: string = '';
  noteCategory: string = '';

  constructor(public dialogRef: MatDialogRef<NoteDialogComponent>) { }

  createNote() {
    if (!this.noteTitle.trim()) {
      alert('Please enter a title.');
      return;
    }

    // Pass the note details to the parent component
    const newNote = {
      id: uuidv4(), // Generate unique ID for the note
      title: this.noteTitle,
      category: this.noteCategory,
    };

    this.dialogRef.close(newNote);
  }

  cancel() {
    this.dialogRef.close();
  }
}
