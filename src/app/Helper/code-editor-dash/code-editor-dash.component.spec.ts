import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeEditorDashComponent } from './code-editor-dash.component';

describe('CodeEditorDashComponent', () => {
  let component: CodeEditorDashComponent;
  let fixture: ComponentFixture<CodeEditorDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeEditorDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeEditorDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
