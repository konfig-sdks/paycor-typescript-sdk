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

import { Email } from './email';
import { EmployeePositionData } from './employee-position-data';
import { EmployeeStatusData } from './employee-status-data';
import { EmployeeWorkLocationData } from './employee-work-location-data';
import { EmploymentDateData } from './employment-date-data';
import { ResourceReference } from './resource-reference';

/**
 * The Employee model represents all Employee related information.  Provides links to the Employee\'s associated Person, Legal Entity, Department, Earning, Deduction, Tax, Direct Deposit, Pay Rat and Custom Field information.
 * @export
 * @interface Employee
 */
export interface Employee {
    /**
     * Unique identifier of the employee in Paycor\'s system. Generated by Paycor.
     * @type {string}
     * @memberof Employee
     */
    'Id'?: string;
    /**
     * Unique number of the employee in the tenant. Generated by Paycor.             
     * @type {string}
     * @memberof Employee
     */
    'EmployeeNumber'?: string | null;
    /**
     * Alternate employee number in the tenant.
     * @type {string}
     * @memberof Employee
     */
    'AlternateEmployeeNumber'?: string | null;
    /**
     * Employee\'s assigned badge number - currently unavailable             
     * @type {string}
     * @memberof Employee
     */
    'BadgeNumber'?: string | null;
    /**
     * First name of the employee.
     * @type {string}
     * @memberof Employee
     */
    'FirstName'?: string | null;
    /**
     * Middle name of the employee.
     * @type {string}
     * @memberof Employee
     */
    'MiddleName'?: string | null;
    /**
     * Last name of the employee.
     * @type {string}
     * @memberof Employee
     */
    'LastName'?: string | null;
    /**
     * 
     * @type {Email}
     * @memberof Employee
     */
    'Email'?: Email;
    /**
     * 
     * @type {EmploymentDateData}
     * @memberof Employee
     */
    'EmploymentDateData'?: EmploymentDateData;
    /**
     * 
     * @type {EmployeePositionData}
     * @memberof Employee
     */
    'PositionData'?: EmployeePositionData;
    /**
     * 
     * @type {EmployeeStatusData}
     * @memberof Employee
     */
    'StatusData'?: EmployeeStatusData;
    /**
     * 
     * @type {EmployeeWorkLocationData}
     * @memberof Employee
     */
    'WorkLocation'?: EmployeeWorkLocationData;
    /**
     * 
     * @type {ResourceReference}
     * @memberof Employee
     */
    'Earnings'?: ResourceReference;
    /**
     * 
     * @type {ResourceReference}
     * @memberof Employee
     */
    'Deductions'?: ResourceReference;
    /**
     * 
     * @type {ResourceReference}
     * @memberof Employee
     */
    'Taxes'?: ResourceReference;
    /**
     * 
     * @type {ResourceReference}
     * @memberof Employee
     */
    'DirectDeposits'?: ResourceReference;
    /**
     * 
     * @type {ResourceReference}
     * @memberof Employee
     */
    'PayRates'?: ResourceReference;
    /**
     * 
     * @type {ResourceReference}
     * @memberof Employee
     */
    'LegalEntity'?: ResourceReference;
    /**
     * 
     * @type {ResourceReference}
     * @memberof Employee
     */
    'Person'?: ResourceReference;
    /**
     * 
     * @type {ResourceReference}
     * @memberof Employee
     */
    'Department'?: ResourceReference;
}

