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

import { ReadHealthcheckDto } from '../models/read-healthcheck-dto';

@Injectable({
  providedIn: 'root',
})
export class HealthcheckService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation healthcheckControllerUptime
   */
  static readonly HealthcheckControllerUptimePath = '/healthcheck';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `healthcheckControllerUptime()` instead.
   *
   * This method doesn't expect any request body.
   */
  healthcheckControllerUptime$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<ReadHealthcheckDto>> {

    const rb = new RequestBuilder(this.rootUrl, HealthcheckService.HealthcheckControllerUptimePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ReadHealthcheckDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `healthcheckControllerUptime$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  healthcheckControllerUptime(params?: {
    context?: HttpContext
  }
): Observable<ReadHealthcheckDto> {

    return this.healthcheckControllerUptime$Response(params).pipe(
      map((r: StrictHttpResponse<ReadHealthcheckDto>) => r.body as ReadHealthcheckDto)
    );
  }

}
