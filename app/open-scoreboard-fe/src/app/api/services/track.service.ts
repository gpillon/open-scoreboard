/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CountDto } from '../models/count-dto';
import { CreateTrackDto } from '../models/create-track-dto';
import { ReadTrackDto } from '../models/read-track-dto';
import { UpdateTrackDto } from '../models/update-track-dto';

@Injectable({
  providedIn: 'root',
})
export class TrackService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation trackControllerCount
   */
  static readonly TrackControllerCountPath = '/api/v1/track/count';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `trackControllerCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  trackControllerCount$Response(params?: {
  }): Observable<StrictHttpResponse<CountDto>> {

    const rb = new RequestBuilder(this.rootUrl, TrackService.TrackControllerCountPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CountDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `trackControllerCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  trackControllerCount(params?: {
  }): Observable<CountDto> {

    return this.trackControllerCount$Response(params).pipe(
      map((r: StrictHttpResponse<CountDto>) => r.body as CountDto)
    );
  }

  /**
   * Path part for operation trackControllerFindAll
   */
  static readonly TrackControllerFindAllPath = '/api/v1/track';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `trackControllerFindAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  trackControllerFindAll$Response(params?: {
  }): Observable<StrictHttpResponse<Array<ReadTrackDto>>> {

    const rb = new RequestBuilder(this.rootUrl, TrackService.TrackControllerFindAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ReadTrackDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `trackControllerFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  trackControllerFindAll(params?: {
  }): Observable<Array<ReadTrackDto>> {

    return this.trackControllerFindAll$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ReadTrackDto>>) => r.body as Array<ReadTrackDto>)
    );
  }

  /**
   * Path part for operation trackControllerCreate
   */
  static readonly TrackControllerCreatePath = '/api/v1/track';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `trackControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  trackControllerCreate$Response(params: {
    body: CreateTrackDto
  }): Observable<StrictHttpResponse<ReadTrackDto>> {

    const rb = new RequestBuilder(this.rootUrl, TrackService.TrackControllerCreatePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ReadTrackDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `trackControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  trackControllerCreate(params: {
    body: CreateTrackDto
  }): Observable<ReadTrackDto> {

    return this.trackControllerCreate$Response(params).pipe(
      map((r: StrictHttpResponse<ReadTrackDto>) => r.body as ReadTrackDto)
    );
  }

  /**
   * Path part for operation trackControllerFindOne
   */
  static readonly TrackControllerFindOnePath = '/api/v1/track/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `trackControllerFindOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  trackControllerFindOne$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<ReadTrackDto>> {

    const rb = new RequestBuilder(this.rootUrl, TrackService.TrackControllerFindOnePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ReadTrackDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `trackControllerFindOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  trackControllerFindOne(params: {
    id: string;
  }): Observable<ReadTrackDto> {

    return this.trackControllerFindOne$Response(params).pipe(
      map((r: StrictHttpResponse<ReadTrackDto>) => r.body as ReadTrackDto)
    );
  }

  /**
   * Path part for operation trackControllerRemove
   */
  static readonly TrackControllerRemovePath = '/api/v1/track/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `trackControllerRemove()` instead.
   *
   * This method doesn't expect any request body.
   */
  trackControllerRemove$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<ReadTrackDto>> {

    const rb = new RequestBuilder(this.rootUrl, TrackService.TrackControllerRemovePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ReadTrackDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `trackControllerRemove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  trackControllerRemove(params: {
    id: string;
  }): Observable<ReadTrackDto> {

    return this.trackControllerRemove$Response(params).pipe(
      map((r: StrictHttpResponse<ReadTrackDto>) => r.body as ReadTrackDto)
    );
  }

  /**
   * Path part for operation trackControllerUpdate
   */
  static readonly TrackControllerUpdatePath = '/api/v1/track/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `trackControllerUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  trackControllerUpdate$Response(params: {
    id: string;
    body: UpdateTrackDto
  }): Observable<StrictHttpResponse<ReadTrackDto>> {

    const rb = new RequestBuilder(this.rootUrl, TrackService.TrackControllerUpdatePath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ReadTrackDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `trackControllerUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  trackControllerUpdate(params: {
    id: string;
    body: UpdateTrackDto
  }): Observable<ReadTrackDto> {

    return this.trackControllerUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<ReadTrackDto>) => r.body as ReadTrackDto)
    );
  }

}
