import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values: string[] | number[]): this;
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url: string, variables?: {}): void;
    /**
     * Retrieve a specific customer using a unique customer reference. This identifier can be
     * found in the response obtained after creating a new customer, it starts by C, e.g:
     * C0000000
     *
     * @summary Retrieve a specific customer using a unique customer reference
     * @throws FetchError<400, types.GetCustomerResponse400> Bad Request
     */
    getCustomer(metadata: types.GetCustomerMetadataParam): Promise<FetchResponse<200, types.GetCustomerResponse200>>;
    /**
     *   Currently editable fields:
     *   <ol>
     *     <li>For all customer types: <b>externalReference</b> can be edited</li>
     *     <li>For all customers not requiring manual or in-house KYC verification:
     * <b>industryCode</b>, <b>registeredAddress</b>, <b>tcsVersions</b> and <b>regNumber</b>
     * can additionally be edited. Of those:
     *       <ul>
     *         <li>For all other customer types: <b>name</b> and <b>tradingAddress</b> can
     * additionally be edited</li>
     *         <li>For all types other than PCM_BUSINESS: the <b>associate</b> can additionally
     * be edited</li>
     *       </ul>
     *     </li>
     *     <li> For <b>vulnerabilityReason</b> you must supply a list and to delete a list you
     * must supply an empty list in request, not supplying a list will result in no change</li>
     *   </ol>
     *
     *
     * @summary Edit a specific customer using a unique customer reference
     * @throws FetchError<400, types.EditCustomerResponse400> Bad Request
     */
    editCustomer(body: types.EditCustomerBodyParam, metadata: types.EditCustomerMetadataParam): Promise<FetchResponse<200, types.EditCustomerResponse200>>;
    /**
     * Retrieve details of a particular account using its ID as a reference
     *
     * @summary Get an account
     * @throws FetchError<400, types.GetAccountResponse400> Bad Request
     */
    getAccount(metadata: types.GetAccountMetadataParam): Promise<FetchResponse<200, types.GetAccountResponse200>>;
    /**
     * Edit details of a particular account using its ID as a reference
     * Currently editable fields:
     *   1. for accounts of all customer types, externalReference can be edited
     *   2. for accounts of PCM_INDIVIDUAL & PCM_BUSINESS customer types, name can additionally
     * be edited
     *
     * @summary Edit an account
     * @throws FetchError<400, types.EditAccountResponse400> Validation errors
     */
    editAccount(body: types.EditAccountBodyParam, metadata: types.EditAccountMetadataParam): Promise<FetchResponse<200, types.EditAccountResponse200>>;
    /**
     * Set the secured funding limit for an account
     *
     * @throws FetchError<400, types.UpdateSecuredFundingLimitResponse400> Validation errors
     */
    updateSecuredFundingLimit(body: types.UpdateSecuredFundingLimitBodyParam, metadata: types.UpdateSecuredFundingLimitMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * The ability to update an access group's name and add or remove an account
     *
     * @summary Update access group
     * @throws FetchError<400, types.UpdateAccessGroupResponse400> Validation errors
     */
    updateAccessGroup(body: types.UpdateAccessGroupBodyParam, metadata: types.UpdateAccessGroupMetadataParam): Promise<FetchResponse<200, types.UpdateAccessGroupResponse200>>;
    /**
     * The ability to create a new beneficiary for a customer, using their customer ID as a
     * reference.
     *
     * @summary Create a new beneficiary for a specified customer
     * @throws FetchError<400, types.CreateBeneficiaryResponse400> Validation errors
     */
    createBeneficiary(body: types.CreateBeneficiaryBodyParam, metadata: types.CreateBeneficiaryMetadataParam): Promise<FetchResponse<201, types.CreateBeneficiaryResponse201>>;
    /**
     * deleting beneficiaries for a customer, using their customer ID
     *
     * @summary Delete beneficiaries for a specified customer
     * @throws FetchError<400, types.DeleteBeneficiariesResponse400> Bad Request
     */
    deleteBeneficiaries(metadata: types.DeleteBeneficiariesMetadataParam): Promise<FetchResponse<200, types.DeleteBeneficiariesResponse200> | FetchResponse<207, types.DeleteBeneficiariesResponse207>>;
    /**
     * Get details of accounts belonging to a particular customer using the customer’s ID as a
     * reference
     *
     * @summary Get accounts by customer
     * @throws FetchError<400, types.GetAccountsByCustomerResponse400> Bad Request
     */
    getAccountsByCustomer(metadata: types.GetAccountsByCustomerMetadataParam): Promise<FetchResponse<200, types.GetAccountsByCustomerResponse200>>;
    /**
     * Creates an account for a particular customer using the customer’s ID as a reference
     *
     * @summary Create account by customer
     * @throws FetchError<400, types.CreateAccountResponse400> Validation errors
     */
    createAccount(body: types.CreateAccountBodyParam, metadata: types.CreateAccountMetadataParam): Promise<FetchResponse<201, types.CreateAccountResponse201>>;
    /**
     * Using a unique reference (account ID) you can unblock an account
     *
     * @summary Unblock a specific account
     * @throws FetchError<400, types.UnblockAccountResponse400> Validation errors
     */
    unblockAccount(metadata: types.UnblockAccountMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * When you no longer want or need an account you are able to close using the account ID as
     * a unique reference
     *
     * @summary Close an account
     * @throws FetchError<400, types.CloseAccountResponse400> Bad Request
     */
    closeAccount(metadata: types.CloseAccountMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Using a unique reference (account ID) you can block an account
     *
     * @summary Block a specific account
     * @throws FetchError<400, types.BlockAccountResponse400> Validation errors
     */
    blockAccount(metadata: types.BlockAccountMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * The ability to list all access groups for the customer
     *
     * @summary Get a list of access groups
     * @throws FetchError<400, types.GetAccessGroupsResponse400> Bad Request
     */
    getAccessGroups(metadata?: types.GetAccessGroupsMetadataParam): Promise<FetchResponse<200, types.GetAccessGroupsResponse200>>;
    /**
     * The ability to create a new access group
     *
     * @summary Create access group
     * @throws FetchError<400, types.CreateAccessGroupResponse400> Validation errors
     */
    createAccessGroup(body: types.CreateAccessGroupBodyParam): Promise<FetchResponse<201, types.CreateAccessGroupResponse201>>;
    /**
     * Either using unique references, such as customer ID, or filter parameters, such as
     * verification status, get details of any customers found.
     *
     * @summary Retrieve customers using filters
     * @throws FetchError<400, types.GetCustomersResponse400> Bad Request
     */
    getCustomers(metadata: types.GetCustomersMetadataParam): Promise<FetchResponse<200, types.GetCustomersResponse200>>;
    /**
     * This endpoint allows you to create a new customer. Creating a customer is a complex
     * process with several dependencies, e.g: Directors, type of customer, legal
     * specifications. For further information, please visit 'Creating a customer and account'
     * entry on our API documentation
     *
     * @summary Create a new customer
     * @throws FetchError<400, types.CreateCustomerResponse400> Validation errors
     */
    createCustomer(body: types.CreateCustomerBodyParam): Promise<FetchResponse<201, types.CreateCustomerResponse201>>;
    /**
     * The ability to get the details of beneficiaries using various pieces of information,
     * e.g. using customer ID, retrieve all beneficiaries created by that customer. Can get
     * details of one particular beneficiary based on the unique beneficiary reference number.
     *
     * @summary Retrieve beneficiaries
     * @throws FetchError<400, types.GetBeneficiariesResponse400> Bad Request
     */
    getBeneficiaries(metadata: types.GetBeneficiariesMetadataParam): Promise<FetchResponse<200, types.GetBeneficiariesResponse200>>;
    /**
     * Fetch references of the entities (payment, rule) that have caused the beneficiary to be
     * locked
     *
     * @summary Retrieve locked beneficiary entities
     * @throws FetchError<400, types.GetLocksResponse400> Bad Request
     */
    getLocks(metadata: types.GetLocksMetadataParam): Promise<FetchResponse<200, types.GetLocksResponse200>>;
    /**
     * Gives the ability to find accounts and get their details using filters
     *
     * @summary Get accounts using filter
     * @throws FetchError<400, types.GetAccountsResponse400> Bad Request
     */
    getAccounts(metadata: types.GetAccountsMetadataParam): Promise<FetchResponse<200, types.GetAccountsResponse200>>;
    /**
     * Retrieves the last 6 months of transactions (successful payments in & out) of an
     * account, specified by a unique account reference.
     *
     * @summary Get transactions for a specific Account
     * @throws FetchError<400, types.GetTransactionsByAccountResponse400> Bad Request
     */
    getTransactionsByAccount(metadata: types.GetTransactionsByAccountMetadataParam): Promise<FetchResponse<200, types.GetTransactionsByAccountResponse200>>;
    /**
     * The ability to retrieve an access group by ID
     *
     * @summary Get access group
     * @throws FetchError<400, types.GetAccessGroupResponse400> Bad Request
     */
    getAccessGroup(metadata: types.GetAccessGroupMetadataParam): Promise<FetchResponse<200, types.GetAccessGroupResponse200>>;
    /**
     * The ability to get the details of payments using various pieces of information, e.g.
     * using Account ID, retrieve all payments in that account. Can get details of one
     * particular payment based on the unique payment reference number.
     *
     * @summary Retrieve payments
     * @throws FetchError<400, types.GetPaymentsResponse400> Bad Request
     */
    getPayments(metadata?: types.GetPaymentsMetadataParam): Promise<FetchResponse<200, types.GetPaymentsResponse200>>;
    /**
     * Supports both Payments to external bank accounts via Faster Payments and transfers to
     * other Modulr accounts. Requests to Payments are asynchronous.
     *
     * @summary Create a payment
     * @throws FetchError<400, types.SendPaymentResponse400> Validation errors
     */
    sendPayment(body: types.SendPaymentBodyParam): Promise<FetchResponse<201, types.SendPaymentResponse201>>;
    /**
     * This endpoint allows for a user who has submitted multiple batch to use some criteria to
     * get the batch payments.
     *
     * @summary Get batch payments by a given set of parameters
     * @throws FetchError<400, types.GetBatchPaymentsResponse400> Validation errors
     */
    getBatchPayments(metadata?: types.GetBatchPaymentsMetadataParam): Promise<FetchResponse<200, types.GetBatchPaymentsResponse200>>;
    /**
     * As well as supporting individual payment requests, the Modulr payment platform can also
     * handle multiple payment objects in the same request. This endpoint allows you to make a
     * new batch payment.
     *
     * @summary Make a batch payment
     * @throws FetchError<400, types.SubmitBatchPaymentsResponse400> Validation errors
     */
    submitBatchPayments(body: types.SubmitBatchPaymentsBodyParam): Promise<FetchResponse<201, types.SubmitBatchPaymentsResponse201>>;
    /**
     * Cancels a batch payment request if it is not already processed
     *
     * @summary Cancel the batch payment
     * @throws FetchError<400, types.CancelBatchPaymentsResponse400> Validation errors
     */
    cancelBatchPayments(metadata: types.CancelBatchPaymentsMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * The ability to modify the details of a specific rule based on the rule's unique
     * reference.
     *
     * @summary Edit a specific Rule
     * @throws FetchError<400, types.ModifyRuleResponse400> Validation errors
     */
    modifyRule(body: types.ModifyRuleBodyParam, metadata: types.ModifyRuleMetadataParam): Promise<FetchResponse<200, types.ModifyRuleResponse200>>;
    /**
     * When you want a new rule on an account you can create one with this endpoint. Note that
     * Rules are linked to an Account and each Account can only have one instance of a Rule
     * type
     *
     * @summary Create a Rule
     * @throws FetchError<400, types.CreateRuleResponse400> Validation errors
     */
    createRule(body: types.CreateRuleBodyParam): Promise<FetchResponse<201, types.CreateRuleResponse201>>;
    /**
     * When you no longer want a rule on an account you can do it with this endpoint. You can
     * delete more than one rule in the same request.
     *
     * @summary Delete a Rule
     * @throws FetchError<400, types.RemoveRulesResponse400> Bad Request
     */
    removeRules(metadata: types.RemoveRulesMetadataParam): Promise<FetchResponse<200, types.RemoveRulesResponse200> | FetchResponse<207, types.RemoveRulesResponse207>>;
    /**
     * The ability to get the details of all rules associated with the specified account using
     * the Account ID as a reference. Can filter by a specific type using the type parameter.
     *
     * @summary Get all Rules for a specific Account
     * @throws FetchError<400, types.GetRulesResponse400> Bad Request
     */
    getRules(metadata: types.GetRulesMetadataParam): Promise<FetchResponse<200, types.GetRulesResponse200>>;
    /**
     * You need to know the unique reference of the account and the rule type you want to get
     * to information on.
     *
     * @summary Retrieve a Rule by rule type on a specific account
     * @throws FetchError<400, types.GetRuleResponse400> Bad Request
     */
    getRule(metadata: types.GetRuleMetadataParam): Promise<FetchResponse<200, types.GetRuleResponse200>>;
    /**
     * This allows you to see the settings for a particular notification that has been set up,
     * for example if you want to check if it is active or the emails the notification is being
     * sent to. It would be best practice to call this before updating a notification.
     *
     * @summary Retrieve a specific notification by unique reference for a specific partner
     * @throws FetchError<400, types.GetPartnerNotificationResponse400> Bad Request
     * @throws FetchError<404, types.GetPartnerNotificationResponse404> Not found
     */
    getPartnerNotification(metadata: types.GetPartnerNotificationMetadataParam): Promise<FetchResponse<200, types.GetPartnerNotificationResponse200>>;
    /**
     * If you need to change anything about a particular notification, for example add an email
     * address or make it inactive, then this is the endpoint to use. You need to put all of
     * the information into this request for the notification even if it isn't changing, so
     * either you will need to record this somewhere when you create the notification, or call
     * the 'GET' request first.
     *
     * @summary Update a specific notification by unique reference for a specific partner
     * @throws FetchError<400, types.EditPartnerNotificationResponse400> Bad Request
     * @throws FetchError<404, types.EditPartnerNotificationResponse404> Not found
     */
    editPartnerNotification(body: types.EditPartnerNotificationBodyParam, metadata: types.EditPartnerNotificationMetadataParam): Promise<FetchResponse<200, types.EditPartnerNotificationResponse200>>;
    /**
     * This allows you to see the settings for a particular notification that has been set up,
     * for example if you want to check if it is active or the emails the notification is being
     * sent to. It would be best practice to call this before updating a notification.
     *
     * @summary Retrieve a specific notification by unique reference for a specific customer
     * @throws FetchError<400, types.GetCustomerNotificationResponse400> Bad Request
     * @throws FetchError<404, types.GetCustomerNotificationResponse404> Not found
     */
    getCustomerNotification(metadata: types.GetCustomerNotificationMetadataParam): Promise<FetchResponse<200, types.GetCustomerNotificationResponse200>>;
    /**
     * If you need to change anything about a particular notification, for example add an email
     * address or make it inactive, then this is the endpoint to use. You need to put all of
     * the information into this request for the notification even if it isn't changing, so
     * either you will need to record this somewhere when you create the notification, or call
     * the 'GET' request first.
     *
     * @summary Update a specific notification by unique reference for a specific customer
     * @throws FetchError<400, types.EditCustomerNotificationResponse400> Bad Request
     * @throws FetchError<404, types.EditCustomerNotificationResponse404> Not found
     */
    editCustomerNotification(body: types.EditCustomerNotificationBodyParam, metadata: types.EditCustomerNotificationMetadataParam): Promise<FetchResponse<200, types.EditCustomerNotificationResponse200>>;
    /**
     * Retrieve details of all notifications set up for a partner using the partner's ID as a
     * reference
     *
     * @summary Get all Notifications linked directly to a Partner
     * @throws FetchError<400, types.GetAllPartnerNotificationsResponse400> Bad Request
     * @throws FetchError<404, types.GetAllPartnerNotificationsResponse404> Not found
     */
    getAllPartnerNotifications(metadata: types.GetAllPartnerNotificationsMetadataParam): Promise<FetchResponse<200, types.GetAllPartnerNotificationsResponse200>>;
    /**
     * Sets up a new notification for a partner using the partner's ID as a reference. Returns
     * a notification ID that should be saved if the notification needs to be amended in the
     * future
     *
     * @summary Set up a Notification for a Partner
     * @throws FetchError<400, types.AddPartnerNotificationResponse400> Bad request
     */
    addPartnerNotification(body: types.AddPartnerNotificationBodyParam, metadata: types.AddPartnerNotificationMetadataParam): Promise<FetchResponse<201, types.AddPartnerNotificationResponse201>>;
    /**
     * Retrieve details of all notifications set up for a customer using the customer's ID as a
     * reference
     *
     * @summary Get all Notifications for a Customer
     * @throws FetchError<400, types.GetAllCustomerNotificationsResponse400> Bad Request
     * @throws FetchError<404, types.GetAllCustomerNotificationsResponse404> Not found
     */
    getAllCustomerNotifications(metadata: types.GetAllCustomerNotificationsMetadataParam): Promise<FetchResponse<200, types.GetAllCustomerNotificationsResponse200>>;
    /**
     * Sets up a new notification for a customer using the customer's ID as a reference.
     * Returns a notification ID that should be saved if the notification needs to be amended
     * in the future
     *
     * @summary Set up a Notification for a Customer
     * @throws FetchError<400, types.AddCustomerNotificationResponse400> Bad request
     */
    addCustomerNotification(body: types.AddCustomerNotificationBodyParam, metadata: types.AddCustomerNotificationMetadataParam): Promise<FetchResponse<201, types.AddCustomerNotificationResponse201>>;
    /**
     * Only supports webhook notifications and as such uses the webhook endpoint. Request a
     * specific notification ID and specify you want to see failures. (Max 50)
     *
     * @summary Check if a particular webhook has failed
     * @throws FetchError<400, types.GetFailedWebHooksResponse400> Bad Request
     */
    getFailedWebHooks(metadata: types.GetFailedWebHooksMetadataParam): Promise<FetchResponse<200, types.GetFailedWebHooksResponse200>>;
    /**
     * Inbound payments - mock (Sandbox only)
     *
     * @summary Endpoint to mock the credit of an account
     * @throws FetchError<400, types.CreatePaymentsResponse400> Bad Request
     */
    createPayments(body: types.CreatePaymentsBodyParam): Promise<FetchResponse<number, unknown>>;
    /**
     * You can suspend a mandate, which means nothing can be done to it (added or amended).
     * There is also the option to cancel all scheduled payments at the same time. There is a
     * call to re-instate the mandate if needed. Suspend is only supported for L&Z mandates.
     *
     * @summary Suspend Mandate for given mandate-id.
     * @throws FetchError<400, types.SuspendMandateResponse400> Validation errors.
     * @throws FetchError<404, types.SuspendMandateResponse404> Not Found
     */
    suspendMandate(body: types.SuspendMandateBodyParam, metadata: types.SuspendMandateMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Reinstate Mandate for given mandate-id. Reinstate is only supported for L&Z mandates.
     *
     * @summary Reinstate Mandate for given mandate-id.
     * @throws FetchError<400, types.ReinstateMandateResponse400> Validation errors.
     * @throws FetchError<404, types.ReinstateMandateResponse404> Not Found
     */
    reinstateMandate(body: types.ReinstateMandateBodyParam, metadata: types.ReinstateMandateMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Creates a Direct Debit collection schedule; the agreed to framework for the collections
     * for the given mandate-id. This could be a single collection or multiple and includes the
     * frequency and amounts of the planned payments.
     *
     * @summary Create the collection schedule for the given mandate-id.
     * @throws FetchError<400, types.CreateCollectionScheduleResponse400> Validation errors
     * @throws FetchError<404, types.CreateCollectionScheduleResponse404> Not Found
     */
    createCollectionSchedule(body: types.CreateCollectionScheduleBodyParam, metadata: types.CreateCollectionScheduleMetadataParam): Promise<FetchResponse<200, types.CreateCollectionScheduleResponse200>>;
    /**
     * Cancel Mandate for given mandate-id.
     *
     * @summary Cancel Mandate for given mandate-id.
     * @throws FetchError<400, types.CancelMandateResponse400> Validation errors.
     * @throws FetchError<404, types.CancelMandateResponse404> Not Found
     */
    cancelMandate(body: types.CancelMandateBodyParam, metadata: types.CancelMandateMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Bulk request of Direct Debit mandates for the given account-id.
     *
     * @throws FetchError<400, types.CreateBulkMandateResponse400> Validation errors.
     * @throws FetchError<404, types.CreateBulkMandateResponse404> Not Found
     */
    createBulkMandate(body: types.CreateBulkMandateBodyParam): Promise<FetchResponse<200, types.CreateBulkMandateResponse200>>;
    /**
     * Bulk mandate cancellation request for the given account-id.
     *
     * @throws FetchError<400, types.CancelBulkMandateResponse400> Validation errors.
     * @throws FetchError<404, types.CancelBulkMandateResponse404> Not Found
     */
    cancelBulkMandate(body: types.CancelBulkMandateBodyParam): Promise<FetchResponse<200, types.CancelBulkMandateResponse200>>;
    /**
     * Cancel a Direct Debit collection schedule for the given collection-id.
     *
     * @throws FetchError<400, types.CancelCollectionScheduleResponse400> Validation errors
     * @throws FetchError<404, types.CancelCollectionScheduleResponse404> Not Found
     */
    cancelCollectionSchedule(metadata: types.CancelCollectionScheduleMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Cancel a Direct Debit collection for the given collection-id.
     *
     * @throws FetchError<400, types.CancelCollectionResponse400> Validation errors
     * @throws FetchError<404, types.CancelCollectionResponse404> Not Found
     */
    cancelCollection(metadata: types.CancelCollectionMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Represent collection for given collection id
     *
     * @summary Represent collection for given collection id
     * @throws FetchError<400, types.RepresentCollectionResponse400> Validation errors.
     * @throws FetchError<404, types.RepresentCollectionResponse404> Not Found
     */
    representCollection(metadata: types.RepresentCollectionMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Setting up a Mandate is the first step in creating a Direct Debit. You can only set up
     * scheduled payments ('collections') after there is a Mandate created with the details of
     * the payee.
     *
     * @summary Create a Direct Debit mandate for the given account-id.
     * @throws FetchError<400, types.CreateMandateResponse400> Validation errors
     * @throws FetchError<404, types.CreateMandateResponse404> Not Found
     */
    createMandate(body: types.CreateMandateBodyParam, metadata: types.CreateMandateMetadataParam): Promise<FetchResponse<200, types.CreateMandateResponse200>>;
    /**
     * Use this endpoint to get a list of Reconciliations for a given account and date.
     *
     * @summary Get Reconciliations based on search criteria.
     * @throws FetchError<400, types.GetReconciliationsResponse400> Bad Request
     * @throws FetchError<404, types.GetReconciliationsResponse404> Not Found
     */
    getReconciliations(metadata: types.GetReconciliationsMetadataParam): Promise<FetchResponse<200, types.GetReconciliationsResponse200>>;
    /**
     * If trying to find one or several particular mandates, then you can narrow down your
     * search by using the filters available here. These include the mandate id, either the
     * submitted or created date range, the account name on the mandate, etc...
     *
     * @summary Get Mandates based on search criteria.
     * @throws FetchError<400, types.GetMandatesResponse400> Bad Request
     * @throws FetchError<404, types.GetMandatesResponse404> Not Found
     */
    getMandates(metadata?: types.GetMandatesMetadataParam): Promise<FetchResponse<200, types.GetMandatesResponse200>>;
    /**
     * By supplying the mandate id you can view all information regarding the collection
     * schedules linked to that mandate.
     *
     * @summary Get all collectionschedules for a mandate
     * @throws FetchError<400, types.GetCollectionSchedulesResponse400> Bad Request
     * @throws FetchError<404, types.GetCollectionSchedulesResponse404> Not Found
     */
    getCollectionSchedules(metadata: types.GetCollectionSchedulesMetadataParam): Promise<FetchResponse<200, types.GetCollectionSchedulesResponse200>>;
    /**
     * Once a collection schedule is set up, any past collections (whether successful or not)
     * can be retrieved.
     * This endpoint supports only paginated responses with the default page size of 20 (min 1,
     * max 500).
     *
     *
     * @summary Get all collection activities of an account
     * @throws FetchError<400, types.GetCollectionsResponse400> Bad Request
     * @throws FetchError<404, types.GetCollectionsResponse404> Not Found
     */
    getCollections(metadata: types.GetCollectionsMetadataParam): Promise<FetchResponse<200, types.GetCollectionsResponse200>>;
    /**
     * Support knowledge based authentication (KBA)
     *
     * @summary Update card authentication
     * @throws FetchError<400, types.UpdateCardAuthenticationResponse400> Invalid request
     */
    updateCardAuthentication(body: types.UpdateCardAuthenticationBodyParam, metadata: types.UpdateCardAuthenticationMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Retrieve card report type notification configuration for partner
     *
     * @throws FetchError<400, types.GetNotificationConfigurationsForAGivenPartnerAndReportTypeResponse400> Invalid request
     * @throws FetchError<403, types.GetNotificationConfigurationsForAGivenPartnerAndReportTypeResponse403> Partner can not access this data
     */
    getNotificationConfigurationsForAGivenPartnerAndReportType(metadata: types.GetNotificationConfigurationsForAGivenPartnerAndReportTypeMetadataParam): Promise<FetchResponse<200, types.GetNotificationConfigurationsForAGivenPartnerAndReportTypeResponse200>>;
    /**
     * Update report type notification configuration for partner
     *
     * @throws FetchError<400, types.UpdateNotificationConfigurationsForAGivenPartnerAndReportTypeResponse400> Invalid request
     */
    updateNotificationConfigurationsForAGivenPartnerAndReportType(body: types.UpdateNotificationConfigurationsForAGivenPartnerAndReportTypeBodyParam, metadata: types.UpdateNotificationConfigurationsForAGivenPartnerAndReportTypeMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Delete card report notification configuration for partner and report type
     *
     * @throws FetchError<400, types.DeleteAllNotificationConfigurationsForAGivenPartnerAndReportTypeResponse400> Invalid request
     */
    deleteAllNotificationConfigurationsForAGivenPartnerAndReportType(metadata: types.DeleteAllNotificationConfigurationsForAGivenPartnerAndReportTypeMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Toggle card report notification for partner and report type
     *
     * @throws FetchError<400, types.ToggleNotificationsForAGivenPartnerAndReportTypeResponse400> Invalid request
     */
    toggleNotificationsForAGivenPartnerAndReportType(body: types.ToggleNotificationsForAGivenPartnerAndReportTypeBodyParam, metadata: types.ToggleNotificationsForAGivenPartnerAndReportTypeMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Bulk create partner custom field keys
     *
     * @summary Bulk create partner custom field keys
     * @throws FetchError<400, types.BulkCreatePartnerCustomFieldKeysResponse400> Invalid request
     */
    bulkCreatePartnerCustomFieldKeys(body: types.BulkCreatePartnerCustomFieldKeysBodyParam, metadata: types.BulkCreatePartnerCustomFieldKeysMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Retrieve card report type notification configuration for customer
     *
     * @throws FetchError<400, types.GetNotificationConfigurationsForAGivenCustomerAndReportTypeResponse400> Invalid request
     * @throws FetchError<403, types.GetNotificationConfigurationsForAGivenCustomerAndReportTypeResponse403> Customer can not access this data
     */
    getNotificationConfigurationsForAGivenCustomerAndReportType(metadata: types.GetNotificationConfigurationsForAGivenCustomerAndReportTypeMetadataParam): Promise<FetchResponse<200, types.GetNotificationConfigurationsForAGivenCustomerAndReportTypeResponse200>>;
    /**
     * Update report type notification configuration for customer
     *
     * @throws FetchError<400, types.UpdateNotificationConfigurationsForAGivenCustomerAndReportTypeResponse400> Invalid request
     */
    updateNotificationConfigurationsForAGivenCustomerAndReportType(body: types.UpdateNotificationConfigurationsForAGivenCustomerAndReportTypeBodyParam, metadata: types.UpdateNotificationConfigurationsForAGivenCustomerAndReportTypeMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Delete card report notification configuration for customer and report type
     *
     * @throws FetchError<400, types.DeleteAllNotificationConfigurationsForAGivenCustomerAndReportTypeResponse400> Invalid request
     */
    deleteAllNotificationConfigurationsForAGivenCustomerAndReportType(metadata: types.DeleteAllNotificationConfigurationsForAGivenCustomerAndReportTypeMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Toggled notifications for customer and card report type
     *
     * @throws FetchError<400, types.ToggleNotificationsForAGivenCustomerAndReportTypeResponse400> Invalid request
     */
    toggleNotificationsForAGivenCustomerAndReportType(body: types.ToggleNotificationsForAGivenCustomerAndReportTypeBodyParam, metadata: types.ToggleNotificationsForAGivenCustomerAndReportTypeMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Bulk create customer custom field keys
     *
     * @summary Bulk create customer custom field keys
     * @throws FetchError<400, types.BulkCreateCustomerCustomFieldKeysResponse400> Invalid request
     */
    bulkCreateCustomerCustomFieldKeys(body: types.BulkCreateCustomerCustomFieldKeysBodyParam, metadata: types.BulkCreateCustomerCustomFieldKeysMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * View the details of an existing card
     *
     * @throws FetchError<400, types.GetCardResponse400> Invalid request
     */
    getCard(metadata: types.GetCardMetadataParam): Promise<FetchResponse<200, types.GetCardResponse200>>;
    /**
     * Update card and cardholder details
     *
     * @summary Update a card
     * @throws FetchError<400, types.UpdateResponse400> Invalid request
     */
    update(body: types.UpdateBodyParam, metadata: types.UpdateMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Update card - for now, the removal of cancellationDate, authWindowStartDate and
     * authWindowEndDate fields is the only allowed action
     *
     * @summary Update card
     * @throws FetchError<400, types.UpdateCardResponse400> Invalid request
     */
    updateCard(body: types.UpdateCardBodyParam, metadata: types.UpdateCardMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Restores a previously suspended card to the status it was in prior to being suspended as
     * applied by the issuer or program manager.
     * Use of this endpoint is `Restricted`, depending on access being granted through
     * contractual setup with Modulr.
     *
     * @summary [Restricted] Unsuspend a card
     * @throws FetchError<400, types.UnsuspendCardResponse400> Invalid request
     */
    unsuspendCard(metadata: types.UnsuspendCardMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Unblocking a card re-enables normal authorisation processing.
     *
     * @summary Unblock an existing card
     * @throws FetchError<400, types.UnblockCardResponse400> Invalid request
     */
    unblockCard(metadata: types.UnblockCardMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Suspends a card to temporarily prevent any new authorisations as applied by the issuer
     * or the program manager (i.e. not cardholder elective). This means that all new
     * authorisations will be immediately declined. Outstanding authorisations are unaffected
     * and settlement, chargebacks, refunds, etc will continue to function as normal.
     * Use of this endpoint is `Restricted`, depending on access being granted through
     * contractual setup with Modulr.
     *
     * @summary [Restricted] Suspend an existing card
     * @throws FetchError<400, types.SuspendCardResponse400> Invalid request
     */
    suspendCard(metadata: types.SuspendCardMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Create a token that is used as a parameter to retrieve secure card details (PAN, CVV,
     * and PIN) or to perform PIN alterations. This token is to be retrieved by the partner and
     * pushed to the cardholder device where the call is made. The token will be valid for 60
     * seconds.
     *
     * @summary Create secure card details token
     * @throws FetchError<400, types.GenerateCardHolderTokenResponse400> Invalid request
     */
    generateCardHolderToken(body: types.GenerateCardHolderTokenBodyParam, metadata: types.GenerateCardHolderTokenMetadataParam): Promise<FetchResponse<200, types.GenerateCardHolderTokenResponse200>>;
    generateCardHolderToken(metadata: types.GenerateCardHolderTokenMetadataParam): Promise<FetchResponse<200, types.GenerateCardHolderTokenResponse200>>;
    /**
     * Replace a card, with a reason STOLEN, DAMAGED, LOST, RENEW.
     *
     * @summary Replace a card
     * @throws FetchError<400, types.ReplaceCardResponse400> Invalid request
     */
    replaceCard(body: types.ReplaceCardBodyParam, metadata: types.ReplaceCardMetadataParam): Promise<FetchResponse<201, types.ReplaceCardResponse201>>;
    /**
     * Retrieves the PIN for a card, as a reminder for the cardholder
     *
     * @summary Retrieve PIN
     * @throws FetchError<400, types.RetrievePinResponse400> Invalid request
     * @throws FetchError<403, types.RetrievePinResponse403> Forbidden. `Card Management Token` may be missing or invalid
     */
    retrievePIN(metadata: types.RetrievePinMetadataParam): Promise<FetchResponse<200, types.RetrievePinResponse200>>;
    /**
     * Reset the card's PIN for a specific card
     *
     * @summary Reset card PIN
     * @throws FetchError<400, types.ResetPinResponse400> Invalid request
     */
    resetPin(body: types.ResetPinBodyParam, metadata: types.ResetPinMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Unblock the card's PIN so that it can be used by the cardholder. CVC2 will also be
     * unblocked, where required.
     *
     * @summary Unblock PIN
     * @throws FetchError<400, types.UnblockPinResponse400> Invalid request
     */
    unblockPin(metadata: types.UnblockPinMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Retrieves and encrypts the data needed for the client application to provision a card to
     * Apple Pay
     *
     * @summary Get in-app provisioning data for Apple Pay
     * @throws FetchError<400, types.GetInAppProvisioningForAppleResponse400> Invalid request
     */
    getInAppProvisioningForApple(body: types.GetInAppProvisioningForAppleBodyParam, metadata: types.GetInAppProvisioningForAppleMetadataParam): Promise<FetchResponse<200, types.GetInAppProvisioningForAppleResponse200>>;
    /**
     * Replace the values of a card's custom fields if they exist or create new custom fields
     * with the given values if they do not exist
     *
     * @summary Update a card's custom fields
     * @throws FetchError<400, types.UpdateCardCustomFieldsResponse400> Invalid request
     */
    updateCardCustomFields(body: types.UpdateCardCustomFieldsBodyParam, metadata: types.UpdateCardCustomFieldsMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Cancelling a card _**permanently**_ disables authorisation processing & _**destroys**_
     * the card from the card scheme perspective. This means that all _new_ authorisations will
     * be immediately declined and this cannot be reversed. Outstanding authorisations are
     * unaffected and settlement, chargebacks, refunds, etc will continue to function as
     * normal.
     *
     * @summary Cancel an existing card
     * @throws FetchError<400, types.CancelCardResponse400> Invalid request
     */
    cancelCard(body: types.CancelCardBodyParam, metadata: types.CancelCardMetadataParam): Promise<FetchResponse<number, unknown>>;
    cancelCard(metadata: types.CancelCardMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Blocking a card temporarily disables authorisation processing. This means that all _new_
     * authorisations will be immediately declined. Outstanding authorisations are unaffected
     * and settlement, chargebacks, refunds, etc will continue to function as normal.
     *
     * @summary Block an existing card
     * @throws FetchError<400, types.BlockCardResponse400> Invalid request
     */
    blockCard(metadata: types.BlockCardMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Physical cards issued by Modulr will be mailed out to cardholders in an inactive state.
     * A cardholder will need to have their card activated before it can be used. Cards can
     * only be activated whilst they have a status of `CREATED`.
     *
     * @summary Activate a physical card
     * @throws FetchError<400, types.ActivateCardResponse400> Invalid request
     */
    activateCard(metadata: types.ActivateCardMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Reset the PIN for a card using a client access token. This should be done from the
     * card-holder device and not directly by the partner
     *
     * @summary Reset card PIN
     * @throws FetchError<400, types.SecureResetPinResponse400> Invalid request
     */
    secureResetPin(body: types.SecureResetPinBodyParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Retrieve card details by PAN
     *
     * @summary Card enquiry
     * @throws FetchError<400, types.CardEnquiryResponse400> Invalid request
     */
    cardEnquiry(body: types.CardEnquiryBodyParam): Promise<FetchResponse<200, types.CardEnquiryResponse200>>;
    /**
     * Restores a previously suspended token to active
     *
     * @summary Unsuspend card token
     * @throws FetchError<400, types.UnsuspendCardTokenResponse400> Invalid request
     */
    unsuspendCardToken(metadata: types.UnsuspendCardTokenMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Suspends a token to temporarily prevent any new authorisations
     *
     * @summary Suspend card token
     * @throws FetchError<400, types.SuspendCardTokenResponse400> Invalid request
     */
    suspendCardToken(metadata: types.SuspendCardTokenMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Deactivating a token permanently disables authorisation processing. This action is
     * irreversible
     *
     * @summary Deactivate card token
     * @throws FetchError<400, types.DeactivateCardTokenResponse400> Invalid request
     */
    deactivateCardToken(metadata: types.DeactivateCardTokenMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * [Restricted] Expire an existing authorisation
     *
     * @summary [Restricted] Expire an existing authorisation
     * @throws FetchError<400, types.ExpireAuthorisationResponse400> Bad Request
     */
    expireAuthorisation(metadata: types.ExpireAuthorisationMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Asynchronously create a physical card. The response will include a resource to allow the
     * client to check the status of the request.
     *
     * @summary Create a new physical card
     * @throws FetchError<400, types.CreatePhysicalCardResponse400> Invalid request
     */
    createPhysicalCard(body: types.CreatePhysicalCardBodyParam, metadata: types.CreatePhysicalCardMetadataParam): Promise<FetchResponse<202, types.CreatePhysicalCardResponse202>>;
    /**
     * View the details of existing cards by account
     *
     * @throws FetchError<400, types.GetCardsByAccountResponse400> Invalid request
     */
    getCardsByAccount(metadata: types.GetCardsByAccountMetadataParam): Promise<FetchResponse<200, types.GetCardsByAccountResponse200>>;
    /**
     * Create a new virtual card
     *
     * @throws FetchError<400, types.CreateCardResponse400> Invalid request
     */
    createCard(body: types.CreateCardBodyParam, metadata: types.CreateCardMetadataParam): Promise<FetchResponse<201, types.CreateCardResponse201>>;
    /**
     * View existing partner card custom field keys
     *
     * @throws FetchError<400, types.GetPartnerCustomFieldKeysResponse400> Invalid request
     */
    getPartnerCustomFieldKeys(metadata: types.GetPartnerCustomFieldKeysMetadataParam): Promise<FetchResponse<200, types.GetPartnerCustomFieldKeysResponse200>>;
    /**
     * View existing customer card custom field keys
     *
     * @throws FetchError<400, types.GetCustomerCustomFieldKeysResponse400> Invalid request
     */
    getCustomerCustomFieldKeys(metadata: types.GetCustomerCustomFieldKeysMetadataParam): Promise<FetchResponse<200, types.GetCustomerCustomFieldKeysResponse200>>;
    /**
     * View the details of existing cards
     *
     * @throws FetchError<400, types.GetCardsResponse400> Invalid request
     */
    getCards(metadata?: types.GetCardsMetadataParam): Promise<FetchResponse<200, types.GetCardsResponse200>>;
    /**
     * Retrieves all payment card tokens for the given card
     *
     * @summary Get card tokens
     * @throws FetchError<400, types.GetCardTokensResponse400> Invalid request
     */
    getCardTokens(metadata: types.GetCardTokensMetadataParam): Promise<FetchResponse<200, types.GetCardTokensResponse200>>;
    /**
     * Receives the secure card details token as a parameter. This call is meant to be done
     * from the cardholder device and not directly by the partner
     *
     * @summary Retrieve secure card details (PAN + CVV + PIN)
     * @throws FetchError<400, types.GetSecureCardDetailsResponse400> Invalid request
     * @throws FetchError<403, types.GetSecureCardDetailsResponse403> Forbidden. Token may be missing or invalid
     */
    getSecureCardDetails(): Promise<FetchResponse<200, types.GetSecureCardDetailsResponse200>>;
    /**
     * Retrieves the OTP details given the corresponding card token ID
     *
     * @summary Get card token OTP details
     * @throws FetchError<400, types.GetOtpDetailsResponse400> Invalid request
     * @throws FetchError<404, types.GetOtpDetailsResponse404> Not found
     */
    getOtpDetails(metadata: types.GetOtpDetailsMetadataParam): Promise<FetchResponse<200, types.GetOtpDetailsResponse200>>;
    /**
     * View the details of card tasks.  Ordered by createdDate, with the newest entries
     * appearing first
     *
     * @summary Get tasks
     * @throws FetchError<400, types.GetAsyncTasksResponse400> Invalid request
     */
    getAsyncTasks(metadata?: types.GetAsyncTasksMetadataParam): Promise<FetchResponse<200, types.GetAsyncTasksResponse200>>;
    /**
     * Retrieve the card task. If the task is complete, the resource URL will be provided to
     * allow client to fetch the completed resource.
     *
     * @summary Get a card task
     * @throws FetchError<400, types.GetAsyncTaskResponse400> Invalid request
     */
    getAsyncTask(metadata: types.GetAsyncTaskMetadataParam): Promise<FetchResponse<200, types.GetAsyncTaskResponse200>>;
    /**
     * Retrieve card reports
     *
     * @summary Retrieve card reports
     * @throws FetchError<400, types.SearchReportsResponse400> Bad Request
     * @throws FetchError<403, types.SearchReportsResponse403> Unauthorised
     */
    searchReports(metadata?: types.SearchReportsMetadataParam): Promise<FetchResponse<200, types.SearchReportsResponse200>>;
    /**
     * Download a specific card report
     *
     * @summary Download a specific card report
     * @throws FetchError<400, types.RetrieveReportResponse400> Bad Request
     * @throws FetchError<403, types.RetrieveReportResponse403> Unauthorised
     * @throws FetchError<404, types.RetrieveReportResponse404> Not found
     */
    retrieveReport(metadata: types.RetrieveReportMetadataParam): Promise<FetchResponse<200, types.RetrieveReportResponse200>>;
    /**
     * View activities for a specified list of cards and a given time frame. View activities
     * for all cards belonging to a specified list of accounts and a given time frame. View all
     * activities for a single card when a single card ID is specified, time frame is optional.
     *
     * @summary View activities for specific cards or over a date range
     * @throws FetchError<400, types.GetCardActivitiesResponse400> Invalid request
     */
    getCardActivities(metadata?: types.GetCardActivitiesMetadataParam): Promise<FetchResponse<200, types.GetCardActivitiesResponse200>>;
    /**
     * View the details of create physical card tasks by account.  Ordered by createdDate, with
     * the newest entries appearing first
     *
     * @summary Get physical card create tasks by account
     * @throws FetchError<400, types.GetCreatePhysicalCardAsyncTasksByAccountResponse400> Invalid request
     */
    getCreatePhysicalCardAsyncTasksByAccount(metadata: types.GetCreatePhysicalCardAsyncTasksByAccountMetadataParam): Promise<FetchResponse<200, types.GetCreatePhysicalCardAsyncTasksByAccountResponse200>>;
    /**
     * Delete partner custom field key
     *
     * @summary Delete partner custom field key
     * @throws FetchError<400, types.DeletePartnerCustomFieldKeyResponse400> Invalid request
     */
    deletePartnerCustomFieldKey(metadata: types.DeletePartnerCustomFieldKeyMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Delete customer custom field key
     *
     * @summary Delete customer custom field key
     * @throws FetchError<400, types.DeleteCustomerCustomFieldKeyResponse400> Invalid request
     */
    deleteCustomerCustomFieldKey(metadata: types.DeleteCustomerCustomFieldKeyMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Delete card custom field
     *
     * @summary Delete card custom field
     * @throws FetchError<400, types.DeleteCardCustomFieldResponse400> Invalid request
     */
    deleteCardCustomField(metadata: types.DeleteCardCustomFieldMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Reject Collection
     *
     * @summary Reject Collection
     * @throws FetchError<400, types.RejectCollectionResponse400> Collection has not been rejected
     */
    rejectCollection(body: types.RejectCollectionBodyParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Used to request the cancellation of a Mandate.
     *
     * @summary Cancel a specific Mandate
     * @throws FetchError<400, types.CancelDdosMandateResponse400> Bad Request
     */
    cancelDdosMandate(body: types.CancelDdosMandateBodyParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Used to get all the Mandates for a specific account.
     *
     * @summary Retrieve all Mandates for an account
     * @throws FetchError<400, types.RetrieveMandatesResponse400> Bad Request
     */
    retrieveMandates(metadata: types.RetrieveMandatesMetadataParam): Promise<FetchResponse<200, types.RetrieveMandatesResponse200>>;
    /**
     * Uploads the payment file and store the valid files extracted payments for later creating
     * payments
     *
     * @summary Upload payment file and store valid payments
     * @throws FetchError<400, types.UploadPaymentFileResponse400> Bad Request
     * @throws FetchError<500, types.UploadPaymentFileResponse500> 500 error code is issued when problem occurred during decoding and decompressing file
     * content
     */
    uploadPaymentFile(body: types.UploadPaymentFileBodyParam): Promise<FetchResponse<200, types.UploadPaymentFileResponse200>>;
    /**
     * Create a batch payment request from a valid upload file and send for processing to the
     * payment service
     *
     * @summary Create payments from an uploaded file
     * @throws FetchError<400, types.ProceedResponse400> Invalid payment file
     */
    proceed(body: types.ProceedBodyParam, metadata: types.ProceedMetadataParam): Promise<FetchResponse<201, types.ProceedResponse201>>;
    /**
     * Get latest status of an uploaded payment file
     *
     * @summary Get an upload file latest status
     * @throws FetchError<400, types.StatusResponse400> Invalid Payment file
     */
    status(metadata: types.StatusMetadataParam): Promise<FetchResponse<200, types.StatusResponse200>>;
    /**
     * This endpoint allows you to check the account details of a payee with their bank before
     * you create a beneficiary or payment. If the account details are confirmed, you will have
     * greater assurance that a payment you create will reach the correct bank account.
     * This endpoint does not support idempotent requests. Any requests containing an
     * x-mod-nonce header used by a previous request will return the response <code>403:
     * Forbidden ("Unique/allowed nonce header not found")</code>
     *
     * @summary Create an account name check
     * @throws FetchError<400, types.CreateOutboundCopResponse400> Validation Errors
     * @throws FetchError<404, types.CreateOutboundCopResponse404> Not Found
     * @throws FetchError<429, types.CreateOutboundCopResponse429> Too Many Requests
     * @throws FetchError<500, types.CreateOutboundCopResponse500> Internal Server Error
     * @throws FetchError<503, types.CreateOutboundCopResponse503> Service Unavailable
     */
    createOutboundCop(body: types.CreateOutboundCopBodyParam): Promise<FetchResponse<201, types.CreateOutboundCopResponse201>>;
    /**
     * Returns a list of all sort codes and account numbers for which Secondary Reference Data
     * must be provided with all account name check requests.
     *
     * @summary Get SRD Accounts
     * @throws FetchError<400, types.GetSrdAccountsResponse400> Invalid query params provided
     * @throws FetchError<401, types.GetSrdAccountsResponse401> Invalid credentials
     * @throws FetchError<403, types.GetSrdAccountsResponse403> CoP Access denied
     * @throws FetchError<500, types.GetSrdAccountsResponse500> Unexpected error occurred
     * @throws FetchError<503, types.GetSrdAccountsResponse503> Service outage
     */
    getSrdAccounts(metadata?: types.GetSrdAccountsMetadataParam): Promise<FetchResponse<200, types.GetSrdAccountsResponse200>>;
    /**
     * Create an authorisation for a card
     *
     * @summary Create a card authorisation
     * @throws FetchError<400, types.CreateAuthorisationResponse400> Validation errors
     */
    createAuthorisation(body: types.CreateAuthorisationBodyParam, metadata: types.CreateAuthorisationMetadataParam): Promise<FetchResponse<201, types.CreateAuthorisationResponse201>>;
    /**
     * Settle the card authorisation
     *
     * @summary Settle the card authorisation
     * @throws FetchError<400, types.SettleAuthorisationResponse400> Validation errors
     */
    settleAuthorisation(metadata: types.SettleAuthorisationMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Simulate a reversal of an authorization for a card
     *
     * @summary Reverse the card authorisation
     * @throws FetchError<400, types.ReverseAuthorisationResponse400> Validation errors
     */
    reverseAuthorisation(metadata: types.ReverseAuthorisationMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Initiates a new Variable Recurring Payment using an existing authorised consent.
     *
     * @summary Initiate a Variable Recurring Payment.
     * @throws FetchError<400, types.InitiateVrpPaymentResponse400> The consent cannot be processed as it does not exist.
     */
    initiateVrpPayment(body: types.InitiateVrpPaymentBodyParam): Promise<FetchResponse<201, types.InitiateVrpPaymentResponse201>>;
    /**
     * Create a Variable Recurring Payment (VRP) consent for authorisation by the payment
     * service user. The consent can then be used to initiate one or more payments within the
     * payment constraints specified.
     *
     * @summary Create a VRP consent
     * @throws FetchError<400, types.InitiateConsentCreationResponse400> Bad Request
     */
    initiateConsentCreation(body: types.InitiateConsentCreationBodyParam): Promise<FetchResponse<201, types.InitiateConsentCreationResponse201>>;
    /**
     * Confirm the availability of funds in account, prior to initiating a Variable Recurring
     * Payment, using an authorised consent.
     *
     * @summary Confirm the availability of funds in an account.
     * @throws FetchError<400, types.ConfirmFundsResponse400> Confirmation of funds request cannot be processed as the consent with the provided ID
     * does not exist.
     */
    confirmFunds(body: types.ConfirmFundsBodyParam, metadata: types.ConfirmFundsMetadataParam): Promise<FetchResponse<200, types.ConfirmFundsResponse200>>;
    /**
     * Initiate a new standing order to the specified destination account from an account held
     * at an ASPSP.
     *
     * @summary Initiate standing order from ASPSP
     * @throws FetchError<400, types.CreateStandingOrderInitiationResponse400> Bad Request
     */
    createStandingOrderInitiation(body: types.CreateStandingOrderInitiationBodyParam): Promise<FetchResponse<201, types.CreateStandingOrderInitiationResponse201>>;
    /**
     * Initiate a payment to the specified destination account from an account held at an
     * ASPSP.
     *
     * @summary Initiate payment from ASPSP
     * @throws FetchError<400, types.CreatePaymentInitiationResponse400> Bad Request
     */
    createPaymentInitiation(body: types.CreatePaymentInitiationBodyParam): Promise<FetchResponse<201, types.CreatePaymentInitiationResponse201>>;
    /**
     * Fetch the details of a payment initiated using Variable Recurring Payment (VRP) based on
     * a unique payment ID.
     *
     * @summary Get Variable Recurring Payment
     * @throws FetchError<400, types.GetVrpPaymentResponse400> The payment cannot be retrieved as it does not exist.
     */
    getVrpPayment(metadata: types.GetVrpPaymentMetadataParam): Promise<FetchResponse<200, types.GetVrpPaymentResponse200>>;
    /**
     * Returns information about a given Variable Recurring Payment consent.
     *
     * @summary Get VRP consent.
     * @throws FetchError<400, types.GetVrpConsentResponse400> The consent details cannot be retrieved as it does not exist
     */
    getVrpConsent(metadata: types.GetVrpConsentMetadataParam): Promise<FetchResponse<200, types.GetVrpConsentResponse200>>;
    /**
     * Cancels a VRP consent and stops further variable recurring payments being made using it.
     *
     * @summary Revoke a VRP consent.
     * @throws FetchError<400, types.RevokeVrpConsentResponse400> The consent cannot be revoked as it does not exist
     */
    revokeVrpConsent(metadata: types.RevokeVrpConsentMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Retrieve the details of a specific standing order initiation request.
     *
     * @summary Get standing order initiation request details
     * @throws FetchError<400, types.GetStandingOrderInitiationResponse400> Bad Request
     * @throws FetchError<404, types.GetStandingOrderInitiationResponse404> Standing order initiation not found
     */
    getStandingOrderInitiation(metadata: types.GetStandingOrderInitiationMetadataParam): Promise<FetchResponse<200, types.GetStandingOrderInitiationResponse200>>;
    /**
     * Retrieve the details of a specific payment initiation request.
     *
     * @summary Get payment initiation request details
     * @throws FetchError<400, types.GetPaymentInitiationResponse400> Bad Request
     * @throws FetchError<404, types.GetPaymentInitiationResponse404> Payment initiation not found
     */
    getPaymentInitiation(metadata: types.GetPaymentInitiationMetadataParam): Promise<FetchResponse<200, types.GetPaymentInitiationResponse200>>;
    /**
     * Gets a list of all supported Account Servicing Payment Service Providers (ASPSPs).
     *
     * @summary Get supported ASPSPs
     * @throws FetchError<400, types.GetAspsProvidersResponse400> Bad Request
     */
    getAspsProviders(): Promise<FetchResponse<200, types.GetAspsProvidersResponse200>>;
    /**
     * Uploads and stores document in a repository. Gives back Url encoded document path in the
     * repository
     *
     * @summary Uploads and stores document
     * @throws FetchError<400, types.UploadResponse400> Validation errors
     */
    upload(body: types.UploadBodyParam): Promise<FetchResponse<201, types.UploadResponse201>>;
}
declare const createSDK: SDK;
export = createSDK;
