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
import { PagedResultOfLegalEntityPayData } from '../models';
// @ts-ignore
import { PaycorError } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * LegalEntityPayDataApi - axios parameter creator
 * @export
 */
export const LegalEntityPayDataApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * This endpoint returns the dates that particular employees were actually paid. * You can retrieve all employees by not passing EmployeeId, or you can pass EmployeeId to filter. * The returned values (Check Date or Process Date) can be used as an input for GET Employee Pay Stubs. * Only dates from provided fromCheckDate and toCheckDate are used. * Requires exactly one filtering parameter to be passed in. Choose *one* of these three:   * Check Date range: parameters fromCheckDate and toCheckDate   * Process Date: the single date the payrun was processed.   * PlannerID: You can retrieve your Planner ID by using the Legal Entity Payroll Processing Data endpoint. * Returns one object per pay date, even if there were multiple paychecks on that same date. * Does include Additional Payruns, which don\'t have to follow the schedule and can be used for bonuses.  Data Access: View Paydata Information
         * @summary Get Legal Entity Pay Data by Legal Entity ID
         * @param {number} legalEntityId ID of the Legal Entity for which you want to get the Pay Data
         * @param {string} [employeeId] ID of an Employee, if you want to filter to paydata from a specific Employee
         * @param {string} [fromCheckDate] Filter Option 1: Date Range, From Check Date of Payrun
         * @param {string} [toCheckDate] Filter Option 1: Date Range, To Check Date of Payrun
         * @param {string} [processDate] Filter Option 2: Process Date of Payrun
         * @param {string} [plannerId] Filter Option 3: ID of the Planner for which you want to get the Pay Data.
         * @param {string} [continuationToken] Token to get the next set of Legal Entity Pay Data
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPayDates: async (legalEntityId: number, employeeId?: string, fromCheckDate?: string, toCheckDate?: string, processDate?: string, plannerId?: string, continuationToken?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'legalEntityId' is not null or undefined
            assertParamExists('getPayDates', 'legalEntityId', legalEntityId)
            const localVarPath = `/v1/legalentities/{legalEntityId}/paydata`
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
            if (employeeId !== undefined) {
                localVarQueryParameter['employeeId'] = employeeId;
            }

            if (fromCheckDate !== undefined) {
                localVarQueryParameter['fromCheckDate'] = (fromCheckDate as any instanceof Date) ?
                    (fromCheckDate as any).toISOString() :
                    fromCheckDate;
            }

            if (toCheckDate !== undefined) {
                localVarQueryParameter['toCheckDate'] = (toCheckDate as any instanceof Date) ?
                    (toCheckDate as any).toISOString() :
                    toCheckDate;
            }

            if (processDate !== undefined) {
                localVarQueryParameter['processDate'] = (processDate as any instanceof Date) ?
                    (processDate as any).toISOString() :
                    processDate;
            }

            if (plannerId !== undefined) {
                localVarQueryParameter['plannerId'] = plannerId;
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
                pathTemplate: '/v1/legalentities/{legalEntityId}/paydata',
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
 * LegalEntityPayDataApi - functional programming interface
 * @export
 */
export const LegalEntityPayDataApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = LegalEntityPayDataApiAxiosParamCreator(configuration)
    return {
        /**
         * This endpoint returns the dates that particular employees were actually paid. * You can retrieve all employees by not passing EmployeeId, or you can pass EmployeeId to filter. * The returned values (Check Date or Process Date) can be used as an input for GET Employee Pay Stubs. * Only dates from provided fromCheckDate and toCheckDate are used. * Requires exactly one filtering parameter to be passed in. Choose *one* of these three:   * Check Date range: parameters fromCheckDate and toCheckDate   * Process Date: the single date the payrun was processed.   * PlannerID: You can retrieve your Planner ID by using the Legal Entity Payroll Processing Data endpoint. * Returns one object per pay date, even if there were multiple paychecks on that same date. * Does include Additional Payruns, which don\'t have to follow the schedule and can be used for bonuses.  Data Access: View Paydata Information
         * @summary Get Legal Entity Pay Data by Legal Entity ID
         * @param {LegalEntityPayDataApiGetPayDatesRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getPayDates(requestParameters: LegalEntityPayDataApiGetPayDatesRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PagedResultOfLegalEntityPayData>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getPayDates(requestParameters.legalEntityId, requestParameters.employeeId, requestParameters.fromCheckDate, requestParameters.toCheckDate, requestParameters.processDate, requestParameters.plannerId, requestParameters.continuationToken, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * LegalEntityPayDataApi - factory interface
 * @export
 */
export const LegalEntityPayDataApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = LegalEntityPayDataApiFp(configuration)
    return {
        /**
         * This endpoint returns the dates that particular employees were actually paid. * You can retrieve all employees by not passing EmployeeId, or you can pass EmployeeId to filter. * The returned values (Check Date or Process Date) can be used as an input for GET Employee Pay Stubs. * Only dates from provided fromCheckDate and toCheckDate are used. * Requires exactly one filtering parameter to be passed in. Choose *one* of these three:   * Check Date range: parameters fromCheckDate and toCheckDate   * Process Date: the single date the payrun was processed.   * PlannerID: You can retrieve your Planner ID by using the Legal Entity Payroll Processing Data endpoint. * Returns one object per pay date, even if there were multiple paychecks on that same date. * Does include Additional Payruns, which don\'t have to follow the schedule and can be used for bonuses.  Data Access: View Paydata Information
         * @summary Get Legal Entity Pay Data by Legal Entity ID
         * @param {LegalEntityPayDataApiGetPayDatesRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getPayDates(requestParameters: LegalEntityPayDataApiGetPayDatesRequest, options?: AxiosRequestConfig): AxiosPromise<PagedResultOfLegalEntityPayData> {
            return localVarFp.getPayDates(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for getPayDates operation in LegalEntityPayDataApi.
 * @export
 * @interface LegalEntityPayDataApiGetPayDatesRequest
 */
export type LegalEntityPayDataApiGetPayDatesRequest = {
    
    /**
    * ID of the Legal Entity for which you want to get the Pay Data
    * @type {number}
    * @memberof LegalEntityPayDataApiGetPayDates
    */
    readonly legalEntityId: number
    
    /**
    * ID of an Employee, if you want to filter to paydata from a specific Employee
    * @type {string}
    * @memberof LegalEntityPayDataApiGetPayDates
    */
    readonly employeeId?: string
    
    /**
    * Filter Option 1: Date Range, From Check Date of Payrun
    * @type {string}
    * @memberof LegalEntityPayDataApiGetPayDates
    */
    readonly fromCheckDate?: string
    
    /**
    * Filter Option 1: Date Range, To Check Date of Payrun
    * @type {string}
    * @memberof LegalEntityPayDataApiGetPayDates
    */
    readonly toCheckDate?: string
    
    /**
    * Filter Option 2: Process Date of Payrun
    * @type {string}
    * @memberof LegalEntityPayDataApiGetPayDates
    */
    readonly processDate?: string
    
    /**
    * Filter Option 3: ID of the Planner for which you want to get the Pay Data.
    * @type {string}
    * @memberof LegalEntityPayDataApiGetPayDates
    */
    readonly plannerId?: string
    
    /**
    * Token to get the next set of Legal Entity Pay Data
    * @type {string}
    * @memberof LegalEntityPayDataApiGetPayDates
    */
    readonly continuationToken?: string
    
}

/**
 * LegalEntityPayDataApiGenerated - object-oriented interface
 * @export
 * @class LegalEntityPayDataApiGenerated
 * @extends {BaseAPI}
 */
export class LegalEntityPayDataApiGenerated extends BaseAPI {
    /**
     * This endpoint returns the dates that particular employees were actually paid. * You can retrieve all employees by not passing EmployeeId, or you can pass EmployeeId to filter. * The returned values (Check Date or Process Date) can be used as an input for GET Employee Pay Stubs. * Only dates from provided fromCheckDate and toCheckDate are used. * Requires exactly one filtering parameter to be passed in. Choose *one* of these three:   * Check Date range: parameters fromCheckDate and toCheckDate   * Process Date: the single date the payrun was processed.   * PlannerID: You can retrieve your Planner ID by using the Legal Entity Payroll Processing Data endpoint. * Returns one object per pay date, even if there were multiple paychecks on that same date. * Does include Additional Payruns, which don\'t have to follow the schedule and can be used for bonuses.  Data Access: View Paydata Information
     * @summary Get Legal Entity Pay Data by Legal Entity ID
     * @param {LegalEntityPayDataApiGetPayDatesRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LegalEntityPayDataApiGenerated
     */
    public getPayDates(requestParameters: LegalEntityPayDataApiGetPayDatesRequest, options?: AxiosRequestConfig) {
        return LegalEntityPayDataApiFp(this.configuration).getPayDates(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}
