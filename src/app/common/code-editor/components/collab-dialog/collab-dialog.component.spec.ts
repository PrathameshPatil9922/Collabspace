import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabDialogComponent } from './collab-dialog.component';

describe('CollabDialogComponent', () => {
  let component: CollabDialogComponent;
  let fixture: ComponentFixture<CollabDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollabDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollabDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
