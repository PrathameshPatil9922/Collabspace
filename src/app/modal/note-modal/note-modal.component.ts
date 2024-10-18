import { Component, EventEmitter, Output } from '@angular/core';
import { Note } from '../../model/note.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-note-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-modal.component.html',
  styleUrl: './note-modal.component.css'
})
export class NoteModalComponent {
  note: Note = new Note('', '', ''); // Initialize a new note
  @Output() noteCreated = new EventEmitter<Note>(); // Event emitter to pass the note to parent

  createNote() {
    if (this.note.title.trim()) {
      this.note.id = uuidv4(); // Generate a unique ID
      this.note.createdAt = new Date().toLocaleString(); // Set creation date
      this.note.updatedAt = new Date().toLocaleString(); // Set updated date
      this.noteCreated.emit(this.note); // Emit the note
      this.close();
    } else {
      alert('Title cannot be empty.');
    }
  }

  close() {
    this.note = new Note('', '', ''); // Reset the note object
  }
}
