import { TestBed } from '@angular/core/testing';

import { ResumeAPIService } from './resume-api.service';

describe('ResumeAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResumeAPIService = TestBed.get(ResumeAPIService);
    expect(service).toBeTruthy();
  });
});
