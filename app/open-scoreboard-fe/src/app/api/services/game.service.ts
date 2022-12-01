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
import { CreateGameDto } from '../models/create-game-dto';
import { ReadGameDto } from '../models/read-game-dto';
import { UpdateGameDto } from '../models/update-game-dto';

@Injectable({
  providedIn: 'root',
})
export class GameService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation gameControllerCount
   */
  static readonly GameControllerCountPath = '/api/v1/game/count';

  /**
   * Get the total games count.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `gameControllerCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  gameControllerCount$Response(params?: {
  }): Observable<StrictHttpResponse<CountDto>> {

    const rb = new RequestBuilder(this.rootUrl, GameService.GameControllerCountPath, 'get');
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
   * Get the total games count.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `gameControllerCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  gameControllerCount(params?: {
  }): Observable<CountDto> {

    return this.gameControllerCount$Response(params).pipe(
      map((r: StrictHttpResponse<CountDto>) => r.body as CountDto)
    );
  }

  /**
   * Path part for operation gameControllerFindAll
   */
  static readonly GameControllerFindAllPath = '/api/v1/game';

  /**
   * Get all games (Default limit is 20).
   *
   * Get all games Sorted Descending by Game Date
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `gameControllerFindAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  gameControllerFindAll$Response(params?: {
    limit?: number;
    skip?: number;
  }): Observable<StrictHttpResponse<Array<ReadGameDto>>> {

    const rb = new RequestBuilder(this.rootUrl, GameService.GameControllerFindAllPath, 'get');
    if (params) {
      rb.query('limit', params.limit, {});
      rb.query('skip', params.skip, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ReadGameDto>>;
      })
    );
  }

  /**
   * Get all games (Default limit is 20).
   *
   * Get all games Sorted Descending by Game Date
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `gameControllerFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  gameControllerFindAll(params?: {
    limit?: number;
    skip?: number;
  }): Observable<Array<ReadGameDto>> {

    return this.gameControllerFindAll$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ReadGameDto>>) => r.body as Array<ReadGameDto>)
    );
  }

  /**
   * Path part for operation gameControllerCreate
   */
  static readonly GameControllerCreatePath = '/api/v1/game';

  /**
   * Create a new game.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `gameControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  gameControllerCreate$Response(params: {
    body: CreateGameDto
  }): Observable<StrictHttpResponse<ReadGameDto>> {

    const rb = new RequestBuilder(this.rootUrl, GameService.GameControllerCreatePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ReadGameDto>;
      })
    );
  }

  /**
   * Create a new game.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `gameControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  gameControllerCreate(params: {
    body: CreateGameDto
  }): Observable<ReadGameDto> {

    return this.gameControllerCreate$Response(params).pipe(
      map((r: StrictHttpResponse<ReadGameDto>) => r.body as ReadGameDto)
    );
  }

  /**
   * Path part for operation gameControllerFindOne
   */
  static readonly GameControllerFindOnePath = '/api/v1/game/{id}';

  /**
   * Get a single game.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `gameControllerFindOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  gameControllerFindOne$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<ReadGameDto>> {

    const rb = new RequestBuilder(this.rootUrl, GameService.GameControllerFindOnePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ReadGameDto>;
      })
    );
  }

  /**
   * Get a single game.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `gameControllerFindOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  gameControllerFindOne(params: {
    id: string;
  }): Observable<ReadGameDto> {

    return this.gameControllerFindOne$Response(params).pipe(
      map((r: StrictHttpResponse<ReadGameDto>) => r.body as ReadGameDto)
    );
  }

  /**
   * Path part for operation gameControllerRemove
   */
  static readonly GameControllerRemovePath = '/api/v1/game/{id}';

  /**
   * Delete a game.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `gameControllerRemove()` instead.
   *
   * This method doesn't expect any request body.
   */
  gameControllerRemove$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<ReadGameDto>> {

    const rb = new RequestBuilder(this.rootUrl, GameService.GameControllerRemovePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ReadGameDto>;
      })
    );
  }

  /**
   * Delete a game.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `gameControllerRemove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  gameControllerRemove(params: {
    id: string;
  }): Observable<ReadGameDto> {

    return this.gameControllerRemove$Response(params).pipe(
      map((r: StrictHttpResponse<ReadGameDto>) => r.body as ReadGameDto)
    );
  }

  /**
   * Path part for operation gameControllerUpdate
   */
  static readonly GameControllerUpdatePath = '/api/v1/game/{id}';

  /**
   * Edit a game.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `gameControllerUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  gameControllerUpdate$Response(params: {
    id: string;
    body: UpdateGameDto
  }): Observable<StrictHttpResponse<ReadGameDto>> {

    const rb = new RequestBuilder(this.rootUrl, GameService.GameControllerUpdatePath, 'patch');
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
        return r as StrictHttpResponse<ReadGameDto>;
      })
    );
  }

  /**
   * Edit a game.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `gameControllerUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  gameControllerUpdate(params: {
    id: string;
    body: UpdateGameDto
  }): Observable<ReadGameDto> {

    return this.gameControllerUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<ReadGameDto>) => r.body as ReadGameDto)
    );
  }

}
