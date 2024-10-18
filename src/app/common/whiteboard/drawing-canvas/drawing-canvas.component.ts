
import { Component, ElementRef, ViewChild, AfterViewInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider'; // Add slider module for size adjustment
import { MatMenuModule } from '@angular/material/menu'; // Add menu module for color palette

export type MenuItem = {
  icon: string;
  label: string;
  function?: (...args: any[]) => any;
  route?: string;
};

@Component({
  selector: 'app-drawing-canvas',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatButtonModule, MatSliderModule, MatMenuModule],
  templateUrl: './drawing-canvas.component.html',
  styleUrls: ['./drawing-canvas.component.css'],
})
export class DrawingCanvasComponent implements AfterViewInit {
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private drawing = false;
  private currentTool: 'pen' | 'eraser' | 'rectangle' | 'circle' | 'square' | 'triangle' | 'textbox' = 'pen';
  private startX!: number;
  private startY!: number;
  private eraserSize = 30;
  private penSize = 2; // Variable for pen size
  private penColor = 'black'; // Variable for pen color
  private shapes: any[] = [];
  private texts: any[] = [];
  private penStrokes: { x: number, y: number }[][] = [];
  private currentPenStroke: { x: number, y: number }[] = [];
  private erasedAreas: { x: number; y: number; width: number; height: number }[] = [];
  private undoStack: any[] = []; // Stack for undo functionality
  private redoStack: any[] = []; // Stack for redo functionality

  menuItems = signal<MenuItem[]>([
    { icon: 'edit', label: 'Pen', function: () => this.setTool('pen') },
    { icon: 'delete', label: 'Eraser', function: () => this.setTool('eraser') },
    { icon: 'text_fields', label: 'Text Box', function: () => this.setTool('textbox') },
    { icon: 'crop_square', label: 'Rectangle', function: () => this.setTool('rectangle') },
    { icon: 'circle', label: 'Circle', function: () => this.setTool('circle') },
    { icon: 'crop_square', label: 'Square', function: () => this.setTool('square') },
    { icon: 'change_history', label: 'Triangle', function: () => this.setTool('triangle') },
  ]);

  ngAfterViewInit() {
    const canvas = this.canvasElement.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.lineWidth = this.penSize; // Use the pen size
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = this.penColor; // Use the pen color
  }

  startDrawing(event: MouseEvent) {
    this.drawing = true;
    this.startX = event.offsetX;
    this.startY = event.offsetY;
    this.saveState(); // Save the state for undo before drawing

    if (this.currentTool === 'pen') {
      this.currentPenStroke = [{ x: this.startX, y: this.startY }];
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
    } else if (this.currentTool === 'textbox') {
      this.addTextbox(event);
      this.drawing = false;
    } else {
      this.ctx.beginPath();
    }
  }

  stopDrawing(event: MouseEvent) {
    if (!this.drawing) return;
    this.drawing = false;

    if (this.currentTool === 'pen') {
      this.penStrokes.push([...this.currentPenStroke]);
    } else if (['rectangle', 'circle', 'square', 'triangle'].includes(this.currentTool)) {
      this.saveShape(event);
    }

    this.ctx.closePath();
  }

  draw(event: MouseEvent) {
    if (!this.drawing) return;

    if (this.currentTool === 'pen') {
      this.currentPenStroke.push({ x: event.offsetX, y: event.offsetY });
      this.ctx.lineTo(event.offsetX, event.offsetY);
      this.ctx.stroke();
    } else if (this.currentTool === 'eraser') {
      this.erasedAreas.push({
        x: event.offsetX - this.eraserSize / 2,
        y: event.offsetY - this.eraserSize / 2,
        width: this.eraserSize,
        height: this.eraserSize,
      });
      this.ctx.clearRect(event.offsetX - this.eraserSize / 2, event.offsetY - this.eraserSize / 2, this.eraserSize, this.eraserSize);
    } else {
      this.clearCanvas(false);
      this.redrawAll();
      this.drawShape(event);
    }
  }

  // Undo function to revert to previous state
  undo() {
    if (this.undoStack.length > 0) {
      const lastState = this.undoStack.pop();
      this.redoStack.push({
        shapes: [...this.shapes],
        texts: [...this.texts],
        penStrokes: [...this.penStrokes],
        erasedAreas: [...this.erasedAreas],
      }); // Push current state to redoStack
      this.shapes = lastState.shapes;
      this.texts = lastState.texts;
      this.penStrokes = lastState.penStrokes;
      this.erasedAreas = lastState.erasedAreas;
      this.redrawAll(); // Redraw the canvas to reflect the undo action
    }
  }

  // Redo function to re-apply the undone state
  redo() {
    if (this.redoStack.length > 0) {
      const redoState = this.redoStack.pop();
      this.undoStack.push({
        shapes: [...this.shapes],
        texts: [...this.texts],
        penStrokes: [...this.penStrokes],
        erasedAreas: [...this.erasedAreas],
      }); // Push current state to undoStack
      this.shapes = redoState.shapes;
      this.texts = redoState.texts;
      this.penStrokes = redoState.penStrokes;
      this.erasedAreas = redoState.erasedAreas;
      this.redrawAll(); // Redraw the canvas to reflect the redo action
    }
  }

  saveState() {
    const currentState = {
      shapes: [...this.shapes],
      texts: [...this.texts],
      penStrokes: [...this.penStrokes],
      erasedAreas: [...this.erasedAreas],
    };
    this.undoStack.push(currentState); // Save the current state for undo functionality
    this.redoStack = []; // Clear the redo stack since a new action invalidates it
  }

  clearCanvas(saveState: boolean = true) {
    if (saveState) this.saveState();
    const canvas = this.canvasElement.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  redrawAll() {
    this.clearCanvas(false);
    // Redraw shapes
    for (const shape of this.shapes) {
      this.drawShape(shape);
    }

    // Redraw pen strokes
    for (const stroke of this.penStrokes) {
      this.ctx.beginPath();
      for (let i = 0; i < stroke.length; i++) {
        const point = stroke[i];
        if (i === 0) {
          this.ctx.moveTo(point.x, point.y);
        } else {
          this.ctx.lineTo(point.x, point.y);
        }
      }
      this.ctx.stroke();
    }

    // Redraw erased areas
    for (const area of this.erasedAreas) {
      this.ctx.clearRect(area.x, area.y, area.width, area.height);
    }

    // Redraw texts
    for (const text of this.texts) {
      this.ctx.fillText(text.text, text.x, text.y);
    }
  }

  setTool(tool: 'pen' | 'eraser' | 'rectangle' | 'circle' | 'square' | 'triangle' | 'textbox') {
    this.currentTool = tool;
  }

  setPenSize(event: any) {
    this.penSize = event.value;
    this.ctx.lineWidth = this.penSize;
  }

  setPenColor(color: string) {
    this.penColor = color;
    this.ctx.strokeStyle = this.penColor;
  }

  addTextbox(event: MouseEvent) {
    const text = prompt('Enter text:');
    if (text) {
      this.texts.push({ text, x: event.offsetX, y: event.offsetY });
      this.ctx.fillText(text, event.offsetX, event.offsetY);
    }
  }

  saveShape(event: MouseEvent) {
    const shape = {
      type: this.currentTool,
      startX: this.startX,
      startY: this.startY,
      endX: event.offsetX,
      endY: event.offsetY,
    };
    this.shapes.push(shape);
    this.drawShape(shape);
  }

  drawShape(shape: any) {
    switch (shape.type) {
      case 'rectangle':
        this.ctx.strokeRect(shape.startX, shape.startY, shape.endX - shape.startX, shape.endY - shape.startY);
        break;
      case 'circle':
        const radius = Math.sqrt(Math.pow(shape.endX - shape.startX, 2) + Math.pow(shape.endY - shape.startY, 2));
        this.ctx.beginPath();
        this.ctx.arc(shape.startX, shape.startY, radius, 0, Math.PI * 2);
        this.ctx.stroke();
        break;
      case 'square':
        const size = shape.endX - shape.startX;
        this.ctx.strokeRect(shape.startX, shape.startY, size, size);
        break;
      case 'triangle':
        this.ctx.beginPath();
        this.ctx.moveTo(shape.startX, shape.startY);
        this.ctx.lineTo(shape.endX, shape.startY);
        this.ctx.lineTo((shape.startX + shape.endX) / 2, shape.endY);
        this.ctx.closePath();
        this.ctx.stroke();
        break;
      default:
        break;
    }
  }
}
