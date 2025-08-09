import { TestBed } from '@angular/core/testing';

import { AthMovilService } from './ath-movil.service';

describe('AthMovilService', () => {
  let service: AthMovilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AthMovilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
