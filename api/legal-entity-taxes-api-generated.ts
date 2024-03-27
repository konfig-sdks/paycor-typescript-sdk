/* tslint:disable */
/* eslint-disable */
/*
Paycor Public API


Welcome to Paycor's Public API! This document is a reference for the APIs Paycor has available, and acts as a complement to the \"Guides\" section. 

# Getting Started

<strong>To learn more about getting started with Paycor's Public APIs, check out our <a href=\"/guides\">Guides.</a></strong>

# GET, PUT, POST

* When requesting object, use GET endpoints. All list endpoints support paging, as described [in the other doc]. 
* When creating an object, use POST endpoints. Your code will need to create an object and send it to Paycor in your API call request body as JSON. You can use the \"request sample\" body as a starting point. Our endpoints will return a reference to the created object (the ID and GET API URL) for your system.
* When updating an object, you will use PUT endpoints. The general flow would be to: GET the object you want to update, modify the fields as desired, then PUT the object (as JSON in the request body) to our endpoints. Some fields like the object's ID cannot be updated because they are system-set.'


# Error Handling

* 400: Please consult the response text to correct your request information. 
* 401 with response \"Access denied due to missing subscription key\": Please include your APIM Subscription Key as header Ocp-Apim-Subscription-Key or querystring parameter subscription-key. 
* 401 with no response: Please ensure you included a valid & current Access Token in the Authorization header.
* 403: Please ensure your Access Token's scope has all the relevant access you need, on the AppCreator Data Access screen. 
* 404: Please validate the API route you are using. If that is correct, one of your IDs most likely does not exist or is not in a valid state. 
* 429: Paycor implements rate limits for our Public API. Each customer (implemented via APIM subscription key) has a limited number of calls. The number of calls is counted across all APIs, not per individual API. Please use bulk endpoints where available and spread your calls over a wider timespan.
  * The default rate limit is up to 1000 API calls per minute (total across all our Public APIs). 
* 500: Please contact Paycor. When you make a POST or PUT call and receive a 500, please do not retry the call automatically - this may result in double-posting. GETs can be safely retried.


# IDs

* ClientId = LegalEntityId
* TenantId = CompanyId
* EmployeeId is not visible in Paycor's UI, you must retrieve it from the Public API

# Earnings, Deductions, Taxes

This section describes the domain model for Paycor's Earnings, Deductions, and Taxes. This will provide background for many paydata-related Public API endpoints. 

Paycor stores Earnings, Deductions, and Taxes each at three levels:
* Global: Same data across all legal entities. Setup by Paycor for customers to choose from. Sample Codes (note these will not be setup on every Legal Entity):
  * Earnings: REG, OT
  * Taxes: FITWH, SOC, SOCER, OHCIN
  * Deductions: 401k, KMat, H125, UWay
* Legal Entity or Tenant: Codes setup &amp; customized on the legal entity or Tenant level. Must be tied to a Global Code. 
  * Perform UI allows creating Deduction and Earning codes on Tenant level (under Configure Company nav menu). These will be returned by the Legal Entity Public API endpoints. 
* Employee: codes setup on a particular employee, tied to a Legal Entity-level or Tenant-level code
  * Employee Earnings/Deductions/Taxes are applied during payroll. Many properties are inherited from the Legal Entity or Global levels, but some can be overridden. 

# Authentication

<!-- ReDoc-Inject: <security-definitions> -->

The version of the OpenAPI document: 


NOTE: This file is auto generated by Konfig (https://konfigthis.com).
*/

import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction, isBrowser } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { LegalEntityTax } from '../models';
// @ts-ignore
import { PaycorError } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * LegalEntityTaxesApi - axios parameter creator
 * @export
 */
export const LegalEntityTaxesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Data access: View Legal Entity Taxes
         * @summary Get Legal Entity Taxes by Legal Entity ID
         * @param {number} legalEntityId ID of the Legal Entity you want to get (synonymous to Paycor\&#39;s ClientID) the taxes
         * @param {string} [continuationToken] Token to get the next set of Legal Entity taxes
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getByLegalEntityId: async (legalEntityId: number, continuationToken?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'legalEntityId' is not null or undefined
            assertParamExists('getByLegalEntityId', 'legalEntityId', legalEntityId)
            const localVarPath = `/v1/legalentities/{legalEntityId}/taxes`
                .replace(`{${"legalEntityId"}}`, encodeURIComponent(String(legalEntityId !== undefined ? legalEntityId : `-legalEntityId-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Access-Token required
            await setApiKeyToObject({ object: localVarHeaderParameter, key: "Authorization", keyParamName: "accessToken", configuration })
            // authentication Apim-Subscription-Key required
            await setApiKeyToObject({ object: localVarHeaderParameter, key: "Ocp-Apim-Subscription-Key", keyParamName: "apimSubscriptionKey", configuration })
            if (continuationToken !== undefined) {
                localVarQueryParameter['continuationToken'] = continuationToken;
            }


    
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v1/legalentities/{legalEntityId}/taxes',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * LegalEntityTaxesApi - functional programming interface
 * @export
 */
export const LegalEntityTaxesApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = LegalEntityTaxesApiAxiosParamCreator(configuration)
    return {
        /**
         * Data access: View Legal Entity Taxes
         * @summary Get Legal Entity Taxes by Legal Entity ID
         * @param {LegalEntityTaxesApiGetByLegalEntityIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getByLegalEntityId(requestParameters: LegalEntityTaxesApiGetByLegalEntityIdRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<LegalEntityTax>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getByLegalEntityId(requestParameters.legalEntityId, requestParameters.continuationToken, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * LegalEntityTaxesApi - factory interface
 * @export
 */
export const LegalEntityTaxesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = LegalEntityTaxesApiFp(configuration)
    return {
        /**
         * Data access: View Legal Entity Taxes
         * @summary Get Legal Entity Taxes by Legal Entity ID
         * @param {LegalEntityTaxesApiGetByLegalEntityIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getByLegalEntityId(requestParameters: LegalEntityTaxesApiGetByLegalEntityIdRequest, options?: AxiosRequestConfig): AxiosPromise<Array<LegalEntityTax>> {
            return localVarFp.getByLegalEntityId(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for getByLegalEntityId operation in LegalEntityTaxesApi.
 * @export
 * @interface LegalEntityTaxesApiGetByLegalEntityIdRequest
 */
export type LegalEntityTaxesApiGetByLegalEntityIdRequest = {
    
    /**
    * ID of the Legal Entity you want to get (synonymous to Paycor\'s ClientID) the taxes
    * @type {number}
    * @memberof LegalEntityTaxesApiGetByLegalEntityId
    */
    readonly legalEntityId: number
    
    /**
    * Token to get the next set of Legal Entity taxes
    * @type {string}
    * @memberof LegalEntityTaxesApiGetByLegalEntityId
    */
    readonly continuationToken?: string
    
}

/**
 * LegalEntityTaxesApiGenerated - object-oriented interface
 * @export
 * @class LegalEntityTaxesApiGenerated
 * @extends {BaseAPI}
 */
export class LegalEntityTaxesApiGenerated extends BaseAPI {
    /**
     * Data access: View Legal Entity Taxes
     * @summary Get Legal Entity Taxes by Legal Entity ID
     * @param {LegalEntityTaxesApiGetByLegalEntityIdRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LegalEntityTaxesApiGenerated
     */
    public getByLegalEntityId(requestParameters: LegalEntityTaxesApiGetByLegalEntityIdRequest, options?: AxiosRequestConfig) {
        return LegalEntityTaxesApiFp(this.configuration).getByLegalEntityId(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}