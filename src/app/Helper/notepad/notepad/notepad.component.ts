import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Note {
  title: string;
  content: string;
}

@Component({
  selector: 'app-notepad',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.css']
})
export class NotepadComponent {
  noteTitle: string = '';
  notes: Note[] = [];
  selectedNote: Note | null = null;

  // Create a new note
  createNote() {
    if (this.noteTitle) {
      const newNote: Note = { title: this.noteTitle, content: '' };
      this.notes.push(newNote);
      this.noteTitle = ''; // Clear the input field
    }
  }

  // Delete a note
  deleteNote(note: Note) {
    this.notes = this.notes.filter(n => n !== note);
    if (this.selectedNote === note) {
      this.selectedNote = null;
    }
  }

  // Open a note for editing
  openNote(note: Note) {
    this.selectedNote = note;
  }

  // Update the content of a note
  updateNote() {
    if (this.selectedNote) {
      // The note content is automatically updated through two-way data binding.
      this.selectedNote = null; // Close the editor after saving
    }
  }
}
