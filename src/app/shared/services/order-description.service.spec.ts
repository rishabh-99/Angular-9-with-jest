import { TestBed } from '@angular/core/testing';

import { OrderDescriptionService } from './order-description.service';

describe('OrderDescriptionService', () => {
  let service: OrderDescriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderDescriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
