import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Quill from 'quill';
import { v4 as uuidv4 } from 'uuid';
import jsPDF from 'jspdf';
import { Note } from '../../../model/note.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: '../notes-editor/notes-editor.component.html',
  styleUrls: ['../notes-editor/notes-editor.component.css'],
})
export class NoteEditorComponent implements OnInit {
  noteTitle: string = '';
  noteCategory: string = '';
  noteId: string = '';
  editor: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { note: any };
    if (state && state.note) {
      this.noteTitle = state.note.title;
      this.noteCategory = state.note.category;
      this.noteId = state.note.id;
    }
  }

  ngOnInit() {
    this.editor = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ 'font': [] }, { 'size': [] }],
          [{ 'header': [1, 2, false] }],
          [{ 'align': [] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['link', 'image', 'code-block'],
          [{ 'color': [] }, { 'background': [] }],
          ['clean'], // remove formatting button
        ],
      },
    });
  }

  editNote(note: Note) {
    this.noteTitle = note.title;           // Set title from note
    this.noteCategory = 'study';     // Set category from note
    this.noteId = note.id;                 // Set ID from note

    // Set existing content in the Quill editor
    const delta = this.editor.clipboard.convert(note.description);
    this.editor.setContents(delta);
  }

  saveNote() {
    const content = this.editor.root.innerHTML;

    const note = {
      id: this.noteId,
      title: this.noteTitle,
      category: this.noteCategory,
      content: content,
      createdAt: new Date(),
    };

    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    storedNotes.push(note);
    localStorage.setItem('notes', JSON.stringify(storedNotes));

    this.router.navigate(['/user/individual/notes']);
  }

  exportAsPDF() {
    const content = this.editor.root.innerHTML;

    const pdf = new jsPDF();
    pdf.setFont('Times', 'bold');
    pdf.text(this.noteTitle, 10, 10);
    pdf.setFont('Times', 'normal');
    pdf.text(`Category: ${this.noteCategory}`, 10, 20);

    pdf.html(content, {
      x: 10,
      y: 30,
      width: 180,
      callback: (pdf) => {
        pdf.save(`${this.noteTitle}.pdf`);
      },
    });
  }
}
