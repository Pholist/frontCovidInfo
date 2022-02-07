import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { covidInfo } from './covidInfo';

@Injectable({ providedIn: 'root' }) // this service should be provided in the root injector.
export class CovidInfoService {
  private serviceUri = environment.serverUri;
  constructor(private http: HttpClient) {}

  public getCovidData(): Observable<covidInfo[]> {
    return this.http.get<covidInfo[]>(`${this.serviceUri}/covid`);
  }

  public getOneCountryCovidData(pays: string): Observable<covidInfo[]> {
    return this.http.get<covidInfo[]>(`${this.serviceUri}/covid?pays=${pays}`);
  }

  public getOneCountryDateCovidData(
    pays: string,
    date: Date
  ): Observable<covidInfo[]> {
    return this.http.get<covidInfo[]>(
      `${this.serviceUri}/covid?pays=${pays}&date=${date}`
    );
  }
  public getOneCountryTodaysCovidData(pays: string): Observable<covidInfo[]> {
    return this.http.get<covidInfo[]>(
      `${this.serviceUri}/covid/today?pays=${pays}`
    );
  }
}
