import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';

@Injectable({ providedIn: 'root' })
export class AthMovilService {

  // backend base url en environment.ts →  e.g.  https://manresa-backend.onrender.com/api
  private api = environment.apiUrl + '/ath-movil';

  constructor(private http: HttpClient) {}

  /** Paso 1: crear ticket */
  createPayment(payload: {
    amount: number;
    metadata1: string;
    metadata2: string;
    description: string;
    phoneNumber: string;
  }) {
    return this.http.post<{ ecommerceId: string; auth_token: string }>(
      `${this.api}/payment`,
      payload
    );
  }

  /** Paso 2: polling */
  getStatus(ecommerceId: string) {
    return this.http.get<any>(`${this.api}/status/${ecommerceId}`);
  }

  /** Paso 3: autorizar */
  authorize(authToken: string) {
    return this.http.post<any>(`${this.api}/authorize`, { authToken });
  }
}
