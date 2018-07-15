import { TestBed, inject } from '@angular/core/testing';

import { FetchResortsService } from './fetch-resorts.service';

describe('FetchResortsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchResortsService]
    });
  });

  it('should be created', inject([FetchResortsService], (service: FetchResortsService) => {
    expect(service).toBeTruthy();
  }));
});
