"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'modulr/1.0 (api/6.1.2)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
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
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
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
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * Retrieve a specific customer using a unique customer reference. This identifier can be
     * found in the response obtained after creating a new customer, it starts by C, e.g:
     * C0000000
     *
     * @summary Retrieve a specific customer using a unique customer reference
     * @throws FetchError<400, types.GetCustomerResponse400> Bad Request
     */
    SDK.prototype.getCustomer = function (metadata) {
        return this.core.fetch('/customers/{customerId}', 'get', metadata);
    };
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
    SDK.prototype.editCustomer = function (body, metadata) {
        return this.core.fetch('/customers/{customerId}', 'put', body, metadata);
    };
    /**
     * Retrieve details of a particular account using its ID as a reference
     *
     * @summary Get an account
     * @throws FetchError<400, types.GetAccountResponse400> Bad Request
     */
    SDK.prototype.getAccount = function (metadata) {
        return this.core.fetch('/accounts/{id}', 'get', metadata);
    };
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
    SDK.prototype.editAccount = function (body, metadata) {
        return this.core.fetch('/accounts/{id}', 'put', body, metadata);
    };
    /**
     * Set the secured funding limit for an account
     *
     * @throws FetchError<400, types.UpdateSecuredFundingLimitResponse400> Validation errors
     */
    SDK.prototype.updateSecuredFundingLimit = function (body, metadata) {
        return this.core.fetch('/accounts/{id}/secured-funding', 'put', body, metadata);
    };
    /**
     * The ability to update an access group's name and add or remove an account
     *
     * @summary Update access group
     * @throws FetchError<400, types.UpdateAccessGroupResponse400> Validation errors
     */
    SDK.prototype.updateAccessGroup = function (body, metadata) {
        return this.core.fetch('/access-groups/{id}/content', 'put', body, metadata);
    };
    /**
     * The ability to create a new beneficiary for a customer, using their customer ID as a
     * reference.
     *
     * @summary Create a new beneficiary for a specified customer
     * @throws FetchError<400, types.CreateBeneficiaryResponse400> Validation errors
     */
    SDK.prototype.createBeneficiary = function (body, metadata) {
        return this.core.fetch('/customers/{customerId}/beneficiaries', 'post', body, metadata);
    };
    /**
     * deleting beneficiaries for a customer, using their customer ID
     *
     * @summary Delete beneficiaries for a specified customer
     * @throws FetchError<400, types.DeleteBeneficiariesResponse400> Bad Request
     */
    SDK.prototype.deleteBeneficiaries = function (metadata) {
        return this.core.fetch('/customers/{customerId}/beneficiaries', 'delete', metadata);
    };
    /**
     * Get details of accounts belonging to a particular customer using the customer’s ID as a
     * reference
     *
     * @summary Get accounts by customer
     * @throws FetchError<400, types.GetAccountsByCustomerResponse400> Bad Request
     */
    SDK.prototype.getAccountsByCustomer = function (metadata) {
        return this.core.fetch('/customers/{customerId}/accounts', 'get', metadata);
    };
    /**
     * Creates an account for a particular customer using the customer’s ID as a reference
     *
     * @summary Create account by customer
     * @throws FetchError<400, types.CreateAccountResponse400> Validation errors
     */
    SDK.prototype.createAccount = function (body, metadata) {
        return this.core.fetch('/customers/{customerId}/accounts', 'post', body, metadata);
    };
    /**
     * Using a unique reference (account ID) you can unblock an account
     *
     * @summary Unblock a specific account
     * @throws FetchError<400, types.UnblockAccountResponse400> Validation errors
     */
    SDK.prototype.unblockAccount = function (metadata) {
        return this.core.fetch('/accounts/{id}/unblock', 'post', metadata);
    };
    /**
     * When you no longer want or need an account you are able to close using the account ID as
     * a unique reference
     *
     * @summary Close an account
     * @throws FetchError<400, types.CloseAccountResponse400> Bad Request
     */
    SDK.prototype.closeAccount = function (metadata) {
        return this.core.fetch('/accounts/{id}/close', 'post', metadata);
    };
    /**
     * Using a unique reference (account ID) you can block an account
     *
     * @summary Block a specific account
     * @throws FetchError<400, types.BlockAccountResponse400> Validation errors
     */
    SDK.prototype.blockAccount = function (metadata) {
        return this.core.fetch('/accounts/{id}/block', 'post', metadata);
    };
    /**
     * The ability to list all access groups for the customer
     *
     * @summary Get a list of access groups
     * @throws FetchError<400, types.GetAccessGroupsResponse400> Bad Request
     */
    SDK.prototype.getAccessGroups = function (metadata) {
        return this.core.fetch('/access-groups', 'get', metadata);
    };
    /**
     * The ability to create a new access group
     *
     * @summary Create access group
     * @throws FetchError<400, types.CreateAccessGroupResponse400> Validation errors
     */
    SDK.prototype.createAccessGroup = function (body) {
        return this.core.fetch('/access-groups', 'post', body);
    };
    /**
     * Either using unique references, such as customer ID, or filter parameters, such as
     * verification status, get details of any customers found.
     *
     * @summary Retrieve customers using filters
     * @throws FetchError<400, types.GetCustomersResponse400> Bad Request
     */
    SDK.prototype.getCustomers = function (metadata) {
        return this.core.fetch('/customers', 'get', metadata);
    };
    /**
     * This endpoint allows you to create a new customer. Creating a customer is a complex
     * process with several dependencies, e.g: Directors, type of customer, legal
     * specifications. For further information, please visit 'Creating a customer and account'
     * entry on our API documentation
     *
     * @summary Create a new customer
     * @throws FetchError<400, types.CreateCustomerResponse400> Validation errors
     */
    SDK.prototype.createCustomer = function (body) {
        return this.core.fetch('/customers', 'post', body);
    };
    /**
     * The ability to get the details of beneficiaries using various pieces of information,
     * e.g. using customer ID, retrieve all beneficiaries created by that customer. Can get
     * details of one particular beneficiary based on the unique beneficiary reference number.
     *
     * @summary Retrieve beneficiaries
     * @throws FetchError<400, types.GetBeneficiariesResponse400> Bad Request
     */
    SDK.prototype.getBeneficiaries = function (metadata) {
        return this.core.fetch('/beneficiaries', 'get', metadata);
    };
    /**
     * Fetch references of the entities (payment, rule) that have caused the beneficiary to be
     * locked
     *
     * @summary Retrieve locked beneficiary entities
     * @throws FetchError<400, types.GetLocksResponse400> Bad Request
     */
    SDK.prototype.getLocks = function (metadata) {
        return this.core.fetch('/beneficiaries/{beneficiaryId}/locks', 'get', metadata);
    };
    /**
     * Gives the ability to find accounts and get their details using filters
     *
     * @summary Get accounts using filter
     * @throws FetchError<400, types.GetAccountsResponse400> Bad Request
     */
    SDK.prototype.getAccounts = function (metadata) {
        return this.core.fetch('/accounts', 'get', metadata);
    };
    /**
     * Retrieves the last 6 months of transactions (successful payments in & out) of an
     * account, specified by a unique account reference.
     *
     * @summary Get transactions for a specific Account
     * @throws FetchError<400, types.GetTransactionsByAccountResponse400> Bad Request
     */
    SDK.prototype.getTransactionsByAccount = function (metadata) {
        return this.core.fetch('/accounts/{id}/transactions', 'get', metadata);
    };
    /**
     * The ability to retrieve an access group by ID
     *
     * @summary Get access group
     * @throws FetchError<400, types.GetAccessGroupResponse400> Bad Request
     */
    SDK.prototype.getAccessGroup = function (metadata) {
        return this.core.fetch('/access-groups/{id}', 'get', metadata);
    };
    /**
     * The ability to get the details of payments using various pieces of information, e.g.
     * using Account ID, retrieve all payments in that account. Can get details of one
     * particular payment based on the unique payment reference number.
     *
     * @summary Retrieve payments
     * @throws FetchError<400, types.GetPaymentsResponse400> Bad Request
     */
    SDK.prototype.getPayments = function (metadata) {
        return this.core.fetch('/payments', 'get', metadata);
    };
    /**
     * Supports both Payments to external bank accounts via Faster Payments and transfers to
     * other Modulr accounts. Requests to Payments are asynchronous.
     *
     * @summary Create a payment
     * @throws FetchError<400, types.SendPaymentResponse400> Validation errors
     */
    SDK.prototype.sendPayment = function (body) {
        return this.core.fetch('/payments', 'post', body);
    };
    /**
     * This endpoint allows for a user who has submitted multiple batch to use some criteria to
     * get the batch payments.
     *
     * @summary Get batch payments by a given set of parameters
     * @throws FetchError<400, types.GetBatchPaymentsResponse400> Validation errors
     */
    SDK.prototype.getBatchPayments = function (metadata) {
        return this.core.fetch('/batchpayments', 'get', metadata);
    };
    /**
     * As well as supporting individual payment requests, the Modulr payment platform can also
     * handle multiple payment objects in the same request. This endpoint allows you to make a
     * new batch payment.
     *
     * @summary Make a batch payment
     * @throws FetchError<400, types.SubmitBatchPaymentsResponse400> Validation errors
     */
    SDK.prototype.submitBatchPayments = function (body) {
        return this.core.fetch('/batchpayments', 'post', body);
    };
    /**
     * Cancels a batch payment request if it is not already processed
     *
     * @summary Cancel the batch payment
     * @throws FetchError<400, types.CancelBatchPaymentsResponse400> Validation errors
     */
    SDK.prototype.cancelBatchPayments = function (metadata) {
        return this.core.fetch('/batchpayments/{batchPaymentId}/cancel', 'post', metadata);
    };
    /**
     * The ability to modify the details of a specific rule based on the rule's unique
     * reference.
     *
     * @summary Edit a specific Rule
     * @throws FetchError<400, types.ModifyRuleResponse400> Validation errors
     */
    SDK.prototype.modifyRule = function (body, metadata) {
        return this.core.fetch('/rules/{ruleId}', 'put', body, metadata);
    };
    /**
     * When you want a new rule on an account you can create one with this endpoint. Note that
     * Rules are linked to an Account and each Account can only have one instance of a Rule
     * type
     *
     * @summary Create a Rule
     * @throws FetchError<400, types.CreateRuleResponse400> Validation errors
     */
    SDK.prototype.createRule = function (body) {
        return this.core.fetch('/rules', 'post', body);
    };
    /**
     * When you no longer want a rule on an account you can do it with this endpoint. You can
     * delete more than one rule in the same request.
     *
     * @summary Delete a Rule
     * @throws FetchError<400, types.RemoveRulesResponse400> Bad Request
     */
    SDK.prototype.removeRules = function (metadata) {
        return this.core.fetch('/rules', 'delete', metadata);
    };
    /**
     * The ability to get the details of all rules associated with the specified account using
     * the Account ID as a reference. Can filter by a specific type using the type parameter.
     *
     * @summary Get all Rules for a specific Account
     * @throws FetchError<400, types.GetRulesResponse400> Bad Request
     */
    SDK.prototype.getRules = function (metadata) {
        return this.core.fetch('/accounts/{id}/rules', 'get', metadata);
    };
    /**
     * You need to know the unique reference of the account and the rule type you want to get
     * to information on.
     *
     * @summary Retrieve a Rule by rule type on a specific account
     * @throws FetchError<400, types.GetRuleResponse400> Bad Request
     */
    SDK.prototype.getRule = function (metadata) {
        return this.core.fetch('/accounts/{id}/rules/{rtype}', 'get', metadata);
    };
    /**
     * This allows you to see the settings for a particular notification that has been set up,
     * for example if you want to check if it is active or the emails the notification is being
     * sent to. It would be best practice to call this before updating a notification.
     *
     * @summary Retrieve a specific notification by unique reference for a specific partner
     * @throws FetchError<400, types.GetPartnerNotificationResponse400> Bad Request
     * @throws FetchError<404, types.GetPartnerNotificationResponse404> Not found
     */
    SDK.prototype.getPartnerNotification = function (metadata) {
        return this.core.fetch('/partners/{partnerId}/notifications/{notificationId}', 'get', metadata);
    };
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
    SDK.prototype.editPartnerNotification = function (body, metadata) {
        return this.core.fetch('/partners/{partnerId}/notifications/{notificationId}', 'put', body, metadata);
    };
    /**
     * This allows you to see the settings for a particular notification that has been set up,
     * for example if you want to check if it is active or the emails the notification is being
     * sent to. It would be best practice to call this before updating a notification.
     *
     * @summary Retrieve a specific notification by unique reference for a specific customer
     * @throws FetchError<400, types.GetCustomerNotificationResponse400> Bad Request
     * @throws FetchError<404, types.GetCustomerNotificationResponse404> Not found
     */
    SDK.prototype.getCustomerNotification = function (metadata) {
        return this.core.fetch('/customers/{customerId}/notifications/{notificationId}', 'get', metadata);
    };
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
    SDK.prototype.editCustomerNotification = function (body, metadata) {
        return this.core.fetch('/customers/{customerId}/notifications/{notificationId}', 'put', body, metadata);
    };
    /**
     * Retrieve details of all notifications set up for a partner using the partner's ID as a
     * reference
     *
     * @summary Get all Notifications linked directly to a Partner
     * @throws FetchError<400, types.GetAllPartnerNotificationsResponse400> Bad Request
     * @throws FetchError<404, types.GetAllPartnerNotificationsResponse404> Not found
     */
    SDK.prototype.getAllPartnerNotifications = function (metadata) {
        return this.core.fetch('/partners/{partnerId}/notifications', 'get', metadata);
    };
    /**
     * Sets up a new notification for a partner using the partner's ID as a reference. Returns
     * a notification ID that should be saved if the notification needs to be amended in the
     * future
     *
     * @summary Set up a Notification for a Partner
     * @throws FetchError<400, types.AddPartnerNotificationResponse400> Bad request
     */
    SDK.prototype.addPartnerNotification = function (body, metadata) {
        return this.core.fetch('/partners/{partnerId}/notifications', 'post', body, metadata);
    };
    /**
     * Retrieve details of all notifications set up for a customer using the customer's ID as a
     * reference
     *
     * @summary Get all Notifications for a Customer
     * @throws FetchError<400, types.GetAllCustomerNotificationsResponse400> Bad Request
     * @throws FetchError<404, types.GetAllCustomerNotificationsResponse404> Not found
     */
    SDK.prototype.getAllCustomerNotifications = function (metadata) {
        return this.core.fetch('/customers/{customerId}/notifications', 'get', metadata);
    };
    /**
     * Sets up a new notification for a customer using the customer's ID as a reference.
     * Returns a notification ID that should be saved if the notification needs to be amended
     * in the future
     *
     * @summary Set up a Notification for a Customer
     * @throws FetchError<400, types.AddCustomerNotificationResponse400> Bad request
     */
    SDK.prototype.addCustomerNotification = function (body, metadata) {
        return this.core.fetch('/customers/{customerId}/notifications', 'post', body, metadata);
    };
    /**
     * Only supports webhook notifications and as such uses the webhook endpoint. Request a
     * specific notification ID and specify you want to see failures. (Max 50)
     *
     * @summary Check if a particular webhook has failed
     * @throws FetchError<400, types.GetFailedWebHooksResponse400> Bad Request
     */
    SDK.prototype.getFailedWebHooks = function (metadata) {
        return this.core.fetch('/webhooks/{webhookId}/failures', 'get', metadata);
    };
    /**
     * Inbound payments - mock (Sandbox only)
     *
     * @summary Endpoint to mock the credit of an account
     * @throws FetchError<400, types.CreatePaymentsResponse400> Bad Request
     */
    SDK.prototype.createPayments = function (body) {
        return this.core.fetch('/credit', 'post', body);
    };
    /**
     * You can suspend a mandate, which means nothing can be done to it (added or amended).
     * There is also the option to cancel all scheduled payments at the same time. There is a
     * call to re-instate the mandate if needed. Suspend is only supported for L&Z mandates.
     *
     * @summary Suspend Mandate for given mandate-id.
     * @throws FetchError<400, types.SuspendMandateResponse400> Validation errors.
     * @throws FetchError<404, types.SuspendMandateResponse404> Not Found
     */
    SDK.prototype.suspendMandate = function (body, metadata) {
        return this.core.fetch('/mandates/{id}/suspend', 'post', body, metadata);
    };
    /**
     * Reinstate Mandate for given mandate-id. Reinstate is only supported for L&Z mandates.
     *
     * @summary Reinstate Mandate for given mandate-id.
     * @throws FetchError<400, types.ReinstateMandateResponse400> Validation errors.
     * @throws FetchError<404, types.ReinstateMandateResponse404> Not Found
     */
    SDK.prototype.reinstateMandate = function (body, metadata) {
        return this.core.fetch('/mandates/{id}/reinstate', 'post', body, metadata);
    };
    /**
     * Creates a Direct Debit collection schedule; the agreed to framework for the collections
     * for the given mandate-id. This could be a single collection or multiple and includes the
     * frequency and amounts of the planned payments.
     *
     * @summary Create the collection schedule for the given mandate-id.
     * @throws FetchError<400, types.CreateCollectionScheduleResponse400> Validation errors
     * @throws FetchError<404, types.CreateCollectionScheduleResponse404> Not Found
     */
    SDK.prototype.createCollectionSchedule = function (body, metadata) {
        return this.core.fetch('/mandates/{id}/collectionschedules', 'post', body, metadata);
    };
    /**
     * Cancel Mandate for given mandate-id.
     *
     * @summary Cancel Mandate for given mandate-id.
     * @throws FetchError<400, types.CancelMandateResponse400> Validation errors.
     * @throws FetchError<404, types.CancelMandateResponse404> Not Found
     */
    SDK.prototype.cancelMandate = function (body, metadata) {
        return this.core.fetch('/mandates/{id}/cancel', 'post', body, metadata);
    };
    /**
     * Bulk request of Direct Debit mandates for the given account-id.
     *
     * @throws FetchError<400, types.CreateBulkMandateResponse400> Validation errors.
     * @throws FetchError<404, types.CreateBulkMandateResponse404> Not Found
     */
    SDK.prototype.createBulkMandate = function (body) {
        return this.core.fetch('/mandates/bulk-create', 'post', body);
    };
    /**
     * Bulk mandate cancellation request for the given account-id.
     *
     * @throws FetchError<400, types.CancelBulkMandateResponse400> Validation errors.
     * @throws FetchError<404, types.CancelBulkMandateResponse404> Not Found
     */
    SDK.prototype.cancelBulkMandate = function (body) {
        return this.core.fetch('/mandates/bulk-cancel', 'post', body);
    };
    /**
     * Cancel a Direct Debit collection schedule for the given collection-id.
     *
     * @throws FetchError<400, types.CancelCollectionScheduleResponse400> Validation errors
     * @throws FetchError<404, types.CancelCollectionScheduleResponse404> Not Found
     */
    SDK.prototype.cancelCollectionSchedule = function (metadata) {
        return this.core.fetch('/collectionschedules/{id}/cancel', 'post', metadata);
    };
    /**
     * Cancel a Direct Debit collection for the given collection-id.
     *
     * @throws FetchError<400, types.CancelCollectionResponse400> Validation errors
     * @throws FetchError<404, types.CancelCollectionResponse404> Not Found
     */
    SDK.prototype.cancelCollection = function (metadata) {
        return this.core.fetch('/collections/{id}/cancel', 'post', metadata);
    };
    /**
     * Represent collection for given collection id
     *
     * @summary Represent collection for given collection id
     * @throws FetchError<400, types.RepresentCollectionResponse400> Validation errors.
     * @throws FetchError<404, types.RepresentCollectionResponse404> Not Found
     */
    SDK.prototype.representCollection = function (metadata) {
        return this.core.fetch('/collection/{id}/represent', 'post', metadata);
    };
    /**
     * Setting up a Mandate is the first step in creating a Direct Debit. You can only set up
     * scheduled payments ('collections') after there is a Mandate created with the details of
     * the payee.
     *
     * @summary Create a Direct Debit mandate for the given account-id.
     * @throws FetchError<400, types.CreateMandateResponse400> Validation errors
     * @throws FetchError<404, types.CreateMandateResponse404> Not Found
     */
    SDK.prototype.createMandate = function (body, metadata) {
        return this.core.fetch('/accounts/{id}/mandates', 'post', body, metadata);
    };
    /**
     * Use this endpoint to get a list of Reconciliations for a given account and date.
     *
     * @summary Get Reconciliations based on search criteria.
     * @throws FetchError<400, types.GetReconciliationsResponse400> Bad Request
     * @throws FetchError<404, types.GetReconciliationsResponse404> Not Found
     */
    SDK.prototype.getReconciliations = function (metadata) {
        return this.core.fetch('/reconciliations', 'get', metadata);
    };
    /**
     * If trying to find one or several particular mandates, then you can narrow down your
     * search by using the filters available here. These include the mandate id, either the
     * submitted or created date range, the account name on the mandate, etc...
     *
     * @summary Get Mandates based on search criteria.
     * @throws FetchError<400, types.GetMandatesResponse400> Bad Request
     * @throws FetchError<404, types.GetMandatesResponse404> Not Found
     */
    SDK.prototype.getMandates = function (metadata) {
        return this.core.fetch('/mandates', 'get', metadata);
    };
    /**
     * By supplying the mandate id you can view all information regarding the collection
     * schedules linked to that mandate.
     *
     * @summary Get all collectionschedules for a mandate
     * @throws FetchError<400, types.GetCollectionSchedulesResponse400> Bad Request
     * @throws FetchError<404, types.GetCollectionSchedulesResponse404> Not Found
     */
    SDK.prototype.getCollectionSchedules = function (metadata) {
        return this.core.fetch('/collectionschedules', 'get', metadata);
    };
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
    SDK.prototype.getCollections = function (metadata) {
        return this.core.fetch('/collections', 'get', metadata);
    };
    /**
     * Support knowledge based authentication (KBA)
     *
     * @summary Update card authentication
     * @throws FetchError<400, types.UpdateCardAuthenticationResponse400> Invalid request
     */
    SDK.prototype.updateCardAuthentication = function (body, metadata) {
        return this.core.fetch('/cards/{id}/authentication', 'put', body, metadata);
    };
    /**
     * Retrieve card report type notification configuration for partner
     *
     * @throws FetchError<400, types.GetNotificationConfigurationsForAGivenPartnerAndReportTypeResponse400> Invalid request
     * @throws FetchError<403, types.GetNotificationConfigurationsForAGivenPartnerAndReportTypeResponse403> Partner can not access this data
     */
    SDK.prototype.getNotificationConfigurationsForAGivenPartnerAndReportType = function (metadata) {
        return this.core.fetch('/partners/{partnerId}/card-report-types/{reportType}/notifications', 'get', metadata);
    };
    /**
     * Update report type notification configuration for partner
     *
     * @throws FetchError<400, types.UpdateNotificationConfigurationsForAGivenPartnerAndReportTypeResponse400> Invalid request
     */
    SDK.prototype.updateNotificationConfigurationsForAGivenPartnerAndReportType = function (body, metadata) {
        return this.core.fetch('/partners/{partnerId}/card-report-types/{reportType}/notifications', 'post', body, metadata);
    };
    /**
     * Delete card report notification configuration for partner and report type
     *
     * @throws FetchError<400, types.DeleteAllNotificationConfigurationsForAGivenPartnerAndReportTypeResponse400> Invalid request
     */
    SDK.prototype.deleteAllNotificationConfigurationsForAGivenPartnerAndReportType = function (metadata) {
        return this.core.fetch('/partners/{partnerId}/card-report-types/{reportType}/notifications', 'delete', metadata);
    };
    /**
     * Toggle card report notification for partner and report type
     *
     * @throws FetchError<400, types.ToggleNotificationsForAGivenPartnerAndReportTypeResponse400> Invalid request
     */
    SDK.prototype.toggleNotificationsForAGivenPartnerAndReportType = function (body, metadata) {
        return this.core.fetch('/partners/{partnerId}/card-report-types/{reportType}/notifications/status', 'post', body, metadata);
    };
    /**
     * Bulk create partner custom field keys
     *
     * @summary Bulk create partner custom field keys
     * @throws FetchError<400, types.BulkCreatePartnerCustomFieldKeysResponse400> Invalid request
     */
    SDK.prototype.bulkCreatePartnerCustomFieldKeys = function (body, metadata) {
        return this.core.fetch('/partner/{partnerId}/bulk-card-custom-fields', 'post', body, metadata);
    };
    /**
     * Retrieve card report type notification configuration for customer
     *
     * @throws FetchError<400, types.GetNotificationConfigurationsForAGivenCustomerAndReportTypeResponse400> Invalid request
     * @throws FetchError<403, types.GetNotificationConfigurationsForAGivenCustomerAndReportTypeResponse403> Customer can not access this data
     */
    SDK.prototype.getNotificationConfigurationsForAGivenCustomerAndReportType = function (metadata) {
        return this.core.fetch('/customers/{customerId}/card-report-types/{reportType}/notifications', 'get', metadata);
    };
    /**
     * Update report type notification configuration for customer
     *
     * @throws FetchError<400, types.UpdateNotificationConfigurationsForAGivenCustomerAndReportTypeResponse400> Invalid request
     */
    SDK.prototype.updateNotificationConfigurationsForAGivenCustomerAndReportType = function (body, metadata) {
        return this.core.fetch('/customers/{customerId}/card-report-types/{reportType}/notifications', 'post', body, metadata);
    };
    /**
     * Delete card report notification configuration for customer and report type
     *
     * @throws FetchError<400, types.DeleteAllNotificationConfigurationsForAGivenCustomerAndReportTypeResponse400> Invalid request
     */
    SDK.prototype.deleteAllNotificationConfigurationsForAGivenCustomerAndReportType = function (metadata) {
        return this.core.fetch('/customers/{customerId}/card-report-types/{reportType}/notifications', 'delete', metadata);
    };
    /**
     * Toggled notifications for customer and card report type
     *
     * @throws FetchError<400, types.ToggleNotificationsForAGivenCustomerAndReportTypeResponse400> Invalid request
     */
    SDK.prototype.toggleNotificationsForAGivenCustomerAndReportType = function (body, metadata) {
        return this.core.fetch('/customers/{customerId}/card-report-types/{reportType}/notifications/status', 'post', body, metadata);
    };
    /**
     * Bulk create customer custom field keys
     *
     * @summary Bulk create customer custom field keys
     * @throws FetchError<400, types.BulkCreateCustomerCustomFieldKeysResponse400> Invalid request
     */
    SDK.prototype.bulkCreateCustomerCustomFieldKeys = function (body, metadata) {
        return this.core.fetch('/customer/{customerId}/bulk-card-custom-fields', 'post', body, metadata);
    };
    /**
     * View the details of an existing card
     *
     * @throws FetchError<400, types.GetCardResponse400> Invalid request
     */
    SDK.prototype.getCard = function (metadata) {
        return this.core.fetch('/cards/{id}', 'get', metadata);
    };
    /**
     * Update card and cardholder details
     *
     * @summary Update a card
     * @throws FetchError<400, types.UpdateResponse400> Invalid request
     */
    SDK.prototype.update = function (body, metadata) {
        return this.core.fetch('/cards/{id}', 'post', body, metadata);
    };
    /**
     * Update card - for now, the removal of cancellationDate, authWindowStartDate and
     * authWindowEndDate fields is the only allowed action
     *
     * @summary Update card
     * @throws FetchError<400, types.UpdateCardResponse400> Invalid request
     */
    SDK.prototype.updateCard = function (body, metadata) {
        return this.core.fetch('/cards/{id}', 'patch', body, metadata);
    };
    /**
     * Restores a previously suspended card to the status it was in prior to being suspended as
     * applied by the issuer or program manager.
     * Use of this endpoint is `Restricted`, depending on access being granted through
     * contractual setup with Modulr.
     *
     * @summary [Restricted] Unsuspend a card
     * @throws FetchError<400, types.UnsuspendCardResponse400> Invalid request
     */
    SDK.prototype.unsuspendCard = function (metadata) {
        return this.core.fetch('/cards/{id}/unsuspend', 'post', metadata);
    };
    /**
     * Unblocking a card re-enables normal authorisation processing.
     *
     * @summary Unblock an existing card
     * @throws FetchError<400, types.UnblockCardResponse400> Invalid request
     */
    SDK.prototype.unblockCard = function (metadata) {
        return this.core.fetch('/cards/{id}/unblock', 'post', metadata);
    };
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
    SDK.prototype.suspendCard = function (metadata) {
        return this.core.fetch('/cards/{id}/suspend', 'post', metadata);
    };
    SDK.prototype.generateCardHolderToken = function (body, metadata) {
        return this.core.fetch('/cards/{id}/secure-details-token', 'post', body, metadata);
    };
    /**
     * Replace a card, with a reason STOLEN, DAMAGED, LOST, RENEW.
     *
     * @summary Replace a card
     * @throws FetchError<400, types.ReplaceCardResponse400> Invalid request
     */
    SDK.prototype.replaceCard = function (body, metadata) {
        return this.core.fetch('/cards/{id}/replace', 'post', body, metadata);
    };
    /**
     * Retrieves the PIN for a card, as a reminder for the cardholder
     *
     * @summary Retrieve PIN
     * @throws FetchError<400, types.RetrievePinResponse400> Invalid request
     * @throws FetchError<403, types.RetrievePinResponse403> Forbidden. `Card Management Token` may be missing or invalid
     */
    SDK.prototype.retrievePIN = function (metadata) {
        return this.core.fetch('/cards/{id}/pin', 'get', metadata);
    };
    /**
     * Reset the card's PIN for a specific card
     *
     * @summary Reset card PIN
     * @throws FetchError<400, types.ResetPinResponse400> Invalid request
     */
    SDK.prototype.resetPin = function (body, metadata) {
        return this.core.fetch('/cards/{id}/pin', 'post', body, metadata);
    };
    /**
     * Unblock the card's PIN so that it can be used by the cardholder. CVC2 will also be
     * unblocked, where required.
     *
     * @summary Unblock PIN
     * @throws FetchError<400, types.UnblockPinResponse400> Invalid request
     */
    SDK.prototype.unblockPin = function (metadata) {
        return this.core.fetch('/cards/{id}/pin/unblock', 'post', metadata);
    };
    /**
     * Retrieves and encrypts the data needed for the client application to provision a card to
     * Apple Pay
     *
     * @summary Get in-app provisioning data for Apple Pay
     * @throws FetchError<400, types.GetInAppProvisioningForAppleResponse400> Invalid request
     */
    SDK.prototype.getInAppProvisioningForApple = function (body, metadata) {
        return this.core.fetch('/cards/{id}/in-app-provisioning/apple', 'post', body, metadata);
    };
    /**
     * Replace the values of a card's custom fields if they exist or create new custom fields
     * with the given values if they do not exist
     *
     * @summary Update a card's custom fields
     * @throws FetchError<400, types.UpdateCardCustomFieldsResponse400> Invalid request
     */
    SDK.prototype.updateCardCustomFields = function (body, metadata) {
        return this.core.fetch('/cards/{id}/custom-fields', 'post', body, metadata);
    };
    SDK.prototype.cancelCard = function (body, metadata) {
        return this.core.fetch('/cards/{id}/cancel', 'post', body, metadata);
    };
    /**
     * Blocking a card temporarily disables authorisation processing. This means that all _new_
     * authorisations will be immediately declined. Outstanding authorisations are unaffected
     * and settlement, chargebacks, refunds, etc will continue to function as normal.
     *
     * @summary Block an existing card
     * @throws FetchError<400, types.BlockCardResponse400> Invalid request
     */
    SDK.prototype.blockCard = function (metadata) {
        return this.core.fetch('/cards/{id}/block', 'post', metadata);
    };
    /**
     * Physical cards issued by Modulr will be mailed out to cardholders in an inactive state.
     * A cardholder will need to have their card activated before it can be used. Cards can
     * only be activated whilst they have a status of `CREATED`.
     *
     * @summary Activate a physical card
     * @throws FetchError<400, types.ActivateCardResponse400> Invalid request
     */
    SDK.prototype.activateCard = function (metadata) {
        return this.core.fetch('/cards/{id}/activate', 'post', metadata);
    };
    /**
     * Reset the PIN for a card using a client access token. This should be done from the
     * card-holder device and not directly by the partner
     *
     * @summary Reset card PIN
     * @throws FetchError<400, types.SecureResetPinResponse400> Invalid request
     */
    SDK.prototype.secureResetPin = function (body) {
        return this.core.fetch('/cards/secure-pin-reset', 'post', body);
    };
    /**
     * Retrieve card details by PAN
     *
     * @summary Card enquiry
     * @throws FetchError<400, types.CardEnquiryResponse400> Invalid request
     */
    SDK.prototype.cardEnquiry = function (body) {
        return this.core.fetch('/cards/enquiry', 'post', body);
    };
    /**
     * Restores a previously suspended token to active
     *
     * @summary Unsuspend card token
     * @throws FetchError<400, types.UnsuspendCardTokenResponse400> Invalid request
     */
    SDK.prototype.unsuspendCardToken = function (metadata) {
        return this.core.fetch('/card-tokens/{tokenId}/unsuspend', 'post', metadata);
    };
    /**
     * Suspends a token to temporarily prevent any new authorisations
     *
     * @summary Suspend card token
     * @throws FetchError<400, types.SuspendCardTokenResponse400> Invalid request
     */
    SDK.prototype.suspendCardToken = function (metadata) {
        return this.core.fetch('/card-tokens/{tokenId}/suspend', 'post', metadata);
    };
    /**
     * Deactivating a token permanently disables authorisation processing. This action is
     * irreversible
     *
     * @summary Deactivate card token
     * @throws FetchError<400, types.DeactivateCardTokenResponse400> Invalid request
     */
    SDK.prototype.deactivateCardToken = function (metadata) {
        return this.core.fetch('/card-tokens/{tokenId}/deactivate', 'post', metadata);
    };
    /**
     * [Restricted] Expire an existing authorisation
     *
     * @summary [Restricted] Expire an existing authorisation
     * @throws FetchError<400, types.ExpireAuthorisationResponse400> Bad Request
     */
    SDK.prototype.expireAuthorisation = function (metadata) {
        return this.core.fetch('/authorisations/{authId}/expire', 'post', metadata);
    };
    /**
     * Asynchronously create a physical card. The response will include a resource to allow the
     * client to check the status of the request.
     *
     * @summary Create a new physical card
     * @throws FetchError<400, types.CreatePhysicalCardResponse400> Invalid request
     */
    SDK.prototype.createPhysicalCard = function (body, metadata) {
        return this.core.fetch('/accounts/{aid}/physical-cards', 'post', body, metadata);
    };
    /**
     * View the details of existing cards by account
     *
     * @throws FetchError<400, types.GetCardsByAccountResponse400> Invalid request
     */
    SDK.prototype.getCardsByAccount = function (metadata) {
        return this.core.fetch('/accounts/{aid}/cards', 'get', metadata);
    };
    /**
     * Create a new virtual card
     *
     * @throws FetchError<400, types.CreateCardResponse400> Invalid request
     */
    SDK.prototype.createCard = function (body, metadata) {
        return this.core.fetch('/accounts/{aid}/cards', 'post', body, metadata);
    };
    /**
     * View existing partner card custom field keys
     *
     * @throws FetchError<400, types.GetPartnerCustomFieldKeysResponse400> Invalid request
     */
    SDK.prototype.getPartnerCustomFieldKeys = function (metadata) {
        return this.core.fetch('/partner/{partnerId}/card-custom-fields', 'get', metadata);
    };
    /**
     * View existing customer card custom field keys
     *
     * @throws FetchError<400, types.GetCustomerCustomFieldKeysResponse400> Invalid request
     */
    SDK.prototype.getCustomerCustomFieldKeys = function (metadata) {
        return this.core.fetch('/customer/{customerId}/card-custom-fields', 'get', metadata);
    };
    /**
     * View the details of existing cards
     *
     * @throws FetchError<400, types.GetCardsResponse400> Invalid request
     */
    SDK.prototype.getCards = function (metadata) {
        return this.core.fetch('/cards', 'get', metadata);
    };
    /**
     * Retrieves all payment card tokens for the given card
     *
     * @summary Get card tokens
     * @throws FetchError<400, types.GetCardTokensResponse400> Invalid request
     */
    SDK.prototype.getCardTokens = function (metadata) {
        return this.core.fetch('/cards/{id}/tokens', 'get', metadata);
    };
    /**
     * Receives the secure card details token as a parameter. This call is meant to be done
     * from the cardholder device and not directly by the partner
     *
     * @summary Retrieve secure card details (PAN + CVV + PIN)
     * @throws FetchError<400, types.GetSecureCardDetailsResponse400> Invalid request
     * @throws FetchError<403, types.GetSecureCardDetailsResponse403> Forbidden. Token may be missing or invalid
     */
    SDK.prototype.getSecureCardDetails = function () {
        return this.core.fetch('/cards/secure-details', 'get');
    };
    /**
     * Retrieves the OTP details given the corresponding card token ID
     *
     * @summary Get card token OTP details
     * @throws FetchError<400, types.GetOtpDetailsResponse400> Invalid request
     * @throws FetchError<404, types.GetOtpDetailsResponse404> Not found
     */
    SDK.prototype.getOtpDetails = function (metadata) {
        return this.core.fetch('/card-tokens/{tokenId}/otp', 'get', metadata);
    };
    /**
     * View the details of card tasks.  Ordered by createdDate, with the newest entries
     * appearing first
     *
     * @summary Get tasks
     * @throws FetchError<400, types.GetAsyncTasksResponse400> Invalid request
     */
    SDK.prototype.getAsyncTasks = function (metadata) {
        return this.core.fetch('/card-tasks', 'get', metadata);
    };
    /**
     * Retrieve the card task. If the task is complete, the resource URL will be provided to
     * allow client to fetch the completed resource.
     *
     * @summary Get a card task
     * @throws FetchError<400, types.GetAsyncTaskResponse400> Invalid request
     */
    SDK.prototype.getAsyncTask = function (metadata) {
        return this.core.fetch('/card-tasks/{id}', 'get', metadata);
    };
    /**
     * Retrieve card reports
     *
     * @summary Retrieve card reports
     * @throws FetchError<400, types.SearchReportsResponse400> Bad Request
     * @throws FetchError<403, types.SearchReportsResponse403> Unauthorised
     */
    SDK.prototype.searchReports = function (metadata) {
        return this.core.fetch('/card-reports', 'get', metadata);
    };
    /**
     * Download a specific card report
     *
     * @summary Download a specific card report
     * @throws FetchError<400, types.RetrieveReportResponse400> Bad Request
     * @throws FetchError<403, types.RetrieveReportResponse403> Unauthorised
     * @throws FetchError<404, types.RetrieveReportResponse404> Not found
     */
    SDK.prototype.retrieveReport = function (metadata) {
        return this.core.fetch('/card-reports/{reportId}/report', 'get', metadata);
    };
    /**
     * View activities for a specified list of cards and a given time frame. View activities
     * for all cards belonging to a specified list of accounts and a given time frame. View all
     * activities for a single card when a single card ID is specified, time frame is optional.
     *
     * @summary View activities for specific cards or over a date range
     * @throws FetchError<400, types.GetCardActivitiesResponse400> Invalid request
     */
    SDK.prototype.getCardActivities = function (metadata) {
        return this.core.fetch('/activities', 'get', metadata);
    };
    /**
     * View the details of create physical card tasks by account.  Ordered by createdDate, with
     * the newest entries appearing first
     *
     * @summary Get physical card create tasks by account
     * @throws FetchError<400, types.GetCreatePhysicalCardAsyncTasksByAccountResponse400> Invalid request
     */
    SDK.prototype.getCreatePhysicalCardAsyncTasksByAccount = function (metadata) {
        return this.core.fetch('/accounts/{aid}/physical-card-request-tasks', 'get', metadata);
    };
    /**
     * Delete partner custom field key
     *
     * @summary Delete partner custom field key
     * @throws FetchError<400, types.DeletePartnerCustomFieldKeyResponse400> Invalid request
     */
    SDK.prototype.deletePartnerCustomFieldKey = function (metadata) {
        return this.core.fetch('/partner/{partnerId}/card-custom-fields/{key}', 'delete', metadata);
    };
    /**
     * Delete customer custom field key
     *
     * @summary Delete customer custom field key
     * @throws FetchError<400, types.DeleteCustomerCustomFieldKeyResponse400> Invalid request
     */
    SDK.prototype.deleteCustomerCustomFieldKey = function (metadata) {
        return this.core.fetch('/customer/{customerId}/card-custom-fields/{key}', 'delete', metadata);
    };
    /**
     * Delete card custom field
     *
     * @summary Delete card custom field
     * @throws FetchError<400, types.DeleteCardCustomFieldResponse400> Invalid request
     */
    SDK.prototype.deleteCardCustomField = function (metadata) {
        return this.core.fetch('/cards/{id}/custom-fields/{key}', 'delete', metadata);
    };
    /**
     * Reject Collection
     *
     * @summary Reject Collection
     * @throws FetchError<400, types.RejectCollectionResponse400> Collection has not been rejected
     */
    SDK.prototype.rejectCollection = function (body) {
        return this.core.fetch('/directdebits/reject', 'post', body);
    };
    /**
     * Used to request the cancellation of a Mandate.
     *
     * @summary Cancel a specific Mandate
     * @throws FetchError<400, types.CancelDdosMandateResponse400> Bad Request
     */
    SDK.prototype.cancelDdosMandate = function (body) {
        return this.core.fetch('/directdebits/cancel', 'post', body);
    };
    /**
     * Used to get all the Mandates for a specific account.
     *
     * @summary Retrieve all Mandates for an account
     * @throws FetchError<400, types.RetrieveMandatesResponse400> Bad Request
     */
    SDK.prototype.retrieveMandates = function (metadata) {
        return this.core.fetch('/directdebits/enquire/{accountId}', 'get', metadata);
    };
    /**
     * Uploads the payment file and store the valid files extracted payments for later creating
     * payments
     *
     * @summary Upload payment file and store valid payments
     * @throws FetchError<400, types.UploadPaymentFileResponse400> Bad Request
     * @throws FetchError<500, types.UploadPaymentFileResponse500> 500 error code is issued when problem occurred during decoding and decompressing file
     * content
     */
    SDK.prototype.uploadPaymentFile = function (body) {
        return this.core.fetch('/payment-files', 'post', body);
    };
    /**
     * Create a batch payment request from a valid upload file and send for processing to the
     * payment service
     *
     * @summary Create payments from an uploaded file
     * @throws FetchError<400, types.ProceedResponse400> Invalid payment file
     */
    SDK.prototype.proceed = function (body, metadata) {
        return this.core.fetch('/payment-files/{fileId}/proceed', 'post', body, metadata);
    };
    /**
     * Get latest status of an uploaded payment file
     *
     * @summary Get an upload file latest status
     * @throws FetchError<400, types.StatusResponse400> Invalid Payment file
     */
    SDK.prototype.status = function (metadata) {
        return this.core.fetch('/payment-files/{fileId}', 'get', metadata);
    };
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
    SDK.prototype.createOutboundCop = function (body) {
        return this.core.fetch('/account-name-check', 'post', body);
    };
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
    SDK.prototype.getSrdAccounts = function (metadata) {
        return this.core.fetch('/account-name-check/srd-accounts', 'get', metadata);
    };
    /**
     * Create an authorisation for a card
     *
     * @summary Create a card authorisation
     * @throws FetchError<400, types.CreateAuthorisationResponse400> Validation errors
     */
    SDK.prototype.createAuthorisation = function (body, metadata) {
        return this.core.fetch('/cards/{cardId}/authorisations', 'post', body, metadata);
    };
    /**
     * Settle the card authorisation
     *
     * @summary Settle the card authorisation
     * @throws FetchError<400, types.SettleAuthorisationResponse400> Validation errors
     */
    SDK.prototype.settleAuthorisation = function (metadata) {
        return this.core.fetch('/authorisations/{authId}/settle', 'post', metadata);
    };
    /**
     * Simulate a reversal of an authorization for a card
     *
     * @summary Reverse the card authorisation
     * @throws FetchError<400, types.ReverseAuthorisationResponse400> Validation errors
     */
    SDK.prototype.reverseAuthorisation = function (metadata) {
        return this.core.fetch('/authorisations/{authId}/reverse', 'post', metadata);
    };
    /**
     * Initiates a new Variable Recurring Payment using an existing authorised consent.
     *
     * @summary Initiate a Variable Recurring Payment.
     * @throws FetchError<400, types.InitiateVrpPaymentResponse400> The consent cannot be processed as it does not exist.
     */
    SDK.prototype.initiateVrpPayment = function (body) {
        return this.core.fetch('/vrp', 'post', body);
    };
    /**
     * Create a Variable Recurring Payment (VRP) consent for authorisation by the payment
     * service user. The consent can then be used to initiate one or more payments within the
     * payment constraints specified.
     *
     * @summary Create a VRP consent
     * @throws FetchError<400, types.InitiateConsentCreationResponse400> Bad Request
     */
    SDK.prototype.initiateConsentCreation = function (body) {
        return this.core.fetch('/vrp-consents', 'post', body);
    };
    /**
     * Confirm the availability of funds in account, prior to initiating a Variable Recurring
     * Payment, using an authorised consent.
     *
     * @summary Confirm the availability of funds in an account.
     * @throws FetchError<400, types.ConfirmFundsResponse400> Confirmation of funds request cannot be processed as the consent with the provided ID
     * does not exist.
     */
    SDK.prototype.confirmFunds = function (body, metadata) {
        return this.core.fetch('/vrp-consents/{consentId}/funds-confirmation', 'post', body, metadata);
    };
    /**
     * Initiate a new standing order to the specified destination account from an account held
     * at an ASPSP.
     *
     * @summary Initiate standing order from ASPSP
     * @throws FetchError<400, types.CreateStandingOrderInitiationResponse400> Bad Request
     */
    SDK.prototype.createStandingOrderInitiation = function (body) {
        return this.core.fetch('/standing-order-initiations', 'post', body);
    };
    /**
     * Initiate a payment to the specified destination account from an account held at an
     * ASPSP.
     *
     * @summary Initiate payment from ASPSP
     * @throws FetchError<400, types.CreatePaymentInitiationResponse400> Bad Request
     */
    SDK.prototype.createPaymentInitiation = function (body) {
        return this.core.fetch('/payment-initiations', 'post', body);
    };
    /**
     * Fetch the details of a payment initiated using Variable Recurring Payment (VRP) based on
     * a unique payment ID.
     *
     * @summary Get Variable Recurring Payment
     * @throws FetchError<400, types.GetVrpPaymentResponse400> The payment cannot be retrieved as it does not exist.
     */
    SDK.prototype.getVrpPayment = function (metadata) {
        return this.core.fetch('/vrp/{id}', 'get', metadata);
    };
    /**
     * Returns information about a given Variable Recurring Payment consent.
     *
     * @summary Get VRP consent.
     * @throws FetchError<400, types.GetVrpConsentResponse400> The consent details cannot be retrieved as it does not exist
     */
    SDK.prototype.getVrpConsent = function (metadata) {
        return this.core.fetch('/vrp-consents/{consentId}', 'get', metadata);
    };
    /**
     * Cancels a VRP consent and stops further variable recurring payments being made using it.
     *
     * @summary Revoke a VRP consent.
     * @throws FetchError<400, types.RevokeVrpConsentResponse400> The consent cannot be revoked as it does not exist
     */
    SDK.prototype.revokeVrpConsent = function (metadata) {
        return this.core.fetch('/vrp-consents/{consentId}', 'delete', metadata);
    };
    /**
     * Retrieve the details of a specific standing order initiation request.
     *
     * @summary Get standing order initiation request details
     * @throws FetchError<400, types.GetStandingOrderInitiationResponse400> Bad Request
     * @throws FetchError<404, types.GetStandingOrderInitiationResponse404> Standing order initiation not found
     */
    SDK.prototype.getStandingOrderInitiation = function (metadata) {
        return this.core.fetch('/standing-order-initiations/{standingOrderInitiationId}', 'get', metadata);
    };
    /**
     * Retrieve the details of a specific payment initiation request.
     *
     * @summary Get payment initiation request details
     * @throws FetchError<400, types.GetPaymentInitiationResponse400> Bad Request
     * @throws FetchError<404, types.GetPaymentInitiationResponse404> Payment initiation not found
     */
    SDK.prototype.getPaymentInitiation = function (metadata) {
        return this.core.fetch('/payment-initiations/{paymentInitiationId}', 'get', metadata);
    };
    /**
     * Gets a list of all supported Account Servicing Payment Service Providers (ASPSPs).
     *
     * @summary Get supported ASPSPs
     * @throws FetchError<400, types.GetAspsProvidersResponse400> Bad Request
     */
    SDK.prototype.getAspsProviders = function () {
        return this.core.fetch('/aspsps', 'get');
    };
    /**
     * Uploads and stores document in a repository. Gives back Url encoded document path in the
     * repository
     *
     * @summary Uploads and stores document
     * @throws FetchError<400, types.UploadResponse400> Validation errors
     */
    SDK.prototype.upload = function (body) {
        return this.core.fetch('/documents', 'post', body);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;