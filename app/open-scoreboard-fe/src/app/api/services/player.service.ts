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
import { CreatePlayerDto } from '../models/create-player-dto';
import { ReadPlayerDto } from '../models/read-player-dto';
import { UpdatePlayerDto } from '../models/update-player-dto';

@Injectable({
  providedIn: 'root',
})
export class PlayerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation playerControllerCount
   */
  static readonly PlayerControllerCountPath = '/api/v1/players/count';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `playerControllerCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  playerControllerCount$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<CountDto>> {

    const rb = new RequestBuilder(this.rootUrl, PlayerService.PlayerControllerCountPath, 'get');
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
   * To access the full response (for headers, for example), `playerControllerCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  playerControllerCount(params?: {
    context?: HttpContext
  }
): Observable<CountDto> {

    return this.playerControllerCount$Response(params).pipe(
      map((r: StrictHttpResponse<CountDto>) => r.body as CountDto)
    );
  }

  /**
   * Path part for operation playerControllerFindAll
   */
  static readonly PlayerControllerFindAllPath = '/api/v1/players';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `playerControllerFindAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  playerControllerFindAll$Response(params?: {
    limit?: number;
    skip?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<ReadPlayerDto>>> {

    const rb = new RequestBuilder(this.rootUrl, PlayerService.PlayerControllerFindAllPath, 'get');
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
        return r as StrictHttpResponse<Array<ReadPlayerDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `playerControllerFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  playerControllerFindAll(params?: {
    limit?: number;
    skip?: number;
    context?: HttpContext
  }
): Observable<Array<ReadPlayerDto>> {

    return this.playerControllerFindAll$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ReadPlayerDto>>) => r.body as Array<ReadPlayerDto>)
    );
  }

  /**
   * Path part for operation playerControllerCreate
   */
  static readonly PlayerControllerCreatePath = '/api/v1/players';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `playerControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  playerControllerCreate$Response(params: {
    context?: HttpContext
    body: CreatePlayerDto
  }
): Observable<StrictHttpResponse<ReadPlayerDto>> {

    const rb = new RequestBuilder(this.rootUrl, PlayerService.PlayerControllerCreatePath, 'post');
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
        return r as StrictHttpResponse<ReadPlayerDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `playerControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  playerControllerCreate(params: {
    context?: HttpContext
    body: CreatePlayerDto
  }
): Observable<ReadPlayerDto> {

    return this.playerControllerCreate$Response(params).pipe(
      map((r: StrictHttpResponse<ReadPlayerDto>) => r.body as ReadPlayerDto)
    );
  }

  /**
   * Path part for operation playerControllerFindOne
   */
  static readonly PlayerControllerFindOnePath = '/api/v1/players/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `playerControllerFindOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  playerControllerFindOne$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<ReadPlayerDto>> {

    const rb = new RequestBuilder(this.rootUrl, PlayerService.PlayerControllerFindOnePath, 'get');
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
        return r as StrictHttpResponse<ReadPlayerDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `playerControllerFindOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  playerControllerFindOne(params: {
    id: string;
    context?: HttpContext
  }
): Observable<ReadPlayerDto> {

    return this.playerControllerFindOne$Response(params).pipe(
      map((r: StrictHttpResponse<ReadPlayerDto>) => r.body as ReadPlayerDto)
    );
  }

  /**
   * Path part for operation playerControllerRemove
   */
  static readonly PlayerControllerRemovePath = '/api/v1/players/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `playerControllerRemove()` instead.
   *
   * This method doesn't expect any request body.
   */
  playerControllerRemove$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<ReadPlayerDto>> {

    const rb = new RequestBuilder(this.rootUrl, PlayerService.PlayerControllerRemovePath, 'delete');
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
        return r as StrictHttpResponse<ReadPlayerDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `playerControllerRemove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  playerControllerRemove(params: {
    id: string;
    context?: HttpContext
  }
): Observable<ReadPlayerDto> {

    return this.playerControllerRemove$Response(params).pipe(
      map((r: StrictHttpResponse<ReadPlayerDto>) => r.body as ReadPlayerDto)
    );
  }

  /**
   * Path part for operation playerControllerUpdate
   */
  static readonly PlayerControllerUpdatePath = '/api/v1/players/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `playerControllerUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  playerControllerUpdate$Response(params: {
    id: string;
    context?: HttpContext
    body: UpdatePlayerDto
  }
): Observable<StrictHttpResponse<ReadPlayerDto>> {

    const rb = new RequestBuilder(this.rootUrl, PlayerService.PlayerControllerUpdatePath, 'patch');
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
        return r as StrictHttpResponse<ReadPlayerDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `playerControllerUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  playerControllerUpdate(params: {
    id: string;
    context?: HttpContext
    body: UpdatePlayerDto
  }
): Observable<ReadPlayerDto> {

    return this.playerControllerUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<ReadPlayerDto>) => r.body as ReadPlayerDto)
    );
  }

}
