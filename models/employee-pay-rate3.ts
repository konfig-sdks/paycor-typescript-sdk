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
import type * as buffer from "buffer"

import { PayType } from './pay-type';

/**
 * The Update PayRate model includes fields that can be updated on an existing PayRate. 
 * @export
 * @interface EmployeePayRate3
 */
export interface EmployeePayRate3 {
    /**
     * Represents the date that the payrate goes into effect.  PUT requires EffectiveStartDate value to be unique for this PayRateId.              
     * @type {string}
     * @memberof EmployeePayRate3
     */
    'EffectiveStartDate': string;
    /**
     * Orders how multiple earnings are calculated. Needed so earnings dependent on other earnings are calculated in the proper sequence. For PUT, this should match an existing SequenceNumber (retrieved via GET Employee PayRates).
     * @type {number}
     * @memberof EmployeePayRate3
     */
    'SequenceNumber'?: number;
    /**
     * Employee\'s rate of pay (in dollars).  If Pay Type is Hourly, then Pay Rate is a Per-Hour dollar amount and is required.  If Pay Type is Salary, then Pay Rate is a Per-Pay dollar amount, and either Pay Rate or Annual Rate is required. Payrate can\'t have more than 6 decimal places and can\'t be negative.              
     * @type {number}
     * @memberof EmployeePayRate3
     */
    'PayRate': number;
    /**
     * Employee\'s annual pay amount (in dollars). Only used if Type=Salary.  * For Salary Type, AnnualPayRate overrides payRate if passed into API call. The value not provided will be calculated based on Employee\'s Annual Hours setup on Employee\'s Profile. * For Hourly Type, this parameter is ignored - Paycor calculates based on Employee\'s Annual Hours setup on Employee\'s Profile.             
     * @type {number}
     * @memberof EmployeePayRate3
     */
    'AnnualPayRate'?: number | null;
    /**
     * Required. Brief description of the employee\'s pay rate. Defaults to \"Rate {SequenceNumber}\" Must be 20 characters or less             
     * @type {string}
     * @memberof EmployeePayRate3
     */
    'Description': string;
    /**
     * Enumeration of valid Pay Type values.             
     * @type {PayType}
     * @memberof EmployeePayRate3
     */
    'Type'?: PayType;
    /**
     * Reason associated with the employee\'s pay rate. Optional.              
     * @type {string}
     * @memberof EmployeePayRate3
     */
    'Reason'?: string | null;
    /**
     * Notes associated with the employee\'s pay rate, which will be displayed on Pay Rate History page.  Must be 512 characters or less. Optional.              
     * @type {string}
     * @memberof EmployeePayRate3
     */
    'Notes'?: string | null;
}

