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
import { CreateOrUpdateResponse } from '../models';
// @ts-ignore
import { Department } from '../models';
// @ts-ignore
import { Department2 } from '../models';
// @ts-ignore
import { Department3 } from '../models';
// @ts-ignore
import { PagedResultOfDepartment } from '../models';
// @ts-ignore
import { PaycorError } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * LegalEntityDepartmentsApi - axios parameter creator
 * @export
 */
export const LegalEntityDepartmentsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Creates new Department for a Legal Entity. * the newly created Department will take at least 60 seconds to propagate through the system  Data Access: Create and Update Legal Entity Departments
         * @summary Create Departments by Legal Entity Id
         * @param {number} legalEntityId ID of the Legal Entity for which you want to create the Departments
         * @param {Department2} department2 Create department model
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createNewDepartment: async (legalEntityId: number, department2: Department2, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'legalEntityId' is not null or undefined
            assertParamExists('createNewDepartment', 'legalEntityId', legalEntityId)
            // verify required parameter 'department2' is not null or undefined
            assertParamExists('createNewDepartment', 'department2', department2)
            const localVarPath = `/v1/legalentities/{legalEntityId}/departments`
                .replace(`{${"legalEntityId"}}`, encodeURIComponent(String(legalEntityId !== undefined ? legalEntityId : `-legalEntityId-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Access-Token required
            await setApiKeyToObject({ object: localVarHeaderParameter, key: "Authorization", keyParamName: "accessToken", configuration })
            // authentication Apim-Subscription-Key required
            await setApiKeyToObject({ object: localVarHeaderParameter, key: "Ocp-Apim-Subscription-Key", keyParamName: "apimSubscriptionKey", configuration })

    
            localVarHeaderParameter['Content-Type'] = 'application/json';


            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                requestBody: department2,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v1/legalentities/{legalEntityId}/departments',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(department2, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Data Access: View Legal Entity Departments by Department Id
         * @summary Get Legal Entity Department by Legal Entity ID and Department ID
         * @param {number} legalEntityId ID of the Legal Entity for which you want to get the Departments
         * @param {string} departmentId ID of the Department
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getById: async (legalEntityId: number, departmentId: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'legalEntityId' is not null or undefined
            assertParamExists('getById', 'legalEntityId', legalEntityId)
            // verify required parameter 'departmentId' is not null or undefined
            assertParamExists('getById', 'departmentId', departmentId)
            const localVarPath = `/v1/legalentities/{legalEntityId}/departments/{departmentId}`
                .replace(`{${"legalEntityId"}}`, encodeURIComponent(String(legalEntityId !== undefined ? legalEntityId : `-legalEntityId-`)))
                .replace(`{${"departmentId"}}`, encodeURIComponent(String(departmentId !== undefined ? departmentId : `-departmentId-`)));
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

    
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v1/legalentities/{legalEntityId}/departments/{departmentId}',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Data Access: View Legal Entity Departments Information
         * @summary Get Legal Entity Departments by Legal Entity ID
         * @param {number} legalEntityId ID of the Legal Entity for which you want to get the Departments
         * @param {string} [continuationToken] Token to get the next set of Legal Entity Departments
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listByLegalEntityId: async (legalEntityId: number, continuationToken?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'legalEntityId' is not null or undefined
            assertParamExists('listByLegalEntityId', 'legalEntityId', legalEntityId)
            const localVarPath = `/v1/legalentities/{legalEntityId}/departments`
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
                pathTemplate: '/v1/legalentities/{legalEntityId}/departments',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Updates existing Department for a Legal Entity. * The update of the Department will take at least 60 seconds to propagate through the system * When updating top level departments, payroll id should be used as parent id  Data Access: Create and Update Legal Entity Departments
         * @summary Update Legal Entity Department by Legal Entity ID
         * @param {number} legalEntityId ID of the Legal Entity for which you want to update the Department
         * @param {Department3} department3 Update Department model
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateByLegalEntityId: async (legalEntityId: number, department3: Department3, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'legalEntityId' is not null or undefined
            assertParamExists('updateByLegalEntityId', 'legalEntityId', legalEntityId)
            // verify required parameter 'department3' is not null or undefined
            assertParamExists('updateByLegalEntityId', 'department3', department3)
            const localVarPath = `/v1/legalentities/{legalEntityId}/departments`
                .replace(`{${"legalEntityId"}}`, encodeURIComponent(String(legalEntityId !== undefined ? legalEntityId : `-legalEntityId-`)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions: AxiosRequestConfig = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = configuration && !isBrowser() ? { "User-Agent": configuration.userAgent } : {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Access-Token required
            await setApiKeyToObject({ object: localVarHeaderParameter, key: "Authorization", keyParamName: "accessToken", configuration })
            // authentication Apim-Subscription-Key required
            await setApiKeyToObject({ object: localVarHeaderParameter, key: "Ocp-Apim-Subscription-Key", keyParamName: "apimSubscriptionKey", configuration })

    
            localVarHeaderParameter['Content-Type'] = 'application/json';


            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            requestBeforeHook({
                requestBody: department3,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v1/legalentities/{legalEntityId}/departments',
                httpMethod: 'PUT'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(department3, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * LegalEntityDepartmentsApi - functional programming interface
 * @export
 */
export const LegalEntityDepartmentsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = LegalEntityDepartmentsApiAxiosParamCreator(configuration)
    return {
        /**
         * Creates new Department for a Legal Entity. * the newly created Department will take at least 60 seconds to propagate through the system  Data Access: Create and Update Legal Entity Departments
         * @summary Create Departments by Legal Entity Id
         * @param {LegalEntityDepartmentsApiCreateNewDepartmentRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createNewDepartment(requestParameters: LegalEntityDepartmentsApiCreateNewDepartmentRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CreateOrUpdateResponse>> {
            const department2: Department2 = {
                Code: requestParameters.Code,
                ParentId: requestParameters.ParentId,
                Description: requestParameters.Description,
                WorkLocationId: requestParameters.WorkLocationId
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.createNewDepartment(requestParameters.legalEntityId, department2, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Data Access: View Legal Entity Departments by Department Id
         * @summary Get Legal Entity Department by Legal Entity ID and Department ID
         * @param {LegalEntityDepartmentsApiGetByIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getById(requestParameters: LegalEntityDepartmentsApiGetByIdRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Department>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getById(requestParameters.legalEntityId, requestParameters.departmentId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Data Access: View Legal Entity Departments Information
         * @summary Get Legal Entity Departments by Legal Entity ID
         * @param {LegalEntityDepartmentsApiListByLegalEntityIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listByLegalEntityId(requestParameters: LegalEntityDepartmentsApiListByLegalEntityIdRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PagedResultOfDepartment>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listByLegalEntityId(requestParameters.legalEntityId, requestParameters.continuationToken, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Updates existing Department for a Legal Entity. * The update of the Department will take at least 60 seconds to propagate through the system * When updating top level departments, payroll id should be used as parent id  Data Access: Create and Update Legal Entity Departments
         * @summary Update Legal Entity Department by Legal Entity ID
         * @param {LegalEntityDepartmentsApiUpdateByLegalEntityIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateByLegalEntityId(requestParameters: LegalEntityDepartmentsApiUpdateByLegalEntityIdRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PagedResultOfDepartment>> {
            const department3: Department3 = {
                DepartmentId: requestParameters.DepartmentId,
                Code: requestParameters.Code,
                ParentId: requestParameters.ParentId,
                Description: requestParameters.Description,
                WorkLocationId: requestParameters.WorkLocationId
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateByLegalEntityId(requestParameters.legalEntityId, department3, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * LegalEntityDepartmentsApi - factory interface
 * @export
 */
export const LegalEntityDepartmentsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = LegalEntityDepartmentsApiFp(configuration)
    return {
        /**
         * Creates new Department for a Legal Entity. * the newly created Department will take at least 60 seconds to propagate through the system  Data Access: Create and Update Legal Entity Departments
         * @summary Create Departments by Legal Entity Id
         * @param {LegalEntityDepartmentsApiCreateNewDepartmentRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createNewDepartment(requestParameters: LegalEntityDepartmentsApiCreateNewDepartmentRequest, options?: AxiosRequestConfig): AxiosPromise<CreateOrUpdateResponse> {
            return localVarFp.createNewDepartment(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Data Access: View Legal Entity Departments by Department Id
         * @summary Get Legal Entity Department by Legal Entity ID and Department ID
         * @param {LegalEntityDepartmentsApiGetByIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getById(requestParameters: LegalEntityDepartmentsApiGetByIdRequest, options?: AxiosRequestConfig): AxiosPromise<Department> {
            return localVarFp.getById(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Data Access: View Legal Entity Departments Information
         * @summary Get Legal Entity Departments by Legal Entity ID
         * @param {LegalEntityDepartmentsApiListByLegalEntityIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listByLegalEntityId(requestParameters: LegalEntityDepartmentsApiListByLegalEntityIdRequest, options?: AxiosRequestConfig): AxiosPromise<PagedResultOfDepartment> {
            return localVarFp.listByLegalEntityId(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Updates existing Department for a Legal Entity. * The update of the Department will take at least 60 seconds to propagate through the system * When updating top level departments, payroll id should be used as parent id  Data Access: Create and Update Legal Entity Departments
         * @summary Update Legal Entity Department by Legal Entity ID
         * @param {LegalEntityDepartmentsApiUpdateByLegalEntityIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateByLegalEntityId(requestParameters: LegalEntityDepartmentsApiUpdateByLegalEntityIdRequest, options?: AxiosRequestConfig): AxiosPromise<PagedResultOfDepartment> {
            return localVarFp.updateByLegalEntityId(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for createNewDepartment operation in LegalEntityDepartmentsApi.
 * @export
 * @interface LegalEntityDepartmentsApiCreateNewDepartmentRequest
 */
export type LegalEntityDepartmentsApiCreateNewDepartmentRequest = {
    
    /**
    * ID of the Legal Entity for which you want to create the Departments
    * @type {number}
    * @memberof LegalEntityDepartmentsApiCreateNewDepartment
    */
    readonly legalEntityId: number
    
} & Department2

/**
 * Request parameters for getById operation in LegalEntityDepartmentsApi.
 * @export
 * @interface LegalEntityDepartmentsApiGetByIdRequest
 */
export type LegalEntityDepartmentsApiGetByIdRequest = {
    
    /**
    * ID of the Legal Entity for which you want to get the Departments
    * @type {number}
    * @memberof LegalEntityDepartmentsApiGetById
    */
    readonly legalEntityId: number
    
    /**
    * ID of the Department
    * @type {string}
    * @memberof LegalEntityDepartmentsApiGetById
    */
    readonly departmentId: string
    
}

/**
 * Request parameters for listByLegalEntityId operation in LegalEntityDepartmentsApi.
 * @export
 * @interface LegalEntityDepartmentsApiListByLegalEntityIdRequest
 */
export type LegalEntityDepartmentsApiListByLegalEntityIdRequest = {
    
    /**
    * ID of the Legal Entity for which you want to get the Departments
    * @type {number}
    * @memberof LegalEntityDepartmentsApiListByLegalEntityId
    */
    readonly legalEntityId: number
    
    /**
    * Token to get the next set of Legal Entity Departments
    * @type {string}
    * @memberof LegalEntityDepartmentsApiListByLegalEntityId
    */
    readonly continuationToken?: string
    
}

/**
 * Request parameters for updateByLegalEntityId operation in LegalEntityDepartmentsApi.
 * @export
 * @interface LegalEntityDepartmentsApiUpdateByLegalEntityIdRequest
 */
export type LegalEntityDepartmentsApiUpdateByLegalEntityIdRequest = {
    
    /**
    * ID of the Legal Entity for which you want to update the Department
    * @type {number}
    * @memberof LegalEntityDepartmentsApiUpdateByLegalEntityId
    */
    readonly legalEntityId: number
    
} & Department3

/**
 * LegalEntityDepartmentsApiGenerated - object-oriented interface
 * @export
 * @class LegalEntityDepartmentsApiGenerated
 * @extends {BaseAPI}
 */
export class LegalEntityDepartmentsApiGenerated extends BaseAPI {
    /**
     * Creates new Department for a Legal Entity. * the newly created Department will take at least 60 seconds to propagate through the system  Data Access: Create and Update Legal Entity Departments
     * @summary Create Departments by Legal Entity Id
     * @param {LegalEntityDepartmentsApiCreateNewDepartmentRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LegalEntityDepartmentsApiGenerated
     */
    public createNewDepartment(requestParameters: LegalEntityDepartmentsApiCreateNewDepartmentRequest, options?: AxiosRequestConfig) {
        return LegalEntityDepartmentsApiFp(this.configuration).createNewDepartment(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Data Access: View Legal Entity Departments by Department Id
     * @summary Get Legal Entity Department by Legal Entity ID and Department ID
     * @param {LegalEntityDepartmentsApiGetByIdRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LegalEntityDepartmentsApiGenerated
     */
    public getById(requestParameters: LegalEntityDepartmentsApiGetByIdRequest, options?: AxiosRequestConfig) {
        return LegalEntityDepartmentsApiFp(this.configuration).getById(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Data Access: View Legal Entity Departments Information
     * @summary Get Legal Entity Departments by Legal Entity ID
     * @param {LegalEntityDepartmentsApiListByLegalEntityIdRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LegalEntityDepartmentsApiGenerated
     */
    public listByLegalEntityId(requestParameters: LegalEntityDepartmentsApiListByLegalEntityIdRequest, options?: AxiosRequestConfig) {
        return LegalEntityDepartmentsApiFp(this.configuration).listByLegalEntityId(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Updates existing Department for a Legal Entity. * The update of the Department will take at least 60 seconds to propagate through the system * When updating top level departments, payroll id should be used as parent id  Data Access: Create and Update Legal Entity Departments
     * @summary Update Legal Entity Department by Legal Entity ID
     * @param {LegalEntityDepartmentsApiUpdateByLegalEntityIdRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LegalEntityDepartmentsApiGenerated
     */
    public updateByLegalEntityId(requestParameters: LegalEntityDepartmentsApiUpdateByLegalEntityIdRequest, options?: AxiosRequestConfig) {
        return LegalEntityDepartmentsApiFp(this.configuration).updateByLegalEntityId(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}