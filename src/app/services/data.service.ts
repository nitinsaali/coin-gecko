import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, API_VERSION } from '../constants';

@Injectable()
export class DataService {
  constructor(private httpClient: HttpClient) { }

  get(url: string, params?:any) {
    return this.httpClient.get(`${API_URL}/${API_VERSION}/${url}`, {params});
  }
}
