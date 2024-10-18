import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid'; // Import UUID
import { Note } from '../../../model/note.model';
import { NoteModalComponent } from "../../../modal/note-modal/note-modal.component"; // Import the modal component
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NoteDialogComponent } from '../../../helper/note-dialog/note-dialog.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  imports: [FormsModule, CommonModule, NoteModalComponent, NoteModalComponent] // Import the modal component here
  // Import the modal component here
})
export class NotesComponent {
  notes: Note[] = [];
  isModalOpen = false; // Track if the modal is open

  constructor(public dialog: MatDialog, private router: Router) {
    this.loadNotes();
  }

  loadNotes() {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      this.notes = JSON.parse(storedNotes);
    }
  }

  saveNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  openCreateNoteDialog() {
    const dialogRef = this.dialog.open(NoteDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Navigate to Note Editor with the passed title, category, and generated note ID
        this.router.navigate(['/user/individual/notes/note-editor'], { state: { note: result } });
      }
    });
  }

  openModal() {
    this.isModalOpen = true; // Open the modal
  }

  addNote(note: Note) {
    this.notes.push(note); // Add the note received from modal
    this.saveNotes(); // Save notes to local storage
    alert('Note saved successfully!');
  }

  editNote(note: Note) {
    this.router.navigate(['/user/individual/notes/note-editor'], { state: { note: note } });
  }

  deleteNote(note: Note) {
    const index = this.notes.indexOf(note);
    if (index !== -1) {
      this.notes.splice(index, 1);
      this.saveNotes();
      alert('Note deleted successfully!');
    }
  }
}
