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
import { AdjustWithholdingType } from '../models';
// @ts-ignore
import { CreateOrUpdateResponse } from '../models';
// @ts-ignore
import { EmployeeExemptions } from '../models';
// @ts-ignore
import { EmployeeTax } from '../models';
// @ts-ignore
import { EmployeeTax2 } from '../models';
// @ts-ignore
import { EmployeeTax3 } from '../models';
// @ts-ignore
import { EmployeeTaxCredit } from '../models';
// @ts-ignore
import { FilingStatus } from '../models';
// @ts-ignore
import { FilingStatus2 } from '../models';
// @ts-ignore
import { GlobalTaxForm } from '../models';
// @ts-ignore
import { Includes16 } from '../models';
// @ts-ignore
import { PaycorError } from '../models';
// @ts-ignore
import { ReciprocityType } from '../models';
import { paginate } from "../pagination/paginate";
import type * as buffer from "buffer"
import { requestBeforeHook } from '../requestBeforeHook';
/**
 * EmployeeTaxesApi - axios parameter creator
 * @export
 */
export const EmployeeTaxesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * * Use GET Tax Fields by Tax Code to determine payload needed to complete this call  Data Access: Create Employee Tax
         * @summary Add Tax by EmployeeID
         * @param {string} employeeId ID of an Employee for whom you want to add the tax
         * @param {EmployeeTax2} employeeTax2 EmployeeTax object
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addByEmployeeId: async (employeeId: string, employeeTax2: EmployeeTax2, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'employeeId' is not null or undefined
            assertParamExists('addByEmployeeId', 'employeeId', employeeId)
            // verify required parameter 'employeeTax2' is not null or undefined
            assertParamExists('addByEmployeeId', 'employeeTax2', employeeTax2)
            const localVarPath = `/v1/employees/{employeeId}/taxes`
                .replace(`{${"employeeId"}}`, encodeURIComponent(String(employeeId !== undefined ? employeeId : `-employeeId-`)));
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
                requestBody: employeeTax2,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v1/employees/{employeeId}/taxes',
                httpMethod: 'POST'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(employeeTax2, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Data Access: View Employee Taxes
         * @summary Get Employee Taxes by EmployeeID
         * @param {string} employeeId ID of the employee for whom you want to get the taxes
         * @param {Array<Includes16>} [include] Options to include more data: All, TaxCredits  Data Access required  TaxCredits &#x3D; View Employee Tax Credits
         * @param {string} [continuationToken] Token to get the next set of employee taxes
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getByEmployeeId: async (employeeId: string, include?: Array<Includes16>, continuationToken?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'employeeId' is not null or undefined
            assertParamExists('getByEmployeeId', 'employeeId', employeeId)
            const localVarPath = `/v1/employees/{employeeId}/taxes`
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
                pathTemplate: '/v1/employees/{employeeId}/taxes',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Data Access: View Filing Status by Tax Code
         * @summary Get Filing Status by Tax Code
         * @param {string} taxCode You can retrieve a valid Tax Code via Get Legal Entity Taxes by Legal Entity ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getFilingStatusByTaxCode: async (taxCode: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'taxCode' is not null or undefined
            assertParamExists('getFilingStatusByTaxCode', 'taxCode', taxCode)
            const localVarPath = `/v1/employees/taxes/filingStatus/{taxCode}`
                .replace(`{${"taxCode"}}`, encodeURIComponent(String(taxCode !== undefined ? taxCode : `-taxCode-`)));
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
                pathTemplate: '/v1/employees/taxes/filingStatus/{taxCode}',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * * This endpoint will allow you to pass in a Tax Code and will return the fields that are expected to be passed for PUT/POST Employee Taxes * To get the Tax Codes available for your account to be used for this endpoint, use GET Legal Entity Taxes by Legal Entity ID  Data Access: Get Tax Fields By Tax Code
         * @summary Get Tax Fields by Tax Code
         * @param {string} taxCode You can retrieve a Tax fields by Tax Codes
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTaxFieldsByTaxCode: async (taxCode: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'taxCode' is not null or undefined
            assertParamExists('getTaxFieldsByTaxCode', 'taxCode', taxCode)
            const localVarPath = `/v1/employees/taxes/taxFields/{taxCode}`
                .replace(`{${"taxCode"}}`, encodeURIComponent(String(taxCode !== undefined ? taxCode : `-taxCode-`)));
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
                pathTemplate: '/v1/employees/taxes/taxFields/{taxCode}',
                httpMethod: 'GET'
            });

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * * Use GET Tax Fields by Tax Code to determine payload needed to complete this call  Data Access: Update Employee Tax
         * @summary Update Tax by EmployeeID
         * @param {string} employeeId ID of an Employee for whom you want to update the tax
         * @param {EmployeeTax3} employeeTax3 EmployeeTax object
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateByEmployeeId: async (employeeId: string, employeeTax3: EmployeeTax3, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'employeeId' is not null or undefined
            assertParamExists('updateByEmployeeId', 'employeeId', employeeId)
            // verify required parameter 'employeeTax3' is not null or undefined
            assertParamExists('updateByEmployeeId', 'employeeTax3', employeeTax3)
            const localVarPath = `/v1/employees/{employeeId}/taxes`
                .replace(`{${"employeeId"}}`, encodeURIComponent(String(employeeId !== undefined ? employeeId : `-employeeId-`)));
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
                requestBody: employeeTax3,
                queryParameters: localVarQueryParameter,
                requestConfig: localVarRequestOptions,
                path: localVarPath,
                configuration,
                pathTemplate: '/v1/employees/{employeeId}/taxes',
                httpMethod: 'PUT'
            });
            localVarRequestOptions.data = serializeDataIfNeeded(employeeTax3, localVarRequestOptions, configuration)

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * EmployeeTaxesApi - functional programming interface
 * @export
 */
export const EmployeeTaxesApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = EmployeeTaxesApiAxiosParamCreator(configuration)
    return {
        /**
         * * Use GET Tax Fields by Tax Code to determine payload needed to complete this call  Data Access: Create Employee Tax
         * @summary Add Tax by EmployeeID
         * @param {EmployeeTaxesApiAddByEmployeeIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addByEmployeeId(requestParameters: EmployeeTaxesApiAddByEmployeeIdRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CreateOrUpdateResponse>>> {
            const employeeTax2: EmployeeTax2 = {
                LegalEntityTaxId: requestParameters.LegalEntityTaxId,
                ReciprocityType: requestParameters.ReciprocityType,
                FilingStatus: requestParameters.FilingStatus,
                WithholdingEffectiveStartDate: requestParameters.WithholdingEffectiveStartDate,
                BlockDate: requestParameters.BlockDate,
                NonResidentAlien: requestParameters.NonResidentAlien,
                IsProbationaryEmployee: requestParameters.IsProbationaryEmployee,
                OccupationalCode: requestParameters.OccupationalCode,
                GeographicCode: requestParameters.GeographicCode,
                SOCCode: requestParameters.SOCCode,
                SeasonalCode: requestParameters.SeasonalCode,
                CountyCode: requestParameters.CountyCode,
                SpouseWork: requestParameters.SpouseWork,
                DependentInsuranceEligible: requestParameters.DependentInsuranceEligible,
                DependentInsuranceEligibleDate: requestParameters.DependentInsuranceEligibleDate,
                ApplicableBirthyear: requestParameters.ApplicableBirthyear,
                AdjustWithholding: requestParameters.AdjustWithholding,
                Amount: requestParameters.Amount,
                Percentage: requestParameters.Percentage,
                NCCICode: requestParameters.NCCICode,
                PsdCode: requestParameters.PsdCode,
                PsdRate: requestParameters.PsdRate,
                OnHold: requestParameters.OnHold,
                Exemptions: requestParameters.Exemptions,
                TaxCredit: requestParameters.TaxCredit
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.addByEmployeeId(requestParameters.employeeId, employeeTax2, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Data Access: View Employee Taxes
         * @summary Get Employee Taxes by EmployeeID
         * @param {EmployeeTaxesApiGetByEmployeeIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getByEmployeeId(requestParameters: EmployeeTaxesApiGetByEmployeeIdRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<EmployeeTax>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getByEmployeeId(requestParameters.employeeId, requestParameters.include, requestParameters.continuationToken, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Data Access: View Filing Status by Tax Code
         * @summary Get Filing Status by Tax Code
         * @param {EmployeeTaxesApiGetFilingStatusByTaxCodeRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getFilingStatusByTaxCode(requestParameters: EmployeeTaxesApiGetFilingStatusByTaxCodeRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<FilingStatus>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getFilingStatusByTaxCode(requestParameters.taxCode, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * * This endpoint will allow you to pass in a Tax Code and will return the fields that are expected to be passed for PUT/POST Employee Taxes * To get the Tax Codes available for your account to be used for this endpoint, use GET Legal Entity Taxes by Legal Entity ID  Data Access: Get Tax Fields By Tax Code
         * @summary Get Tax Fields by Tax Code
         * @param {EmployeeTaxesApiGetTaxFieldsByTaxCodeRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getTaxFieldsByTaxCode(requestParameters: EmployeeTaxesApiGetTaxFieldsByTaxCodeRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GlobalTaxForm>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getTaxFieldsByTaxCode(requestParameters.taxCode, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * * Use GET Tax Fields by Tax Code to determine payload needed to complete this call  Data Access: Update Employee Tax
         * @summary Update Tax by EmployeeID
         * @param {EmployeeTaxesApiUpdateByEmployeeIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateByEmployeeId(requestParameters: EmployeeTaxesApiUpdateByEmployeeIdRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CreateOrUpdateResponse>>> {
            const employeeTax3: EmployeeTax3 = {
                Id: requestParameters.Id,
                LegalEntityTaxId: requestParameters.LegalEntityTaxId,
                ReciprocityType: requestParameters.ReciprocityType,
                FilingStatus: requestParameters.FilingStatus,
                WithholdingEffectiveStartDate: requestParameters.WithholdingEffectiveStartDate,
                BlockDate: requestParameters.BlockDate,
                NonResidentAlien: requestParameters.NonResidentAlien,
                IsProbationaryEmployee: requestParameters.IsProbationaryEmployee,
                OccupationalCode: requestParameters.OccupationalCode,
                GeographicCode: requestParameters.GeographicCode,
                SOCCode: requestParameters.SOCCode,
                SeasonalCode: requestParameters.SeasonalCode,
                CountyCode: requestParameters.CountyCode,
                SpouseWork: requestParameters.SpouseWork,
                DependentInsuranceEligible: requestParameters.DependentInsuranceEligible,
                DependentInsuranceEligibleDate: requestParameters.DependentInsuranceEligibleDate,
                ApplicableBirthyear: requestParameters.ApplicableBirthyear,
                Amount: requestParameters.Amount,
                Percentage: requestParameters.Percentage,
                NCCICode: requestParameters.NCCICode,
                PsdCode: requestParameters.PsdCode,
                PsdRate: requestParameters.PsdRate,
                OnHold: requestParameters.OnHold,
                Exemptions: requestParameters.Exemptions,
                TaxCredit: requestParameters.TaxCredit
            };
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateByEmployeeId(requestParameters.employeeId, employeeTax3, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * EmployeeTaxesApi - factory interface
 * @export
 */
export const EmployeeTaxesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = EmployeeTaxesApiFp(configuration)
    return {
        /**
         * * Use GET Tax Fields by Tax Code to determine payload needed to complete this call  Data Access: Create Employee Tax
         * @summary Add Tax by EmployeeID
         * @param {EmployeeTaxesApiAddByEmployeeIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addByEmployeeId(requestParameters: EmployeeTaxesApiAddByEmployeeIdRequest, options?: AxiosRequestConfig): AxiosPromise<Array<CreateOrUpdateResponse>> {
            return localVarFp.addByEmployeeId(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Data Access: View Employee Taxes
         * @summary Get Employee Taxes by EmployeeID
         * @param {EmployeeTaxesApiGetByEmployeeIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getByEmployeeId(requestParameters: EmployeeTaxesApiGetByEmployeeIdRequest, options?: AxiosRequestConfig): AxiosPromise<Array<EmployeeTax>> {
            return localVarFp.getByEmployeeId(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * Data Access: View Filing Status by Tax Code
         * @summary Get Filing Status by Tax Code
         * @param {EmployeeTaxesApiGetFilingStatusByTaxCodeRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getFilingStatusByTaxCode(requestParameters: EmployeeTaxesApiGetFilingStatusByTaxCodeRequest, options?: AxiosRequestConfig): AxiosPromise<FilingStatus> {
            return localVarFp.getFilingStatusByTaxCode(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * * This endpoint will allow you to pass in a Tax Code and will return the fields that are expected to be passed for PUT/POST Employee Taxes * To get the Tax Codes available for your account to be used for this endpoint, use GET Legal Entity Taxes by Legal Entity ID  Data Access: Get Tax Fields By Tax Code
         * @summary Get Tax Fields by Tax Code
         * @param {EmployeeTaxesApiGetTaxFieldsByTaxCodeRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTaxFieldsByTaxCode(requestParameters: EmployeeTaxesApiGetTaxFieldsByTaxCodeRequest, options?: AxiosRequestConfig): AxiosPromise<GlobalTaxForm> {
            return localVarFp.getTaxFieldsByTaxCode(requestParameters, options).then((request) => request(axios, basePath));
        },
        /**
         * * Use GET Tax Fields by Tax Code to determine payload needed to complete this call  Data Access: Update Employee Tax
         * @summary Update Tax by EmployeeID
         * @param {EmployeeTaxesApiUpdateByEmployeeIdRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateByEmployeeId(requestParameters: EmployeeTaxesApiUpdateByEmployeeIdRequest, options?: AxiosRequestConfig): AxiosPromise<Array<CreateOrUpdateResponse>> {
            return localVarFp.updateByEmployeeId(requestParameters, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for addByEmployeeId operation in EmployeeTaxesApi.
 * @export
 * @interface EmployeeTaxesApiAddByEmployeeIdRequest
 */
export type EmployeeTaxesApiAddByEmployeeIdRequest = {
    
    /**
    * ID of an Employee for whom you want to add the tax
    * @type {string}
    * @memberof EmployeeTaxesApiAddByEmployeeId
    */
    readonly employeeId: string
    
} & EmployeeTax2

/**
 * Request parameters for getByEmployeeId operation in EmployeeTaxesApi.
 * @export
 * @interface EmployeeTaxesApiGetByEmployeeIdRequest
 */
export type EmployeeTaxesApiGetByEmployeeIdRequest = {
    
    /**
    * ID of the employee for whom you want to get the taxes
    * @type {string}
    * @memberof EmployeeTaxesApiGetByEmployeeId
    */
    readonly employeeId: string
    
    /**
    * Options to include more data: All, TaxCredits  Data Access required  TaxCredits = View Employee Tax Credits
    * @type {Array<Includes16>}
    * @memberof EmployeeTaxesApiGetByEmployeeId
    */
    readonly include?: Array<Includes16>
    
    /**
    * Token to get the next set of employee taxes
    * @type {string}
    * @memberof EmployeeTaxesApiGetByEmployeeId
    */
    readonly continuationToken?: string
    
}

/**
 * Request parameters for getFilingStatusByTaxCode operation in EmployeeTaxesApi.
 * @export
 * @interface EmployeeTaxesApiGetFilingStatusByTaxCodeRequest
 */
export type EmployeeTaxesApiGetFilingStatusByTaxCodeRequest = {
    
    /**
    * You can retrieve a valid Tax Code via Get Legal Entity Taxes by Legal Entity ID
    * @type {string}
    * @memberof EmployeeTaxesApiGetFilingStatusByTaxCode
    */
    readonly taxCode: string
    
}

/**
 * Request parameters for getTaxFieldsByTaxCode operation in EmployeeTaxesApi.
 * @export
 * @interface EmployeeTaxesApiGetTaxFieldsByTaxCodeRequest
 */
export type EmployeeTaxesApiGetTaxFieldsByTaxCodeRequest = {
    
    /**
    * You can retrieve a Tax fields by Tax Codes
    * @type {string}
    * @memberof EmployeeTaxesApiGetTaxFieldsByTaxCode
    */
    readonly taxCode: string
    
}

/**
 * Request parameters for updateByEmployeeId operation in EmployeeTaxesApi.
 * @export
 * @interface EmployeeTaxesApiUpdateByEmployeeIdRequest
 */
export type EmployeeTaxesApiUpdateByEmployeeIdRequest = {
    
    /**
    * ID of an Employee for whom you want to update the tax
    * @type {string}
    * @memberof EmployeeTaxesApiUpdateByEmployeeId
    */
    readonly employeeId: string
    
} & EmployeeTax3

/**
 * EmployeeTaxesApiGenerated - object-oriented interface
 * @export
 * @class EmployeeTaxesApiGenerated
 * @extends {BaseAPI}
 */
export class EmployeeTaxesApiGenerated extends BaseAPI {
    /**
     * * Use GET Tax Fields by Tax Code to determine payload needed to complete this call  Data Access: Create Employee Tax
     * @summary Add Tax by EmployeeID
     * @param {EmployeeTaxesApiAddByEmployeeIdRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmployeeTaxesApiGenerated
     */
    public addByEmployeeId(requestParameters: EmployeeTaxesApiAddByEmployeeIdRequest, options?: AxiosRequestConfig) {
        return EmployeeTaxesApiFp(this.configuration).addByEmployeeId(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Data Access: View Employee Taxes
     * @summary Get Employee Taxes by EmployeeID
     * @param {EmployeeTaxesApiGetByEmployeeIdRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmployeeTaxesApiGenerated
     */
    public getByEmployeeId(requestParameters: EmployeeTaxesApiGetByEmployeeIdRequest, options?: AxiosRequestConfig) {
        return EmployeeTaxesApiFp(this.configuration).getByEmployeeId(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Data Access: View Filing Status by Tax Code
     * @summary Get Filing Status by Tax Code
     * @param {EmployeeTaxesApiGetFilingStatusByTaxCodeRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmployeeTaxesApiGenerated
     */
    public getFilingStatusByTaxCode(requestParameters: EmployeeTaxesApiGetFilingStatusByTaxCodeRequest, options?: AxiosRequestConfig) {
        return EmployeeTaxesApiFp(this.configuration).getFilingStatusByTaxCode(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * * This endpoint will allow you to pass in a Tax Code and will return the fields that are expected to be passed for PUT/POST Employee Taxes * To get the Tax Codes available for your account to be used for this endpoint, use GET Legal Entity Taxes by Legal Entity ID  Data Access: Get Tax Fields By Tax Code
     * @summary Get Tax Fields by Tax Code
     * @param {EmployeeTaxesApiGetTaxFieldsByTaxCodeRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmployeeTaxesApiGenerated
     */
    public getTaxFieldsByTaxCode(requestParameters: EmployeeTaxesApiGetTaxFieldsByTaxCodeRequest, options?: AxiosRequestConfig) {
        return EmployeeTaxesApiFp(this.configuration).getTaxFieldsByTaxCode(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * * Use GET Tax Fields by Tax Code to determine payload needed to complete this call  Data Access: Update Employee Tax
     * @summary Update Tax by EmployeeID
     * @param {EmployeeTaxesApiUpdateByEmployeeIdRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmployeeTaxesApiGenerated
     */
    public updateByEmployeeId(requestParameters: EmployeeTaxesApiUpdateByEmployeeIdRequest, options?: AxiosRequestConfig) {
        return EmployeeTaxesApiFp(this.configuration).updateByEmployeeId(requestParameters, options).then((request) => request(this.axios, this.basePath));
    }
}