import { TestBed } from '@angular/core/testing';

import { WebService } from '../services/web.service';

describe('WebService', () => {
  let service: WebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
