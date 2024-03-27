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

import { AccountType } from './account-type';
import { DirectDepositType } from './direct-deposit-type';
import { PayFrequency } from './pay-frequency';
import { ResourceReference } from './resource-reference';

/**
 * The Employee Direct Deposit model represents an Employee\'s Direct Deposit information.
 * @export
 * @interface EmployeeDirectDeposit
 */
export interface EmployeeDirectDeposit {
    /**
     * Unique identifier of the employee direct deposit in Paycor\'s system. Generated by Paycor.             
     * @type {string}
     * @memberof EmployeeDirectDeposit
     */
    'Id'?: string;
    /**
     * Enumeration of valid Types of Account values.
     * @type {AccountType}
     * @memberof EmployeeDirectDeposit
     */
    'AccountType'?: AccountType;
    /**
     * The masked bank account number where the direct deposit is directed.             
     * @type {string}
     * @memberof EmployeeDirectDeposit
     */
    'MaskedAccountNumber'?: string | null;
    /**
     * The bank routing number where the direct deposit is directed.              
     * @type {string}
     * @memberof EmployeeDirectDeposit
     */
    'RoutingNumber'?: string | null;
    /**
     * Name of the bank receiving the employee\'s direct deposit.             
     * @type {string}
     * @memberof EmployeeDirectDeposit
     */
    'BankName'?: string | null;
    /**
     * Enumeration of valid Pay Frequency values.
     * @type {PayFrequency}
     * @memberof EmployeeDirectDeposit
     */
    'Frequency'?: PayFrequency;
    /**
     * Unique deduction code set at the legal entity or tenant level.  
     * @type {string}
     * @memberof EmployeeDirectDeposit
     */
    'DeductionCode'?: string | null;
    /**
     * Enumeration of valid Types of Direct Deposit values.
     * @type {DirectDepositType}
     * @memberof EmployeeDirectDeposit
     */
    'DirectDepositType'?: DirectDepositType;
    /**
     * Whether any money should be deposited into the direct deposit account.
     * @type {boolean}
     * @memberof EmployeeDirectDeposit
     */
    'OnHold'?: boolean | null;
    /**
     * Fixed, recurring dollar amount.             
     * @type {number}
     * @memberof EmployeeDirectDeposit
     */
    'Amount'?: number | null;
    /**
     * Percentage of the paycheck to be deposited into the direct deposit account             
     * @type {number}
     * @memberof EmployeeDirectDeposit
     */
    'Rate'?: number | null;
    /**
     * 
     * @type {ResourceReference}
     * @memberof EmployeeDirectDeposit
     */
    'Employee'?: ResourceReference;
}

