import { TestBed } from '@angular/core/testing';

import { GeneralInfoServiceService } from './general-info-service.service';

describe('GeneralInfoServiceService', () => {
  let service: GeneralInfoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralInfoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
