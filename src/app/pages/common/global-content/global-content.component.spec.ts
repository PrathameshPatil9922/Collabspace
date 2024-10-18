import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalContentComponent } from './global-content.component';

describe('GlobalContentComponent', () => {
  let component: GlobalContentComponent;
  let fixture: ComponentFixture<GlobalContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
