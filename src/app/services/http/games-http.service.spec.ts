import { TestBed } from '@angular/core/testing';

import { GamesHttpService } from './games-http.service';

describe('GamesHttpService', () => {
  let service: GamesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
