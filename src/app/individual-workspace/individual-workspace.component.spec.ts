import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualWorkspaceComponent } from './individual-workspace.component';

describe('IndividualWorkspaceComponent', () => {
  let component: IndividualWorkspaceComponent;
  let fixture: ComponentFixture<IndividualWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualWorkspaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
