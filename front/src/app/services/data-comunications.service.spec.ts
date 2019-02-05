import { TestBed } from '@angular/core/testing';

import { DataComunicationsService } from './data-comunications.service';

describe('DataComunicationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataComunicationsService = TestBed.get(DataComunicationsService);
    expect(service).toBeTruthy();
  });
});
