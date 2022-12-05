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

import { Email } from '../models/email';
import { Login } from '../models/login';
import { ResetPassword } from '../models/reset-password';
import { SignUpDto } from '../models/sign-up-dto';
import { TokensDto } from '../models/tokens-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation authControllerLogin
   */
  static readonly AuthControllerLoginPath = '/auth/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerLogin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerLogin$Response(params: {
    context?: HttpContext
    body: Login
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthControllerLoginPath, 'post');
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
   * To access the full response (for headers, for example), `authControllerLogin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerLogin(params: {
    context?: HttpContext
    body: Login
  }
): Observable<void> {

    return this.authControllerLogin$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation authControllerSignUp
   */
  static readonly AuthControllerSignUpPath = '/auth/sign-up';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerSignUp()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerSignUp$Response(params: {
    context?: HttpContext
    body: SignUpDto
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthControllerSignUpPath, 'post');
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
   * To access the full response (for headers, for example), `authControllerSignUp$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerSignUp(params: {
    context?: HttpContext
    body: SignUpDto
  }
): Observable<void> {

    return this.authControllerSignUp$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation authControllerResetPass
   */
  static readonly AuthControllerResetPassPath = '/auth/reset-pass';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerResetPass()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerResetPass$Response(params: {
    context?: HttpContext
    body: ResetPassword
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthControllerResetPassPath, 'post');
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
   * To access the full response (for headers, for example), `authControllerResetPass$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerResetPass(params: {
    context?: HttpContext
    body: ResetPassword
  }
): Observable<void> {

    return this.authControllerResetPass$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation authControllerRequestPass
   */
  static readonly AuthControllerRequestPassPath = '/auth/request-pass';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerRequestPass()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerRequestPass$Response(params: {
    context?: HttpContext
    body: Email
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthControllerRequestPassPath, 'post');
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
   * To access the full response (for headers, for example), `authControllerRequestPass$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerRequestPass(params: {
    context?: HttpContext
    body: Email
  }
): Observable<void> {

    return this.authControllerRequestPass$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation authControllerSignOut
   */
  static readonly AuthControllerSignOutPath = '/auth/sign-out';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerSignOut()` instead.
   *
   * This method doesn't expect any request body.
   */
  authControllerSignOut$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthControllerSignOutPath, 'post');
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
   * To access the full response (for headers, for example), `authControllerSignOut$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authControllerSignOut(params?: {
    context?: HttpContext
  }
): Observable<void> {

    return this.authControllerSignOut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation authControllerRefreshToken
   */
  static readonly AuthControllerRefreshTokenPath = '/auth/refresh-token';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerRefreshToken()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerRefreshToken$Response(params: {
    context?: HttpContext
    body: TokensDto
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthControllerRefreshTokenPath, 'post');
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
   * To access the full response (for headers, for example), `authControllerRefreshToken$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerRefreshToken(params: {
    context?: HttpContext
    body: TokensDto
  }
): Observable<void> {

    return this.authControllerRefreshToken$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
