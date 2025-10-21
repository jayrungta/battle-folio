import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SiteConfig } from '../models/site-config.model';
import { ViewConfig } from '../models/view-config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly BASE_PATH = 'assets/data/';

  constructor(private http: HttpClient) {}

  getSiteConfig(): Observable<SiteConfig> {
    return this.http.get<SiteConfig>(`${this.BASE_PATH}site-config.json`);
  }

  getViewConfig(configFile: string): Observable<ViewConfig> {
    return this.http.get<ViewConfig>(`${this.BASE_PATH}${configFile}`);
  }
}
