/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CountDto } from '../models/count-dto';
import { CreateLapDto } from '../models/create-lap-dto';
import { ReadLapDto } from '../models/read-lap-dto';
import { UpdateLapDto } from '../models/update-lap-dto';

@Injectable({
  providedIn: 'root',
})
export class LapService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation lapControllerCount
   */
  static readonly LapControllerCountPath = '/api/v1/laps/count';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `lapControllerCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  lapControllerCount$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<CountDto>> {

    const rb = new RequestBuilder(this.rootUrl, LapService.LapControllerCountPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CountDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `lapControllerCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  lapControllerCount(params?: {
    context?: HttpContext
  }
): Observable<CountDto> {

    return this.lapControllerCount$Response(params).pipe(
      map((r: StrictHttpResponse<CountDto>) => r.body as CountDto)
    );
  }

  /**
   * Path part for operation lapControllerFindAll
   */
  static readonly LapControllerFindAllPath = '/api/v1/laps';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `lapControllerFindAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  lapControllerFindAll$Response(params?: {
    limit?: number;
    skip?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<ReadLapDto>>> {

    const rb = new RequestBuilder(this.rootUrl, LapService.LapControllerFindAllPath, 'get');
    if (params) {
      rb.query('limit', params.limit, {});
      rb.query('skip', params.skip, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ReadLapDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `lapControllerFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  lapControllerFindAll(params?: {
    limit?: number;
    skip?: number;
    context?: HttpContext
  }
): Observable<Array<ReadLapDto>> {

    return this.lapControllerFindAll$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ReadLapDto>>) => r.body as Array<ReadLapDto>)
    );
  }

  /**
   * Path part for operation lapControllerCreate
   */
  static readonly LapControllerCreatePath = '/api/v1/laps';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `lapControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  lapControllerCreate$Response(params: {
    context?: HttpContext
    body: CreateLapDto
  }
): Observable<StrictHttpResponse<ReadLapDto>> {

    const rb = new RequestBuilder(this.rootUrl, LapService.LapControllerCreatePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ReadLapDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `lapControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  lapControllerCreate(params: {
    context?: HttpContext
    body: CreateLapDto
  }
): Observable<ReadLapDto> {

    return this.lapControllerCreate$Response(params).pipe(
      map((r: StrictHttpResponse<ReadLapDto>) => r.body as ReadLapDto)
    );
  }

  /**
   * Path part for operation lapControllerFindOne
   */
  static readonly LapControllerFindOnePath = '/api/v1/laps/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `lapControllerFindOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  lapControllerFindOne$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<ReadLapDto>> {

    const rb = new RequestBuilder(this.rootUrl, LapService.LapControllerFindOnePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ReadLapDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `lapControllerFindOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  lapControllerFindOne(params: {
    id: string;
    context?: HttpContext
  }
): Observable<ReadLapDto> {

    return this.lapControllerFindOne$Response(params).pipe(
      map((r: StrictHttpResponse<ReadLapDto>) => r.body as ReadLapDto)
    );
  }

  /**
   * Path part for operation lapControllerRemove
   */
  static readonly LapControllerRemovePath = '/api/v1/laps/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `lapControllerRemove()` instead.
   *
   * This method doesn't expect any request body.
   */
  lapControllerRemove$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<ReadLapDto>> {

    const rb = new RequestBuilder(this.rootUrl, LapService.LapControllerRemovePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ReadLapDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `lapControllerRemove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  lapControllerRemove(params: {
    id: string;
    context?: HttpContext
  }
): Observable<ReadLapDto> {

    return this.lapControllerRemove$Response(params).pipe(
      map((r: StrictHttpResponse<ReadLapDto>) => r.body as ReadLapDto)
    );
  }

  /**
   * Path part for operation lapControllerUpdate
   */
  static readonly LapControllerUpdatePath = '/api/v1/laps/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `lapControllerUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  lapControllerUpdate$Response(params: {
    id: string;
    context?: HttpContext
    body: UpdateLapDto
  }
): Observable<StrictHttpResponse<ReadLapDto>> {

    const rb = new RequestBuilder(this.rootUrl, LapService.LapControllerUpdatePath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ReadLapDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `lapControllerUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  lapControllerUpdate(params: {
    id: string;
    context?: HttpContext
    body: UpdateLapDto
  }
): Observable<ReadLapDto> {

    return this.lapControllerUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<ReadLapDto>) => r.body as ReadLapDto)
    );
  }

}
