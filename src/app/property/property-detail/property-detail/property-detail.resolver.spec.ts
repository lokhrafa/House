import { TestBed } from '@angular/core/testing';

import { PropertyDetailResolver } from './property-detail.resolver';

describe('PropertyDetailResolver', () => {
  let resolver: PropertyDetailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PropertyDetailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
