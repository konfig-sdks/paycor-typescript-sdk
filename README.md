<div align="left">

[![Visit Paycor](./header.png)](https://paycor.com)

# [Paycor](https://paycor.com)<a id="paycor"></a>


Welcome to Paycor's Public API! This document is a reference for the APIs Paycor has available, and acts as a complement to the "Guides" section. 

# Getting Started<a id="getting-started"></a>

<strong>To learn more about getting started with Paycor's Public APIs, check out our <a href="/guides">Guides.</a></strong>

# GET, PUT, POST<a id="get-put-post"></a>

* When requesting object, use GET endpoints. All list endpoints support paging, as described [in the other doc]. 
* When creating an object, use POST endpoints. Your code will need to create an object and send it to Paycor in your API call request body as JSON. You can use the "request sample" body as a starting point. Our endpoints will return a reference to the created object (the ID and GET API URL) for your system.
* When updating an object, you will use PUT endpoints. The general flow would be to: GET the object you want to update, modify the fields as desired, then PUT the object (as JSON in the request body) to our endpoints. Some fields like the object's ID cannot be updated because they are system-set.'


# Error Handling<a id="error-handling"></a>

* 400: Please consult the response text to correct your request information. 
* 401 with response "Access denied due to missing subscription key": Please include your APIM Subscription Key as header Ocp-Apim-Subscription-Key or querystring parameter subscription-key. 
* 401 with no response: Please ensure you included a valid & current Access Token in the Authorization header.
* 403: Please ensure your Access Token's scope has all the relevant access you need, on the AppCreator Data Access screen. 
* 404: Please validate the API route you are using. If that is correct, one of your IDs most likely does not exist or is not in a valid state. 
* 429: Paycor implements rate limits for our Public API. Each customer (implemented via APIM subscription key) has a limited number of calls. The number of calls is counted across all APIs, not per individual API. Please use bulk endpoints where available and spread your calls over a wider timespan.
  * The default rate limit is up to 1000 API calls per minute (total across all our Public APIs). 
* 500: Please contact Paycor. When you make a POST or PUT call and receive a 500, please do not retry the call automatically - this may result in double-posting. GETs can be safely retried.


# IDs<a id="ids"></a>

* ClientId = LegalEntityId
* TenantId = CompanyId
* EmployeeId is not visible in Paycor's UI, you must retrieve it from the Public API

# Earnings, Deductions, Taxes<a id="earnings-deductions-taxes"></a>

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

# Authentication<a id="authentication"></a>

<!-- ReDoc-Inject: <security-definitions> -->

</div>

## Table of Contents<a id="table-of-contents"></a>

<!-- toc -->

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Reference](#reference)
  * [`paycor.legalEntityTaxes.getByLegalEntityId`](#paycorlegalentitytaxesgetbylegalentityid)
  * [`paycor.applicantTrackingSystem.getAccountJobs`](#paycorapplicanttrackingsystemgetaccountjobs)
  * [`paycor.applicantTrackingSystem.getJobByJobId`](#paycorapplicanttrackingsystemgetjobbyjobid)
  * [`paycor.applicantTrackingSystem.listAtsAccountsByLegalEntity`](#paycorapplicanttrackingsystemlistatsaccountsbylegalentity)
  * [`paycor.employeeLegacyPerformTimeSchedules.addToEmployee`](#paycoremployeelegacyperformtimeschedulesaddtoemployee)
  * [`paycor.employeeLegacyPerformTimeSchedules.deleteLegacySchedule`](#paycoremployeelegacyperformtimeschedulesdeletelegacyschedule)
  * [`paycor.employeeLegacyPerformTimeSchedules.getByEmployeeId`](#paycoremployeelegacyperformtimeschedulesgetbyemployeeid)
  * [`paycor.employeeLegacyPerformTimeSchedules.getByLegalEntityId`](#paycoremployeelegacyperformtimeschedulesgetbylegalentityid)
  * [`paycor.employeeCertifications.addNewCertification`](#paycoremployeecertificationsaddnewcertification)
  * [`paycor.employeeCertifications.listByEmployeeId`](#paycoremployeecertificationslistbyemployeeid)
  * [`paycor.employeeCertifications.updateCertification`](#paycoremployeecertificationsupdatecertification)
  * [`paycor.employeeCustomFields.getByEmployeeId`](#paycoremployeecustomfieldsgetbyemployeeid)
  * [`paycor.employeeCustomFields.updateByEmployeeId`](#paycoremployeecustomfieldsupdatebyemployeeid)
  * [`paycor.employeeDeductions.addDeductionToEmployee`](#paycoremployeedeductionsadddeductiontoemployee)
  * [`paycor.employeeDeductions.getByEmployeeId`](#paycoremployeedeductionsgetbyemployeeid)
  * [`paycor.employeeDeductions.getByEmployeeIdAndDeductionId`](#paycoremployeedeductionsgetbyemployeeidanddeductionid)
  * [`paycor.employeeDeductions.updateByEmployeeId`](#paycoremployeedeductionsupdatebyemployeeid)
  * [`paycor.employeeDirectDeposits.addByEmployeeId`](#paycoremployeedirectdepositsaddbyemployeeid)
  * [`paycor.employeeDirectDeposits.addByEmployeeIdHsa`](#paycoremployeedirectdepositsaddbyemployeeidhsa)
  * [`paycor.employeeDirectDeposits.getByEmployeeAndDepositId`](#paycoremployeedirectdepositsgetbyemployeeanddepositid)
  * [`paycor.employeeDirectDeposits.getByEmployeeId`](#paycoremployeedirectdepositsgetbyemployeeid)
  * [`paycor.employeeDirectDeposits.getByEmployeeIdHSA`](#paycoremployeedirectdepositsgetbyemployeeidhsa)
  * [`paycor.employeeDirectDeposits.updateByEmployeeIdDDD`](#paycoremployeedirectdepositsupdatebyemployeeidddd)
  * [`paycor.employeeDirectDeposits.updateHsaDirectDepositsByEmployeeId`](#paycoremployeedirectdepositsupdatehsadirectdepositsbyemployeeid)
  * [`paycor.employeeDocuments.downloadPayStub`](#paycoremployeedocumentsdownloadpaystub)
  * [`paycor.employeeDocuments.getPayStubDocumentByEmployeeId`](#paycoremployeedocumentsgetpaystubdocumentbyemployeeid)
  * [`paycor.employeeEarnings.addNewEarning`](#paycoremployeeearningsaddnewearning)
  * [`paycor.employeeEarnings.getByEmployeeAndEarning`](#paycoremployeeearningsgetbyemployeeandearning)
  * [`paycor.employeeEarnings.getByEmployeeId`](#paycoremployeeearningsgetbyemployeeid)
  * [`paycor.employeeEarnings.updateData`](#paycoremployeeearningsupdatedata)
  * [`paycor.employeeEmergencyContact.createUpdate`](#paycoremployeeemergencycontactcreateupdate)
  * [`paycor.employeeI9Verification.getByEmployeeId`](#paycoremployeei9verificationgetbyemployeeid)
  * [`paycor.employeeI9Verification.updateByEmployeeIdI9Verification`](#paycoremployeei9verificationupdatebyemployeeidi9verification)
  * [`paycor.employeeOnboarding.addNewEntry`](#paycoremployeeonboardingaddnewentry)
  * [`paycor.employeeOnboarding.listOnboardingEmployees`](#paycoremployeeonboardinglistonboardingemployees)
  * [`paycor.employeePayRates.addNewRate`](#paycoremployeepayratesaddnewrate)
  * [`paycor.employeePayRates.getByEmployeeId`](#paycoremployeepayratesgetbyemployeeid)
  * [`paycor.employeePayRates.updateByEmployeeIdAndPayrateId`](#paycoremployeepayratesupdatebyemployeeidandpayrateid)
  * [`paycor.employeePaySchedule.getUpcomingCheckDates`](#paycoremployeepayschedulegetupcomingcheckdates)
  * [`paycor.employeePayStubs.getByEmployeeId`](#paycoremployeepaystubsgetbyemployeeid)
  * [`paycor.employeePayStubs.getByLegalEntity`](#paycoremployeepaystubsgetbylegalentity)
  * [`paycor.employeePayStubs.getYtdByEmployeeId`](#paycoremployeepaystubsgetytdbyemployeeid)
  * [`paycor.employeePayStubs.getYtdByLegalEntity`](#paycoremployeepaystubsgetytdbylegalentity)
  * [`paycor.employeePayrollHours.addHoursAndEarningsToPaygrid`](#paycoremployeepayrollhoursaddhoursandearningstopaygrid)
  * [`paycor.employeePayrollHours.importToEmployee`](#paycoremployeepayrollhoursimporttoemployee)
  * [`paycor.employeeTaxes.addByEmployeeId`](#paycoremployeetaxesaddbyemployeeid)
  * [`paycor.employeeTaxes.getByEmployeeId`](#paycoremployeetaxesgetbyemployeeid)
  * [`paycor.employeeTaxes.getFilingStatusByTaxCode`](#paycoremployeetaxesgetfilingstatusbytaxcode)
  * [`paycor.employeeTaxes.getTaxFieldsByTaxCode`](#paycoremployeetaxesgettaxfieldsbytaxcode)
  * [`paycor.employeeTaxes.updateByEmployeeId`](#paycoremployeetaxesupdatebyemployeeid)
  * [`paycor.employeeTimeCardPunches.getByEmployeeId`](#paycoremployeetimecardpunchesgetbyemployeeid)
  * [`paycor.employeeTimeCardPunches.getByLegalEntityId`](#paycoremployeetimecardpunchesgetbylegalentityid)
  * [`paycor.employeeTimeOffAccruals.getByEmployeeId`](#paycoremployeetimeoffaccrualsgetbyemployeeid)
  * [`paycor.employeeTimeOffAccruals.getByLegalEntityId`](#paycoremployeetimeoffaccrualsgetbylegalentityid)
  * [`paycor.employees.createNewEmployee`](#paycoremployeescreatenewemployee)
  * [`paycor.employees.getByEmployeeId`](#paycoremployeesgetbyemployeeid)
  * [`paycor.employees.getIdentifyingData`](#paycoremployeesgetidentifyingdata)
  * [`paycor.employees.listByLegalEntityId`](#paycoremployeeslistbylegalentityid)
  * [`paycor.employees.listByTenantId`](#paycoremployeeslistbytenantid)
  * [`paycor.employees.updateContact`](#paycoremployeesupdatecontact)
  * [`paycor.employees.updatePaygroup`](#paycoremployeesupdatepaygroup)
  * [`paycor.employees.updatePersonalData`](#paycoremployeesupdatepersonaldata)
  * [`paycor.employees.updatePositionAndStatusData`](#paycoremployeesupdatepositionandstatusdata)
  * [`paycor.employees.updatePositionData`](#paycoremployeesupdatepositiondata)
  * [`paycor.employees.updateStatusData`](#paycoremployeesupdatestatusdata)
  * [`paycor.events.notifyEventDetails`](#paycoreventsnotifyeventdetails)
  * [`paycor.generalLedger.getByLegalEntityId`](#paycorgeneralledgergetbylegalentityid)
  * [`paycor.generalLedgerJobCosting.getByLegalEntityId`](#paycorgeneralledgerjobcostinggetbylegalentityid)
  * [`paycor.jobTitles.listByTenantId`](#paycorjobtitleslistbytenantid)
  * [`paycor.laborCategories.byLegalEntityIdGet`](#paycorlaborcategoriesbylegalentityidget)
  * [`paycor.laborCodes.addLaborCodeToLegalEntity`](#paycorlaborcodesaddlaborcodetolegalentity)
  * [`paycor.laborCodes.listByLegalEntityId`](#paycorlaborcodeslistbylegalentityid)
  * [`paycor.laborCodes.updateSpecifiedLaborCode`](#paycorlaborcodesupdatespecifiedlaborcode)
  * [`paycor.legalEntities.getById`](#paycorlegalentitiesgetbyid)
  * [`paycor.legalEntities.getTenantList`](#paycorlegalentitiesgettenantlist)
  * [`paycor.legalEntityActivityTypes.getByLegalEntityId`](#paycorlegalentityactivitytypesgetbylegalentityid)
  * [`paycor.legalEntityCertifications.list`](#paycorlegalentitycertificationslist)
  * [`paycor.legalEntityCertifications.listCertificationOrganizations`](#paycorlegalentitycertificationslistcertificationorganizations)
  * [`paycor.legalEntityDeductions.viewEmployeesData`](#paycorlegalentitydeductionsviewemployeesdata)
  * [`paycor.legalEntityDepartments.createNewDepartment`](#paycorlegalentitydepartmentscreatenewdepartment)
  * [`paycor.legalEntityDepartments.getById`](#paycorlegalentitydepartmentsgetbyid)
  * [`paycor.legalEntityDepartments.listByLegalEntityId`](#paycorlegalentitydepartmentslistbylegalentityid)
  * [`paycor.legalEntityDepartments.updateByLegalEntityId`](#paycorlegalentitydepartmentsupdatebylegalentityid)
  * [`paycor.legalEntityEarnings.getByLegalEntityId`](#paycorlegalentityearningsgetbylegalentityid)
  * [`paycor.legalEntityJobTitles.listByLegalEntityId`](#paycorlegalentityjobtitleslistbylegalentityid)
  * [`paycor.legalEntityPayData.getPayDates`](#paycorlegalentitypaydatagetpaydates)
  * [`paycor.legalEntityPayGroups.listByLegalEntityId`](#paycorlegalentitypaygroupslistbylegalentityid)
  * [`paycor.legalEntityPaySchedule.getByLegalEntityAndPaygroup`](#paycorlegalentitypayschedulegetbylegalentityandpaygroup)
  * [`paycor.legalEntityPayrollProcessingData.getByLegalEntity`](#paycorlegalentitypayrollprocessingdatagetbylegalentity)
  * [`paycor.legalEntityScheduleGroups.getByLegalEntityId`](#paycorlegalentityschedulegroupsgetbylegalentityid)
  * [`paycor.legalEntityServices.getSubscribedServices`](#paycorlegalentityservicesgetsubscribedservices)
  * [`paycor.legalEntityStatusReason.getList`](#paycorlegalentitystatusreasongetlist)
  * [`paycor.legalEntityTimeData.getTimeOffRequestErrorLogsByTrackingId`](#paycorlegalentitytimedatagettimeoffrequesterrorlogsbytrackingid)
  * [`paycor.legalEntityTimeOffTypes.viewTimeOffTypes`](#paycorlegalentitytimeofftypesviewtimeofftypes)
  * [`paycor.legalEntityWorkLocations.addByLegalEntityId`](#paycorlegalentityworklocationsaddbylegalentityid)
  * [`paycor.legalEntityWorkLocations.deleteByLegalEntityAndWorkLocationId`](#paycorlegalentityworklocationsdeletebylegalentityandworklocationid)
  * [`paycor.legalEntityWorkLocations.getByLegalEntityAndLocation`](#paycorlegalentityworklocationsgetbylegalentityandlocation)
  * [`paycor.legalEntityWorkLocations.list`](#paycorlegalentityworklocationslist)
  * [`paycor.legalEntityWorkLocations.updateByLegalEntityId`](#paycorlegalentityworklocationsupdatebylegalentityid)
  * [`paycor.legalEntityWorkSites.getByLegalEntityId`](#paycorlegalentityworksitesgetbylegalentityid)
  * [`paycor.persons.getByEmployeeIdPerson`](#paycorpersonsgetbyemployeeidperson)
  * [`paycor.persons.getByTenantAndPerson`](#paycorpersonsgetbytenantandperson)
  * [`paycor.persons.listByLegalEntityId`](#paycorpersonslistbylegalentityid)
  * [`paycor.persons.listByTenantId`](#paycorpersonslistbytenantid)
  * [`paycor.tenants.getById`](#paycortenantsgetbyid)
  * [`paycor.tenants.getWorkLocationsByTenantId`](#paycortenantsgetworklocationsbytenantid)
  * [`paycor.timeOffRequests.getTimeoffRequestById`](#paycortimeoffrequestsgettimeoffrequestbyid)
  * [`paycor.timeOffRequests.listByEmployeeId`](#paycortimeoffrequestslistbyemployeeid)
  * [`paycor.timeOffRequests.listByLegalEntityId`](#paycortimeoffrequestslistbylegalentityid)

<!-- tocstop -->

## Installation<a id="installation"></a>
<div align="center">
  <a href="https://konfigthis.com/sdk-sign-up?company=Paycor&language=TypeScript">
    <img src="https://raw.githubusercontent.com/konfig-dev/brand-assets/HEAD/cta-images/typescript-cta.png" width="70%">
  </a>
</div>

## Getting Started<a id="getting-started"></a>

```typescript
import { Paycor } from "paycor-typescript-sdk";

const paycor = new Paycor({
  // Defining the base path is optional and defaults to https://apis.paycor.com
  // basePath: "https://apis.paycor.com",
  accessToken: "API_KEY",
  apimSubscriptionKey: "API_KEY",
});

const getByLegalEntityIdResponse =
  await paycor.legalEntityTaxes.getByLegalEntityId({
    legalEntityId: 1,
  });

console.log(getByLegalEntityIdResponse);
```

## Reference<a id="reference"></a>


### `paycor.legalEntityTaxes.getByLegalEntityId`<a id="paycorlegalentitytaxesgetbylegalentityid"></a>

Data access: View Legal Entity Taxes

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByLegalEntityIdResponse =
  await paycor.legalEntityTaxes.getByLegalEntityId({
    legalEntityId: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity you want to get (synonymous to Paycor\'s ClientID) the taxes

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of Legal Entity taxes

#### 🔄 Return<a id="🔄-return"></a>

[LegalEntityTax](./models/legal-entity-tax.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/taxes` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.applicantTrackingSystem.getAccountJobs`<a id="paycorapplicanttrackingsystemgetaccountjobs"></a>

Data Access: View ATS Account jobs by ATS Account ID

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getAccountJobsResponse =
  await paycor.applicantTrackingSystem.getAccountJobs({
    legalEntityId: 1,
    atsAccountId: "atsAccountId_example",
    status: "ACTIVE",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

Paycor Legal Entity ID of the legal entity for which you want to get the ATS account jobs

##### atsAccountId: `string`<a id="atsaccountid-string"></a>

ATS account ID of for which you want to get the ATS account jobs

##### include: [`Includes`](./models/includes.ts)[]<a id="include-includesmodelsincludests"></a>

Options to include more data: All, Hiring managers, Recruiters, Team members, Executives

##### postedToCareers: `boolean`<a id="postedtocareers-boolean"></a>

Option to filter jobs based on if they are posted to the careers page

##### status: [`JobStatus`](./models/job-status.ts)<a id="status-jobstatusmodelsjob-statusts"></a>

Option to filter jobs by status

##### continuationToken: `string`<a id="continuationtoken-string"></a>

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfJob](./models/paged-result-of-job.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalEntities/{legalEntityId}/ats/{atsAccountId}/jobs` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.applicantTrackingSystem.getJobByJobId`<a id="paycorapplicanttrackingsystemgetjobbyjobid"></a>

Data Access: View ATS Account Job by ATS Job Id

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getJobByJobIdResponse =
  await paycor.applicantTrackingSystem.getJobByJobId({
    legalEntityId: 1,
    atsAccountId: "atsAccountId_example",
    atsJobId: "atsJobId_example",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

Paycor Legal Entity ID of the legal entity for which you want to get the ATS account job

##### atsAccountId: `string`<a id="atsaccountid-string"></a>

ATS account ID of for which you want to get the ATS account job

##### atsJobId: `string`<a id="atsjobid-string"></a>

ATS Job ID

##### include: [`Includes2`](./models/includes2.ts)[]<a id="include-includes2modelsincludes2ts"></a>

Options to include more data: All, Hiring managers, Recruiters, Team members, Executives

#### 🔄 Return<a id="🔄-return"></a>

[Job](./models/job.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalEntities/{legalEntityId}/ats/{atsAccountId}/jobs/{atsJobId}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.applicantTrackingSystem.listAtsAccountsByLegalEntity`<a id="paycorapplicanttrackingsystemlistatsaccountsbylegalentity"></a>

Data Access: View ATS Accounts By Legal Entity Id

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const listAtsAccountsByLegalEntityResponse =
  await paycor.applicantTrackingSystem.listAtsAccountsByLegalEntity({
    legalEntityId: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

Paycor Legal Entity ID of the legal entity for which you want to get the ATS accounts

##### continuationToken: `string`<a id="continuationtoken-string"></a>

#### 🔄 Return<a id="🔄-return"></a>

[ATSAccount](./models/atsaccount.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalEntities/{legalEntityId}/ats/accounts` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeLegacyPerformTimeSchedules.addToEmployee`<a id="paycoremployeelegacyperformtimeschedulesaddtoemployee"></a>

Data Access: Create Legacy/Perform Time Employee Schedule

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const addToEmployeeResponse =
  await paycor.employeeLegacyPerformTimeSchedules.addToEmployee({
    employeeId: "employeeId_example",
    StartDateTime: "2019-11-01T00:00:00Z",
    EndDateTime: "2019-11-01T00:00:00Z",
    BeforeStartTimeInMinutes: 120,
    AfterEndTimeInMinutes: 120,
    Label: "MorningShift",
    ShiftDepeartmentId: "2f28bd9c-a39e-41f1-b40f-b44bf2e9c265",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of an Employee for whom you want to add a schedule

##### StartDateTime: `string`<a id="startdatetime-string"></a>

Date and time the employee will begin work. Format: YYYY-MM-DDTHH:MM:SSZ  (ISO-8601 standard)             

##### EndDateTime: `string`<a id="enddatetime-string"></a>

Date and time the employee will stop work. Format: YYYY-MM-DDTHH:MM:SSZ  (ISO-8601 standard)             

##### BeforeStartTimeInMinutes: `number`<a id="beforestarttimeinminutes-number"></a>

Punches will be tied to the schedule if employee clocks in this many Minutes before shift starts.

##### AfterEndTimeInMinutes: `number`<a id="afterendtimeinminutes-number"></a>

Punches will be tied to the schedule if employee clocks out this many Minutes after shift ends.

##### Label: `string`<a id="label-string"></a>

This is the label that will be assigned to the shift.             

##### ShiftDepeartmentId: `string`<a id="shiftdepeartmentid-string"></a>

Unique identifier of the Department where the employee\\\'s timecard will be created.

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/schedules` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeLegacyPerformTimeSchedules.deleteLegacySchedule`<a id="paycoremployeelegacyperformtimeschedulesdeletelegacyschedule"></a>

Data Access: Delete Legacy/Perform Time Employee Schedule

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const deleteLegacyScheduleResponse =
  await paycor.employeeLegacyPerformTimeSchedules.deleteLegacySchedule({
    employeeId: "employeeId_example",
    scheduleId: "scheduleId_example",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

Employee ID of the schedule record you want to delete

##### scheduleId: `string`<a id="scheduleid-string"></a>

Schedule ID to delete

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/schedules/{scheduleId}` `DELETE`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeLegacyPerformTimeSchedules.getByEmployeeId`<a id="paycoremployeelegacyperformtimeschedulesgetbyemployeeid"></a>

Date requirements:
* Start Date and End Date must not be more than one year ago
* Start Date must not be in future
* Start date and end date range can be no greater than 90 days

Data Access: View Legacy/Perform Employee Schedules by Employee Id

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByEmployeeIdResponse =
  await paycor.employeeLegacyPerformTimeSchedules.getByEmployeeId({
    employeeId: "employeeId_example",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of employee for which you want to get schedules

##### startDate: `string`<a id="startdate-string"></a>

Date range filter, showing which records to return

##### endDate: `string`<a id="enddate-string"></a>

Date range filter, showing which records to return

#### 🔄 Return<a id="🔄-return"></a>

[EmployeeSchedule](./models/employee-schedule.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/schedules` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeLegacyPerformTimeSchedules.getByLegalEntityId`<a id="paycoremployeelegacyperformtimeschedulesgetbylegalentityid"></a>

Date requirements:
* Start Date and End Date must not be more than one year ago
* Start Date must not be in future
* Start date and end date range can be no greater than 90 days

Data Access: View Legacy/Perform Employee Schedules by Legal Entity Id

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByLegalEntityIdResponse =
  await paycor.employeeLegacyPerformTimeSchedules.getByLegalEntityId({
    legalEntityId: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of Legal Entity for which you want to get schedules

##### startDate: `string`<a id="startdate-string"></a>

Date range filter, showing which records to return

##### endDate: `string`<a id="enddate-string"></a>

Date range filter, showing which records to return

##### continuationToken: `string`<a id="continuationtoken-string"></a>

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfEmployeeSchedule](./models/paged-result-of-employee-schedule.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalEntities/{legalEntityId}/schedules` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeCertifications.addNewCertification`<a id="paycoremployeecertificationsaddnewcertification"></a>

Data Access: Create and Update Certification

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const addNewCertificationResponse =
  await paycor.employeeCertifications.addNewCertification({
    employeeId: "employeeId_example",
    EffectiveDate: "2022-03-09",
    ExpirationDate: "2022-03-19",
    CertificationName: "First Aid certificate",
    CertificationNumber: "436576",
    CertificationOrganizationName: "Red Cross",
    Notes: "note: expires soon",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### CertificationName: `string`<a id="certificationname-string"></a>

Name of certification             

##### employeeId: `string`<a id="employeeid-string"></a>

ID of an Employee for whom you want to add the certification

##### EffectiveDate: `string`<a id="effectivedate-string"></a>

Effective date of certification             

##### ExpirationDate: `string`<a id="expirationdate-string"></a>

Expiration date of certification             

##### CertificationNumber: `string`<a id="certificationnumber-string"></a>

Number of certification             

##### CertificationOrganizationName: `string`<a id="certificationorganizationname-string"></a>

Name of certification organization             

##### Notes: `string`<a id="notes-string"></a>

Note on certification             

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/certifications` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeCertifications.listByEmployeeId`<a id="paycoremployeecertificationslistbyemployeeid"></a>

Data Access: View Certification Information for Employee

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const listByEmployeeIdResponse =
  await paycor.employeeCertifications.listByEmployeeId({
    employeeId: "employeeId_example",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of the employee for which you want to get the certifications

##### continuationToken: `string`<a id="continuationtoken-string"></a>

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfEmployeeCertification](./models/paged-result-of-employee-certification.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/certifications` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeCertifications.updateCertification`<a id="paycoremployeecertificationsupdatecertification"></a>

Data Access: Create and Update Certification

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateCertificationResponse =
  await paycor.employeeCertifications.updateCertification({
    employeeId: "employeeId_example",
    CertificationNumber: "436576",
    EmployeeCertificationId: "FDB487C7-E853-4097-8697-B705AC3C7ABF",
    EffectiveDate: "2022-03-09",
    ExpirationDate: "2022-03-19",
    Notes: "note: expires soon",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### EmployeeCertificationId: `string`<a id="employeecertificationid-string"></a>

Id of employee certification             

##### employeeId: `string`<a id="employeeid-string"></a>

ID of the employee for which you want to update the certifications

##### CertificationNumber: `string`<a id="certificationnumber-string"></a>

Number of certification             

##### EffectiveDate: `string`<a id="effectivedate-string"></a>

Effective date of certification             

##### ExpirationDate: `string`<a id="expirationdate-string"></a>

Expiration date of certification             

##### Notes: `string`<a id="notes-string"></a>

Note on certification             

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/certifications` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeCustomFields.getByEmployeeId`<a id="paycoremployeecustomfieldsgetbyemployeeid"></a>

Data Access: View Employee Custom Fields

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByEmployeeIdResponse =
  await paycor.employeeCustomFields.getByEmployeeId({
    employeeId: "employeeId_example",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of the employee for whom you want to get the custom fields

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of employee custom fields

#### 🔄 Return<a id="🔄-return"></a>

[EmployeeCustomField](./models/employee-custom-field.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/customfields` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeCustomFields.updateByEmployeeId`<a id="paycoremployeecustomfieldsupdatebyemployeeid"></a>

Data Access: Update Employee Custom Fields

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateByEmployeeIdResponse =
  await paycor.employeeCustomFields.updateByEmployeeId({
    employeeId: "employeeId_example",
    requestBody: [
      {
        CustomFieldId: "7b64160b-0a3a-0000-0000-000014e00100",
        Value: "Division 1",
      },
    ],
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of an Employee for whom you want to update the custom field

##### requestBody: [`EmployeeCustomField2`](./models/employee-custom-field2.ts)[]<a id="requestbody-employeecustomfield2modelsemployee-custom-field2ts"></a>

CustomFields object

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/customfields` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeDeductions.addDeductionToEmployee`<a id="paycoremployeedeductionsadddeductiontoemployee"></a>

Tip: first call "Get Legal Entity Deductions by Legal Entity ID" to get the valid Deduction Codes

Data Access: Add Employee Deduction

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const addDeductionToEmployeeResponse =
  await paycor.employeeDeductions.addDeductionToEmployee({
    employeeId: "employeeId_example",
    Code: "Pension",
    Frequency: "EveryPayPeriod",
    IncludeInPay: "AddtlPayOnly",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### Code: `string`<a id="code-string"></a>

Unique deduction code set at the legal entity or tenant level.  

##### employeeId: `string`<a id="employeeid-string"></a>

ID of an Employee for whom you want to add the deduction

##### OnHold: `boolean`<a id="onhold-boolean"></a>

Specifies whether the deduction should be deducted in a paycheck.             

##### Frequency: [`PayFrequency`](./models/pay-frequency.ts)<a id="frequency-payfrequencymodelspay-frequencyts"></a>

Enumeration of valid Pay Frequency values.

##### IncludeInPay: [`IncludeInPay`](./models/include-in-pay.ts)<a id="includeinpay-includeinpaymodelsinclude-in-payts"></a>

Enumeration of valid IncludeInPay values indicating which pay run to include an Earning or Deduction.

##### AmountData: [`EmployeeDeductionAmount2`](./models/employee-deduction-amount2.ts)[]<a id="amountdata-employeedeductionamount2modelsemployee-deduction-amount2ts"></a>

Specifies the rate and amount for the employee deduction.             

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/deductions` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeDeductions.getByEmployeeId`<a id="paycoremployeedeductionsgetbyemployeeid"></a>

Data Access: View Employee Deductions Information

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByEmployeeIdResponse = await paycor.employeeDeductions.getByEmployeeId(
  {
    employeeId: "employeeId_example",
  }
);
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of the employee for whom you want to get the deductions

##### include: [`Includes4`](./models/includes4.ts)[]<a id="include-includes4modelsincludes4ts"></a>

Options to include more data: All, AmountData  Data Access required  AmountData = View Employee Deductions Amounts

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of employee earnings

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfEmployeeDeduction](./models/paged-result-of-employee-deduction.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/deductions` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeDeductions.getByEmployeeIdAndDeductionId`<a id="paycoremployeedeductionsgetbyemployeeidanddeductionid"></a>

Data Access: View Employee Deduction Information

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByEmployeeIdAndDeductionIdResponse =
  await paycor.employeeDeductions.getByEmployeeIdAndDeductionId({
    employeeId: "employeeId_example",
    employeeDeductionId: "employeeDeductionId_example",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of an Employee for whom you want to get the deduction.

##### employeeDeductionId: `string`<a id="employeedeductionid-string"></a>

ID of the Employee Deduction you want to get.

##### include: [`Includes3`](./models/includes3.ts)[]<a id="include-includes3modelsincludes3ts"></a>

Options to include more data: All, AmountData  Data Access required  AmountData = View Employee Deduction Amounts

#### 🔄 Return<a id="🔄-return"></a>

[EmployeeDeduction](./models/employee-deduction.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/deductions/{employeeDeductionId}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeDeductions.updateByEmployeeId`<a id="paycoremployeedeductionsupdatebyemployeeid"></a>

Data Access: Update Employee Deduction

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateByEmployeeIdResponse =
  await paycor.employeeDeductions.updateByEmployeeId({
    employeeId: "employeeId_example",
    Id: "Id_example",
    IncludeInPay: "AddtlPayOnly",
    Frequency: "EveryPayPeriod",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### Id: `string`<a id="id-string"></a>

The unique identifier of this employee deduction generated in Paycor\\\'s system. Used as the Key for Update (PUT) endpoint. 

##### employeeId: `string`<a id="employeeid-string"></a>

ID of an Employee that has the Deduction you wish to update

##### IncludeInPay: [`IncludeInPay`](./models/include-in-pay.ts)<a id="includeinpay-includeinpaymodelsinclude-in-payts"></a>

Enumeration of valid IncludeInPay values indicating which pay run to include an Earning or Deduction.

##### Frequency: [`PayFrequency`](./models/pay-frequency.ts)<a id="frequency-payfrequencymodelspay-frequencyts"></a>

Enumeration of valid Pay Frequency values.

##### OnHold: `boolean`<a id="onhold-boolean"></a>

Specifies whether the deduction should be deducted in a paycheck. Required, defaults to false (meaning it should be deducted).             

##### AmountData: [`EmployeeDeductionAmount3`](./models/employee-deduction-amount3.ts)[]<a id="amountdata-employeedeductionamount3modelsemployee-deduction-amount3ts"></a>

Specifies the rate and amount for the employee deduction.             

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/deductions` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeDirectDeposits.addByEmployeeId`<a id="paycoremployeedirectdepositsaddbyemployeeid"></a>

Data Access: Add Employee Direct Deposit

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const addByEmployeeIdResponse =
  await paycor.employeeDirectDeposits.addByEmployeeId({
    employeeId: "employeeId_example",
    AccountType: "Checking",
    AccountNumber: "1234567890",
    RoutingNumber: "322271627",
    Frequency: "EveryPayPeriod",
    DirectDepositType: "Net",
    OnHold: true,
    Amount: 22.22,
    Rate: 0.84,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### AccountType: [`AccountType`](./models/account-type.ts)<a id="accounttype-accounttypemodelsaccount-typets"></a>

Enumeration of valid Types of Account values.

##### Frequency: [`PayFrequency`](./models/pay-frequency.ts)<a id="frequency-payfrequencymodelspay-frequencyts"></a>

Enumeration of valid Pay Frequency values.

##### OnHold: `boolean`<a id="onhold-boolean"></a>

Whether any money should be deposited into the direct deposit account.

##### employeeId: `string`<a id="employeeid-string"></a>

Id of employee for which you want to add Direct Deposits

##### AccountNumber: `string`<a id="accountnumber-string"></a>

The bank account number where the direct deposit is directed.             

##### RoutingNumber: `string`<a id="routingnumber-string"></a>

The bank routing number where the direct deposit is directed.              

##### DeductionCode: `string`<a id="deductioncode-string"></a>

##### DirectDepositType: [`DirectDepositType`](./models/direct-deposit-type.ts)<a id="directdeposittype-directdeposittypemodelsdirect-deposit-typets"></a>

Enumeration of valid Types of Direct Deposit values.

##### Amount: `number`<a id="amount-number"></a>

Fixed, recurring dollar amount.             

##### Rate: `number`<a id="rate-number"></a>

Percentage of the paycheck to be deposited into the direct deposit account             

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/DirectDeposits` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeDirectDeposits.addByEmployeeIdHsa`<a id="paycoremployeedirectdepositsaddbyemployeeidhsa"></a>

Data Access: Add Employee HSA Account

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const addByEmployeeIdHsaResponse =
  await paycor.employeeDirectDeposits.addByEmployeeIdHsa({
    employeeId: "employeeId_example",
    AccountType: "Checking",
    AccountNumber: "1234567890",
    RoutingNumber: "322271627",
    Frequency: "EveryPayPeriod",
    DeductionCode: "Pension",
    OnHold: true,
    Amount: 22.22,
    Rate: 0.84,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### AccountType: [`AccountType`](./models/account-type.ts)<a id="accounttype-accounttypemodelsaccount-typets"></a>

Enumeration of valid Types of Account values.

##### Frequency: [`PayFrequency`](./models/pay-frequency.ts)<a id="frequency-payfrequencymodelspay-frequencyts"></a>

Enumeration of valid Pay Frequency values.

##### DeductionCode: `string`<a id="deductioncode-string"></a>

Unique deduction code set at the legal entity or tenant level.  

##### OnHold: `boolean`<a id="onhold-boolean"></a>

Whether any money should be deposited into the HSA direct deposit account.

##### employeeId: `string`<a id="employeeid-string"></a>

ID of employee for which you want to add HSA Direct Deposits

##### AccountNumber: `string`<a id="accountnumber-string"></a>

The bank account number where the HSA direct deposit is directed.             

##### RoutingNumber: `string`<a id="routingnumber-string"></a>

The bank routing number where the HSA direct deposit is directed.              

##### Amount: `number`<a id="amount-number"></a>

Fixed, recurring dollar amount.             

##### Rate: `number`<a id="rate-number"></a>

Percentage of the paycheck to be deposited into the HSA direct deposit account             

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/HSAaccounts` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeDirectDeposits.getByEmployeeAndDepositId`<a id="paycoremployeedirectdepositsgetbyemployeeanddepositid"></a>

Data Access: View Employee Direct Deposit Information by Direct Deposit Id

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByEmployeeAndDepositIdResponse =
  await paycor.employeeDirectDeposits.getByEmployeeAndDepositId({
    employeeId: "employeeId_example",
    directDepositId: "directDepositId_example",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of employee for which you want to get Direct Deposits

##### directDepositId: `string`<a id="directdepositid-string"></a>

ID of an employee direct deposit which you want to retrieve

#### 🔄 Return<a id="🔄-return"></a>

[EmployeeDirectDeposit](./models/employee-direct-deposit.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/DirectDeposits/{directDepositId}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeDirectDeposits.getByEmployeeId`<a id="paycoremployeedirectdepositsgetbyemployeeid"></a>

Data Access: View Employee Direct Deposit Information by Employee Id

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByEmployeeIdResponse =
  await paycor.employeeDirectDeposits.getByEmployeeId({
    employeeId: "employeeId_example",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of employee for which you want to get Direct Deposits

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get next set of direct deposits

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfEmployeeDirectDeposit](./models/paged-result-of-employee-direct-deposit.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/DirectDeposits` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeDirectDeposits.getByEmployeeIdHSA`<a id="paycoremployeedirectdepositsgetbyemployeeidhsa"></a>

Data Access: View Employee HSA Account Information

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByEmployeeIdHSAResponse =
  await paycor.employeeDirectDeposits.getByEmployeeIdHSA({
    employeeId: "employeeId_example",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of employee for whom you want to get HSA Direct Deposits

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get next set of HSA Direct Deposits

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfEmployeeDirectDeposit](./models/paged-result-of-employee-direct-deposit.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/HSAaccounts` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeDirectDeposits.updateByEmployeeIdDDD`<a id="paycoremployeedirectdepositsupdatebyemployeeidddd"></a>

Data Access: Update Employee Direct Deposit Information

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateByEmployeeIdDDDResponse =
  await paycor.employeeDirectDeposits.updateByEmployeeIdDDD({
    employeeId: "employeeId_example",
    Id: "5e699a0d-0000-0000-0000-0007d54d9839",
    AccountType: "Checking",
    AccountNumber: "1234567890",
    RoutingNumber: "322271627",
    Frequency: "EveryPayPeriod",
    DirectDepositType: "Net",
    OnHold: true,
    Amount: 22.22,
    Rate: 0.84,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### Id: `string`<a id="id-string"></a>

Unique identifier of the employee direct deposit in Paycor\\\'s system. Generated by Paycor.             

##### AccountType: [`AccountType`](./models/account-type.ts)<a id="accounttype-accounttypemodelsaccount-typets"></a>

Enumeration of valid Types of Account values.

##### AccountNumber: `string`<a id="accountnumber-string"></a>

The bank account number where the direct deposit is directed.             

##### RoutingNumber: `string`<a id="routingnumber-string"></a>

The bank routing number where the direct deposit is directed.              

##### Frequency: [`PayFrequency`](./models/pay-frequency.ts)<a id="frequency-payfrequencymodelspay-frequencyts"></a>

Enumeration of valid Pay Frequency values.

##### OnHold: `boolean`<a id="onhold-boolean"></a>

Whether any money should be deposited into the direct deposit account.

##### employeeId: `string`<a id="employeeid-string"></a>

ID of employee for which you want to update Direct Deposit

##### DirectDepositType: [`DirectDepositType`](./models/direct-deposit-type.ts)<a id="directdeposittype-directdeposittypemodelsdirect-deposit-typets"></a>

Enumeration of valid Types of Direct Deposit values.

##### Amount: `number`<a id="amount-number"></a>

Fixed, recurring dollar amount.             

##### Rate: `number`<a id="rate-number"></a>

Percentage of the paycheck to be deposited into the direct deposit account             

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/DirectDeposits` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeDirectDeposits.updateHsaDirectDepositsByEmployeeId`<a id="paycoremployeedirectdepositsupdatehsadirectdepositsbyemployeeid"></a>

Data Access: Update Employee HSA Account Information

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateHsaDirectDepositsByEmployeeIdResponse =
  await paycor.employeeDirectDeposits.updateHsaDirectDepositsByEmployeeId({
    employeeId: "employeeId_example",
    Id: "5e699a0d-0000-0000-0000-0007d54d9839",
    AccountType: "Checking",
    AccountNumber: "1234567890",
    RoutingNumber: "322271627",
    Frequency: "EveryPayPeriod",
    OnHold: true,
    Amount: 22.22,
    Rate: 0.84,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### Id: `string`<a id="id-string"></a>

Unique identifier of the employee hsa direct deposit in Paycor\\\'s system. Generated by Paycor.             

##### AccountType: [`AccountType`](./models/account-type.ts)<a id="accounttype-accounttypemodelsaccount-typets"></a>

Enumeration of valid Types of Account values.

##### AccountNumber: `string`<a id="accountnumber-string"></a>

The bank account number where the HSA direct deposit is directed.             

##### RoutingNumber: `string`<a id="routingnumber-string"></a>

The bank routing number where the HSA direct deposit is directed.              

##### Frequency: [`PayFrequency`](./models/pay-frequency.ts)<a id="frequency-payfrequencymodelspay-frequencyts"></a>

Enumeration of valid Pay Frequency values.

##### OnHold: `boolean`<a id="onhold-boolean"></a>

Whether any money should be deposited into the HSA direct deposit account.

##### employeeId: `string`<a id="employeeid-string"></a>

ID of employee for which you want to update HSA Direct Deposits

##### Amount: `number`<a id="amount-number"></a>

Fixed, recurring dollar amount.             

##### Rate: `number`<a id="rate-number"></a>

Percentage of the paycheck to be deposited into the HSA direct deposit account             

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/HSAaccounts` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeDocuments.downloadPayStub`<a id="paycoremployeedocumentsdownloadpaystub"></a>

Data Access: Download Employee Pay Stub Document

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const downloadPayStubResponse = await paycor.employeeDocuments.downloadPayStub({
  employeeId: "employeeId_example",
  documentId: "documentId_example",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

Id of an Employee for whom you want to get the Pay Stub Document

##### documentId: `string`<a id="documentid-string"></a>

Id of Pay Stub Document

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/PayStubDocument/{documentId}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeDocuments.getPayStubDocumentByEmployeeId`<a id="paycoremployeedocumentsgetpaystubdocumentbyemployeeid"></a>

Start Date and End Date are required parameters.

Data Access: Get Employee Pay Stub Document Link

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getPayStubDocumentByEmployeeIdResponse =
  await paycor.employeeDocuments.getPayStubDocumentByEmployeeId({
    employeeId: "employeeId_example",
    startDate: "1970-01-01T00:00:00.00Z",
    endDate: "1970-01-01T00:00:00.00Z",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of an Employee for whom you want to get the Pay Stubs Document Link

##### startDate: `string`<a id="startdate-string"></a>

Date that is earlier or equal to paycheck date

##### endDate: `string`<a id="enddate-string"></a>

Date that is after or equal to paycheck date

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of Employee Pay Stubs Document Links

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfPayStubFile](./models/paged-result-of-pay-stub-file.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/paystubDocumentData` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeEarnings.addNewEarning`<a id="paycoremployeeearningsaddnewearning"></a>

Data Access: Add Employee Earning

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const addNewEarningResponse = await paycor.employeeEarnings.addNewEarning({
  employeeId: "employeeId_example",
  Code: "BonusDis",
  Frequency: "EveryPayPeriod",
  SequenceNumber: 3,
  IncludeInPay: "AddtlPayOnly",
  OnHold: false,
  AmountData: [
    {
      Rate: 55.55,
      Amount: 5555.55,
      Factor: 1,
      EffectiveStartDate: "2019-12-01T00:00:00Z",
      EffectiveEndDate: "2020-11-01T00:00:00Z",
    },
  ],
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### Code: `string`<a id="code-string"></a>

Descriptive earning identifier which appears on paychecks. Only set at the legal entity or tenant level.

##### AmountData: [`EmployeeEarningAmount`](./models/employee-earning-amount.ts)[]<a id="amountdata-employeeearningamountmodelsemployee-earning-amountts"></a>

List of the employee\\\'s earning rates, factors and amounts of type EmployeeEarningAmount.             

##### employeeId: `string`<a id="employeeid-string"></a>

ID of an Employee for whom you want to add an Earning

##### Frequency: [`PayFrequency`](./models/pay-frequency.ts)<a id="frequency-payfrequencymodelspay-frequencyts"></a>

Enumeration of valid Pay Frequency values.

##### SequenceNumber: `number`<a id="sequencenumber-number"></a>

Order earnings are calculated based on sequence values. This is needed so earnings dependent on other earnings are calculated in the proper sequence.

##### IncludeInPay: [`IncludeInPay`](./models/include-in-pay.ts)<a id="includeinpay-includeinpaymodelsinclude-in-payts"></a>

Enumeration of valid IncludeInPay values indicating which pay run to include an Earning or Deduction.

##### OnHold: `boolean`<a id="onhold-boolean"></a>

Whether the employee earning should included in a paycheck. This is specified by the \\\'Calculate\\\' checkbox in the Paycor UI.             

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/earnings` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeEarnings.getByEmployeeAndEarning`<a id="paycoremployeeearningsgetbyemployeeandearning"></a>

Data Access: View Employee Earning Information

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByEmployeeAndEarningResponse =
  await paycor.employeeEarnings.getByEmployeeAndEarning({
    employeeId: "employeeId_example",
    employeeEarningId: "employeeEarningId_example",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of an Employee for whom you want to get the Earning

##### employeeEarningId: `string`<a id="employeeearningid-string"></a>

ID of an Employee Earning you want to get

##### include: [`Includes5`](./models/includes5.ts)[]<a id="include-includes5modelsincludes5ts"></a>

Options to include more data: All, AmountData  Data Access required  AmountData = View Employee Earning Amounts

#### 🔄 Return<a id="🔄-return"></a>

[EmployeeEarning](./models/employee-earning.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/earnings/{employeeEarningId}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeEarnings.getByEmployeeId`<a id="paycoremployeeearningsgetbyemployeeid"></a>

Data Access: View Employee Earnings Information

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByEmployeeIdResponse = await paycor.employeeEarnings.getByEmployeeId({
  employeeId: "employeeId_example",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of an Employee for whom you want to get the Earnings

##### include: [`Includes6`](./models/includes6.ts)[]<a id="include-includes6modelsincludes6ts"></a>

Options to include more data: All, AmountData  Data Access required  AmountData = View Employee Earnings Amounts

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of Employee Earnings

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfEmployeeEarning](./models/paged-result-of-employee-earning.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/earnings` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeEarnings.updateData`<a id="paycoremployeeearningsupdatedata"></a>

Data Access: Update Employee Earning

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateDataResponse = await paycor.employeeEarnings.updateData({
  employeeId: "employeeId_example",
  Id: "Id_example",
  Code: "BonusDis",
  Frequency: "EveryPayPeriod",
  SequenceNumber: 3,
  IncludeInPay: "AddtlPayOnly",
  OnHold: false,
  AmountData: [
    {
      Rate: 55.55,
      Amount: 5555.55,
      Factor: 1,
      EffectiveStartDate: "2019-12-01T00:00:00Z",
      EffectiveEndDate: "2020-11-01T00:00:00Z",
    },
  ],
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### Id: `string`<a id="id-string"></a>

The unique identifier of this employee earning generated in Paycor\\\'s system.

##### Code: `string`<a id="code-string"></a>

Descriptive earning identifier which appears on paychecks. Only set at the legal entity or tenant level.

##### Frequency: [`PayFrequency`](./models/pay-frequency.ts)<a id="frequency-payfrequencymodelspay-frequencyts"></a>

Enumeration of valid Pay Frequency values.

##### IncludeInPay: [`IncludeInPay`](./models/include-in-pay.ts)<a id="includeinpay-includeinpaymodelsinclude-in-payts"></a>

Enumeration of valid IncludeInPay values indicating which pay run to include an Earning or Deduction.

##### OnHold: `boolean`<a id="onhold-boolean"></a>

Whether the employee earning should included in a paycheck. This is specified by the \\\'Calculate\\\' checkbox in the Paycor UI.             

##### AmountData: [`EmployeeEarningAmount`](./models/employee-earning-amount.ts)[]<a id="amountdata-employeeearningamountmodelsemployee-earning-amountts"></a>

List of the employee\\\'s earning rates, factors and amounts of type EmployeeEarningAmount.             

##### employeeId: `string`<a id="employeeid-string"></a>

ID of an Employee that has the Earning you wish to update

##### SequenceNumber: `number`<a id="sequencenumber-number"></a>

Order earnings are calculated based on sequence values. This is needed so earnings dependent on other earnings are calculated in the proper sequence.

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/earnings` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeEmergencyContact.createUpdate`<a id="paycoremployeeemergencycontactcreateupdate"></a>

Either Home Phone, Work Phone or Mobile Phone must be specified

Data Access: Create Emergency Contact

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const createUpdateResponse = await paycor.employeeEmergencyContact.createUpdate(
  {
    employeeId: "employeeId_example",
    FirstName: "Charles",
    MiddleName: "Lutwidge",
    LastName: "Dodgson",
    Relationship: "Daughter",
    HomePhone: "1234567890",
    WorkPhone: "1234567890",
    WorkPhoneExtension: "123",
    MobilePhone: "1234567890",
    EmailAddress: "abc@paycor.com",
  }
);
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### FirstName: `string`<a id="firstname-string"></a>

First name of the emergency contact.

##### LastName: `string`<a id="lastname-string"></a>

Last name of the emergency contact.

##### employeeId: `string`<a id="employeeid-string"></a>

##### MiddleName: `string`<a id="middlename-string"></a>

Middle name of the emergency contact.

##### Relationship: [`Relationship`](./models/relationship.ts)<a id="relationship-relationshipmodelsrelationshipts"></a>

Enumeration of valid Types of Relationship values.             

##### HomePhone: `string`<a id="homephone-string"></a>

Home Phone of the emergency contact. Must be 10 characters.             

##### WorkPhone: `string`<a id="workphone-string"></a>

Work Phone of the emergency contact. Must be 10 characters.             

##### WorkPhoneExtension: `string`<a id="workphoneextension-string"></a>

Work Phone extension of the emergency contact.             

##### MobilePhone: `string`<a id="mobilephone-string"></a>

Mobile Phone of the emergency contact. Must be 10 characters.             

##### EmailAddress: `string`<a id="emailaddress-string"></a>

Email Address of the emergency contact.             

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/emergencycontact` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeI9Verification.getByEmployeeId`<a id="paycoremployeei9verificationgetbyemployeeid"></a>

Data Access: View I9 Verification

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByEmployeeIdResponse =
  await paycor.employeeI9Verification.getByEmployeeId({
    employeeId: "employeeId_example",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of the employee for whom you want to get the I9 information

##### include: [`Includes7`](./models/includes7.ts)[]<a id="include-includes7modelsincludes7ts"></a>

Options to include more data: documents

#### 🔄 Return<a id="🔄-return"></a>

[I9Verification](./models/i9-verification.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/I9Verification` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeI9Verification.updateByEmployeeIdI9Verification`<a id="paycoremployeei9verificationupdatebyemployeeidi9verification"></a>

Data Access: Edit I9 Verification

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateByEmployeeIdI9VerificationResponse =
  await paycor.employeeI9Verification.updateByEmployeeIdI9Verification({
    employeeId: "employeeId_example",
    CitizenOfCountry: "USA",
    WorkEligibility: "USCitizen",
    WorkVisaType: "H1B",
    WorkVisaExpirationDate: "10/25/2023",
    AlienAdmissionNumber: "12365478961",
    AlienAdmissionExpirationDate: "05/25/2023",
    ForeignPassportNumber: "N4123456",
    CountryOfIssuance: "AU",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of an Employee for whom you want to update the I9 Verification

##### CitizenOfCountry: `string`<a id="citizenofcountry-string"></a>

Country of which the employee is citizen of.             

##### WorkEligibility: [`WorkEligibility`](./models/work-eligibility.ts)<a id="workeligibility-workeligibilitymodelswork-eligibilityts"></a>

Enumeration of valid Types of WorkEligibility values.             

##### WorkVisaType: `string`<a id="workvisatype-string"></a>

Work visa type of the employee. Maximum characters should be 20.             

##### WorkVisaExpirationDate: `string`<a id="workvisaexpirationdate-string"></a>

Expiration date of the work visa.             

##### AlienAdmissionNumber: `string`<a id="alienadmissionnumber-string"></a>

Alien admission number of the employee.             

##### AlienAdmissionExpirationDate: `string`<a id="alienadmissionexpirationdate-string"></a>

Expiration date of the alien admission.             

##### ListA: [`ListA`](./models/list-a.ts)<a id="lista-listamodelslist-ats"></a>

##### ListB: [`ListB`](./models/list-b.ts)<a id="listb-listbmodelslist-bts"></a>

##### ListC: [`ListC`](./models/list-c.ts)<a id="listc-listcmodelslist-cts"></a>

##### ForeignPassportNumber: `string`<a id="foreignpassportnumber-string"></a>

Foreign passport number of the employee.             

##### CountryOfIssuance: `string`<a id="countryofissuance-string"></a>

Country of issuance of the foreign passport. Accepted values ISO-3166 alpha2 or alpha3 codes for countries.             

##### AdditionalInformation: `string`<a id="additionalinformation-string"></a>

Additional information for the I9 verification. Must be under 768 characters.             

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/I9Verification` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeOnboarding.addNewEntry`<a id="paycoremployeeonboardingaddnewentry"></a>

This will allow partners to add a new employee entry for pending hire

Data Access: Create Employee Onboarding

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const addNewEntryResponse = await paycor.employeeOnboarding.addNewEntry({
  LegalEntityId: 122900,
  ExportedByEmailAddress: "email@domain.com",
  FirstName: "Edwin",
  LastName: "Hubble",
  PreferredName: "Carroll",
  CountryCode: "USA",
  Zip: "45212",
  State: "OH",
  City: "Cincinnati",
  Address1: "4811 Montgomery Road",
  Address2: "Building A",
  MobilePhone: "(123) 456–7890",
  HomePhone: "(123) 456–7890",
  HomeEmailAddress: "homeEmail@domain.com",
  Gender: "Male",
  Ethnicity: "AmerIndorAKNative",
  VeteranStatus: "true",
  StartDate: "2019-11-01T00:00:00Z",
  JobTitle: "Software Engineer",
  DepartmentCode: "80",
  Disability: "true",
  BaseSalary: 10000,
  SalaryFrequency: "Bi-Weekly",
  WorkLocationId: "dc069074-24b2-0000-0000-000014e00100",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### LegalEntityId: `number`<a id="legalentityid-number"></a>

Legal Entity Id

##### FirstName: `string`<a id="firstname-string"></a>

First name of the person. 

##### LastName: `string`<a id="lastname-string"></a>

Last name of the person.

##### HomeEmailAddress: `string`<a id="homeemailaddress-string"></a>

Email Information of the person.             

##### ExportedByEmailAddress: `string`<a id="exportedbyemailaddress-string"></a>

Email of the user exporting records

##### PreferredName: `string`<a id="preferredname-string"></a>

Preferred Name of the Person             

##### CountryCode: `string`<a id="countrycode-string"></a>

Country in the address.             

##### Zip: `string`<a id="zip-string"></a>

Zip code in the address.             

##### State: `string`<a id="state-string"></a>

State in the address.             

##### City: `string`<a id="city-string"></a>

City in the address.             

##### Address1: `string`<a id="address1-string"></a>

First line of street address information.             

##### Address2: `string`<a id="address2-string"></a>

Additional line of street address information.             

##### MobilePhone: `string`<a id="mobilephone-string"></a>

Mobile phone number. 

##### HomePhone: `string`<a id="homephone-string"></a>

Home phone number. 

##### Gender: [`Gender`](./models/gender.ts)<a id="gender-gendermodelsgenderts"></a>

Enumeration of valid Gender values.

##### Ethnicity: [`EthnicityType`](./models/ethnicity-type.ts)<a id="ethnicity-ethnicitytypemodelsethnicity-typets"></a>

Enumeration of valid Ethnicity Type values.             

##### VeteranStatus: [`VeteranStatus`](./models/veteran-status.ts)<a id="veteranstatus-veteranstatusmodelsveteran-statusts"></a>

Enumeration of valid Veteran Status values.             

##### StartDate: `string`<a id="startdate-string"></a>

Date the employement start. Format: YYYY-MM-DDTHH:MM:SSZ  (ISO-8601 standard)              

##### JobTitle: `string`<a id="jobtitle-string"></a>

Name of the Job Title to associate with new hire.             

##### DepartmentCode: `string`<a id="departmentcode-string"></a>

Code of the department in Paycor\\\'s system.  Can be retrieved by calling \\\'Get Legal Entity Departments by Legal Entity ID\\\'

##### Disability: [`DisabilityStatus`](./models/disability-status.ts)<a id="disability-disabilitystatusmodelsdisability-statusts"></a>

Enumeration of valid Disability Status values.

##### BaseSalary: `number`<a id="basesalary-number"></a>

Base Salary of new hire employee

##### SalaryFrequency: `string`<a id="salaryfrequency-string"></a>

Salary Frequency of new hire employee

##### WorkLocationId: `string`<a id="worklocationid-string"></a>

Worklocation Id of new hire employee

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/onboarding` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeOnboarding.listOnboardingEmployees`<a id="paycoremployeeonboardinglistonboardingemployees"></a>

This endpoint allows partners to see the employees in the onboarding state.

Data Access: View Legal Entity Onboarding Employees

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const listOnboardingEmployeesResponse =
  await paycor.employeeOnboarding.listOnboardingEmployees({
    legalEntityId: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the legal entity for which you want to get the employees in the onboarding state

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get next set of Onboarding Employee records

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfOnboardingEmployee](./models/paged-result-of-onboarding-employee.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/onboardingemployees` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeePayRates.addNewRate`<a id="paycoremployeepayratesaddnewrate"></a>

This immediately creates a new payrate related to an Employee in Paycor's system. There is no way to undo or reverse this operation. 

Data Access: Create Employee PayRates
Sequence numbers must be consecutive and unique

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const addNewRateResponse = await paycor.employeePayRates.addNewRate({
  employeeId: "employeeId_example",
  EffectiveStartDate: "2019-11-22T00:00:00Z",
  EffectiveEndDate: "2020-12-01T12:15:00Z",
  SequenceNumber: 1,
  PayRate: 25.52,
  AnnualPayRate: 53081.6,
  Description: "Rate 1",
  Type: "Salary",
  Reason: "Merit Increase.",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### EffectiveStartDate: `string`<a id="effectivestartdate-string"></a>

Represents the date that the payrate goes into effect.  You can pass in future dates to take effect in future, or today\\\'s date to take effect immediately.  Format: YYYY-MM-DDTHH:MM:SSZ  (ISO-8601 standard)              

##### SequenceNumber: `number`<a id="sequencenumber-number"></a>

Orders how multiple earnings are calculated. Needed so earnings dependent on other earnings are calculated in the proper sequence. Must be unique and be ascending without gaps (ie 1, 2, 3…). Use GET Payrates to identify existing sequences.

##### Description: `string`<a id="description-string"></a>

Required. Brief description of the employee\\\'s pay rate. Defaults to \\\"Rate {SequenceNumber}\\\" Must be 20 characters or less             

##### employeeId: `string`<a id="employeeid-string"></a>

ID of the Employee you wish to create the payrate for

##### EffectiveEndDate: `string`<a id="effectiveenddate-string"></a>

Date when the employee pay rate is no longer in effect. Default to null. Only pass in a date if the payrate is no longer active. Format: YYYY-MM-DDTHH:MM:SSZ  (ISO-8601 standard)              

##### PayRate: `number`<a id="payrate-number"></a>

Employee\\\'s rate of pay (in dollars).  If Pay Type is Hourly, then Pay Rate is a Per-Hour dollar amount and is required.  If Pay Type is Salary, then Pay Rate is a Per-Pay dollar amount, and either Pay Rate or Annual Rate is required. Payrate can\\\'t have more than 6 decimal places and can\\\'t be negative.              

##### AnnualPayRate: `number`<a id="annualpayrate-number"></a>

Employee\\\'s annual pay amount (in dollars). Only used if Type=Salary.  * For Salary Type, AnnualPayRate overrides payRate if passed into API call. The value not provided will be calculated based on Employee\\\'s Annual Hours setup on Employee\\\'s Profile. * For Hourly Type, this parameter is ignored - Paycor calculates based on Employee\\\'s Annual Hours setup on Employee\\\'s Profile.             

##### Type: [`PayType`](./models/pay-type.ts)<a id="type-paytypemodelspay-typets"></a>

Enumeration of valid Pay Type values.             

##### Reason: `string`<a id="reason-string"></a>

Reason associated with the employee\\\'s pay rate. Optional.              

##### Notes: `string`<a id="notes-string"></a>

Notes associated with the employee\\\'s pay rate, which will be displayed on Pay Rate History page.  Must be 512 characters or less. Optional.              

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/payrates` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeePayRates.getByEmployeeId`<a id="paycoremployeepayratesgetbyemployeeid"></a>

Data Access: View Employee Payrates

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByEmployeeIdResponse = await paycor.employeePayRates.getByEmployeeId({
  employeeId: "employeeId_example",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of employee for which you want to get payrates

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get next set of payrates

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfEmployeePayRate](./models/paged-result-of-employee-pay-rate.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/payrates` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeePayRates.updateByEmployeeIdAndPayrateId`<a id="paycoremployeepayratesupdatebyemployeeidandpayrateid"></a>

Data Access: Update Employee PayRates

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateByEmployeeIdAndPayrateIdResponse =
  await paycor.employeePayRates.updateByEmployeeIdAndPayrateId({
    employeeId: "employeeId_example",
    payrateId: "payrateId_example",
    EffectiveStartDate: "2019-11-22T00:00:00Z",
    SequenceNumber: 1,
    PayRate: 25.52,
    AnnualPayRate: 53081.6,
    Description: "Rate 1",
    Type: "Salary",
    Reason: "Merit Increase.",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### EffectiveStartDate: `string`<a id="effectivestartdate-string"></a>

Represents the date that the payrate goes into effect.  PUT requires EffectiveStartDate value to be unique for this PayRateId.              

##### PayRate: `number`<a id="payrate-number"></a>

Employee\\\'s rate of pay (in dollars).  If Pay Type is Hourly, then Pay Rate is a Per-Hour dollar amount and is required.  If Pay Type is Salary, then Pay Rate is a Per-Pay dollar amount, and either Pay Rate or Annual Rate is required. Payrate can\\\'t have more than 6 decimal places and can\\\'t be negative.              

##### Description: `string`<a id="description-string"></a>

Required. Brief description of the employee\\\'s pay rate. Defaults to \\\"Rate {SequenceNumber}\\\" Must be 20 characters or less             

##### employeeId: `string`<a id="employeeid-string"></a>

ID of an Employee that has the Payrate you wish to update

##### payrateId: `string`<a id="payrateid-string"></a>

ID of the Payrate you wish to update

##### SequenceNumber: `number`<a id="sequencenumber-number"></a>

Orders how multiple earnings are calculated. Needed so earnings dependent on other earnings are calculated in the proper sequence. For PUT, this should match an existing SequenceNumber (retrieved via GET Employee PayRates).

##### AnnualPayRate: `number`<a id="annualpayrate-number"></a>

Employee\\\'s annual pay amount (in dollars). Only used if Type=Salary.  * For Salary Type, AnnualPayRate overrides payRate if passed into API call. The value not provided will be calculated based on Employee\\\'s Annual Hours setup on Employee\\\'s Profile. * For Hourly Type, this parameter is ignored - Paycor calculates based on Employee\\\'s Annual Hours setup on Employee\\\'s Profile.             

##### Type: [`PayType`](./models/pay-type.ts)<a id="type-paytypemodelspay-typets"></a>

Enumeration of valid Pay Type values.             

##### Reason: `string`<a id="reason-string"></a>

Reason associated with the employee\\\'s pay rate. Optional.              

##### Notes: `string`<a id="notes-string"></a>

Notes associated with the employee\\\'s pay rate, which will be displayed on Pay Rate History page.  Must be 512 characters or less. Optional.              

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/payrates/{payrateId}` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeePaySchedule.getUpcomingCheckDates`<a id="paycoremployeepayschedulegetupcomingcheckdates"></a>

This API will return upcoming pay scheduled for a given employee (upcoming check dates),
or allow looking up the check date for specific pay period dates.
* You must either specify the exact Period Start & End Date, or leave them blank. 
  * Alternatively you may consider 'GET Legal Entity Pay Schedule' which takes a range parameter.
  * You can look up pay period dates from 'GET Legal Entity Pay Schedule' (scheduled dates) or 'GET Legal Entity Pay Data' (actual dates)
* The actual pay dates may change depending on when the client admin processes payroll.

Data Access: View Employee Pay Schedule

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getUpcomingCheckDatesResponse =
  await paycor.employeePaySchedule.getUpcomingCheckDates({
    employeeId: "employeeId_example",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of the Employee for which you want to get the Pay Schedule

##### periodStartDate: `string`<a id="periodstartdate-string"></a>

Exact Period Start Date of Pay Schedule, to lookup specific payrun. 

##### periodEndDate: `string`<a id="periodenddate-string"></a>

Exact Period End Date of Pay Schedule, if you wish to filter - defaults to showing upcoming (future) runs

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of Employee Pay Schedule

##### include: [`Includes8`](./models/includes8.ts)[]<a id="include-includes8modelsincludes8ts"></a>

Options to include more data: Additional Runs

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfPayPeriod](./models/paged-result-of-pay-period.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/payschedule` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeePayStubs.getByEmployeeId`<a id="paycoremployeepaystubsgetbyemployeeid"></a>

Note: Either CheckDate, ProcessDate or PlannerId is required as a parameter. You can find a list of valid dates by calling 'GET Legal Entity Pay Data by Legal Entity ID'.

Data Access: View Paystub Information

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByEmployeeIdResponse = await paycor.employeePayStubs.getByEmployeeId({
  employeeId: "employeeId_example",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of an Employee for whom you want to get the Pay Stubs

##### checkDate: `string`<a id="checkdate-string"></a>

Check Date of Pay Stubs - required (unless processDate supplied)

##### processDate: `string`<a id="processdate-string"></a>

Process Date of Pay Stubs - required (unless checkDate supplied)

##### plannerId: `string`<a id="plannerid-string"></a>

ID of the Planner for which you want to get the Pay Stubs.

##### include: [`Includes9`](./models/includes9.ts)[]<a id="include-includes9modelsincludes9ts"></a>

Options to include more data: All, GrossAmount, NetAmount, Earnings, Taxes, Deductions  Data Access required  GrossAmount = View Paystub Gross Pay Information  NetAmount = View Paystub Net Pay Information  Earnings = View Paystub Earning Information  Taxes = View Paystub Tax Information  Deductions = View Paystub Deduction Information

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of Employee Pay Stubs

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfPayStub](./models/paged-result-of-pay-stub.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/paystubs` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeePayStubs.getByLegalEntity`<a id="paycoremployeepaystubsgetbylegalentity"></a>

Note: Either CheckDate, ProcessDate or PlannerId is required as a parameter.

Data Access: View Paystub Information by Legal Entity Id

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByLegalEntityResponse = await paycor.employeePayStubs.getByLegalEntity(
  {
    legalEntityId: 1,
  }
);
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of a Legal entity for which you want to get the Pay Stubs

##### checkDate: `string`<a id="checkdate-string"></a>

Check Date of Pay Stubs - required (unless processDate supplied)

##### processDate: `string`<a id="processdate-string"></a>

Process Date of Pay Stubs - required (unless checkDate supplied)

##### plannerId: `string`<a id="plannerid-string"></a>

ID of the Planner for which you want to get the Pay Stubs.

##### include: [`Includes10`](./models/includes10.ts)[]<a id="include-includes10modelsincludes10ts"></a>

Options to include more data: All, GrossAmount, NetAmount, Earnings, Taxes, Deductions  Data Access required  GrossAmount = View Paystub Gross Pay Information  NetAmount = View Paystub Net Pay Information  Earnings = View Paystub Earning Information  Taxes = View Paystub Tax Information  Deductions = View Paystub Deduction Information

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of Employee Pay Stubs

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfPayStub2](./models/paged-result-of-pay-stub2.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/paystubs` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeePayStubs.getYtdByEmployeeId`<a id="paycoremployeepaystubsgetytdbyemployeeid"></a>

* To Check Date is required parameter.  
* To get a list of check dates, you can use the GET Legal Entity Pay data endpoint.

Data Access: View Paystub Information YTD

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getYtdByEmployeeIdResponse =
  await paycor.employeePayStubs.getYtdByEmployeeId({
    employeeId: "employeeId_example",
    toCheckDate: "1970-01-01T00:00:00.00Z",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of an Employee for whom you want to get the Pay Stubs

##### toCheckDate: `string`<a id="tocheckdate-string"></a>

Check Date of latest Pay Stub for YTD data. 

##### include: [`Includes11`](./models/includes11.ts)[]<a id="include-includes11modelsincludes11ts"></a>

Options to include more data: All, Earnings, Taxes, Deductions  Data Access required  Earnings = View Paystub Earning Information YTD  Taxes = View Paystub Tax Information YTD  Deductions = View Paystub Deduction Information YTD

#### 🔄 Return<a id="🔄-return"></a>

[EmployeePayStubHistory](./models/employee-pay-stub-history.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/paystubsytd` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeePayStubs.getYtdByLegalEntity`<a id="paycoremployeepaystubsgetytdbylegalentity"></a>

* To Check Date is required parameter.  
* To get a list of check dates, you can use the GET Legal Entity Pay data endpoint.

Data Access: View Paystub Information YTD By Legal Entity

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getYtdByLegalEntityResponse =
  await paycor.employeePayStubs.getYtdByLegalEntity({
    legalEntityId: 1,
    toCheckDate: "1970-01-01T00:00:00.00Z",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of a Legal entity for which you want to get the Pay Stubs

##### toCheckDate: `string`<a id="tocheckdate-string"></a>

Check Date of latest Pay Stub for YTD data. 

##### include: [`Includes12`](./models/includes12.ts)[]<a id="include-includes12modelsincludes12ts"></a>

Options to include more data: All, Earnings, Taxes, Deductions  Data Access required  Earnings = View Paystub Earning Information YTD By Legal Entity  Taxes = View Paystub Tax Information YTD By Legal Entity  Deductions = View Paystub Deduction Information YTD By Legal Entity

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfEmployeePayStubHistory](./models/paged-result-of-employee-pay-stub-history.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/paystubsytd` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeePayrollHours.addHoursAndEarningsToPaygrid`<a id="paycoremployeepayrollhoursaddhoursandearningstopaygrid"></a>

Required parameters in body are: IntegrationVendor, ProcessId, LegalEntityId, EmployeeNumber, DepartmentCode, EarningCode, BusinessStartDate

Data Access: Import Employee Hours and Earnings to Paygrid

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const addHoursAndEarningsToPaygridResponse =
  await paycor.employeePayrollHours.addHoursAndEarningsToPaygrid({
    legalEntityId: 1,
    IntegrationVendor: "IntegrationVendor_example",
    ProcessId: "b962666d-8c1e-46db-a750-53edfe25d47e",
    ImportEmployees: [
      {
        EmployeeNumber: 33420,
        ImportEarnings: [
          {
            DepartmentCode: 334,
            EarningCode: "ERC300",
            EarningHours: 3.5,
            EarningAmount: 150.57,
            EarningRate: 15.09,
            BusinessStartDate: "2020-11-17T12:00:00.000Z",
            BusinessEndDate: "2020-11-22T12:00:00.000Z",
            DateWorked: "2022-01-22T12:00:00.000Z",
            PayGroupId: "71c9338a-4c28-0000-0000-0000712f0300",
          },
        ],
      },
    ],
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### IntegrationVendor: `string`<a id="integrationvendor-string"></a>

Required freeform field for tracking purposes. You can input your company or application name.

##### ProcessId: `string`<a id="processid-string"></a>

Unique identifier of the transaction to prevent double-posting in Paycor\\\'s systems.  Please generate a new GUID (using any method) for every API call. Use the same GUID only when you want to replace existing data.

##### ImportEmployees: [`ImportEmployee`](./models/import-employee.ts)[]<a id="importemployees-importemployeemodelsimport-employeets"></a>

List of Employees, with nested lists of Earnings, to import into Paycor\\\'s Paygrid system. 

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity for which you want to set employee hours and earnings

##### replaceData: `boolean`<a id="replacedata-boolean"></a>

If \"True\" is passed for this query parameter and a matching ProcessID is passed, then the system will fully replace the entire record that was previously added.

##### appendData: `boolean`<a id="appenddata-boolean"></a>

If \"True\" is passed for this query parameter, then the system will NOT replace any record that was previously added.

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/payrollhours` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeePayrollHours.importToEmployee`<a id="paycoremployeepayrollhoursimporttoemployee"></a>

Data Access: Import Payroll Hours to Employee

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const importToEmployeeResponse =
  await paycor.employeePayrollHours.importToEmployee({
    employeeId: "employeeId_example",
    AppId: "763a5661-b518-0000-0000-000014e00100",
    IntegrationVendor: "IntegrationVendor_example",
    ProcessId: "b962666d-8c1e-46db-a750-53edfe25d47e",
    LegalEntityId: 100289,
    EmployeeNumber: 33420,
    DepartmentCode: 334,
    TimeCardData: [
      {
        EarningCode: "ERC300",
        EarningHours: 3.5,
        BusinessStartDate: "2020-11-17T12:00:00.000Z",
        BusinessEndDate: "2020-11-22T12:00:00.000Z",
      },
    ],
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### IntegrationVendor: `string`<a id="integrationvendor-string"></a>

Required freeform field for tracking purposes. You can input your company or application name.

##### ProcessId: `string`<a id="processid-string"></a>

Unique identifier of the transaction to prevent double-posting in Paycor\\\'s systems.  Please generate a new GUID (using any method) for every API call.

##### EmployeeNumber: `number`<a id="employeenumber-number"></a>

Unique number of the employee in the tenant. Generated by Paycor. You can use any GET Employee endpoint to retrieve.

##### DepartmentCode: `number`<a id="departmentcode-number"></a>

Department code that the Hours should be paid under. You can use GET Legal Entity Departments to retrieve valid Code values. 

##### TimeCardData: [`TimeCardData`](./models/time-card-data.ts)[]<a id="timecarddata-timecarddatamodelstime-card-datats"></a>

List of the employee\\\'s earning rates, factors and amounts of type EmployeeEarningAmount.             

##### employeeId: `string`<a id="employeeid-string"></a>

ID of an Employee for whom you want to add the payroll hours

##### AppId: `string`<a id="appid-string"></a>

Optional field that can be used for tracking purposes. Not required for payroll processing. 

##### LegalEntityId: `number`<a id="legalentityid-number"></a>

Unique identifier of the Legal Entity in Paycor\\\'s system.

##### JobCode: `string`<a id="jobcode-string"></a>

JobCode parameter is not currently used - included for future functionality. 

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/payrollhours` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeTaxes.addByEmployeeId`<a id="paycoremployeetaxesaddbyemployeeid"></a>

* Use GET Tax Fields by Tax Code to determine payload needed to complete this call

Data Access: Create Employee Tax

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const addByEmployeeIdResponse = await paycor.employeeTaxes.addByEmployeeId({
  employeeId: "employeeId_example",
  LegalEntityTaxId: "b55a9eba-1007-0000-0000-000040e20100",
  ReciprocityType: "LiveIn",
  FilingStatus: "A",
  WithholdingEffectiveStartDate: "2020-11-13T00:00:00",
  BlockDate: "2020-11-13T00:00:00",
  NonResidentAlien: "true",
  IsProbationaryEmployee: true,
  OccupationalCode: "12",
  GeographicCode: "11-1011",
  SOCCode: "11-1012",
  SeasonalCode: "14",
  CountyCode: "124",
  SpouseWork: "Yes/True",
  DependentInsuranceEligible: "Yes/True",
  DependentInsuranceEligibleDate: "2020-02-13T00:00:00",
  ApplicableBirthyear: 1980,
  AdjustWithholding: "N",
  Amount: 3141.59,
  Percentage: 0.2,
  NCCICode: "2004",
  PsdCode: "101001",
  PsdRate: 0.123,
  OnHold: true,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### LegalEntityTaxId: `string`<a id="legalentitytaxid-string"></a>

Unique identifier of the legal entity tax in Paycor\\\'s system. Generated by Paycor. Retrieve a value by calling \\\"Get Legal Entity Taxes by Legal Entity ID\\\".

##### ReciprocityType: [`ReciprocityType`](./models/reciprocity-type.ts)<a id="reciprocitytype-reciprocitytypemodelsreciprocity-typets"></a>

Enumeration of valid Types of multi-state Reciprocity values.             

##### WithholdingEffectiveStartDate: `string`<a id="withholdingeffectivestartdate-string"></a>

Effective start date of withholding Retrieve a value by calling \\\"Get Filing Status by Tax Code\\\".

##### employeeId: `string`<a id="employeeid-string"></a>

ID of an Employee for whom you want to add the tax

##### FilingStatus: [`FilingStatus2`](./models/filing-status2.ts)<a id="filingstatus-filingstatus2modelsfiling-status2ts"></a>

Enumeration of valid Filing Status values.

##### BlockDate: `string`<a id="blockdate-string"></a>

Withholding block date

##### NonResidentAlien: `string`<a id="nonresidentalien-string"></a>

Specifies whether an employee is NonResidentAlien

##### IsProbationaryEmployee: `boolean`<a id="isprobationaryemployee-boolean"></a>

Specifies whether an employee is a probationary employee

##### OccupationalCode: `string`<a id="occupationalcode-string"></a>

Occupational code

##### GeographicCode: `string`<a id="geographiccode-string"></a>

Geographic code Required only for UNEAK tax

##### SOCCode: `string`<a id="soccode-string"></a>

Standard occupational classification Code

##### SeasonalCode: `string`<a id="seasonalcode-string"></a>

Seasonal Code

##### CountyCode: `string`<a id="countycode-string"></a>

County Code

##### SpouseWork: `string`<a id="spousework-string"></a>

Specifies  whether an employee\\\'s spouse is employed

##### DependentInsuranceEligible: `string`<a id="dependentinsuranceeligible-string"></a>

Dependent insurance eligibility status

##### DependentInsuranceEligibleDate: `string`<a id="dependentinsuranceeligibledate-string"></a>

Dependent insurance eligibility date

##### ApplicableBirthyear: `number`<a id="applicablebirthyear-number"></a>

Birth year

##### AdjustWithholding: [`AdjustWithholdingType`](./models/adjust-withholding-type.ts)<a id="adjustwithholding-adjustwithholdingtypemodelsadjust-withholding-typets"></a>

Enumeration of valid Types of AdjustWithholdingType.             

##### Amount: `number`<a id="amount-number"></a>

Fixed, recurring deduction dollar amount.             

##### Percentage: `number`<a id="percentage-number"></a>

Percentage value used in tax calculation. 

##### NCCICode: `string`<a id="nccicode-string"></a>

National Council on Compensation Insurance (NCCI) Code 

##### PsdCode: `string`<a id="psdcode-string"></a>

PA Residence PSD code- political subdivision code

##### PsdRate: `number`<a id="psdrate-number"></a>

PA Residence PSD rate

##### OnHold: `boolean`<a id="onhold-boolean"></a>

Whether employee tax should appear on paychecks.             

##### Exemptions: [`EmployeeExemptions`](./models/employee-exemptions.ts)<a id="exemptions-employeeexemptionsmodelsemployee-exemptionsts"></a>

##### TaxCredit: [`EmployeeTaxCredit`](./models/employee-tax-credit.ts)<a id="taxcredit-employeetaxcreditmodelsemployee-tax-creditts"></a>

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/taxes` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeTaxes.getByEmployeeId`<a id="paycoremployeetaxesgetbyemployeeid"></a>

Data Access: View Employee Taxes

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByEmployeeIdResponse = await paycor.employeeTaxes.getByEmployeeId({
  employeeId: "employeeId_example",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of the employee for whom you want to get the taxes

##### include: [`Includes16`](./models/includes16.ts)[]<a id="include-includes16modelsincludes16ts"></a>

Options to include more data: All, TaxCredits  Data Access required  TaxCredits = View Employee Tax Credits

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of employee taxes

#### 🔄 Return<a id="🔄-return"></a>

[EmployeeTax](./models/employee-tax.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/taxes` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeTaxes.getFilingStatusByTaxCode`<a id="paycoremployeetaxesgetfilingstatusbytaxcode"></a>

Data Access: View Filing Status by Tax Code

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getFilingStatusByTaxCodeResponse =
  await paycor.employeeTaxes.getFilingStatusByTaxCode({
    taxCode: "taxCode_example",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### taxCode: `string`<a id="taxcode-string"></a>

You can retrieve a valid Tax Code via Get Legal Entity Taxes by Legal Entity ID

#### 🔄 Return<a id="🔄-return"></a>

[FilingStatus](./models/filing-status.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/taxes/filingStatus/{taxCode}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeTaxes.getTaxFieldsByTaxCode`<a id="paycoremployeetaxesgettaxfieldsbytaxcode"></a>

* This endpoint will allow you to pass in a Tax Code and will return the fields that are expected to be passed for PUT/POST Employee Taxes
* To get the Tax Codes available for your account to be used for this endpoint, use GET Legal Entity Taxes by Legal Entity ID

Data Access: Get Tax Fields By Tax Code

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getTaxFieldsByTaxCodeResponse =
  await paycor.employeeTaxes.getTaxFieldsByTaxCode({
    taxCode: "taxCode_example",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### taxCode: `string`<a id="taxcode-string"></a>

You can retrieve a Tax fields by Tax Codes

#### 🔄 Return<a id="🔄-return"></a>

[GlobalTaxForm](./models/global-tax-form.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/taxes/taxFields/{taxCode}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeTaxes.updateByEmployeeId`<a id="paycoremployeetaxesupdatebyemployeeid"></a>

* Use GET Tax Fields by Tax Code to determine payload needed to complete this call

Data Access: Update Employee Tax

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateByEmployeeIdResponse =
  await paycor.employeeTaxes.updateByEmployeeId({
    employeeId: "employeeId_example",
    Id: "a5713n92-196c-0000-0000-0007d5268Sa2",
    LegalEntityTaxId: "b55a9eba-1007-0000-0000-000040e20100",
    ReciprocityType: "LiveIn",
    FilingStatus: "A",
    WithholdingEffectiveStartDate: "2020-01-13T00:00:00",
    BlockDate: "2020-11-13T00:00:00",
    NonResidentAlien: "true",
    IsProbationaryEmployee: true,
    OccupationalCode: "12",
    GeographicCode: "11-1011",
    SOCCode: "11-1012",
    SeasonalCode: "14",
    CountyCode: "124",
    SpouseWork: "Yes/True",
    DependentInsuranceEligible: "Yes/True",
    DependentInsuranceEligibleDate: "2020-02-13T00:00:00",
    ApplicableBirthyear: 1980,
    Amount: 3141.59,
    Percentage: 0.2,
    NCCICode: "2004",
    PsdCode: "101001",
    PsdRate: 0.123,
    OnHold: true,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### Id: `string`<a id="id-string"></a>

Unique identifier of the employee tax in Paycor\\\'s system. Generated by Paycor.

##### LegalEntityTaxId: `string`<a id="legalentitytaxid-string"></a>

Unique identifier of the legal entity tax in Paycor\\\'s system. Generated by Paycor.

##### employeeId: `string`<a id="employeeid-string"></a>

ID of an Employee for whom you want to update the tax

##### ReciprocityType: [`ReciprocityType`](./models/reciprocity-type.ts)<a id="reciprocitytype-reciprocitytypemodelsreciprocity-typets"></a>

Enumeration of valid Types of multi-state Reciprocity values.             

##### FilingStatus: [`FilingStatus2`](./models/filing-status2.ts)<a id="filingstatus-filingstatus2modelsfiling-status2ts"></a>

Enumeration of valid Filing Status values.

##### WithholdingEffectiveStartDate: `string`<a id="withholdingeffectivestartdate-string"></a>

Effective start date of withholding

##### BlockDate: `string`<a id="blockdate-string"></a>

Withholding block date

##### NonResidentAlien: `string`<a id="nonresidentalien-string"></a>

Specifies whether an employee is NonResidentAlien

##### IsProbationaryEmployee: `boolean`<a id="isprobationaryemployee-boolean"></a>

Specifies whether an employee is a probationary employee

##### OccupationalCode: `string`<a id="occupationalcode-string"></a>

Occupational code

##### GeographicCode: `string`<a id="geographiccode-string"></a>

Geographic code Required only for UNEAK tax

##### SOCCode: `string`<a id="soccode-string"></a>

Standard occupational classification Code

##### SeasonalCode: `string`<a id="seasonalcode-string"></a>

Seasonal Code 

##### CountyCode: `string`<a id="countycode-string"></a>

County Code

##### SpouseWork: `string`<a id="spousework-string"></a>

Specifies  whether an employee\\\'s spouse is employed

##### DependentInsuranceEligible: `string`<a id="dependentinsuranceeligible-string"></a>

Dependent insurance eligibility status

##### DependentInsuranceEligibleDate: `string`<a id="dependentinsuranceeligibledate-string"></a>

Dependent insurance eligibility date

##### ApplicableBirthyear: `number`<a id="applicablebirthyear-number"></a>

Birth year

##### Amount: `number`<a id="amount-number"></a>

Fixed, recurring deduction dollar amount.             

##### Percentage: `number`<a id="percentage-number"></a>

Percentage value used in tax calculation. 

##### NCCICode: `string`<a id="nccicode-string"></a>

National Council on Compensation Insurance (NCCI) Code 

##### PsdCode: `string`<a id="psdcode-string"></a>

PA Residence PSD code- political subdivision code

##### PsdRate: `number`<a id="psdrate-number"></a>

PA Residence PSD rate

##### OnHold: `boolean`<a id="onhold-boolean"></a>

Whether employee tax should appear on paychecks.             

##### Exemptions: [`EmployeeExemptions`](./models/employee-exemptions.ts)<a id="exemptions-employeeexemptionsmodelsemployee-exemptionsts"></a>

##### TaxCredit: [`EmployeeTaxCredit`](./models/employee-tax-credit.ts)<a id="taxcredit-employeetaxcreditmodelsemployee-tax-creditts"></a>

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/taxes` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeTimeCardPunches.getByEmployeeId`<a id="paycoremployeetimecardpunchesgetbyemployeeid"></a>

This pulls Punches data from Paycor's Perform Time system for one employee.
* Clients *do not* need to run payroll before hours are returned by this endpoint.
* Our Public API currently does not include whether the hours have already been Approved or not.
* Time Card punches may be delayed by 20 minutes.

Date requirements:
* Start Date and End Date must not be more than one year ago
* Start Date must not be in future
* Start date and end date range can be no greater than 90 days

Data Access: View Employee Time Card Punches

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByEmployeeIdResponse =
  await paycor.employeeTimeCardPunches.getByEmployeeId({
    employeeId: "employeeId_example",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of employee for which you want to get hours

##### startDate: `string`<a id="startdate-string"></a>

Date range filter, showing which records to return

##### endDate: `string`<a id="enddate-string"></a>

Date range filter, showing which records to return

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get next set of Employee Time Cards. ContinuationToken would be valid only for 24 hours. If a call is made after 24 hours with old continuationToken, no data will be retrieved.

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfTimeCardV3](./models/paged-result-of-time-card-v3.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/punches` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeTimeCardPunches.getByLegalEntityId`<a id="paycoremployeetimecardpunchesgetbylegalentityid"></a>

This pulls Punches data from Paycor's Perform Time system, for one legal entity.
* Clients *do not* need to run payroll before hours are returned by this endpoint.
* Our Public API currently does not include whether the hours have already been Approved or not.
* Time Card hours may be delayed by 20 minutes.

Date requirements:
* Start Date and End Date must not be more than one year ago
* Start Date must not be in future
* Start date and end date range can be no greater than 90 days

Data Access: View Employee Time Card Punches By Legal Entity Id

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByLegalEntityIdResponse =
  await paycor.employeeTimeCardPunches.getByLegalEntityId({
    legalEntityId: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of legal entity for which you want to get hours

##### startDate: `string`<a id="startdate-string"></a>

Date range filter, showing which records to return

##### endDate: `string`<a id="enddate-string"></a>

Date range filter, showing which records to return

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get next set of Employee Time Cards. ContinuationToken would be valid only for 24 hours. If a call is made after 24 hours with old continuationToken, no data will be retrieved.

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfTimeCardV3](./models/paged-result-of-time-card-v3.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalEntities/{legalEntityId}/punches` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeTimeOffAccruals.getByEmployeeId`<a id="paycoremployeetimeoffaccrualsgetbyemployeeid"></a>

Data Access: View Employee Timeoff Accruals by Employee Id

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByEmployeeIdResponse =
  await paycor.employeeTimeOffAccruals.getByEmployeeId({
    employeeId: "employeeId_example",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of an Employee for whom you want to get the Balances

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of Employee Balances

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfEmployeeBalance](./models/paged-result-of-employee-balance.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/timeoffaccruals` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employeeTimeOffAccruals.getByLegalEntityId`<a id="paycoremployeetimeoffaccrualsgetbylegalentityid"></a>

Data Access: View Employee Timeoff Accruals by Legal Entity Id

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByLegalEntityIdResponse =
  await paycor.employeeTimeOffAccruals.getByLegalEntityId({
    legalEntityId: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

Legal entity ID for which you want to get the balances

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of employee balances

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfEmployeeBalance](./models/paged-result-of-employee-balance.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/timeoffaccruals` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employees.createNewEmployee`<a id="paycoremployeescreatenewemployee"></a>

This immediately "hires" a new employee and associated Person in Paycor's system. There is no way to undo or reverse this operation.
After creating an employee, please wait sixty seconds before using employeeId to call other endpoints.
            
Data Access: Create Employee

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const createNewEmployeeResponse = await paycor.employees.createNewEmployee({
  LegalEntityId: 123666,
  EmployeeNumber: 12345,
  AlternateEmployeeNumber: "1234567890",
  Prefix: "None",
  FirstName: "Charles",
  MiddleName: "Lutwidge",
  LastName: "Dodgson",
  Suffix: "None",
  SocialSecurityNumber: "555555555",
  BirthDate: "1944-04-01T00:00:00Z",
  Gender: "Male",
  Ethnicity: "AmerIndorAKNative",
  MaritalStatus: "Single",
  JobTitle: "Software Engineer",
  HireDate: "2000-11-01T00:00:00Z",
  ReHireDate: "2020-05-21T00:00:00Z",
  Status: "Active",
  Flsa: "HourlyExempt",
  Type: "Casual",
  ManagerEmpId: "52a2s23-0000-0000-0000-0007d0009840",
  PaygroupDescription: "PaygroupDescription_example",
  DepartmentCode: 1,
  Veteran: "true",
  Disability: "true",
  PrimaryAddress: {
    StreetLine1: "4811 Montgomery Road",
    StreetLine2: "Building A",
    Suite: "Suite 100",
    City: "Cincinnati",
    State: "OH",
    Country: "USA",
    County: "Hamilton",
    ZipCode: "45212",
  },
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### LegalEntityId: `number`<a id="legalentityid-number"></a>

Employee\\\'s LegalEntityId.             

##### FirstName: `string`<a id="firstname-string"></a>

First name of the employee.

##### LastName: `string`<a id="lastname-string"></a>

Last name of the employee.

##### HireDate: `string`<a id="hiredate-string"></a>

Date the employee was hired following the ISO 8601 standard.. Format: YYYY-MM-DDTHH:MM:SSZ  (ISO-8601 standard)              

##### Status: [`EmploymentStatus`](./models/employment-status.ts)<a id="status-employmentstatusmodelsemployment-statusts"></a>

Enumeration of valid Employment Status values.             

##### PaygroupDescription: `string`<a id="paygroupdescription-string"></a>

The description of the paygroup that the employee belongs to.  * Must be existing Paygroup. Call GET Pay Groups by LegalEntityID to lookup valid values in the field \\\"PaygroupName\\\".              

##### DepartmentCode: `number`<a id="departmentcode-number"></a>

The department code that the employee belongs to.   * Must be existing Department. Call Get Legal Entity Departments by LegalEntityID to get valid Code value.             

##### PrimaryAddress: [`GenericAddress`](./models/generic-address.ts)<a id="primaryaddress-genericaddressmodelsgeneric-addressts"></a>

##### EmployeeNumber: `number`<a id="employeenumber-number"></a>

Unique number of the employee in the tenant. Generated by Paycor if not provided.             

##### AlternateEmployeeNumber: `string`<a id="alternateemployeenumber-string"></a>

Can be up to 9 characters, Requires Alternate Employee Number product offering.

##### Prefix: [`Prefix`](./models/prefix.ts)<a id="prefix-prefixmodelsprefixts"></a>

Enumeration of valid Prefix values.

##### MiddleName: `string`<a id="middlename-string"></a>

Middle name of the employee.

##### Suffix: [`Suffix`](./models/suffix.ts)<a id="suffix-suffixmodelssuffixts"></a>

Enumeration of valid Suffix values.

##### HomeEmail: `string`<a id="homeemail-string"></a>

Home Email Information of an employee.             

##### WorkEmail: `string`<a id="workemail-string"></a>

Work Email Information of an employee.             

##### Phones: [`Phone`](./models/phone.ts)[]<a id="phones-phonemodelsphonets"></a>

List of type Phone containing phone numbers of the employee. Accepts home,mobile and work phone numbers, upto 1 of each type. Mobile phone is accepted only if home contact is provided.              

##### SocialSecurityNumber: `string`<a id="socialsecuritynumber-string"></a>

Social security number of the employee.

##### BirthDate: `string`<a id="birthdate-string"></a>

Date of birth of the employee following the ISO 8601 standard. Format: YYYY-MM-DDTHH:MM:SSZ  (ISO-8601 standard) 

##### Gender: [`Gender`](./models/gender.ts)<a id="gender-gendermodelsgenderts"></a>

Enumeration of valid Gender values.

##### Ethnicity: [`EthnicityType`](./models/ethnicity-type.ts)<a id="ethnicity-ethnicitytypemodelsethnicity-typets"></a>

Enumeration of valid Ethnicity Type values.             

##### MaritalStatus: [`MaritalStatus`](./models/marital-status.ts)<a id="maritalstatus-maritalstatusmodelsmarital-statusts"></a>

Enumeration of valid Marital Status values.             

##### WorkLocation: `string`<a id="worklocation-string"></a>

The name of the Work Location to associate with new hire.  * Must be an existing Work Location. Use API \\\'GET Legal Entity Work Location by Legal Entity ID\\\' to retrieve a list of valid names.             

##### JobTitle: `string`<a id="jobtitle-string"></a>

Name of the Job Title to associate with new hire.  * Must be an existing Job setup on the Tenant. Use API \\\'GET Tenant Job Titles by TenantId\\\' to retrieve a list of valid names.             

##### ReHireDate: `string`<a id="rehiredate-string"></a>

Re-hire date of the employee. Terminated employees can be rehired.  Format: YYYY-MM-DDTHH:MM:SSZ  (ISO-8601 standard) 

##### Flsa: [`FlsaType`](./models/flsa-type.ts)<a id="flsa-flsatypemodelsflsa-typets"></a>

Enumeration of valid Types of Fair Labor Standards Act (FLSA) employment values.             

##### Type: [`EmploymentType`](./models/employment-type.ts)<a id="type-employmenttypemodelsemployment-typets"></a>

Enumeration of valid Employment Type values.             

##### ManagerEmpId: `string`<a id="managerempid-string"></a>

Unique identifier of the manager in Paycor\\\'s system. Generated by Paycor.

##### Veteran: [`VeteranStatus`](./models/veteran-status.ts)<a id="veteran-veteranstatusmodelsveteran-statusts"></a>

Enumeration of valid Veteran Status values.             

##### Disability: [`DisabilityStatus`](./models/disability-status.ts)<a id="disability-disabilitystatusmodelsdisability-statusts"></a>

Enumeration of valid Disability Status values.

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employees.getByEmployeeId`<a id="paycoremployeesgetbyemployeeid"></a>

Tip: you can retrieve a valid EmployeeID guid via endpoints like 'Get Employees by Legal Entity ID'
            
Data Access: View Employee Information

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByEmployeeIdResponse = await paycor.employees.getByEmployeeId({
  employeeId: "employeeId_example",
  emailType: "Work",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of the Employee you want to get

##### include: [`Includes13`](./models/includes13.ts)[]<a id="include-includes13modelsincludes13ts"></a>

Options to include more data: All, EmploymentDates, Status, Position, WorkLocation              Data Access required              EmploymentDates = View Employee Employment Dates              Status = View Employee Status              Position = View Employee Position              WorkLocation = View Employee Work Location

##### emailType: [`EmailTypeOptions`](./models/email-type-options.ts)<a id="emailtype-emailtypeoptionsmodelsemail-type-optionsts"></a>

Options to specify which emaill address to return. Work email type will be returned if none are specified: Home, Work

#### 🔄 Return<a id="🔄-return"></a>

[EmployeeReturnItem](./models/employee-return-item.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employees.getIdentifyingData`<a id="paycoremployeesgetidentifyingdata"></a>

Data Access: View Legal Entity Employees Identifying Data
            
Optional Data Access: View Legal Entity Employees SSN and BirthDate

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getIdentifyingDataResponse = await paycor.employees.getIdentifyingData({
  legalEntityId: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the legal entity for which you want to get employees

##### include: [`Includes15`](./models/includes15.ts)[]<a id="include-includes15modelsincludes15ts"></a>

Options to filter employees by employment status: Active, Inactive

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of data

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfEmployeesIdentifyingData](./models/paged-result-of-employees-identifying-data.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/employeesIdentifyingData` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employees.listByLegalEntityId`<a id="paycoremployeeslistbylegalentityid"></a>

Data Access: View Legal Entity Employees

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const listByLegalEntityIdResponse = await paycor.employees.listByLegalEntityId({
  legalEntityId: 1,
  emailType: "Work",
  statusFilter: "Active",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the legal entity for which you want to get employees

##### include: [`Includes14`](./models/includes14.ts)[]<a id="include-includes14modelsincludes14ts"></a>

Options to include more data: All, EmploymentDates, Status, Position, WorkLocation              Data Access required              EmploymentDates = View Legal Entity Employees Employment Dates              Status = View Legal Entity Employees Status              Position = View Legal Entity Employees Position              WorkLocation = View Legal Entity Employees Work Location

##### emailType: [`EmailTypeOptions2`](./models/email-type-options2.ts)<a id="emailtype-emailtypeoptions2modelsemail-type-options2ts"></a>

Options to specify which email address to return. Work email type will be returned if none are specified: Home, Work

##### statusFilter: [`EmploymentStatus`](./models/employment-status.ts)<a id="statusfilter-employmentstatusmodelsemployment-statusts"></a>

Option to filter by employment status.

##### employeeNumber: `number`<a id="employeenumber-number"></a>

Option to filter by Employee Number.

##### lastName: `string`<a id="lastname-string"></a>

Option to filter by Employee Last Name.

##### departmentCode: `number`<a id="departmentcode-number"></a>

Option to filter by Department Code.

##### workLocationName: `string`<a id="worklocationname-string"></a>

Option to filter by Work Location Name.

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of employees

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfEmployeeReturnItem](./models/paged-result-of-employee-return-item.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/employees` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employees.listByTenantId`<a id="paycoremployeeslistbytenantid"></a>

Data Access: View Tenant Employees

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const listByTenantIdResponse = await paycor.employees.listByTenantId({
  tenantId: 1,
  statusFilter: "Active",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### tenantId: `number`<a id="tenantid-number"></a>

ID of the tenant for which you want to get employees

##### statusFilter: [`EmploymentStatus`](./models/employment-status.ts)<a id="statusfilter-employmentstatusmodelsemployment-statusts"></a>

Option to filter by employment status

##### employeeNumber: `number`<a id="employeenumber-number"></a>

Option to filter by Employee Number.

##### lastName: `string`<a id="lastname-string"></a>

Option to filter by Employee Last Name.

##### departmentCode: `number`<a id="departmentcode-number"></a>

Option to filter by Department Code.

##### workLocationName: `string`<a id="worklocationname-string"></a>

Option to filter by Work Location Name.

##### jobCode: `string`<a id="jobcode-string"></a>

Option to filter by Job Code.

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of employees

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfEmployeeList](./models/paged-result-of-employee-list.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/tenants/{tenantId}/employees` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employees.updateContact`<a id="paycoremployeesupdatecontact"></a>

This immediately updates an employee's contact information and associated Person's in Paycor's system.
            
Data Access: Update Employee Contact

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateContactResponse = await paycor.employees.updateContact({
  employeeId: "employeeId_example",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

Id of the employee

##### HomeEmail: `string`<a id="homeemail-string"></a>

Home Email Address of an employee.             

##### WorkEmail: `string`<a id="workemail-string"></a>

Work Email Address of an employee.             

##### Phones: [`Phone`](./models/phone.ts)[]<a id="phones-phonemodelsphonets"></a>

List of type Phone containing phone numbers of the employee. Accepts Home, Mobile and Work phone numbers, upto 1 of each type. Only the specific number types passed in will be updated, existing phone numbers will remain unchanged.             

##### PrimaryAddress: [`GenericAddress`](./models/generic-address.ts)<a id="primaryaddress-genericaddressmodelsgeneric-addressts"></a>

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employees.updatePaygroup`<a id="paycoremployeesupdatepaygroup"></a>

This endpoint updates an employee's paygroup.
            
Data Access: Update Employee Paygroup

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updatePaygroupResponse = await paycor.employees.updatePaygroup({
  employeeId: "employeeId_example",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

Id of the employee

##### payGroupId: `string`<a id="paygroupid-string"></a>

ID of the Paygroup for whom you want to get the Pay Schedule. Available via \'GET Legal Entity Pay Groups\'

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/Paygroup` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employees.updatePersonalData`<a id="paycoremployeesupdatepersonaldata"></a>

This endpoint updates an employee's personal information.
            
Data Access: Update Employee Identifying Data

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updatePersonalDataResponse = await paycor.employees.updatePersonalData({
  employeeId: "employeeId_example",
  FirstName: "Charles",
  LastName: "Peterson",
  MiddleName: "Hubble",
  Suffix: "None",
  SocialSecurityNumber: "555555555",
  BirthDate: "1944-04-01T00:00:00Z",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### FirstName: `string`<a id="firstname-string"></a>

First name of the employee.

##### LastName: `string`<a id="lastname-string"></a>

Last name of the employee.

##### Suffix: [`Suffix`](./models/suffix.ts)<a id="suffix-suffixmodelssuffixts"></a>

Enumeration of valid Suffix values.

##### SocialSecurityNumber: `string`<a id="socialsecuritynumber-string"></a>

Social security number of the employee.

##### BirthDate: `string`<a id="birthdate-string"></a>

Date of birth of the employee. Format: YYYY-MM-DDTHH:MM:SSZ  (ISO-8601 standard) 

##### employeeId: `string`<a id="employeeid-string"></a>

Id of the employee

##### MiddleName: `string`<a id="middlename-string"></a>

Middle name of the employee.

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/identifyingdata` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employees.updatePositionAndStatusData`<a id="paycoremployeesupdatepositionandstatusdata"></a>

This endpoint updates an employee's status and position information.
            
Data Access: Update Employee Position And Status

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updatePositionAndStatusDataResponse =
  await paycor.employees.updatePositionAndStatusData({
    employeeId: "employeeId_example",
    EmploymentStatus: "Active",
    RehireDate: "2020-05-21T00:00:00Z",
    EmploymentType: "Casual",
    WorkLocation: "Cincinnati",
    JobTitle: "Software Engineer",
    Flsa: "HourlyExempt",
    ManagerId: "44480aa9-08d8-0000-0000-0000fd0d0300",
    DepartmentId: "3c88ef90-5e35-0000-0000-0000fb0d0300",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### EmploymentStatus: [`EmploymentStatus2`](./models/employment-status2.ts)<a id="employmentstatus-employmentstatus2modelsemployment-status2ts"></a>

Enumeration of valid Employment Status Update values.             

##### RehireDate: `string`<a id="rehiredate-string"></a>

Re-hire date of the employee. Terminated employees can be rehired.  Format: YYYY-MM-DDTHH:MM:SSZ  (ISO-8601 standard) 

##### EmploymentType: [`EmploymentType`](./models/employment-type.ts)<a id="employmenttype-employmenttypemodelsemployment-typets"></a>

Enumeration of valid Employment Type values.             

##### WorkLocation: `string`<a id="worklocation-string"></a>

The name of the Work Location to associate with Employee.  * Must be an existing Work Location, use Legal Entity Work Locations to retrieve a list of valid names.             

##### employeeId: `string`<a id="employeeid-string"></a>

Id of the employee

##### JobTitle: `string`<a id="jobtitle-string"></a>

Name of the Job Title to associate with Employee.  * Must be an existing Job setup on the Tenant. Use API \\\'GET Tenant Job Titles by TenantId\\\' to retrieve a list of valid names.             

##### Flsa: [`FlsaType`](./models/flsa-type.ts)<a id="flsa-flsatypemodelsflsa-typets"></a>

Enumeration of valid Types of Fair Labor Standards Act (FLSA) employment values.             

##### ManagerId: `string`<a id="managerid-string"></a>

Unique identifier of Employee in Paycor\\\'s system.  * Must be an existing Employee, use the EmployeeID provided from other GET Employee endpoints 

##### DepartmentId: `string`<a id="departmentid-string"></a>

Identifier of Department. * Use API \\\'GET Legal Entity Departments by Legal Entity id\\\' to retrieve a list of valid departments.             

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/positionandstatus` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employees.updatePositionData`<a id="paycoremployeesupdatepositiondata"></a>

This endpoint updates an employee's position information.
            
Data Access: Update Employee Position

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updatePositionDataResponse = await paycor.employees.updatePositionData({
  employeeId: "employeeId_example",
  EmploymentType: "Casual",
  WorkLocation: "Cincinnati",
  JobTitle: "Software Engineer",
  Flsa: "HourlyExempt",
  ManagerId: "44480aa9-08d8-0000-0000-0000fd0d0300",
  DepartmentId: "3c88ef90-5e35-0000-0000-0000fb0d0300",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### EmploymentType: [`EmploymentType`](./models/employment-type.ts)<a id="employmenttype-employmenttypemodelsemployment-typets"></a>

Enumeration of valid Employment Type values.             

##### WorkLocation: `string`<a id="worklocation-string"></a>

The name of the Work Location to associate with Employee.  * Must be an existing Work Location. Use API \\\'GET Legal Entity Work Location by Legal Entity ID\\\' to retrieve a list of valid names.             

##### employeeId: `string`<a id="employeeid-string"></a>

Id of the employee

##### JobTitle: `string`<a id="jobtitle-string"></a>

Name of the Job Title to associate with Employee.  * Must be an existing Job setup on the Tenant. Use API \\\'GET Tenant Job Titles by TenantId\\\' to retrieve a list of valid names.             

##### Flsa: [`FlsaType`](./models/flsa-type.ts)<a id="flsa-flsatypemodelsflsa-typets"></a>

Enumeration of valid Types of Fair Labor Standards Act (FLSA) employment values.             

##### ManagerId: `string`<a id="managerid-string"></a>

Unique identifier of Employee in Paycor\\\'s system. 

##### DepartmentId: `string`<a id="departmentid-string"></a>

Identifier of Department.             

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/position` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.employees.updateStatusData`<a id="paycoremployeesupdatestatusdata"></a>

This endpoint updates an employee status information.
            
Data Access: Update Employee Status Data

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateStatusDataResponse = await paycor.employees.updateStatusData({
  employeeId: "employeeId_example",
  EffectiveDate: "2019-11-01T00:00:00Z",
  EmployeeStatus: "Active",
  EmployeeStatusReasonId: "aaeeef19-7b65-4ace-a244-ae1e43c6a634",
  EligibleForRehire: "true",
  IsVoluntaryByEmployee: false,
  Notes: "Employee absence from work",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### EffectiveDate: `string`<a id="effectivedate-string"></a>

Date at which the employee status update takes effect. Format: YYYY-MM-DDTHH:MM:SSZ  (ISO-8601 standard)              

##### EmployeeStatus: [`EmploymentStatus`](./models/employment-status.ts)<a id="employeestatus-employmentstatusmodelsemployment-statusts"></a>

Enumeration of valid Employment Status values.             

##### employeeId: `string`<a id="employeeid-string"></a>

Id of the employee

##### EmployeeStatusReasonId: `string`<a id="employeestatusreasonid-string"></a>

Unique Identifier for Employee Status Reason. All possible Status Reason Values can be found using Get Legal Entity Status Reason values endpoint.             

##### EligibleForRehire: [`EligibleForRehire`](./models/eligible-for-rehire.ts)<a id="eligibleforrehire-eligibleforrehiremodelseligible-for-rehirets"></a>



##### IsVoluntaryByEmployee: `boolean`<a id="isvoluntarybyemployee-boolean"></a>

Determines if an employee termination is voluntary or not.  This is required when EmployeeStatus is updated to one of these values: Deceased, LaidOff, Resigned, Retired, Terminated. Otherwise optional.             

##### Notes: `string`<a id="notes-string"></a>

Notes associated with the employee\\\'s status update, which will be stored in Employee\\\'s Status History.             

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/status` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.events.notifyEventDetails`<a id="paycoreventsnotifyeventdetails"></a>

Following body attributes are optionally required:
* ItemId is required when EventType is Employee.Modified
* LegalEntityId is required when EventType is LegalEntity.Modified

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const notifyEventDetailsResponse = await paycor.events.notifyEventDetails({
  ApplicationId: "0f8fad5b-d9cb-469f-a165-70867728950e",
  NotificationURL: "https://partner/v1/eventNotificationReceiver",
  NotificationSecret:
    "Bearer WREXIDWmfhlc19eLE1vXQ5KDnGEk22AeEvGcON2L2As8I1GwDUGstl-SUfyV6V3e23v3_EVABGx",
  EventType: "Employee.Modified",
  ItemId: "89610735-e570-0000-0000-000066000000",
  LegalEntityId: 501123,
  TenantId: 2080,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### ApplicationId: `string`<a id="applicationid-string"></a>

Unique Identifier of the Application that needs mock events.             

##### NotificationURL: `string`<a id="notificationurl-string"></a>

URL where the Event Notification has to be sent.             

##### NotificationSecret: `string`<a id="notificationsecret-string"></a>

Secret or Security Token required to authenticate above server.             

##### EventType: `string`<a id="eventtype-string"></a>

Type of Event that needs to be triggered by Paycor\\\'s System.

##### TenantId: `number`<a id="tenantid-number"></a>

Unique Identifier of the Tenant in Paycor\\\'s system.

##### ItemId: `string`<a id="itemid-string"></a>

Unique Identifier of the Resource change for the Event that is triggered by Paycor.             

##### LegalEntityId: `number`<a id="legalentityid-number"></a>

Unique Identifier of the Legal Entity in Paycor\\\'s system.             

#### 🔄 Return<a id="🔄-return"></a>

[Event](./models/event.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/events/mockevent` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.generalLedger.getByLegalEntityId`<a id="paycorgeneralledgergetbylegalentityid"></a>

* Type of report can be Regular or Setup
    * Setup report returns only department number, company department number, account name, account number, itemize, and sort sequence all other values are set to null.
    * Regular report returns all data. 
* Planner id is required if report type is set to regular

Data Access: View General Ledger

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByLegalEntityIdResponse =
  await paycor.generalLedger.getByLegalEntityId({
    legalEntityId: 1,
    reportType: "Unknown",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the legal entity for which you want to get the general ledger items

##### plannerId: `string`<a id="plannerid-string"></a>

ID of planner, required if report type is regular

##### reportType: [`GeneralLedgerReportType`](./models/general-ledger-report-type.ts)<a id="reporttype-generalledgerreporttypemodelsgeneral-ledger-report-typets"></a>

Type of General Ledger, Regular or Setup 

##### include: [`Includes17`](./models/includes17.ts)[]<a id="include-includes17modelsincludes17ts"></a>

Options to include more data: EmployeeData

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get next set of General Ledger records

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfGeneralLedger](./models/paged-result-of-general-ledger.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/generalledger/legalentities/{legalEntityId}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.generalLedgerJobCosting.getByLegalEntityId`<a id="paycorgeneralledgerjobcostinggetbylegalentityid"></a>

Data Access: View General Ledger Job Costing

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByLegalEntityIdResponse =
  await paycor.generalLedgerJobCosting.getByLegalEntityId({
    legalEntityId: 1,
    plannerId: "plannerId_example",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the legal entity for which you want to get the job costing items.

##### plannerId: `string`<a id="plannerid-string"></a>

ID of planner.

##### include: [`Includes18`](./models/includes18.ts)[]<a id="include-includes18modelsincludes18ts"></a>

Options to include more data: EmployeeData

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get next set of Job Costing records.

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfJobCosting](./models/paged-result-of-job-costing.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/generalledger/jobcosting/legalentities/{legalEntityId}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.jobTitles.listByTenantId`<a id="paycorjobtitleslistbytenantid"></a>

Job Titles are configured at a Tenant level, unlike most other objects which are configured at a Legal Entity level.

Data Access: View Tenant Job Titles

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const listByTenantIdResponse = await paycor.jobTitles.listByTenantId({
  tenantId: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### tenantId: `number`<a id="tenantid-number"></a>

ID of the Tenant you want to get Job Titles.

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of Job Titles

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfTenantJobTitle](./models/paged-result-of-tenant-job-title.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/tenants/{tenantId}/jobtitles` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.laborCategories.byLegalEntityIdGet`<a id="paycorlaborcategoriesbylegalentityidget"></a>

To make this call you will need the Job Costing or Workforce Management Service.

Data Access: View Labor Categories by Legal Entity Id

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const byLegalEntityIdGetResponse =
  await paycor.laborCategories.byLegalEntityIdGet({
    legalEntityId: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity for which you want to get labor categories (also known as job categories)

##### continuationToken: `string`<a id="continuationtoken-string"></a>

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfLaborCategories](./models/paged-result-of-labor-categories.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/laborcategories` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.laborCodes.addLaborCodeToLegalEntity`<a id="paycorlaborcodesaddlaborcodetolegalentity"></a>

This immediately creates a new labor code related to a Legal Entity in Paycor's system. There is no way to undo or reverse this operation.
* Required body attributes:
    * LaborCategoryId
    * Code
    * LaborCodeName

    
To make this call you will need the Job Costing or Workforce Management Service.

Data Access: Create and Update Labor Codes

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const addLaborCodeToLegalEntityResponse =
  await paycor.laborCodes.addLaborCodeToLegalEntity({
    legalEntityId: 1,
    LaborCategoryId: "12e0e1c9-e8dc-ec11-912c-0050569f27b8",
    LaborCodeName: "IT",
    Description: "labor code effective until New year",
    Code: "code 1",
    EffectiveStartDate: "2020-05-26",
    EffectiveEndDate: "2020-11-25",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### LaborCategoryId: `string`<a id="laborcategoryid-string"></a>

Id of the Labor Category 

##### LaborCodeName: `string`<a id="laborcodename-string"></a>

Unique name of labor code in the labor category

##### Code: `string`<a id="code-string"></a>

textual code of labor code

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity for which you want to create Labor Code

##### Description: `string`<a id="description-string"></a>

Description of labor code

##### EffectiveStartDate: `string`<a id="effectivestartdate-string"></a>

Effective start date of labor code

##### EffectiveEndDate: `string`<a id="effectiveenddate-string"></a>

Effective end date of labor code

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/laborcodes` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.laborCodes.listByLegalEntityId`<a id="paycorlaborcodeslistbylegalentityid"></a>

Returns list of all Labor Code items. 
* Labor code is not active if effective start date is after current date or if effective end date is before current date.

To make this call you will need the Job Costing or Workforce Management Service.

Data Access: View Labor Codes by Legal Entity Id

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const listByLegalEntityIdResponse = await paycor.laborCodes.listByLegalEntityId(
  {
    legalEntityId: 1,
  }
);
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity for which you want to get labor codes (also known as job codes)

##### continuationToken: `string`<a id="continuationtoken-string"></a>

#### 🔄 Return<a id="🔄-return"></a>

[LaborCode4](./models/labor-code4.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/laborcodes` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.laborCodes.updateSpecifiedLaborCode`<a id="paycorlaborcodesupdatespecifiedlaborcode"></a>

This operation updates specified labor code in Paycor's system.

To make this call you will need the Job Costing or Workforce Management Service.

LaborCodeId is required.

Data Access: Create and Update Labor Codes

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateSpecifiedLaborCodeResponse =
  await paycor.laborCodes.updateSpecifiedLaborCode({
    legalEntityId: 1,
    LaborCodeId: "12e0e1c9-e8dc-ec11-912c-0050569f27b8",
    LaborCodeName: "IT",
    Description: "labor code effective until New year",
    Code: "code 1",
    EffectiveStartDate: "2020-05-26",
    EffectiveEndDate: "2020-11-25",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### LaborCodeId: `string`<a id="laborcodeid-string"></a>

Id of the Labor Code 

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity for which you want to update Labor Code

##### LaborCodeName: `string`<a id="laborcodename-string"></a>

Unique name of labor code in the labor category

##### Description: `string`<a id="description-string"></a>

Description of labor code

##### Code: `string`<a id="code-string"></a>

textual code of labor code

##### EffectiveStartDate: `string`<a id="effectivestartdate-string"></a>

Effective start date of labor code

##### EffectiveEndDate: `string`<a id="effectiveenddate-string"></a>

Effective end date of labor code

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/laborcodes` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntities.getById`<a id="paycorlegalentitiesgetbyid"></a>



#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByIdResponse = await paycor.legalEntities.getById({
  legalEntityId: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

##### include: [`Includes19`](./models/includes19.ts)[]<a id="include-includes19modelsincludes19ts"></a>

#### 🔄 Return<a id="🔄-return"></a>

[LegalEntity](./models/legal-entity.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntities.getTenantList`<a id="paycorlegalentitiesgettenantlist"></a>

Get Legal Entities/Tenants for the user logged in

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getTenantListResponse = await paycor.legalEntities.getTenantList();
```

#### 🔄 Return<a id="🔄-return"></a>

[UserInfo](./models/user-info.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/ActivatedLegalEntityTenantList` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityActivityTypes.getByLegalEntityId`<a id="paycorlegalentityactivitytypesgetbylegalentityid"></a>

Get Legal Entity Activity Types by Legal Entity ID

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByLegalEntityIdResponse =
  await paycor.legalEntityActivityTypes.getByLegalEntityId({
    legalEntityId: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

Legal Entity Id for whom you want to get the Activity Types

##### continuationToken: `string`<a id="continuationtoken-string"></a>

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfActivityType](./models/paged-result-of-activity-type.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/activitytypes` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityCertifications.list`<a id="paycorlegalentitycertificationslist"></a>

Tip: you can retrieve a list of certiifcates via endpoints like 'Get Certificates by Legal Entity ID'

Data Access: View Certification Information for Legal Entity

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const listResponse = await paycor.legalEntityCertifications.list({
  legalEntityId: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

##### continuationToken: `string`<a id="continuationtoken-string"></a>

#### 🔄 Return<a id="🔄-return"></a>

[TenantCertification](./models/tenant-certification.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/certifications` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityCertifications.listCertificationOrganizations`<a id="paycorlegalentitycertificationslistcertificationorganizations"></a>

Data Access: View Certification Organizations for Legal Entity

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const listCertificationOrganizationsResponse =
  await paycor.legalEntityCertifications.listCertificationOrganizations({
    legalEntityId: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity for which you want to get the certification organizations

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of certification organizations

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfTenantCertificationOrganization](./models/paged-result-of-tenant-certification-organization.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/certificationOrganizations` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityDeductions.viewEmployeesData`<a id="paycorlegalentitydeductionsviewemployeesdata"></a>

Data Access: View Legal Entity Employees

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const viewEmployeesDataResponse =
  await paycor.legalEntityDeductions.viewEmployeesData({
    legalEntityId: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity for which you want to get the deductions

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of Legal Entity Deductions

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfLegalEntityDeduction](./models/paged-result-of-legal-entity-deduction.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/deductions` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityDepartments.createNewDepartment`<a id="paycorlegalentitydepartmentscreatenewdepartment"></a>

Creates new Department for a Legal Entity.
* the newly created Department will take at least 60 seconds to propagate through the system

Data Access: Create and Update Legal Entity Departments

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const createNewDepartmentResponse =
  await paycor.legalEntityDepartments.createNewDepartment({
    legalEntityId: 1,
    Code: "123",
    ParentId: "cb4a1b67-000c-0000-0000-000066000456",
    Description: "Department 123",
    WorkLocationId: "cb4a1b67-000c-0000-0000-000066000212",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### Code: `string`<a id="code-string"></a>

User defined department code. Only numeric characters are allowed and the limit is 14 characters.

##### ParentId: `string`<a id="parentid-string"></a>

Id of the parent department (or payroll) under which new department will be created. When creating top level departments, payroll id should be used as parent id

##### Description: `string`<a id="description-string"></a>

User defined description of the department.

##### WorkLocationId: `string`<a id="worklocationid-string"></a>

The ID of the Work Location to associate with new department.  * Must be an existing Work Location on the Legal Entity. Use API \\\'Get a list of Work Locations for a Legal Entity\\\' to retrieve a list of valid IDs.              

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity for which you want to create the Departments

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/departments` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityDepartments.getById`<a id="paycorlegalentitydepartmentsgetbyid"></a>

Data Access: View Legal Entity Departments by Department Id

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByIdResponse = await paycor.legalEntityDepartments.getById({
  legalEntityId: 1,
  departmentId: "departmentId_example",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity for which you want to get the Departments

##### departmentId: `string`<a id="departmentid-string"></a>

ID of the Department

#### 🔄 Return<a id="🔄-return"></a>

[Department](./models/department.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/departments/{departmentId}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityDepartments.listByLegalEntityId`<a id="paycorlegalentitydepartmentslistbylegalentityid"></a>

Data Access: View Legal Entity Departments Information

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const listByLegalEntityIdResponse =
  await paycor.legalEntityDepartments.listByLegalEntityId({
    legalEntityId: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity for which you want to get the Departments

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of Legal Entity Departments

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfDepartment](./models/paged-result-of-department.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/departments` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityDepartments.updateByLegalEntityId`<a id="paycorlegalentitydepartmentsupdatebylegalentityid"></a>

Updates existing Department for a Legal Entity.
* The update of the Department will take at least 60 seconds to propagate through the system
* When updating top level departments, payroll id should be used as parent id

Data Access: Create and Update Legal Entity Departments

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateByLegalEntityIdResponse =
  await paycor.legalEntityDepartments.updateByLegalEntityId({
    legalEntityId: 1,
    DepartmentId: "89b88074-4b20-0000-0000-000014e00146",
    Code: "123",
    ParentId: "cb4a1b67-000c-0000-0000-000066000456",
    Description: "Department 123",
    WorkLocationId: "cb4a1b67-000c-0000-0000-000066000212",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### DepartmentId: `string`<a id="departmentid-string"></a>

Unique Identifier of the Department in Paycor\\\'s system.             

##### Code: `string`<a id="code-string"></a>

User defined department code. Only numeric characters are allowed and the limit is 14 characters.

##### ParentId: `string`<a id="parentid-string"></a>

Id of the parent department (or payroll) under which new department will be created. When updating top level departments, payroll id should be used as parent id

##### Description: `string`<a id="description-string"></a>

User defined description of the department.

##### WorkLocationId: `string`<a id="worklocationid-string"></a>

The ID of the Work Location to associate with new department.  * Must be an existing Work Location on the Legal Entity. Use API \\\'Get a list of Work Locations for a Legal Entity\\\' to retrieve a list of valid IDs.              

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity for which you want to update the Department

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfDepartment](./models/paged-result-of-department.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/departments` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityEarnings.getByLegalEntityId`<a id="paycorlegalentityearningsgetbylegalentityid"></a>



#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByLegalEntityIdResponse =
  await paycor.legalEntityEarnings.getByLegalEntityId({
    legalEntityId: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

##### continuationToken: `string`<a id="continuationtoken-string"></a>

#### 🔄 Return<a id="🔄-return"></a>

[LegalEntityEarning](./models/legal-entity-earning.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/earnings` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityJobTitles.listByLegalEntityId`<a id="paycorlegalentityjobtitleslistbylegalentityid"></a>

Job Titles are configured at a Tenant level, unlike most other objects which are configured at a Legal Entity level.

Data Access: View Legal Entity Job Titles

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const listByLegalEntityIdResponse =
  await paycor.legalEntityJobTitles.listByLegalEntityId({
    legalEntityId: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity you want to get Job Titles.

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of Job Titles

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfTenantJobTitle](./models/paged-result-of-tenant-job-title.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/jobtitles` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityPayData.getPayDates`<a id="paycorlegalentitypaydatagetpaydates"></a>

This endpoint returns the dates that particular employees were actually paid.
* You can retrieve all employees by not passing EmployeeId, or you can pass EmployeeId to filter.
* The returned values (Check Date or Process Date) can be used as an input for GET Employee Pay Stubs.
* Only dates from provided fromCheckDate and toCheckDate are used.
* Requires exactly one filtering parameter to be passed in. Choose *one* of these three:
  * Check Date range: parameters fromCheckDate and toCheckDate
  * Process Date: the single date the payrun was processed.
  * PlannerID: You can retrieve your Planner ID by using the Legal Entity Payroll Processing Data endpoint.
* Returns one object per pay date, even if there were multiple paychecks on that same date.
* Does include Additional Payruns, which don't have to follow the schedule and can be used for bonuses.

Data Access: View Paydata Information

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getPayDatesResponse = await paycor.legalEntityPayData.getPayDates({
  legalEntityId: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity for which you want to get the Pay Data

##### employeeId: `string`<a id="employeeid-string"></a>

ID of an Employee, if you want to filter to paydata from a specific Employee

##### fromCheckDate: `string`<a id="fromcheckdate-string"></a>

Filter Option 1: Date Range, From Check Date of Payrun

##### toCheckDate: `string`<a id="tocheckdate-string"></a>

Filter Option 1: Date Range, To Check Date of Payrun

##### processDate: `string`<a id="processdate-string"></a>

Filter Option 2: Process Date of Payrun

##### plannerId: `string`<a id="plannerid-string"></a>

Filter Option 3: ID of the Planner for which you want to get the Pay Data.

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of Legal Entity Pay Data

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfLegalEntityPayData](./models/paged-result-of-legal-entity-pay-data.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/paydata` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityPayGroups.listByLegalEntityId`<a id="paycorlegalentitypaygroupslistbylegalentityid"></a>

Data Access: View Legal Entity Pay Groups

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const listByLegalEntityIdResponse =
  await paycor.legalEntityPayGroups.listByLegalEntityId({
    legalEntityId: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity for which you want to get the Pay Groups

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of Legal Entity Pay Groups

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfPayGroup](./models/paged-result-of-pay-group.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/payGroups` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityPaySchedule.getByLegalEntityAndPaygroup`<a id="paycorlegalentitypayschedulegetbylegalentityandpaygroup"></a>

This returns the schedule of regularly-scheduled payruns for a given Paygroup and date range. 
* Tip: first list the Paygroups within a Legal Entity using GET Legal Entity Pay Groups, in order to populate the payGroupId parameter
* Tip: You can take the returned Check Dates or Process Dates and pass into Get Employee Pay Stubs by EmployeeID

Note that query parameters PayGroupId, AsOfDate and UntilDate are required.

Data Access: View Pay Schedule Information

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByLegalEntityAndPaygroupResponse =
  await paycor.legalEntityPaySchedule.getByLegalEntityAndPaygroup({
    legalEntityId: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity for which you want to get the Pay Schedule

##### payGroupId: `string`<a id="paygroupid-string"></a>

ID of the Paygroup for whom you want to get the Pay Schedule. Available via \'GET Legal Entity Pay Groups\'

##### asOfDate: `string`<a id="asofdate-string"></a>

Acts as a \'start date\' filter - looks for Payruns that are in-progress or unpaid as of this date

##### untilDate: `string`<a id="untildate-string"></a>

Acts as an \'end date\' filter - looks for Payruns that are in-progress or unpaid until this date

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of Legal Entity Pay Schedule

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfPayPeriod](./models/paged-result-of-pay-period.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/payschedule` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityPayrollProcessingData.getByLegalEntity`<a id="paycorlegalentitypayrollprocessingdatagetbylegalentity"></a>

* If fromCheckDate is not provided, current date will be used.

Data Access: View Legal Entity Payroll Processing Data

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByLegalEntityResponse =
  await paycor.legalEntityPayrollProcessingData.getByLegalEntity({
    legalEntityId: 1,
    fromCheckDate: "1970-01-01T00:00:00.00Z",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity for which you want to get the Pay Groups

##### fromCheckDate: `string`<a id="fromcheckdate-string"></a>

Date range filter, From Check Date 

##### toCheckDate: `string`<a id="tocheckdate-string"></a>

Date range filter, To Check Date

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of Legal Entity Payroll Processing Data

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfPayPeriod2](./models/paged-result-of-pay-period2.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/payrollProcessing` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityScheduleGroups.getByLegalEntityId`<a id="paycorlegalentityschedulegroupsgetbylegalentityid"></a>

Data Access: View Legal Entity Schedule Groups

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByLegalEntityIdResponse =
  await paycor.legalEntityScheduleGroups.getByLegalEntityId({
    legalEntityId: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity you want to get Schedule Groups

##### continuationToken: `string`<a id="continuationtoken-string"></a>

A token to get next set of results

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfScheduleGroup](./models/paged-result-of-schedule-group.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/schedulegroups` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityServices.getSubscribedServices`<a id="paycorlegalentityservicesgetsubscribedservices"></a>

Data Access: View Legal Entity Services

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getSubscribedServicesResponse =
  await paycor.legalEntityServices.getSubscribedServices({
    legalEntityId: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity you want to get (synonymous to Paycor\'s ClientID)

#### 🔄 Return<a id="🔄-return"></a>

[Services](./models/services.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/services` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityStatusReason.getList`<a id="paycorlegalentitystatusreasongetlist"></a>

Data Access: Legal Entity Status Reason

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getListResponse = await paycor.legalEntityStatusReason.getList({
  legalEntityId: 1,
  statusCategory: "TerminationReason",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the legal entity for which you want to get the status reasons items

##### statusCategory: [`StatusCategory2`](./models/status-category2.ts)<a id="statuscategory-statuscategory2modelsstatus-category2ts"></a>

Status category of status reasons.

#### 🔄 Return<a id="🔄-return"></a>

[StatusReason](./models/status-reason.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/statusReasons/{statusCategory}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityTimeData.getTimeOffRequestErrorLogsByTrackingId`<a id="paycorlegalentitytimedatagettimeoffrequesterrorlogsbytrackingid"></a>

Data Access: View Timeoff Requests by Timeoff Request Id

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getTimeOffRequestErrorLogsByTrackingIdResponse =
  await paycor.legalEntityTimeData.getTimeOffRequestErrorLogsByTrackingId({
    legalEntityId: 1,
    trackingId: "trackingId_example",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity for which you want to get the Timeoff Request.

##### trackingId: `string`<a id="trackingid-string"></a>

ID of the Employee Timeoff Request failure result.

#### 🔄 Return<a id="🔄-return"></a>

[TimeOffRequestsErrorLog](./models/time-off-requests-error-log.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/timeoffRequestserrorlog/{trackingId}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityTimeOffTypes.viewTimeOffTypes`<a id="paycorlegalentitytimeofftypesviewtimeofftypes"></a>

Data Access: View Time Off Types

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const viewTimeOffTypesResponse =
  await paycor.legalEntityTimeOffTypes.viewTimeOffTypes({
    legalEntityId: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of an Legal Entity for which you want to get the Time Off Types

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of results

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfTimeOffType](./models/paged-result-of-time-off-type.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/timeofftypes` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityWorkLocations.addByLegalEntityId`<a id="paycorlegalentityworklocationsaddbylegalentityid"></a>

Data Access: Create Legal Entity Work Location

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const addByLegalEntityIdResponse =
  await paycor.legalEntityWorkLocations.addByLegalEntityId({
    legalEntityId: 1,
    Name: "Temp WL.",
    StoreId: "18",
    IsFmlaEligible: true,
    Addresses: [
      {
        Type: "Physical",
        StreetLine1: "5555 Test Road",
        StreetLine2: "Building 1",
        State: "OH",
        City: "Cincinnati",
        Country: "USA",
        ZipCode: "55555",
      },
    ],
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### Name: `string`<a id="name-string"></a>

Name of the work location.

##### Addresses: [`WorkLocationAddress`](./models/work-location-address.ts)[]<a id="addresses-worklocationaddressmodelswork-location-addressts"></a>

A list of work location\\\'s addresses.

##### legalEntityId: `number`<a id="legalentityid-number"></a>

##### StoreId: `string`<a id="storeid-string"></a>

Unique identifier of the work location store. StoreId is used for clients with WOTC Service only, defaults to Worklocation name if not provided.

##### IsFmlaEligible: `boolean`<a id="isfmlaeligible-boolean"></a>

Flag which determines if work location is FMLA eligible (Family and Medical Leave Act).

##### PhoneNumbers: [`WorkLocationPhoneNumber`](./models/work-location-phone-number.ts)[]<a id="phonenumbers-worklocationphonenumbermodelswork-location-phone-numberts"></a>

A list of the work location\\\'s phone numbers.             

##### addressData: `boolean`<a id="addressdata-boolean"></a>

Use Physical Address as mailing address?

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/worklocations` `POST`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityWorkLocations.deleteByLegalEntityAndWorkLocationId`<a id="paycorlegalentityworklocationsdeletebylegalentityandworklocationid"></a>

Data Access: Delete Legal Entity Work Location

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const deleteByLegalEntityAndWorkLocationIdResponse =
  await paycor.legalEntityWorkLocations.deleteByLegalEntityAndWorkLocationId({
    legalEntityId: 1,
    workLocationId: "workLocationId_example",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity for which you want to delete Work Location

##### workLocationId: `string`<a id="worklocationid-string"></a>

ID of the Work Location

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/worklocations/{workLocationId}` `DELETE`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityWorkLocations.getByLegalEntityAndLocation`<a id="paycorlegalentityworklocationsgetbylegalentityandlocation"></a>

Data Access: View Legal Entity Work Location

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByLegalEntityAndLocationResponse =
  await paycor.legalEntityWorkLocations.getByLegalEntityAndLocation({
    legalEntityId: 1,
    workLocationId: "workLocationId_example",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity for which you want to get the work location

##### workLocationId: `string`<a id="worklocationid-string"></a>

ID of the Work Location

#### 🔄 Return<a id="🔄-return"></a>

[LegalEntityWorkLocation](./models/legal-entity-work-location.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/worklocations/{workLocationId}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityWorkLocations.list`<a id="paycorlegalentityworklocationslist"></a>

Data Access: View Legal Entity Work Locations

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const listResponse = await paycor.legalEntityWorkLocations.list({
  legalEntityId: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity for which you want to get the work locations

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of work locations

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfLegalEntityWorkLocation](./models/paged-result-of-legal-entity-work-location.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/worklocations` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityWorkLocations.updateByLegalEntityId`<a id="paycorlegalentityworklocationsupdatebylegalentityid"></a>

Data Access: Update Legal Entity Work Location

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const updateByLegalEntityIdResponse =
  await paycor.legalEntityWorkLocations.updateByLegalEntityId({
    legalEntityId: 1,
    Id: "164f5405-d32c-4612-8a11-20491516e557",
    TimeZone: "12",
    IsFmlaEligible: false,
    IsDefault: false,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### Id: `string`<a id="id-string"></a>

Unique identifier of the work location in Paycor\\\'s system. Generated by Paycor.

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity for which you want to get the work locations

##### Addresses: [`WorkLocationAddressUpdate`](./models/work-location-address-update.ts)[]<a id="addresses-worklocationaddressupdatemodelswork-location-address-updatets"></a>

A list of work location\\\'s addresses.

##### PhoneNumbers: [`WorkLocationPhoneNumber`](./models/work-location-phone-number.ts)[]<a id="phonenumbers-worklocationphonenumbermodelswork-location-phone-numberts"></a>

A list of the work location\\\'s phone numbers.             

##### TimeZone: `string`<a id="timezone-string"></a>

Time zone.             

##### IsFmlaEligible: `boolean`<a id="isfmlaeligible-boolean"></a>

Is FmlaEligible.             

##### IsDefault: `boolean`<a id="isdefault-boolean"></a>

Is default             

#### 🔄 Return<a id="🔄-return"></a>

[CreateOrUpdateResponse](./models/create-or-update-response.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/worklocations` `PUT`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.legalEntityWorkSites.getByLegalEntityId`<a id="paycorlegalentityworksitesgetbylegalentityid"></a>

Data Access: View Legal Entity Work Sites

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByLegalEntityIdResponse =
  await paycor.legalEntityWorkSites.getByLegalEntityId({
    legalEntityId: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity you want to get Work Sites

##### continuationToken: `string`<a id="continuationtoken-string"></a>

A token to get next set of results

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfWorkSite](./models/paged-result-of-work-site.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/worksites` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.persons.getByEmployeeIdPerson`<a id="paycorpersonsgetbyemployeeidperson"></a>

Data Access: View Employee Person

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByEmployeeIdPersonResponse =
  await paycor.persons.getByEmployeeIdPerson({
    employeeId: "employeeId_example",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

EmployeeID linked to the Person you want to get

##### include: [`Includes21`](./models/includes21.ts)[]<a id="include-includes21modelsincludes21ts"></a>

Options to include more data: All, Demographic, Benefit, Military, SocialMedia, Addresses, EmployeeAssignments, EmergencyContact, SocialSecurityNumber, Phones

#### 🔄 Return<a id="🔄-return"></a>

[Person](./models/person.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/person` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.persons.getByTenantAndPerson`<a id="paycorpersonsgetbytenantandperson"></a>

Note that PersonID and TenantID must always be passed together.

Data Access: View Person Information

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByTenantAndPersonResponse = await paycor.persons.getByTenantAndPerson({
  tenantId: 1,
  personId: "personId_example",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### tenantId: `number`<a id="tenantid-number"></a>

ID of the Tenant that the Person is in

##### personId: `string`<a id="personid-string"></a>

ID of the Person you want to get

##### include: [`Includes20`](./models/includes20.ts)[]<a id="include-includes20modelsincludes20ts"></a>

Options to include more data:  All, Demographic, Benefit, Military, SocialMedia, Addresses, EmployeeAssignments, EmergencyContact, SocialSecurityNumber, Phones  Demographic = View Person Demographic Information  Benefit = View Person Disability and Tobacco Status  Military = View Person Military  SocialMedia = View Person Social Media  Addresses = View Person Addresses  EmployeeAssignments = View Employee Records  EmergencyContact = View Person Emergency Contacts  SocialSecurityNumber = View Person SSN  Phones = View Person Phone

#### 🔄 Return<a id="🔄-return"></a>

[Person](./models/person.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/tenants/{tenantId}/persons/{personId}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.persons.listByLegalEntityId`<a id="paycorpersonslistbylegalentityid"></a>

Data Access: View Legal Entity Persons

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const listByLegalEntityIdResponse = await paycor.persons.listByLegalEntityId({
  legalEntityId: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity for which you want to get the persons

##### include: [`IncludesList`](./models/includes-list.ts)[]<a id="include-includeslistmodelsincludes-listts"></a>

Options to include more data: All, Demographic, Benefit, Military, SocialMedia, Addresses, EmployeeAssignments, SocialSecurityNumber, Phones  Data Access required  Demographic = View Person Demographic Information  Benefit = View Person Disability and Tobacco Status  Military = View Person Military  SocialMedia = View Person Social Media  Addresses = View Person Addresses  EmployeeAssignments = View Employee Records

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of persons

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfPerson](./models/paged-result-of-person.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalEntities/{legalEntityId}/persons` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.persons.listByTenantId`<a id="paycorpersonslistbytenantid"></a>

PersonList provides a subset of the full Person fields.

Data Access: View Tenant Persons

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const listByTenantIdResponse = await paycor.persons.listByTenantId({
  tenantId: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### tenantId: `number`<a id="tenantid-number"></a>

ID of the Tenant for which you want to get persons

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of persons

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfPersonList](./models/paged-result-of-person-list.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/tenants/{tenantId}/persons` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.tenants.getById`<a id="paycortenantsgetbyid"></a>

Data Access: View Tenant Information

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getByIdResponse = await paycor.tenants.getById({
  tenantId: 1,
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### tenantId: `number`<a id="tenantid-number"></a>

ID of the Tenant you want to get

#### 🔄 Return<a id="🔄-return"></a>

[Tenant](./models/tenant.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/tenants/{tenantId}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.tenants.getWorkLocationsByTenantId`<a id="paycortenantsgetworklocationsbytenantid"></a>

Work Locations are configured at a Tenant level, unlike most other objects which are configured at a Legal Entity level. 

Data Access: View Tenant Work Locations

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getWorkLocationsByTenantIdResponse =
  await paycor.tenants.getWorkLocationsByTenantId({
    tenantId: 1,
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### tenantId: `number`<a id="tenantid-number"></a>

ID of the Tenant you want to get work locations.

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of work locations

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfTenantWorkLocation](./models/paged-result-of-tenant-work-location.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/tenants/{tenantId}/worklocations` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.timeOffRequests.getTimeoffRequestById`<a id="paycortimeoffrequestsgettimeoffrequestbyid"></a>

Data Access: View Timeoff Requests by Timeoff Request Id

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const getTimeoffRequestByIdResponse =
  await paycor.timeOffRequests.getTimeoffRequestById({
    legalEntityId: 1,
    timeoffRequestId: "timeoffRequestId_example",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity for which you want to get the Timeoff Request.

##### timeoffRequestId: `string`<a id="timeoffrequestid-string"></a>

ID of the Employee Timeoff Request.

#### 🔄 Return<a id="🔄-return"></a>

[EmployeeTimeOffRequest](./models/employee-time-off-request.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/timeoffRequests/{timeoffRequestId}` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.timeOffRequests.listByEmployeeId`<a id="paycortimeoffrequestslistbyemployeeid"></a>

Date requirements:
* Start Date and End Date must not be more than one year ago
* Start date and end date range can be no greater than 90 days

Data Access: View Timeoff Requests by Employee Id

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const listByEmployeeIdResponse = await paycor.timeOffRequests.listByEmployeeId({
  employeeId: "employeeId_example",
  startDate: "1970-01-01T00:00:00.00Z",
  endDate: "1970-01-01T00:00:00.00Z",
});
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### employeeId: `string`<a id="employeeid-string"></a>

ID of the Employee for which you want to get the Time Off Requests.

##### startDate: `string`<a id="startdate-string"></a>

Date range filter, showing which records to return.

##### endDate: `string`<a id="enddate-string"></a>

Date range filter, showing which records to return.

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of results.

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfEmployeeTimeOffRequest](./models/paged-result-of-employee-time-off-request.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/employees/{employeeId}/timeoffrequests` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


### `paycor.timeOffRequests.listByLegalEntityId`<a id="paycortimeoffrequestslistbylegalentityid"></a>

Date requirements:
* Start Date and End Date must not be more than one year ago
* Start date and end date range can be no greater than 90 days

Data Access: View Timeoff Requests by Legal Entity Id

#### 🛠️ Usage<a id="🛠️-usage"></a>

```typescript
const listByLegalEntityIdResponse =
  await paycor.timeOffRequests.listByLegalEntityId({
    legalEntityId: 1,
    startDate: "1970-01-01T00:00:00.00Z",
    endDate: "1970-01-01T00:00:00.00Z",
  });
```

#### ⚙️ Parameters<a id="⚙️-parameters"></a>

##### legalEntityId: `number`<a id="legalentityid-number"></a>

ID of the Legal Entity for which you want to get the Time Off Requests.

##### startDate: `string`<a id="startdate-string"></a>

Date range filter, showing which records to return.

##### endDate: `string`<a id="enddate-string"></a>

Date range filter, showing which records to return.

##### continuationToken: `string`<a id="continuationtoken-string"></a>

Token to get the next set of results.

#### 🔄 Return<a id="🔄-return"></a>

[PagedResultOfEmployeeTimeOffRequest](./models/paged-result-of-employee-time-off-request.ts)

#### 🌐 Endpoint<a id="🌐-endpoint"></a>

`/v1/legalentities/{legalEntityId}/timeoffrequests` `GET`

[🔙 **Back to Table of Contents**](#table-of-contents)

---


## Author<a id="author"></a>
This TypeScript package is automatically generated by [Konfig](https://konfigthis.com)
