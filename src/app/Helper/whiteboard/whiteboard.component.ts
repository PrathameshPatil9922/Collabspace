import { NgIf } from '@angular/common';
import { NgModule, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-whiteboard',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './whiteboard.component.html',
  styleUrl: './whiteboard.component.css'
})
export class WhiteboardComponent {
  @ViewChild('canvas') canvasRef!: ElementRef;
  private context!: CanvasRenderingContext2D;
  private drawing = false;
  public currentTool: string = 'pen';
  private currentColor: string = '#000000';
  pptFile: any;

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    this.context = canvas.getContext('2d')!;
    canvas.width = window.innerWidth - 256; // Adjust width based on sidebar
    canvas.height = window.innerHeight;
  }

  selectTool(tool: string) {
    this.currentTool = tool;
  }

  changeColor(event: Event) {
    const input = event.target as HTMLInputElement;
    this.currentColor = input.value;
  }

  onMouseDown(event: MouseEvent) {
    this.drawing = true;
    this.context.beginPath();
    this.context.strokeStyle = this.currentColor;
    this.context.lineWidth = this.currentTool === 'eraser' ? 10 : 2;
    this.context.lineCap = 'round';
    this.context.moveTo(event.offsetX, event.offsetY);
  }

  onMouseMove(event: MouseEvent) {
    if (!this.drawing) return;
    this.context.lineTo(event.offsetX, event.offsetY);
    this.context.stroke();
  }

  onMouseUp(event: MouseEvent) {
    this.drawing = false;
    this.context.closePath();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.pptFile = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  @HostListener('window:resize')
  onResize() {
    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    canvas.width = window.innerWidth - 256; // Adjust width based on sidebar
    canvas.height = window.innerHeight;
    this.redrawCanvas();
  }

  redrawCanvas() {
    // Redraw the canvas if needed, e.g., when resizing the window
  }
}
