import { TestBed } from '@angular/core/testing';

import { CompileRunService } from './compile-run.service';

describe('CompileRunService', () => {
  let service: CompileRunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompileRunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
