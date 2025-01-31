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

import { EmployeeExemptions } from './employee-exemptions';
import { EmployeeTaxCredit } from './employee-tax-credit';
import { FilingStatus2 } from './filing-status2';
import { ReciprocityType } from './reciprocity-type';

/**
 * The Employee Tax model represents Employee level Tax information.
 * @export
 * @interface EmployeeTax3
 */
export interface EmployeeTax3 {
    /**
     * Unique identifier of the employee tax in Paycor\'s system. Generated by Paycor.
     * @type {string}
     * @memberof EmployeeTax3
     */
    'Id': string;
    /**
     * Unique identifier of the legal entity tax in Paycor\'s system. Generated by Paycor.
     * @type {string}
     * @memberof EmployeeTax3
     */
    'LegalEntityTaxId': string;
    /**
     * Enumeration of valid Types of multi-state Reciprocity values.             
     * @type {ReciprocityType}
     * @memberof EmployeeTax3
     */
    'ReciprocityType'?: ReciprocityType;
    /**
     * Enumeration of valid Filing Status values.
     * @type {FilingStatus2}
     * @memberof EmployeeTax3
     */
    'FilingStatus'?: FilingStatus2;
    /**
     * Effective start date of withholding
     * @type {string}
     * @memberof EmployeeTax3
     */
    'WithholdingEffectiveStartDate'?: string | null;
    /**
     * Withholding block date
     * @type {string}
     * @memberof EmployeeTax3
     */
    'BlockDate'?: string | null;
    /**
     * Specifies whether an employee is NonResidentAlien
     * @type {string}
     * @memberof EmployeeTax3
     */
    'NonResidentAlien'?: string | null;
    /**
     * Specifies whether an employee is a probationary employee
     * @type {boolean}
     * @memberof EmployeeTax3
     */
    'IsProbationaryEmployee'?: boolean | null;
    /**
     * Occupational code
     * @type {string}
     * @memberof EmployeeTax3
     */
    'OccupationalCode'?: string | null;
    /**
     * Geographic code Required only for UNEAK tax
     * @type {string}
     * @memberof EmployeeTax3
     */
    'GeographicCode'?: string | null;
    /**
     * Standard occupational classification Code
     * @type {string}
     * @memberof EmployeeTax3
     */
    'SOCCode'?: string | null;
    /**
     * Seasonal Code 
     * @type {string}
     * @memberof EmployeeTax3
     */
    'SeasonalCode'?: string | null;
    /**
     * County Code
     * @type {string}
     * @memberof EmployeeTax3
     */
    'CountyCode'?: string | null;
    /**
     * Specifies  whether an employee\'s spouse is employed
     * @type {string}
     * @memberof EmployeeTax3
     */
    'SpouseWork'?: string | null;
    /**
     * Dependent insurance eligibility status
     * @type {string}
     * @memberof EmployeeTax3
     */
    'DependentInsuranceEligible'?: string | null;
    /**
     * Dependent insurance eligibility date
     * @type {string}
     * @memberof EmployeeTax3
     */
    'DependentInsuranceEligibleDate'?: string | null;
    /**
     * Birth year
     * @type {number}
     * @memberof EmployeeTax3
     */
    'ApplicableBirthyear'?: number | null;
    /**
     * Fixed, recurring deduction dollar amount.             
     * @type {number}
     * @memberof EmployeeTax3
     */
    'Amount'?: number | null;
    /**
     * Percentage value used in tax calculation. 
     * @type {number}
     * @memberof EmployeeTax3
     */
    'Percentage'?: number | null;
    /**
     * National Council on Compensation Insurance (NCCI) Code 
     * @type {string}
     * @memberof EmployeeTax3
     */
    'NCCICode'?: string | null;
    /**
     * PA Residence PSD code- political subdivision code
     * @type {string}
     * @memberof EmployeeTax3
     */
    'PsdCode'?: string | null;
    /**
     * PA Residence PSD rate
     * @type {number}
     * @memberof EmployeeTax3
     */
    'PsdRate'?: number | null;
    /**
     * Whether employee tax should appear on paychecks.             
     * @type {boolean}
     * @memberof EmployeeTax3
     */
    'OnHold'?: boolean | null;
    /**
     * 
     * @type {EmployeeExemptions}
     * @memberof EmployeeTax3
     */
    'Exemptions'?: EmployeeExemptions;
    /**
     * 
     * @type {EmployeeTaxCredit}
     * @memberof EmployeeTax3
     */
    'TaxCredit'?: EmployeeTaxCredit;
}

