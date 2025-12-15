import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@capacitor-community/http';
import { environment } from 'src/environments/environment';
import { Observable, from } from 'rxjs';

export interface ApiRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = environment.apiBase || '';

  constructor(private http: HttpClient) { }

  private buildParams(params?: Record<string, string | number | boolean>) {
    const p: Record<string, string> = {};
    if (params) {
      Object.keys(params).forEach(key => {
        p[key] = String(params[key]);
      });
    }
    return p;
  }

  private buildHeaders(headers?: Record<string, string>) {
    const h: Record<string, string> = {};

    const apiKey = headers?.['x-api-key'] ?? environment.key;
    if (apiKey) h['x-api-key'] = apiKey;

    if (headers) {
      Object.keys(headers).forEach(key => {
        if (key !== 'x-api-key') h[key] = headers[key];
      });
    }

    return h;
  }

  // =========================
  // GET
  // =========================
  get<T>(path: string, options?: ApiRequestOptions): Observable<T> {
    const url = this.baseUrl + path;

    console.log(url);

    // En desarrollo, usar HttpClient (respeta proxies)
    // En producción, usar Capacitor Http
    if (!environment.production) {
      console.log('Entro');
      return this.http.get<T>(url, {
        headers: this.buildHeaders(options?.headers),
        params: this.buildParams(options?.params)
      });
    }

    const promise = Http.get({
      url,
      headers: this.buildHeaders(options?.headers),
      params: this.buildParams(options?.params)
    }).then(res => res.data as T);

    return from(promise);
  }

  // =========================
  // POST
  // =========================
  post<T>(path: string, body: any, options?: ApiRequestOptions): Observable<T> {
    const url = this.baseUrl + path;

    // En desarrollo, usar HttpClient (respeta proxies)
    if (!environment.production) {
      return this.http.post<T>(url, body, {
        headers: this.buildHeaders(options?.headers),
        params: this.buildParams(options?.params)
      });
    }

    const promise = Http.post({
      url,
      headers: this.buildHeaders(options?.headers),
      params: this.buildParams(options?.params),
      data: body
    }).then(res => res.data as T);

    return from(promise);
  }
}

