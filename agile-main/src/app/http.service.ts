import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { flatten } from 'lodash';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { GlobalVariable } from './../../../web-config';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(protected http: HttpClient) {
  }

  protected url = GlobalVariable.BASE_API_URL;
  protected shopId = GlobalVariable.SHOPID;
  send(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      lang: this.getLang()
    });

    // const data = request.data == null ? [] : flatten([request.data]);
    return this.http
      .post(this.url, JSON.stringify(data), { headers })
      .pipe(
        map(res => {
          return res as any;
        }),
        catchError(err => this.convertError(err))
      );
  }

  retrieve(operation: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    // Token
    const token = sessionStorage.getItem('token');
    const custId = sessionStorage.getItem('custId');
    let shopId = sessionStorage.getItem('shopId');

    shopId = this.shopId;

    if (token) {
      headers = headers.append('token', token);
    }

    if (custId) {
      headers = headers.append('custId', custId);
    }


    if (shopId) {
      headers = headers.append('shopId', shopId);
    }


    console.log(headers);

    return this.http
      .get(this.url + operation, { headers })
      .pipe(
        map(res => (res as any)),
        catchError(err => this.convertError(err))
      );
  }

  uploadFile(file: File): Observable<any> {
    if (file) {
      console.log(file);
      const uploadFile: FormData = new FormData();
      uploadFile.append('files', file, file.name);
      return this.http
        .post(this.url + 'fileUpload', uploadFile);
    }
    return throwError('Файл алдаатай байна');
  }
  uploadFiles(files): Observable<any> {
    if (files) {
      const images = new FormData();
      for (const item of files) {
        images.append(item, item.name);
      }
      console.log(images);
      return this.http
        .post(this.url + 'fileUpload', images);
    }
    return throwError('Файл алдаатай байна');
  }

  private getLang(): string {
    return sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'mn';
  }

  // checkIpLocation(): Observable<any> {
  //   return this.http
  //     .get('/location')
  //     .pipe(
  //       map(res => (res as any)),
  //       catchError(err => this.convertError(err))
  //     );
  // }

  private convertError(httpError: HttpErrorResponse) {
    const { status, message, error } = httpError;
    let msg = error;
    switch (status) {
      case 504:
      case 413:
        msg = status + ' ' + message;
        break;
      case 404:
        msg = 'Сервер ачаалагдаагүй байна. Системийн админд хандана уу';
        break;
      default:
        msg = error;
    }

    // this.events.emit(new ApiEvent(status, request, error));
    return throwError(msg);
  }

  getLocation() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .get('https://geolocation-db.com/json/', { headers })
      .pipe(
        map(res => (res as any)),
        catchError(err => this.convertError(err))
      );
  }

  /**
   * Post хүсэлт - Insert хийнэ
   * @category HTTP хүсэлтүүд
   * @param operation : Хүсэлтийн нэр (operation)
   * @param body : Хүсэлтийн body
   * @returns Observable буцаана
   */
  post(operation: string, body: any): Observable<any> {

    let headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');
    // Token
    const token = sessionStorage.getItem('token');
    const custId = localStorage.getItem('custId');
    let shopId = sessionStorage.getItem('shopId');

    shopId = this.shopId;

    if (token) {
      headers = headers.append('token', token);
    }

    if (custId) {
      headers = headers.append('custId', custId);
    }

    if (shopId) {
      headers = headers.append('shopId', shopId);
    }


    return this.http
      .post(
        this.url + operation,
        JSON.stringify(body, (_, value) => {
          console.log(_);
          console.log(value);
          if (value !== null) {
            return value;
          }
        }),
        {
          headers
        }
      );
  }
}
