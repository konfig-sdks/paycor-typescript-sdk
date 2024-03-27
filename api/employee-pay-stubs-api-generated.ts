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
import { EmployeePayStubHistory } from '../models';
// @ts-ignore
import { Includes10 } from '../models';
// @ts-ignore
import { Includes11 } from '../models';
// @ts-ignore
import { Includes12 } from '../models';
// @ts-ignore
import { Includes9 } from '../models';
// @ts-ignore
import { PagedResultOfEmployeePayStubHistory } from '../models';
// @ts-ignore
import { PagedResultOfPayStub } from '../models';
// @ts-ignore
import { PagedResultOfPayStub2 } from '../models';
// @ts-ignore
import { PaycorError } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * EmployeePayStubsApi - axios parameter creator
 * @export
 */
export const EmployeePayStubsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Note: Either CheckDate, ProcessDate or PlannerId is required as a parameter. You can find a list of valid dates by calling \'GET Legal Entity Pay Data by Legal Entity ID\'.  Data Access: View Paystub Information
         * @summary Get Employee Pay Stubs by EmployeeID
         * @param {string} employeeId ID of an Employee for whom you want to get the Pay Stubs
         * @param {string} [checkDate] Check Date of Pay Stubs - required (unless processDate supplied)
         * @param {string} [processDate] Process Date of Pay Stubs - required (unless checkDate supplied)
         * @param {string} [plannerId] ID of the Planner for which you want to get the Pay Stubs.
         * @param {Array<Includes9>} [include] Options to include more data: All, GrossAmount, NetAmount, Earnings, Taxes, Deductions  Data Access required  GrossAmount &#x3D; View Paystub Gross Pay Information  NetAmount &#x3D; View Paystub Net Pay Information  Earnings &#x3D; View Paystub Earning Information  Taxes &#x3D; View Paystub Tax Information  Deductions &#x3D; View Paystub Deduction Information
         * @param {string} [continuationToken] Token to get the next set of Employee Pay Stubs
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getByEmployeeId: async (employeeId: string, checkDate?: string, processDate?: string, plannerId?: string, include?: Array<Includes9>, continuationToken?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'employeeId' is not null or undefined
            assertParamExists('getByEmployeeId', 'employeeId', employeeId)
            const localVarPath = `/v1/employees/{employeeId}/paystubs`
                .replace(`{${"employeeId"}}`, encodeURIComponent(String(employeeId !== undefined ? employeeId : `-employeeId-`)));
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
            if (checkDate !== undefined) {
                localVarQueryParameter['checkDate'] = (checkDate as any instanceof Date) ?
                    (checkDate as any).toISOString() :
                    checkDate;
            }

            if (processDate !== undefined) {
                localVarQueryParameter['processDate'] = (processDate as any instanceof Date) ?
                    (processDate as any).toISOString() :
                    processDate;
            }

            if (plannerId !== undefined) {
                localVarQueryParameter['plannerId'] = plannerId;
            }

            if (include) {
                localVarQueryParameter['include'] = include;
            }

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
                pathTemplate: '/v1/employees/{employeeId}/paystubs',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Note: Either CheckDate, ProcessDate or PlannerId is required as a parameter.  Data Access: View Paystub Information by Legal Entity Id
         * @summary Get Employee Pay Stubs by Legal Entity ID
         * @param {number} legalEntityId ID of a Legal entity for which you want to get the Pay Stubs
         * @param {string} [checkDate] Check Date of Pay Stubs - required (unless processDate supplied)
         * @param {string} [processDate] Process Date of Pay Stubs - required (unless checkDate supplied)
         * @param {string} [plannerId] ID of the Planner for which you want to get the Pay Stubs.
         * @param {Array<Includes10>} [include] Options to include more data: All, GrossAmount, NetAmount, Earnings, Taxes, Deductions  Data Access required  GrossAmount &#x3D; View Paystub Gross Pay Information  NetAmount &#x3D; View Paystub Net Pay Information  Earnings &#x3D; View Paystub Earning Information  Taxes &#x3D; View Paystub Tax Information  Deductions &#x3D; View Paystub Deduction Information
         * @param {string} [continuationToken] Token to get the next set of Employee Pay Stubs
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getByLegalEntity: async (legalEntityId: number, checkDate?: string, processDate?: string, plannerId?: string, include?: Array<Includes10>, continuationToken?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'legalEntityId' is not null or undefined
            assertParamExists('getByLegalEntity', 'legalEntityId', legalEntityId)
            const localVarPath = `/v1/legalentities/{legalEntityId}/paystubs`
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
            if (checkDate !== undefined) {
                localVarQueryParameter['checkDate'] = (checkDate as any instanceof Date) ?
                    (checkDate as any).toISOString() :
                    checkDate;
            }

            if (processDate !== undefined) {
                localVarQueryParameter['processDate'] = (processDate as any instanceof Date) ?
                    (processDate as any).toISOString() :
                    processDate;
            }

            if (plannerId !== undefined) {
                localVarQueryParameter['plannerId'] = plannerId;
            }

            if (include) {
                localVarQueryParameter['include'] = include;
            }

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
                pathTemplate: '/v1/legalentities/{legalEntityId}/paystubs',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * * To Check Date is required parameter.   * To get a list of check dates, you can use the GET Legal Entity Pay data endpoint.  Data Access: View Paystub Information YTD
         * @summary Get Employee Pay Stubs YTD by EmployeeID
         * @param {string} employeeId ID of an Employee for whom you want to get the Pay Stubs
         * @param {string} toCheckDate Check Date of latest Pay Stub for YTD data. 
         * @param {Array<Includes11>} [include] Options to include more data: All, Earnings, Taxes, Deductions  Data Access required  Earnings &#x3D; View Paystub Earning Information YTD  Taxes &#x3D; View Paystub Tax Information YTD  Deductions &#x3D; View Paystub Deduction Information YTD
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getYtdByEmployeeId: async (employeeId: string, toCheckDate: string, include?: Array<Includes11>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'employeeId' is not null or undefined
            assertParamExists('getYtdByEmployeeId', 'employeeId', employeeId)
            // verify required parameter 'toCheckDate' is not null or undefined
            assertParamExists('getYtdByEmployeeId', 'toCheckDate', toCheckDate)
            const localVarPath = `/v1/employees/{employeeId}/paystubsytd`
                .replace(`{${"employeeId"}}`, encodeURIComponent(String(employeeId !== undefined ? employeeId : `-employeeId-`)));
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
            if (toCheckDate !== undefined) {
                localVarQueryParameter['toCheckDate'] = (toCheckDate as any instanceof Date) ?
                    (toCheckDate as any).toISOString() :
                    toCheckDate;
            }

            if (include) {
                localVarQueryParameter['include'] = include;
            }


    
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v1/employees/{employeeId}/paystubsytd',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * * To Check Date is required parameter.   * To get a list of check dates, you can use the GET Legal Entity Pay data endpoint.  Data Access: View Paystub Information YTD By Legal Entity
         * @summary Get Employee Pay Stubs YTD by Legal entity ID
         * @param {number} legalEntityId ID of a Legal entity for which you want to get the Pay Stubs
         * @param {string} toCheckDate Check Date of latest Pay Stub for YTD data. 
         * @param {Array<Includes12>} [include] Options to include more data: All, Earnings, Taxes, Deductions  Data Access required  Earnings &#x3D; View Paystub Earning Information YTD By Legal Entity  Taxes &#x3D; View Paystub Tax Information YTD By Legal Entity  Deductions &#x3D; View Paystub Deduction Information YTD By Legal Entity
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getYtdByLegalEntity: async (legalEntityId: number, toCheckDate: string, include?: Array<Includes12>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'legalEntityId' is not null or undefined
            assertParamExists('getYtdByLegalEntity', 'legalEntityId', legalEntityId)
            // verify required parameter 'toCheckDate' is not null or undefined
            assertParamExists('getYtdByLegalEntity', 'toCheckDate', toCheckDate)
            const localVarPath = `/v1/legalentities/{legalEntityId}/paystubsytd`
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
            if (toCheckDate !== undefined) {
                localVarQueryParameter['toCheckDate'] = (toCheckDate as any instanceof Date) ?
                    (toCheckDate as any).toISOString() :
                    toCheckDate;
            }

            if (include) {
                localVarQueryParameter['include'] = include;
            }


    
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v1/legalentities/{legalEntityId}/paystubsytd',
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
 * EmployeePayStubsApi - functional programming interface
 * @export
 */
export const EmployeePayStubsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = EmployeePayStubsApiAxiosParamCreator(configuration)
    return {
        /**
         * Note: Either CheckDate, ProcessDate or PlannerId is required as a parameter. You can find a list of valid dates by calling \'GET Legal Entity Pay Data by Legal Entity ID\'.  Data Access: View Paystub Information
         * @summary Get Employee Pay Stubs by EmployeeID
         * @param {EmployeePayStubsApiGetByEmployeeIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getByEmployeeId(requestParameters: EmployeePayStubsApiGetByEmployeeIdRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PagedResultOfPayStub>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getByEmployeeId(requestParameters.employeeId, requestParameters.checkDate, requestParameters.processDate, requestParameters.plannerId, requestParameters.include, requestParameters.continuationToken, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Note: Either CheckDate, ProcessDate or PlannerId is required as a parameter.  Data Access: View Paystub Information by Legal Entity Id
         * @summary Get Employee Pay Stubs by Legal Entity ID
         * @param {EmployeePayStubsApiGetByLegalEntityRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getByLegalEntity(requestParameters: EmployeePayStubsApiGetByLegalEntityRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PagedResultOfPayStub2>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getByLegalEntity(requestParameters.legalEntityId, requestParameters.checkDate, requestParameters.processDate, requestParameters.plannerId, requestParameters.include, requestParameters.continuationToken, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * * To Check Date is required parameter.   * To get a list of check dates, you can use the GET Legal Entity Pay data endpoint.  Data Access: View Paystub Information YTD
         * @summary Get Employee Pay Stubs YTD by EmployeeID
         * @param {EmployeePayStubsApiGetYtdByEmployeeIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getYtdByEmployeeId(requestParameters: EmployeePayStubsApiGetYtdByEmployeeIdRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<EmployeePayStubHistory>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getYtdByEmployeeId(requestParameters.employeeId, requestParameters.toCheckDate, requestParameters.include, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * * To Check Date is required parameter.   * To get a list of check dates, you can use the GET Legal Entity Pay data endpoint.  Data Access: View Paystub Information YTD By Legal Entity
         * @summary Get Employee Pay Stubs YTD by Legal entity ID
         * @param {EmployeePayStubsApiGetYtdByLegalEntityRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getYtdByLegalEntity(requestParameters: EmployeePayStubsApiGetYtdByLegalEntityRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PagedResultOfEmployeePayStubHistory>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getYtdByLegalEntity(requestParameters.legalEntityId, requestParameters.toCheckDate, requestParameters.include, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * EmployeePayStubsApi - factory interface
 * @export
 */
export const EmployeePayStubsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = EmployeePayStubsApiFp(configuration)
    return {
        /**
         * Note: Either CheckDate, ProcessDate or PlannerId is required as a parameter. You can find a list of valid dates by calling \'GET Legal Entity Pay Data by Legal Entity ID\'.  Data Access: View Paystub Information
         * @summary Get Employee Pay Stubs by EmployeeID
         * @param {EmployeePayStubsApiGetByEmployeeIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getByEmployeeId(requestParameters: EmployeePayStubsApiGetByEmployeeIdRequest, options?: AxiosRequestConfig): AxiosPromise<PagedResultOfPayStub> {
            return localVarFp.getByEmployeeId(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Note: Either CheckDate, ProcessDate or PlannerId is required as a parameter.  Data Access: View Paystub Information by Legal Entity Id
         * @summary Get Employee Pay Stubs by Legal Entity ID
         * @param {EmployeePayStubsApiGetByLegalEntityRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getByLegalEntity(requestParameters: EmployeePayStubsApiGetByLegalEntityRequest, options?: AxiosRequestConfig): AxiosPromise<PagedResultOfPayStub2> {
            return localVarFp.getByLegalEntity(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * * To Check Date is required parameter.   * To get a list of check dates, you can use the GET Legal Entity Pay data endpoint.  Data Access: View Paystub Information YTD
         * @summary Get Employee Pay Stubs YTD by EmployeeID
         * @param {EmployeePayStubsApiGetYtdByEmployeeIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getYtdByEmployeeId(requestParameters: EmployeePayStubsApiGetYtdByEmployeeIdRequest, options?: AxiosRequestConfig): AxiosPromise<EmployeePayStubHistory> {
            return localVarFp.getYtdByEmployeeId(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * * To Check Date is required parameter.   * To get a list of check dates, you can use the GET Legal Entity Pay data endpoint.  Data Access: View Paystub Information YTD By Legal Entity
         * @summary Get Employee Pay Stubs YTD by Legal entity ID
         * @param {EmployeePayStubsApiGetYtdByLegalEntityRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getYtdByLegalEntity(requestParameters: EmployeePayStubsApiGetYtdByLegalEntityRequest, options?: AxiosRequestConfig): AxiosPromise<PagedResultOfEmployeePayStubHistory> {
            return localVarFp.getYtdByLegalEntity(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for getByEmployeeId operation in EmployeePayStubsApi.
 * @export
 * @interface EmployeePayStubsApiGetByEmployeeIdRequest
 */
export type EmployeePayStubsApiGetByEmployeeIdRequest = {
    
    /**
    * ID of an Employee for whom you want to get the Pay Stubs
    * @type {string}
    * @memberof EmployeePayStubsApiGetByEmployeeId
    */
    readonly employeeId: string
    
    /**
    * Check Date of Pay Stubs - required (unless processDate supplied)
    * @type {string}
    * @memberof EmployeePayStubsApiGetByEmployeeId
    */
    readonly checkDate?: string
    
    /**
    * Process Date of Pay Stubs - required (unless checkDate supplied)
    * @type {string}
    * @memberof EmployeePayStubsApiGetByEmployeeId
    */
    readonly processDate?: string
    
    /**
    * ID of the Planner for which you want to get the Pay Stubs.
    * @type {string}
    * @memberof EmployeePayStubsApiGetByEmployeeId
    */
    readonly plannerId?: string
    
    /**
    * Options to include more data: All, GrossAmount, NetAmount, Earnings, Taxes, Deductions  Data Access required  GrossAmount = View Paystub Gross Pay Information  NetAmount = View Paystub Net Pay Information  Earnings = View Paystub Earning Information  Taxes = View Paystub Tax Information  Deductions = View Paystub Deduction Information
    * @type {Array<Includes9>}
    * @memberof EmployeePayStubsApiGetByEmployeeId
    */
    readonly include?: Array<Includes9>
    
    /**
    * Token to get the next set of Employee Pay Stubs
    * @type {string}
    * @memberof EmployeePayStubsApiGetByEmployeeId
    */
    readonly continuationToken?: string
    
}

/**
 * Request parameters for getByLegalEntity operation in EmployeePayStubsApi.
 * @export
 * @interface EmployeePayStubsApiGetByLegalEntityRequest
 */
export type EmployeePayStubsApiGetByLegalEntityRequest = {
    
    /**
    * ID of a Legal entity for which you want to get the Pay Stubs
    * @type {number}
    * @memberof EmployeePayStubsApiGetByLegalEntity
    */
    readonly legalEntityId: number
    
    /**
    * Check Date of Pay Stubs - required (unless processDate supplied)
    * @type {string}
    * @memberof EmployeePayStubsApiGetByLegalEntity
    */
    readonly checkDate?: string
    
    /**
    * Process Date of Pay Stubs - required (unless checkDate supplied)
    * @type {string}
    * @memberof EmployeePayStubsApiGetByLegalEntity
    */
    readonly processDate?: string
    
    /**
    * ID of the Planner for which you want to get the Pay Stubs.
    * @type {string}
    * @memberof EmployeePayStubsApiGetByLegalEntity
    */
    readonly plannerId?: string
    
    /**
    * Options to include more data: All, GrossAmount, NetAmount, Earnings, Taxes, Deductions  Data Access required  GrossAmount = View Paystub Gross Pay Information  NetAmount = View Paystub Net Pay Information  Earnings = View Paystub Earning Information  Taxes = View Paystub Tax Information  Deductions = View Paystub Deduction Information
    * @type {Array<Includes10>}
    * @memberof EmployeePayStubsApiGetByLegalEntity
    */
    readonly include?: Array<Includes10>
    
    /**
    * Token to get the next set of Employee Pay Stubs
    * @type {string}
    * @memberof EmployeePayStubsApiGetByLegalEntity
    */
    readonly continuationToken?: string
    
}

/**
 * Request parameters for getYtdByEmployeeId operation in EmployeePayStubsApi.
 * @export
 * @interface EmployeePayStubsApiGetYtdByEmployeeIdRequest
 */
export type EmployeePayStubsApiGetYtdByEmployeeIdRequest = {
    
    /**
    * ID of an Employee for whom you want to get the Pay Stubs
    * @type {string}
    * @memberof EmployeePayStubsApiGetYtdByEmployeeId
    */
    readonly employeeId: string
    
    /**
    * Check Date of latest Pay Stub for YTD data. 
    * @type {string}
    * @memberof EmployeePayStubsApiGetYtdByEmployeeId
    */
    readonly toCheckDate: string
    
    /**
    * Options to include more data: All, Earnings, Taxes, Deductions  Data Access required  Earnings = View Paystub Earning Information YTD  Taxes = View Paystub Tax Information YTD  Deductions = View Paystub Deduction Information YTD
    * @type {Array<Includes11>}
    * @memberof EmployeePayStubsApiGetYtdByEmployeeId
    */
    readonly include?: Array<Includes11>
    
}

/**
 * Request parameters for getYtdByLegalEntity operation in EmployeePayStubsApi.
 * @export
 * @interface EmployeePayStubsApiGetYtdByLegalEntityRequest
 */
export type EmployeePayStubsApiGetYtdByLegalEntityRequest = {
    
    /**
    * ID of a Legal entity for which you want to get the Pay Stubs
    * @type {number}
    * @memberof EmployeePayStubsApiGetYtdByLegalEntity
    */
    readonly legalEntityId: number
    
    /**
    * Check Date of latest Pay Stub for YTD data. 
    * @type {string}
    * @memberof EmployeePayStubsApiGetYtdByLegalEntity
    */
    readonly toCheckDate: string
    
    /**
    * Options to include more data: All, Earnings, Taxes, Deductions  Data Access required  Earnings = View Paystub Earning Information YTD By Legal Entity  Taxes = View Paystub Tax Information YTD By Legal Entity  Deductions = View Paystub Deduction Information YTD By Legal Entity
    * @type {Array<Includes12>}
    * @memberof EmployeePayStubsApiGetYtdByLegalEntity
    */
    readonly include?: Array<Includes12>
    
}

/**
 * EmployeePayStubsApiGenerated - object-oriented interface
 * @export
 * @class EmployeePayStubsApiGenerated
 * @extends {BaseAPI}
 */
export class EmployeePayStubsApiGenerated extends BaseAPI {
    /**
     * Note: Either CheckDate, ProcessDate or PlannerId is required as a parameter. You can find a list of valid dates by calling \'GET Legal Entity Pay Data by Legal Entity ID\'.  Data Access: View Paystub Information
     * @summary Get Employee Pay Stubs by EmployeeID
     * @param {EmployeePayStubsApiGetByEmployeeIdRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmployeePayStubsApiGenerated
     */
    public getByEmployeeId(requestParameters: EmployeePayStubsApiGetByEmployeeIdRequest, options?: AxiosRequestConfig) {
        return EmployeePayStubsApiFp(this.configuration).getByEmployeeId(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Note: Either CheckDate, ProcessDate or PlannerId is required as a parameter.  Data Access: View Paystub Information by Legal Entity Id
     * @summary Get Employee Pay Stubs by Legal Entity ID
     * @param {EmployeePayStubsApiGetByLegalEntityRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmployeePayStubsApiGenerated
     */
    public getByLegalEntity(requestParameters: EmployeePayStubsApiGetByLegalEntityRequest, options?: AxiosRequestConfig) {
        return EmployeePayStubsApiFp(this.configuration).getByLegalEntity(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * * To Check Date is required parameter.   * To get a list of check dates, you can use the GET Legal Entity Pay data endpoint.  Data Access: View Paystub Information YTD
     * @summary Get Employee Pay Stubs YTD by EmployeeID
     * @param {EmployeePayStubsApiGetYtdByEmployeeIdRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmployeePayStubsApiGenerated
     */
    public getYtdByEmployeeId(requestParameters: EmployeePayStubsApiGetYtdByEmployeeIdRequest, options?: AxiosRequestConfig) {
        return EmployeePayStubsApiFp(this.configuration).getYtdByEmployeeId(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * * To Check Date is required parameter.   * To get a list of check dates, you can use the GET Legal Entity Pay data endpoint.  Data Access: View Paystub Information YTD By Legal Entity
     * @summary Get Employee Pay Stubs YTD by Legal entity ID
     * @param {EmployeePayStubsApiGetYtdByLegalEntityRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmployeePayStubsApiGenerated
     */
    public getYtdByLegalEntity(requestParameters: EmployeePayStubsApiGetYtdByLegalEntityRequest, options?: AxiosRequestConfig) {
        return EmployeePayStubsApiFp(this.configuration).getYtdByLegalEntity(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}
