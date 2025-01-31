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
import { Includes20 } from '../models';
// @ts-ignore
import { Includes21 } from '../models';
// @ts-ignore
import { IncludesList } from '../models';
// @ts-ignore
import { PagedResultOfPerson } from '../models';
// @ts-ignore
import { PagedResultOfPersonList } from '../models';
// @ts-ignore
import { PaycorError } from '../models';
// @ts-ignore
import { Person } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * PersonsApi - axios parameter creator
 * @export
 */
export const PersonsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Data Access: View Employee Person
         * @summary Get Person by EmployeeID
         * @param {string} employeeId EmployeeID linked to the Person you want to get
         * @param {Array<Includes21>} [include] Options to include more data: All, Demographic, Benefit, Military, SocialMedia, Addresses, EmployeeAssignments, EmergencyContact, SocialSecurityNumber, Phones
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getByEmployeeIdPerson: async (employeeId: string, include?: Array<Includes21>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'employeeId' is not null or undefined
            assertParamExists('getByEmployeeIdPerson', 'employeeId', employeeId)
            const localVarPath = `/v1/employees/{employeeId}/person`
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
                pathTemplate: '/v1/employees/{employeeId}/person',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Note that PersonID and TenantID must always be passed together.  Data Access: View Person Information
         * @summary Get Person By TenantID And PersonID
         * @param {number} tenantId ID of the Tenant that the Person is in
         * @param {string} personId ID of the Person you want to get
         * @param {Array<Includes20>} [include] Options to include more data:  All, Demographic, Benefit, Military, SocialMedia, Addresses, EmployeeAssignments, EmergencyContact, SocialSecurityNumber, Phones  Demographic &#x3D; View Person Demographic Information  Benefit &#x3D; View Person Disability and Tobacco Status  Military &#x3D; View Person Military  SocialMedia &#x3D; View Person Social Media  Addresses &#x3D; View Person Addresses  EmployeeAssignments &#x3D; View Employee Records  EmergencyContact &#x3D; View Person Emergency Contacts  SocialSecurityNumber &#x3D; View Person SSN  Phones &#x3D; View Person Phone
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getByTenantAndPerson: async (tenantId: number, personId: string, include?: Array<Includes20>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenantId' is not null or undefined
            assertParamExists('getByTenantAndPerson', 'tenantId', tenantId)
            // verify required parameter 'personId' is not null or undefined
            assertParamExists('getByTenantAndPerson', 'personId', personId)
            const localVarPath = `/v1/tenants/{tenantId}/persons/{personId}`
                .replace(`{${"tenantId"}}`, encodeURIComponent(String(tenantId !== undefined ? tenantId : `-tenantId-`)))
                .replace(`{${"personId"}}`, encodeURIComponent(String(personId !== undefined ? personId : `-personId-`)));
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
                pathTemplate: '/v1/tenants/{tenantId}/persons/{personId}',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Data Access: View Legal Entity Persons
         * @summary Get Persons by Legal Entity ID
         * @param {number} legalEntityId ID of the Legal Entity for which you want to get the persons
         * @param {Array<IncludesList>} [include] Options to include more data: All, Demographic, Benefit, Military, SocialMedia, Addresses, EmployeeAssignments, SocialSecurityNumber, Phones  Data Access required  Demographic &#x3D; View Person Demographic Information  Benefit &#x3D; View Person Disability and Tobacco Status  Military &#x3D; View Person Military  SocialMedia &#x3D; View Person Social Media  Addresses &#x3D; View Person Addresses  EmployeeAssignments &#x3D; View Employee Records
         * @param {string} [continuationToken] Token to get the next set of persons
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listByLegalEntityId: async (legalEntityId: number, include?: Array<IncludesList>, continuationToken?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'legalEntityId' is not null or undefined
            assertParamExists('listByLegalEntityId', 'legalEntityId', legalEntityId)
            const localVarPath = `/v1/legalEntities/{legalEntityId}/persons`
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
                pathTemplate: '/v1/legalEntities/{legalEntityId}/persons',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * PersonList provides a subset of the full Person fields.  Data Access: View Tenant Persons
         * @summary Get Persons By TenantID
         * @param {number} tenantId ID of the Tenant for which you want to get persons
         * @param {string} [continuationToken] Token to get the next set of persons
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listByTenantId: async (tenantId: number, continuationToken?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'tenantId' is not null or undefined
            assertParamExists('listByTenantId', 'tenantId', tenantId)
            const localVarPath = `/v1/tenants/{tenantId}/persons`
                .replace(`{${"tenantId"}}`, encodeURIComponent(String(tenantId !== undefined ? tenantId : `-tenantId-`)));
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
                pathTemplate: '/v1/tenants/{tenantId}/persons',
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
 * PersonsApi - functional programming interface
 * @export
 */
export const PersonsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = PersonsApiAxiosParamCreator(configuration)
    return {
        /**
         * Data Access: View Employee Person
         * @summary Get Person by EmployeeID
         * @param {PersonsApiGetByEmployeeIdPersonRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getByEmployeeIdPerson(requestParameters: PersonsApiGetByEmployeeIdPersonRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Person>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getByEmployeeIdPerson(requestParameters.employeeId, requestParameters.include, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Note that PersonID and TenantID must always be passed together.  Data Access: View Person Information
         * @summary Get Person By TenantID And PersonID
         * @param {PersonsApiGetByTenantAndPersonRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getByTenantAndPerson(requestParameters: PersonsApiGetByTenantAndPersonRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Person>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getByTenantAndPerson(requestParameters.tenantId, requestParameters.personId, requestParameters.include, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Data Access: View Legal Entity Persons
         * @summary Get Persons by Legal Entity ID
         * @param {PersonsApiListByLegalEntityIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listByLegalEntityId(requestParameters: PersonsApiListByLegalEntityIdRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PagedResultOfPerson>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listByLegalEntityId(requestParameters.legalEntityId, requestParameters.include, requestParameters.continuationToken, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * PersonList provides a subset of the full Person fields.  Data Access: View Tenant Persons
         * @summary Get Persons By TenantID
         * @param {PersonsApiListByTenantIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listByTenantId(requestParameters: PersonsApiListByTenantIdRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PagedResultOfPersonList>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listByTenantId(requestParameters.tenantId, requestParameters.continuationToken, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * PersonsApi - factory interface
 * @export
 */
export const PersonsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = PersonsApiFp(configuration)
    return {
        /**
         * Data Access: View Employee Person
         * @summary Get Person by EmployeeID
         * @param {PersonsApiGetByEmployeeIdPersonRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getByEmployeeIdPerson(requestParameters: PersonsApiGetByEmployeeIdPersonRequest, options?: AxiosRequestConfig): AxiosPromise<Person> {
            return localVarFp.getByEmployeeIdPerson(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Note that PersonID and TenantID must always be passed together.  Data Access: View Person Information
         * @summary Get Person By TenantID And PersonID
         * @param {PersonsApiGetByTenantAndPersonRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getByTenantAndPerson(requestParameters: PersonsApiGetByTenantAndPersonRequest, options?: AxiosRequestConfig): AxiosPromise<Person> {
            return localVarFp.getByTenantAndPerson(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Data Access: View Legal Entity Persons
         * @summary Get Persons by Legal Entity ID
         * @param {PersonsApiListByLegalEntityIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listByLegalEntityId(requestParameters: PersonsApiListByLegalEntityIdRequest, options?: AxiosRequestConfig): AxiosPromise<PagedResultOfPerson> {
            return localVarFp.listByLegalEntityId(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * PersonList provides a subset of the full Person fields.  Data Access: View Tenant Persons
         * @summary Get Persons By TenantID
         * @param {PersonsApiListByTenantIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listByTenantId(requestParameters: PersonsApiListByTenantIdRequest, options?: AxiosRequestConfig): AxiosPromise<PagedResultOfPersonList> {
            return localVarFp.listByTenantId(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for getByEmployeeIdPerson operation in PersonsApi.
 * @export
 * @interface PersonsApiGetByEmployeeIdPersonRequest
 */
export type PersonsApiGetByEmployeeIdPersonRequest = {
    
    /**
    * EmployeeID linked to the Person you want to get
    * @type {string}
    * @memberof PersonsApiGetByEmployeeIdPerson
    */
    readonly employeeId: string
    
    /**
    * Options to include more data: All, Demographic, Benefit, Military, SocialMedia, Addresses, EmployeeAssignments, EmergencyContact, SocialSecurityNumber, Phones
    * @type {Array<Includes21>}
    * @memberof PersonsApiGetByEmployeeIdPerson
    */
    readonly include?: Array<Includes21>
    
}

/**
 * Request parameters for getByTenantAndPerson operation in PersonsApi.
 * @export
 * @interface PersonsApiGetByTenantAndPersonRequest
 */
export type PersonsApiGetByTenantAndPersonRequest = {
    
    /**
    * ID of the Tenant that the Person is in
    * @type {number}
    * @memberof PersonsApiGetByTenantAndPerson
    */
    readonly tenantId: number
    
    /**
    * ID of the Person you want to get
    * @type {string}
    * @memberof PersonsApiGetByTenantAndPerson
    */
    readonly personId: string
    
    /**
    * Options to include more data:  All, Demographic, Benefit, Military, SocialMedia, Addresses, EmployeeAssignments, EmergencyContact, SocialSecurityNumber, Phones  Demographic = View Person Demographic Information  Benefit = View Person Disability and Tobacco Status  Military = View Person Military  SocialMedia = View Person Social Media  Addresses = View Person Addresses  EmployeeAssignments = View Employee Records  EmergencyContact = View Person Emergency Contacts  SocialSecurityNumber = View Person SSN  Phones = View Person Phone
    * @type {Array<Includes20>}
    * @memberof PersonsApiGetByTenantAndPerson
    */
    readonly include?: Array<Includes20>
    
}

/**
 * Request parameters for listByLegalEntityId operation in PersonsApi.
 * @export
 * @interface PersonsApiListByLegalEntityIdRequest
 */
export type PersonsApiListByLegalEntityIdRequest = {
    
    /**
    * ID of the Legal Entity for which you want to get the persons
    * @type {number}
    * @memberof PersonsApiListByLegalEntityId
    */
    readonly legalEntityId: number
    
    /**
    * Options to include more data: All, Demographic, Benefit, Military, SocialMedia, Addresses, EmployeeAssignments, SocialSecurityNumber, Phones  Data Access required  Demographic = View Person Demographic Information  Benefit = View Person Disability and Tobacco Status  Military = View Person Military  SocialMedia = View Person Social Media  Addresses = View Person Addresses  EmployeeAssignments = View Employee Records
    * @type {Array<IncludesList>}
    * @memberof PersonsApiListByLegalEntityId
    */
    readonly include?: Array<IncludesList>
    
    /**
    * Token to get the next set of persons
    * @type {string}
    * @memberof PersonsApiListByLegalEntityId
    */
    readonly continuationToken?: string
    
}

/**
 * Request parameters for listByTenantId operation in PersonsApi.
 * @export
 * @interface PersonsApiListByTenantIdRequest
 */
export type PersonsApiListByTenantIdRequest = {
    
    /**
    * ID of the Tenant for which you want to get persons
    * @type {number}
    * @memberof PersonsApiListByTenantId
    */
    readonly tenantId: number
    
    /**
    * Token to get the next set of persons
    * @type {string}
    * @memberof PersonsApiListByTenantId
    */
    readonly continuationToken?: string
    
}

/**
 * PersonsApiGenerated - object-oriented interface
 * @export
 * @class PersonsApiGenerated
 * @extends {BaseAPI}
 */
export class PersonsApiGenerated extends BaseAPI {
    /**
     * Data Access: View Employee Person
     * @summary Get Person by EmployeeID
     * @param {PersonsApiGetByEmployeeIdPersonRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PersonsApiGenerated
     */
    public getByEmployeeIdPerson(requestParameters: PersonsApiGetByEmployeeIdPersonRequest, options?: AxiosRequestConfig) {
        return PersonsApiFp(this.configuration).getByEmployeeIdPerson(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Note that PersonID and TenantID must always be passed together.  Data Access: View Person Information
     * @summary Get Person By TenantID And PersonID
     * @param {PersonsApiGetByTenantAndPersonRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PersonsApiGenerated
     */
    public getByTenantAndPerson(requestParameters: PersonsApiGetByTenantAndPersonRequest, options?: AxiosRequestConfig) {
        return PersonsApiFp(this.configuration).getByTenantAndPerson(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Data Access: View Legal Entity Persons
     * @summary Get Persons by Legal Entity ID
     * @param {PersonsApiListByLegalEntityIdRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PersonsApiGenerated
     */
    public listByLegalEntityId(requestParameters: PersonsApiListByLegalEntityIdRequest, options?: AxiosRequestConfig) {
        return PersonsApiFp(this.configuration).listByLegalEntityId(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * PersonList provides a subset of the full Person fields.  Data Access: View Tenant Persons
     * @summary Get Persons By TenantID
     * @param {PersonsApiListByTenantIdRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PersonsApiGenerated
     */
    public listByTenantId(requestParameters: PersonsApiListByTenantIdRequest, options?: AxiosRequestConfig) {
        return PersonsApiFp(this.configuration).listByTenantId(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}
