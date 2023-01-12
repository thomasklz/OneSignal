import { TestBed } from '@angular/core/testing';

import { OnesiganlService } from './onesiganl.service';

describe('OnesiganlService', () => {
  let service: OnesiganlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnesiganlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
