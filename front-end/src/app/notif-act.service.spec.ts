import { TestBed } from '@angular/core/testing';

import { NotifActService } from './notif-act.service';

describe('NotifActService', () => {
  let service: NotifActService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifActService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
