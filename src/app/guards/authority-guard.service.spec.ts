import { TestBed } from '@angular/core/testing';

import { AuthorityGuardService } from './authority-guard.service';

describe('AuthorityGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorityGuardService = TestBed.get(AuthorityGuardService);
    expect(service).toBeTruthy();
  });
});
