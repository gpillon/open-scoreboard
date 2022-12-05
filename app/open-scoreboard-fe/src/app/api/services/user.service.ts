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

import { CreateUserDto } from '../models/create-user-dto';
import { FileUploadDto } from '../models/file-upload-dto';
import { ReadUserDto } from '../models/read-user-dto';
import { UpdatePasswordDto } from '../models/update-password-dto';
import { UpdateUserDto } from '../models/update-user-dto';
import { UpdateUserSettingsDto } from '../models/update-user-settings-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation userControllerFindAll
   */
  static readonly UserControllerFindAllPath = '/api/v1/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerFindAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerFindAll$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerFindAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userControllerFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerFindAll(params?: {
    context?: HttpContext
  }
): Observable<void> {

    return this.userControllerFindAll$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation userControllerCreate
   */
  static readonly UserControllerCreatePath = '/api/v1/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerCreate$Response(params: {
    context?: HttpContext
    body: CreateUserDto
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerCreatePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerCreate(params: {
    context?: HttpContext
    body: CreateUserDto
  }
): Observable<void> {

    return this.userControllerCreate$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation userControllerFindOne
   */
  static readonly UserControllerFindOnePath = '/api/v1/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerFindOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerFindOne$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<ReadUserDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerFindOnePath, 'get');
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
        return r as StrictHttpResponse<ReadUserDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userControllerFindOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerFindOne(params: {
    id: string;
    context?: HttpContext
  }
): Observable<ReadUserDto> {

    return this.userControllerFindOne$Response(params).pipe(
      map((r: StrictHttpResponse<ReadUserDto>) => r.body as ReadUserDto)
    );
  }

  /**
   * Path part for operation userControllerRemove
   */
  static readonly UserControllerRemovePath = '/api/v1/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerRemove()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerRemove$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerRemovePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userControllerRemove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerRemove(params: {
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.userControllerRemove$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation userControllerUpdate
   */
  static readonly UserControllerUpdatePath = '/api/v1/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerUpdate$Response(params: {
    id: string;
    context?: HttpContext
    body: UpdateUserDto
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerUpdatePath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userControllerUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerUpdate(params: {
    id: string;
    context?: HttpContext
    body: UpdateUserDto
  }
): Observable<void> {

    return this.userControllerUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation userControllerGetPhoto
   */
  static readonly UserControllerGetPhotoPath = '/api/v1/users/{id}/photo';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerGetPhoto()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerGetPhoto$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerGetPhotoPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userControllerGetPhoto$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerGetPhoto(params: {
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.userControllerGetPhoto$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation userControllerUploadPhoto
   */
  static readonly UserControllerUploadPhotoPath = '/api/v1/users/{id}/photo';

  /**
   * Upload Photo.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerUploadPhoto()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  userControllerUploadPhoto$Response(params: {
    id: string;
    context?: HttpContext

    /**
     * Profile Picture
     */
    body: FileUploadDto
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerUploadPhotoPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Upload Photo.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userControllerUploadPhoto$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  userControllerUploadPhoto(params: {
    id: string;
    context?: HttpContext

    /**
     * Profile Picture
     */
    body: FileUploadDto
  }
): Observable<void> {

    return this.userControllerUploadPhoto$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation userControllerGetSettings
   */
  static readonly UserControllerGetSettingsPath = '/api/v1/users/{id}/settings';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerGetSettings()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerGetSettings$Response(params: {
    id: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerGetSettingsPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userControllerGetSettings$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerGetSettings(params: {
    id: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.userControllerGetSettings$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation userControllerUpdateSettings
   */
  static readonly UserControllerUpdateSettingsPath = '/api/v1/users/{id}/settings';

  /**
   * Edit Settings.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerUpdateSettings()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerUpdateSettings$Response(params: {
    id: string;
    context?: HttpContext
    body: UpdateUserSettingsDto
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerUpdateSettingsPath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Edit Settings.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userControllerUpdateSettings$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerUpdateSettings(params: {
    id: string;
    context?: HttpContext
    body: UpdateUserSettingsDto
  }
): Observable<void> {

    return this.userControllerUpdateSettings$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation userControllerUpdatePassword
   */
  static readonly UserControllerUpdatePasswordPath = '/api/v1/users/{id}/change-password';

  /**
   * Edit password.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerUpdatePassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerUpdatePassword$Response(params: {
    id: string;
    context?: HttpContext
    body: UpdatePasswordDto
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerUpdatePasswordPath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Edit password.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userControllerUpdatePassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerUpdatePassword(params: {
    id: string;
    context?: HttpContext
    body: UpdatePasswordDto
  }
): Observable<void> {

    return this.userControllerUpdatePassword$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
