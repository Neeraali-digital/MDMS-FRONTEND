import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public apiUrl = environment.apiUrl;
    private baseApiUrl = this.getBaseUrl();
    private tokenKey = 'auth_token';
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

    private getBaseUrl(): string {
        try {
            return new URL(this.apiUrl).origin;
        } catch (e) {
            return '';
        }
    }

    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient) { }

    getMediaUrl(path: string): string {
        if (!path) return 'https://placehold.co/600x400?text=No+Image';
        if (path.startsWith('http')) return path;

        // Ensure path is encoded (handles spaces in filenames)
        const encodedPath = path.split('/').map(segment => encodeURIComponent(segment)).join('/');
        const fullUrl = `${this.baseApiUrl}${encodedPath.startsWith('/') ? '' : '/'}${encodedPath}`;

        console.log('Final Media URL:', fullUrl);
        return fullUrl;
    }

    private hasToken(): boolean {
        return !!localStorage.getItem(this.tokenKey);
    }

    // Auth Methods
    login(credentials: { username: string, password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/auth/login/`, credentials).pipe(
            tap((response: any) => {
                if (response.token) {
                    localStorage.setItem(this.tokenKey, response.token);
                    this.isAuthenticatedSubject.next(true);
                }
            })
        );
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
        this.isAuthenticatedSubject.next(false);
    }

    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    // College Methods
    getColleges(params: any = {}): Observable<any> {
        return this.http.get(`${this.apiUrl}/colleges/`, { params });
    }

    getCollege(slug: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/colleges/${slug}/`);
    }

    createCollege(data: any): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Token ${this.getToken()}`
        });
        return this.http.post(`${this.apiUrl}/colleges/`, data, { headers });
    }

    updateCollege(slug: string, data: any): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Token ${this.getToken()}`
        });
        return this.http.put(`${this.apiUrl}/colleges/${slug}/`, data, { headers });
    }

    deleteCollege(slug: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Token ${this.getToken()}`
        });
        return this.http.delete(`${this.apiUrl}/colleges/${slug}/`, { headers });
    }

    // Enquiries
    createEnquiry(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/enquiries/`, data);
    }

    getEnquiries(): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Token ${this.getToken()}`
        });
        return this.http.get(`${this.apiUrl}/enquiries/`, { headers });
    }
}
