import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface ApiRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  observe?: 'body' | 'response';
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Base URL can be configured here or via environment file
  baseUrl = environment.apiBase || '';

  constructor(private http: HttpClient) {}

  private buildHeaders(headers?: Record<string, string>): HttpHeaders {
    // Prefer header from options, fallback to environment key
    const apiKey = headers?.['x-api-key'] ?? environment.key;
    // Avoid setting Content-Type when user wants to send FormData
    const contentType = headers?.['Content-Type'] ?? 'application/json';
    let h = new HttpHeaders();
    if (contentType) {
      h = h.set('Content-Type', contentType);
    }
    if (apiKey) {
      h = h.set('x-api-key', apiKey);
    }
    if (headers) {
      Object.keys(headers).forEach(k => {
        if (k.toLowerCase() === 'content-type' || k.toLowerCase() === 'x-api-key') return;
        h = h.set(k, headers[k]);
      });
    }
    return h;
  }

  private buildParams(params?: Record<string, string | number | boolean>): HttpParams {
    let p = new HttpParams();
    if (params) {
      Object.keys(params).forEach(k => {
        const v = params[k];
        if (v !== undefined && v !== null) {
          p = p.set(k, String(v));
        }
      });
    }
    return p;
  }

  get<T>(path: string, options?: ApiRequestOptions): Observable<T> | Observable<HttpResponse<T>> {
    const url = this.baseUrl + path;
    const headers = this.buildHeaders(options?.headers);
    const params = this.buildParams(options?.params);
    if (options?.observe === 'response') {
      return this.http.get<T>(url, { headers, params, observe: 'response' }).pipe(catchError(this.handleError));
    }
    return this.http.get<T>(url, { headers, params }).pipe(catchError(this.handleError));
  }

  post<T>(path: string, body: any, options?: ApiRequestOptions): Observable<T> | Observable<HttpResponse<T>> {
    const url = this.baseUrl + path;
    const headers = this.buildHeaders(options?.headers);
    const params = this.buildParams(options?.params);
    if (options?.observe === 'response') {
      return this.http.post<T>(url, body, { headers, params, observe: 'response' }).pipe(catchError(this.handleError));
    }
    return this.http.post<T>(url, body, { headers, params }).pipe(catchError(this.handleError));
  }

  put<T>(path: string, body: any, options?: ApiRequestOptions): Observable<T> | Observable<HttpResponse<T>> {
    const url = this.baseUrl + path;
    const headers = this.buildHeaders(options?.headers);
    const params = this.buildParams(options?.params);
    if (options?.observe === 'response') {
      return this.http.put<T>(url, body, { headers, params, observe: 'response' }).pipe(catchError(this.handleError));
    }
    return this.http.put<T>(url, body, { headers, params }).pipe(catchError(this.handleError));
  }

  delete<T>(path: string, options?: ApiRequestOptions): Observable<T> | Observable<HttpResponse<T>> {
    const url = this.baseUrl + path;
    const headers = this.buildHeaders(options?.headers);
    const params = this.buildParams(options?.params);
    if (options?.observe === 'response') {
      return this.http.delete<T>(url, { headers, params, observe: 'response' }).pipe(catchError(this.handleError));
    }
    return this.http.delete<T>(url, { headers, params }).pipe(catchError(this.handleError));
  }

  // Básico manejo de errores - puede expandirse para logging centralizado
  private handleError(error: any) {
    const err = (error && error.error) ? error.error : error;
    return throwError(() => err);
  }
}
