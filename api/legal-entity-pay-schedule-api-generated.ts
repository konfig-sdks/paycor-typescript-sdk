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
import { PagedResultOfPayPeriod } from '../models';
// @ts-ignore
import { PaycorError } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * LegalEntityPayScheduleApi - axios parameter creator
 * @export
 */
export const LegalEntityPayScheduleApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * This returns the schedule of regularly-scheduled payruns for a given Paygroup and date range.  * Tip: first list the Paygroups within a Legal Entity using GET Legal Entity Pay Groups, in order to populate the payGroupId parameter * Tip: You can take the returned Check Dates or Process Dates and pass into Get Employee Pay Stubs by EmployeeID  Note that query parameters PayGroupId, AsOfDate and UntilDate are required.  Data Access: View Pay Schedule Information
         * @summary Get Legal Entity Pay Schedule by Legal Entity ID and Paygroup ID
         * @param {number} legalEntityId ID of the Legal Entity for which you want to get the Pay Schedule
         * @param {string} [payGroupId] ID of the Paygroup for whom you want to get the Pay Schedule. Available via \&#39;GET Legal Entity Pay Groups\&#39;
         * @param {string} [asOfDate] Acts as a \&#39;start date\&#39; filter - looks for Payruns that are in-progress or unpaid as of this date
         * @param {string} [untilDate] Acts as an \&#39;end date\&#39; filter - looks for Payruns that are in-progress or unpaid until this date
         * @param {string} [continuationToken] Token to get the next set of Legal Entity Pay Schedule
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getByLegalEntityAndPaygroup: async (legalEntityId: number, payGroupId?: string, asOfDate?: string, untilDate?: string, continuationToken?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'legalEntityId' is not null or undefined
            assertParamExists('getByLegalEntityAndPaygroup', 'legalEntityId', legalEntityId)
            const localVarPath = `/v1/legalentities/{legalEntityId}/payschedule`
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
            if (payGroupId !== undefined) {
                localVarQueryParameter['payGroupId'] = payGroupId;
            }

            if (asOfDate !== undefined) {
                localVarQueryParameter['asOfDate'] = (asOfDate as any instanceof Date) ?
                    (asOfDate as any).toISOString() :
                    asOfDate;
            }

            if (untilDate !== undefined) {
                localVarQueryParameter['untilDate'] = (untilDate as any instanceof Date) ?
                    (untilDate as any).toISOString() :
                    untilDate;
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
                pathTemplate: '/v1/legalentities/{legalEntityId}/payschedule',
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
 * LegalEntityPayScheduleApi - functional programming interface
 * @export
 */
export const LegalEntityPayScheduleApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = LegalEntityPayScheduleApiAxiosParamCreator(configuration)
    return {
        /**
         * This returns the schedule of regularly-scheduled payruns for a given Paygroup and date range.  * Tip: first list the Paygroups within a Legal Entity using GET Legal Entity Pay Groups, in order to populate the payGroupId parameter * Tip: You can take the returned Check Dates or Process Dates and pass into Get Employee Pay Stubs by EmployeeID  Note that query parameters PayGroupId, AsOfDate and UntilDate are required.  Data Access: View Pay Schedule Information
         * @summary Get Legal Entity Pay Schedule by Legal Entity ID and Paygroup ID
         * @param {LegalEntityPayScheduleApiGetByLegalEntityAndPaygroupRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getByLegalEntityAndPaygroup(requestParameters: LegalEntityPayScheduleApiGetByLegalEntityAndPaygroupRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PagedResultOfPayPeriod>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getByLegalEntityAndPaygroup(requestParameters.legalEntityId, requestParameters.payGroupId, requestParameters.asOfDate, requestParameters.untilDate, requestParameters.continuationToken, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * LegalEntityPayScheduleApi - factory interface
 * @export
 */
export const LegalEntityPayScheduleApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = LegalEntityPayScheduleApiFp(configuration)
    return {
        /**
         * This returns the schedule of regularly-scheduled payruns for a given Paygroup and date range.  * Tip: first list the Paygroups within a Legal Entity using GET Legal Entity Pay Groups, in order to populate the payGroupId parameter * Tip: You can take the returned Check Dates or Process Dates and pass into Get Employee Pay Stubs by EmployeeID  Note that query parameters PayGroupId, AsOfDate and UntilDate are required.  Data Access: View Pay Schedule Information
         * @summary Get Legal Entity Pay Schedule by Legal Entity ID and Paygroup ID
         * @param {LegalEntityPayScheduleApiGetByLegalEntityAndPaygroupRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getByLegalEntityAndPaygroup(requestParameters: LegalEntityPayScheduleApiGetByLegalEntityAndPaygroupRequest, options?: AxiosRequestConfig): AxiosPromise<PagedResultOfPayPeriod> {
            return localVarFp.getByLegalEntityAndPaygroup(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for getByLegalEntityAndPaygroup operation in LegalEntityPayScheduleApi.
 * @export
 * @interface LegalEntityPayScheduleApiGetByLegalEntityAndPaygroupRequest
 */
export type LegalEntityPayScheduleApiGetByLegalEntityAndPaygroupRequest = {
    
    /**
    * ID of the Legal Entity for which you want to get the Pay Schedule
    * @type {number}
    * @memberof LegalEntityPayScheduleApiGetByLegalEntityAndPaygroup
    */
    readonly legalEntityId: number
    
    /**
    * ID of the Paygroup for whom you want to get the Pay Schedule. Available via \'GET Legal Entity Pay Groups\'
    * @type {string}
    * @memberof LegalEntityPayScheduleApiGetByLegalEntityAndPaygroup
    */
    readonly payGroupId?: string
    
    /**
    * Acts as a \'start date\' filter - looks for Payruns that are in-progress or unpaid as of this date
    * @type {string}
    * @memberof LegalEntityPayScheduleApiGetByLegalEntityAndPaygroup
    */
    readonly asOfDate?: string
    
    /**
    * Acts as an \'end date\' filter - looks for Payruns that are in-progress or unpaid until this date
    * @type {string}
    * @memberof LegalEntityPayScheduleApiGetByLegalEntityAndPaygroup
    */
    readonly untilDate?: string
    
    /**
    * Token to get the next set of Legal Entity Pay Schedule
    * @type {string}
    * @memberof LegalEntityPayScheduleApiGetByLegalEntityAndPaygroup
    */
    readonly continuationToken?: string
    
}

/**
 * LegalEntityPayScheduleApiGenerated - object-oriented interface
 * @export
 * @class LegalEntityPayScheduleApiGenerated
 * @extends {BaseAPI}
 */
export class LegalEntityPayScheduleApiGenerated extends BaseAPI {
    /**
     * This returns the schedule of regularly-scheduled payruns for a given Paygroup and date range.  * Tip: first list the Paygroups within a Legal Entity using GET Legal Entity Pay Groups, in order to populate the payGroupId parameter * Tip: You can take the returned Check Dates or Process Dates and pass into Get Employee Pay Stubs by EmployeeID  Note that query parameters PayGroupId, AsOfDate and UntilDate are required.  Data Access: View Pay Schedule Information
     * @summary Get Legal Entity Pay Schedule by Legal Entity ID and Paygroup ID
     * @param {LegalEntityPayScheduleApiGetByLegalEntityAndPaygroupRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LegalEntityPayScheduleApiGenerated
     */
    public getByLegalEntityAndPaygroup(requestParameters: LegalEntityPayScheduleApiGetByLegalEntityAndPaygroupRequest, options?: AxiosRequestConfig) {
        return LegalEntityPayScheduleApiFp(this.configuration).getByLegalEntityAndPaygroup(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}
