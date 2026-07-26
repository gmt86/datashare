import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FichierService } from './fichier.service';

/**
 * Tests unitaires pour FichierService.
 * Vérifie les appels HTTP vers le backend.
 */
describe('FichierService', () => {
  let fichierService: FichierService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FichierService]
    });
    fichierService = TestBed.inject(FichierService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  /**
   * Test — getFichiers appelle GET /api/fichiers.
   */
  it('should call GET /api/fichiers', () => {
    fichierService.getFichiers().subscribe();
    const req = httpMock.expectOne('/api/fichiers');
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  /**
   * Test — getFichierByToken appelle GET /api/fichiers/{token}.
   */
  it('should call GET /api/fichiers/{token}', () => {
    const token = '123e4567-e89b-12d3-a456-426614174000';
    fichierService.getFichierByToken(token).subscribe();
    const req = httpMock.expectOne(`/api/fichiers/${token}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  /**
   * Test — deleteFichier appelle DELETE /api/fichiers/{id}.
   */
  it('should call DELETE /api/fichiers/{id}', () => {
    const id = '123e4567-e89b-12d3-a456-426614174000';
    fichierService.deleteFichier(id).subscribe();
    const req = httpMock.expectOne(`/api/fichiers/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  /**
   * Test — uploadFichier appelle POST /api/fichiers.
   */
  it('should call POST /api/fichiers', () => {
    const formData = new FormData();
    fichierService.uploadFichier(formData).subscribe();
    const req = httpMock.expectOne('/api/fichiers');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});