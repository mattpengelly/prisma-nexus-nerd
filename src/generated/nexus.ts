/**
 * This file was automatically generated by GraphQL Nexus
 * Do not make changes to this file directly
 */


import { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    datetime<FieldName extends string>(fieldName: FieldName, opts?: core.ScalarInputFieldConfig<core.GetGen3<"inputTypes", TypeName, FieldName>>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    datetime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenRootTypes {
  Account: { // root type
    account_creator_id: number; // Int!
    acct_num: string; // String!
    advisor_id: number; // Int!
    Company?: NexusGenRootTypes['Company'] | null; // Company
    Contact_Account_contact_primary_idToContact?: NexusGenRootTypes['Contact'] | null; // Contact
    Contact_Account_contact_secondary_idToContact?: NexusGenRootTypes['Contact'] | null; // Contact
    contact_primary_id: number; // Int!
    contact_secondary_id?: number | null; // Int
    from_lead_id: number; // Int!
    id: number; // Int!
    Lead?: NexusGenRootTypes['Lead'] | null; // Lead
    lead_creator_id: number; // Int!
    Location?: NexusGenRootTypes['Location'] | null; // Location
    location_id?: number | null; // Int
    organization_id?: string | null; // String
    status: string; // String!
    test_account?: boolean | null; // Boolean
    type: string; // String!
    User_Account_account_creator_idToUser?: NexusGenRootTypes['User'] | null; // User
    User_Account_advisor_idToUser?: NexusGenRootTypes['User'] | null; // User
    User_Account_lead_creator_idToUser?: NexusGenRootTypes['User'] | null; // User
  }
  Assessment: { // root type
    Account?: NexusGenRootTypes['Account'] | null; // Account
    account_id: number; // Int!
    AssessmentAnswer?: NexusGenRootTypes['AssessmentAnswer'][] | null; // [AssessmentAnswer!]
    assessor_id: number; // Int!
    date_assessed: any; // DateTime!
    id: number; // Int!
    Lead?: NexusGenRootTypes['Lead'] | null; // Lead
    lead_id: number; // Int!
    User?: NexusGenRootTypes['User'] | null; // User
  }
  AssessmentAnswer: { // root type
    answer: string; // String!
    Assessment: NexusGenRootTypes['Assessment']; // Assessment!
    assessment_id: number; // Int!
    AssessmentPhrasing: NexusGenRootTypes['AssessmentPhrasing']; // AssessmentPhrasing!
    AssessmentQuestion: NexusGenRootTypes['AssessmentQuestion']; // AssessmentQuestion!
    id: number; // Int!
    phrasing_id: number; // Int!
    question_id: number; // Int!
  }
  AssessmentPhrasing: { // root type
    AssessmentAnswers?: NexusGenRootTypes['AssessmentAnswer'][] | null; // [AssessmentAnswer!]
    AssessmentQuestion: NexusGenRootTypes['AssessmentQuestion']; // AssessmentQuestion!
    id: number; // Int!
    phrasing: string; // String!
    question_id: number; // Int!
    related_info: string; // String!
  }
  AssessmentQuestion: { // root type
    answer_type: string; // String!
    AssessmentAnswers?: NexusGenRootTypes['AssessmentAnswer'][] | null; // [AssessmentAnswer!]
    AssessmentPhrasing?: NexusGenRootTypes['AssessmentPhrasing'] | null; // AssessmentPhrasing
    AssessmentPhrasings?: NexusGenRootTypes['AssessmentPhrasing'][] | null; // [AssessmentPhrasing!]
    category: string; // String!
    current_phrasing_id?: number | null; // Int
    enum: string; // String!
    EnumAssessmentAnswers?: NexusGenRootTypes['EnumAssessmentAnswer'][] | null; // [EnumAssessmentAnswer!]
    id: number; // Int!
    info_type: string; // String!
    question: string; // String!
    required: boolean; // Boolean!
  }
  Company: { // root type
    active: boolean; // Boolean!
    child_co: string; // String!
    id: number; // Int!
    name: string; // String!
    parent_co: string; // String!
    test_lead_source: boolean; // Boolean!
  }
  Contact: { // root type
    Account_Account_contact_primary_idToContact?: NexusGenRootTypes['Account'][] | null; // [Account!]
    Account_Account_contact_secondary_idToContact?: NexusGenRootTypes['Account'][] | null; // [Account!]
    additional_location: number; // Int!
    email_one: string; // String!
    email_two: string; // String!
    EnumLeadCampaignDisqualReason?: NexusGenRootTypes['EnumLeadCampaignDisqualReason'] | null; // EnumLeadCampaignDisqualReason
    EnumMarketingDisqualReason?: NexusGenRootTypes['EnumMarketingDisqualReason'] | null; // EnumMarketingDisqualReason
    EnumSalesDisqualReason?: NexusGenRootTypes['EnumSalesDisqualReason'] | null; // EnumSalesDisqualReason
    first_name: string; // String!
    id: number; // Int!
    last_name: string; // String!
    lead_campaign_disqual_reason_id?: number | null; // Int
    legal_first_name?: string | null; // String
    marketing_disqual_reason_id?: number | null; // Int
    middle_name?: string | null; // String
    phone_cell: string; // String!
    phone_home: string; // String!
    primary_location_id: number; // Int!
    sales_disqual_reason_id?: number | null; // Int
    suffix?: string | null; // String
    test_contact: boolean; // Boolean!
  }
  EnumAssessmentAnswer: { // root type
    AssessmentQuestion?: NexusGenRootTypes['AssessmentQuestion'] | null; // AssessmentQuestion
    choice: string; // String!
    id: number; // Int!
    image?: string | null; // String
    question_id: number; // Int!
  }
  EnumCommunicationType: { // root type
    Contact?: NexusGenRootTypes['Contact'][] | null; // [Contact!]
    ContactCommunicationLog?: NexusGenRootTypes['Contact'][] | null; // [Contact!]
    description: string; // String!
    id: number; // Int!
    LeadWorkingEventLog?: NexusGenRootTypes['Contact'][] | null; // [Contact!]
    name: string; // String!
  }
  EnumLeadCampaignDisqualReason: { // root type
    Contact?: NexusGenRootTypes['Contact'][] | null; // [Contact!]
    id: number; // Int!
    Lead?: NexusGenRootTypes['Lead'][] | null; // [Lead!]
    name: string; // String!
  }
  EnumLeadWorkingEventDispo: { // root type
    Contact?: NexusGenRootTypes['Contact'][] | null; // [Contact!]
    description: string; // String!
    id: number; // Int!
    LeadWorkingEventLog?: NexusGenRootTypes['Contact'][] | null; // [Contact!]
    name: string; // String!
  }
  EnumMarketingDisqualReason: { // root type
    Contact?: NexusGenRootTypes['Contact'][] | null; // [Contact!]
    id: number; // Int!
    Lead?: NexusGenRootTypes['Lead'][] | null; // [Lead!]
    name: string; // String!
  }
  EnumSalesDisqualReason: { // root type
    Contact?: NexusGenRootTypes['Contact'][] | null; // [Contact!]
    id: number; // Int!
    name: string; // String!
  }
  Lead: { // root type
    address_one?: string | null; // String
    address_two?: string | null; // String
    address_verified?: boolean | null; // Boolean
    assessment_complete?: boolean | null; // Boolean
    city?: string | null; // String
    email_one?: string | null; // String
    email_two?: string | null; // String
    EnumLeadCampaignDisqualReason?: NexusGenRootTypes['EnumLeadCampaignDisqualReason'] | null; // EnumLeadCampaignDisqualReason
    EnumMarketingDisqualReason?: NexusGenRootTypes['EnumMarketingDisqualReason'] | null; // EnumMarketingDisqualReason
    first_name?: string | null; // String
    gate_code?: string | null; // String
    id: number; // Int!
    last_name?: string | null; // String
    latitude: string; // String!
    lead_campaign_disqual_reason_id?: number | null; // Int
    lead_campaign_id?: number | null; // Int
    lead_converter_id?: number | null; // Int
    lead_creator_id?: number | null; // Int
    lead_marketing_tag_collection?: string | null; // String
    LeadCampaign: NexusGenRootTypes['LeadCampaign']; // LeadCampaign!
    LeadConverter?: NexusGenRootTypes['User'] | null; // User
    LeadCreator?: NexusGenRootTypes['User'] | null; // User
    LeadOwner?: NexusGenRootTypes['User'] | null; // User
    legal_first_name?: string | null; // String
    longitude: string; // String!
    marketing_callable?: boolean | null; // Boolean
    marketing_disqual_reason_id?: number | null; // Int
    marketing_emailable?: boolean | null; // Boolean
    marketing_qualified?: boolean | null; // Boolean
    marketing_textable?: boolean | null; // Boolean
    middle_name?: string | null; // String
    phone_cell?: string | null; // String
    phone_home?: string | null; // String
    stage?: string | null; // String
    state_abbr?: string | null; // String
    suffix?: string | null; // String
    test_lead?: boolean | null; // Boolean
    zip?: string | null; // String
  }
  LeadCampaign: { // root type
    active: boolean; // Boolean!
    Company?: NexusGenRootTypes['Company'] | null; // Company
    company_id: number; // Int!
    id: number; // Int!
    lead_direction: string; // String!
    lead_source_id: number; // Int!
    LeadSource?: NexusGenRootTypes['LeadSource'] | null; // LeadSource
    name: string; // String!
    test_lead_campaign?: boolean | null; // Boolean
  }
  LeadSource: { // root type
    active: boolean; // Boolean!
    id: number; // Int!
    name: string; // String!
    test_lead_source: boolean; // Boolean!
    type: string; // String!
  }
  LeadWorkingEventLog: { // root type
    comm_type_id: number; // Int!
    EnumCommunicationType?: NexusGenRootTypes['EnumCommunicationType'] | null; // EnumCommunicationType
    EnumLeadWorkingEventDispo?: NexusGenRootTypes['EnumLeadWorkingEventDispo'] | null; // EnumLeadWorkingEventDispo
    event_timestamp: any; // DateTime!
    id: number; // Int!
    Lead?: NexusGenRootTypes['Lead'] | null; // Lead
    lead_id: number; // Int!
    lwe_dispo_id: number; // Int!
    lwe_log_creator_id: number; // Int!
    notes: string; // String!
    test_log_entry: boolean; // Boolean!
    User?: NexusGenRootTypes['User'] | null; // User
  }
  Location: { // root type
    Account_Account_location_idToLocation?: NexusGenRootTypes['Account'][] | null; // [Account!]
    active: boolean; // Boolean!
    address_one: string; // String!
    address_two?: string | null; // String
    city: string; // String!
    Contact?: NexusGenRootTypes['Contact'] | null; // Contact
    gate_code: string; // String!
    id: number; // Int!
    latitude: string; // String!
    longitude: string; // String!
    state_abbr: string; // String!
    test_location: boolean; // Boolean!
    zip: string; // String!
  }
  LocationCoords: { // root type
    formatted_address: string; // String!
    latitude: number; // Float!
    longitude: number; // Float!
  }
  Mutation: {};
  Query: {};
  Role: { // root type
    default_access: string; // String!
    id: number; // Int!
    name: string; // String!
    test_role: boolean; // Boolean!
  }
  SalesTeam: { // root type
    active: boolean; // Boolean!
    child_team_id: number; // Int!
    id: number; // Int!
    name: string; // String!
    Office?: NexusGenRootTypes['User'] | null; // User
    office_id: string; // String!
    parent_team_id: number; // Int!
    team_lead_one_id: number; // Int!
    team_lead_two_id: number; // Int!
    test_sales_team: boolean; // Boolean!
    type: string; // String!
    User_SalesTeam_team_lead_one_idToUser?: NexusGenRootTypes['User'] | null; // User
    User_SalesTeamToUser_team_id?: NexusGenRootTypes['User'][] | null; // [User!]
  }
  User: { // root type
    access: string; // String!
    address_one: string; // String!
    address_two: string; // String!
    area_id: number; // Int!
    avatar_link?: string | null; // String
    city: string; // String!
    Company?: NexusGenRootTypes['Company'] | null; // Company
    company_id: number; // Int!
    created_by: number; // Int!
    email_nerd: string; // String!
    email_personal: string; // String!
    employment_status: boolean; // Boolean!
    enitity_type: string; // String!
    first_name: string; // String!
    id: number; // Int!
    last_name: string; // String!
    payroll_id: number; // Int!
    phone_cell: string; // String!
    phone_cell_carrier: string; // String!
    phone_home: string; // String!
    preferred_first_name: string; // String!
    referred_by: number; // Int!
    Role?: NexusGenRootTypes['Role'] | null; // Role
    role_id: number; // Int!
    SalesTeams_SalesTeamsToUsers_team_id?: NexusGenRootTypes['SalesTeam'] | null; // SalesTeam
    security_pin: number; // Int!
    state_abbr: string; // String!
    suffix: string; // String!
    team_id: number; // Int!
    team_position_id: number; // Int!
    test_user: boolean; // Boolean!
    third_party_ids: number; // Int!
    zip: string; // String!
  }
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  DateTime: any;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
}

export interface NexusGenFieldTypes {
  Account: { // field return type
    account_creator_id: number; // Int!
    acct_num: string; // String!
    advisor_id: number; // Int!
    Company: NexusGenRootTypes['Company'] | null; // Company
    Contact_Account_contact_primary_idToContact: NexusGenRootTypes['Contact'] | null; // Contact
    Contact_Account_contact_secondary_idToContact: NexusGenRootTypes['Contact'] | null; // Contact
    contact_primary_id: number; // Int!
    contact_secondary_id: number | null; // Int
    from_lead_id: number; // Int!
    id: number; // Int!
    Lead: NexusGenRootTypes['Lead'] | null; // Lead
    lead_creator_id: number; // Int!
    Location: NexusGenRootTypes['Location'] | null; // Location
    location_id: number | null; // Int
    organization_id: string | null; // String
    status: string; // String!
    test_account: boolean | null; // Boolean
    type: string; // String!
    User_Account_account_creator_idToUser: NexusGenRootTypes['User'] | null; // User
    User_Account_advisor_idToUser: NexusGenRootTypes['User'] | null; // User
    User_Account_lead_creator_idToUser: NexusGenRootTypes['User'] | null; // User
  }
  Assessment: { // field return type
    Account: NexusGenRootTypes['Account'] | null; // Account
    account_id: number; // Int!
    AssessmentAnswer: NexusGenRootTypes['AssessmentAnswer'][] | null; // [AssessmentAnswer!]
    assessor_id: number; // Int!
    date_assessed: any; // DateTime!
    id: number; // Int!
    Lead: NexusGenRootTypes['Lead'] | null; // Lead
    lead_id: number; // Int!
    User: NexusGenRootTypes['User'] | null; // User
  }
  AssessmentAnswer: { // field return type
    answer: string; // String!
    Assessment: NexusGenRootTypes['Assessment']; // Assessment!
    assessment_id: number; // Int!
    AssessmentPhrasing: NexusGenRootTypes['AssessmentPhrasing']; // AssessmentPhrasing!
    AssessmentQuestion: NexusGenRootTypes['AssessmentQuestion']; // AssessmentQuestion!
    id: number; // Int!
    phrasing_id: number; // Int!
    question_id: number; // Int!
  }
  AssessmentPhrasing: { // field return type
    AssessmentAnswers: NexusGenRootTypes['AssessmentAnswer'][] | null; // [AssessmentAnswer!]
    AssessmentQuestion: NexusGenRootTypes['AssessmentQuestion']; // AssessmentQuestion!
    id: number; // Int!
    phrasing: string; // String!
    question_id: number; // Int!
    related_info: string; // String!
  }
  AssessmentQuestion: { // field return type
    answer_type: string; // String!
    AssessmentAnswers: NexusGenRootTypes['AssessmentAnswer'][] | null; // [AssessmentAnswer!]
    AssessmentPhrasing: NexusGenRootTypes['AssessmentPhrasing'] | null; // AssessmentPhrasing
    AssessmentPhrasings: NexusGenRootTypes['AssessmentPhrasing'][] | null; // [AssessmentPhrasing!]
    category: string; // String!
    current_phrasing_id: number | null; // Int
    enum: string; // String!
    EnumAssessmentAnswers: NexusGenRootTypes['EnumAssessmentAnswer'][] | null; // [EnumAssessmentAnswer!]
    id: number; // Int!
    info_type: string; // String!
    question: string; // String!
    required: boolean; // Boolean!
  }
  Company: { // field return type
    active: boolean; // Boolean!
    child_co: string; // String!
    id: number; // Int!
    name: string; // String!
    parent_co: string; // String!
    test_lead_source: boolean; // Boolean!
  }
  Contact: { // field return type
    Account_Account_contact_primary_idToContact: NexusGenRootTypes['Account'][] | null; // [Account!]
    Account_Account_contact_secondary_idToContact: NexusGenRootTypes['Account'][] | null; // [Account!]
    additional_location: number; // Int!
    email_one: string; // String!
    email_two: string; // String!
    EnumLeadCampaignDisqualReason: NexusGenRootTypes['EnumLeadCampaignDisqualReason'] | null; // EnumLeadCampaignDisqualReason
    EnumMarketingDisqualReason: NexusGenRootTypes['EnumMarketingDisqualReason'] | null; // EnumMarketingDisqualReason
    EnumSalesDisqualReason: NexusGenRootTypes['EnumSalesDisqualReason'] | null; // EnumSalesDisqualReason
    first_name: string; // String!
    full_name: string; // String!
    id: number; // Int!
    last_name: string; // String!
    lead_campaign_disqual_reason_id: number | null; // Int
    legal_first_name: string | null; // String
    marketing_disqual_reason_id: number | null; // Int
    middle_name: string | null; // String
    phone_cell: string; // String!
    phone_home: string; // String!
    primary_location_id: number; // Int!
    sales_disqual_reason_id: number | null; // Int
    suffix: string | null; // String
    test_contact: boolean; // Boolean!
  }
  EnumAssessmentAnswer: { // field return type
    AssessmentQuestion: NexusGenRootTypes['AssessmentQuestion'] | null; // AssessmentQuestion
    choice: string; // String!
    id: number; // Int!
    image: string | null; // String
    question_id: number; // Int!
  }
  EnumCommunicationType: { // field return type
    Contact: NexusGenRootTypes['Contact'][] | null; // [Contact!]
    ContactCommunicationLog: NexusGenRootTypes['Contact'][] | null; // [Contact!]
    description: string; // String!
    id: number; // Int!
    LeadWorkingEventLog: NexusGenRootTypes['Contact'][] | null; // [Contact!]
    name: string; // String!
  }
  EnumLeadCampaignDisqualReason: { // field return type
    Contact: NexusGenRootTypes['Contact'][] | null; // [Contact!]
    id: number; // Int!
    Lead: NexusGenRootTypes['Lead'][] | null; // [Lead!]
    name: string; // String!
  }
  EnumLeadWorkingEventDispo: { // field return type
    Contact: NexusGenRootTypes['Contact'][] | null; // [Contact!]
    description: string; // String!
    id: number; // Int!
    LeadWorkingEventLog: NexusGenRootTypes['Contact'][] | null; // [Contact!]
    name: string; // String!
  }
  EnumMarketingDisqualReason: { // field return type
    Contact: NexusGenRootTypes['Contact'][] | null; // [Contact!]
    id: number; // Int!
    Lead: NexusGenRootTypes['Lead'][] | null; // [Lead!]
    name: string; // String!
  }
  EnumSalesDisqualReason: { // field return type
    Contact: NexusGenRootTypes['Contact'][] | null; // [Contact!]
    id: number; // Int!
    name: string; // String!
  }
  Lead: { // field return type
    address_one: string | null; // String
    address_two: string | null; // String
    address_verified: boolean | null; // Boolean
    assessment_complete: boolean | null; // Boolean
    city: string | null; // String
    email_one: string | null; // String
    email_two: string | null; // String
    EnumLeadCampaignDisqualReason: NexusGenRootTypes['EnumLeadCampaignDisqualReason'] | null; // EnumLeadCampaignDisqualReason
    EnumMarketingDisqualReason: NexusGenRootTypes['EnumMarketingDisqualReason'] | null; // EnumMarketingDisqualReason
    first_name: string | null; // String
    gate_code: string | null; // String
    id: number; // Int!
    last_name: string | null; // String
    latitude: string; // String!
    lead_campaign_disqual_reason_id: number | null; // Int
    lead_campaign_id: number | null; // Int
    lead_converter_id: number | null; // Int
    lead_creator_id: number | null; // Int
    lead_marketing_tag_collection: string | null; // String
    LeadCampaign: NexusGenRootTypes['LeadCampaign']; // LeadCampaign!
    LeadConverter: NexusGenRootTypes['User'] | null; // User
    LeadCreator: NexusGenRootTypes['User'] | null; // User
    LeadOwner: NexusGenRootTypes['User'] | null; // User
    legal_first_name: string | null; // String
    longitude: string; // String!
    marketing_callable: boolean | null; // Boolean
    marketing_disqual_reason_id: number | null; // Int
    marketing_emailable: boolean | null; // Boolean
    marketing_qualified: boolean | null; // Boolean
    marketing_textable: boolean | null; // Boolean
    middle_name: string | null; // String
    phone_cell: string | null; // String
    phone_home: string | null; // String
    stage: string | null; // String
    state_abbr: string | null; // String
    suffix: string | null; // String
    test_lead: boolean | null; // Boolean
    zip: string | null; // String
  }
  LeadCampaign: { // field return type
    active: boolean; // Boolean!
    Company: NexusGenRootTypes['Company'] | null; // Company
    company_id: number; // Int!
    id: number; // Int!
    lead_direction: string; // String!
    lead_source_id: number; // Int!
    LeadSource: NexusGenRootTypes['LeadSource'] | null; // LeadSource
    name: string; // String!
    test_lead_campaign: boolean | null; // Boolean
  }
  LeadSource: { // field return type
    active: boolean; // Boolean!
    id: number; // Int!
    name: string; // String!
    test_lead_source: boolean; // Boolean!
    type: string; // String!
  }
  LeadWorkingEventLog: { // field return type
    comm_type_id: number; // Int!
    EnumCommunicationType: NexusGenRootTypes['EnumCommunicationType'] | null; // EnumCommunicationType
    EnumLeadWorkingEventDispo: NexusGenRootTypes['EnumLeadWorkingEventDispo'] | null; // EnumLeadWorkingEventDispo
    event_timestamp: any; // DateTime!
    id: number; // Int!
    Lead: NexusGenRootTypes['Lead'] | null; // Lead
    lead_id: number; // Int!
    lwe_dispo_id: number; // Int!
    lwe_log_creator_id: number; // Int!
    notes: string; // String!
    test_log_entry: boolean; // Boolean!
    User: NexusGenRootTypes['User'] | null; // User
  }
  Location: { // field return type
    Account_Account_location_idToLocation: NexusGenRootTypes['Account'][] | null; // [Account!]
    active: boolean; // Boolean!
    address_one: string; // String!
    address_two: string | null; // String
    city: string; // String!
    Contact: NexusGenRootTypes['Contact'] | null; // Contact
    gate_code: string; // String!
    id: number; // Int!
    latitude: string; // String!
    longitude: string; // String!
    state_abbr: string; // String!
    test_location: boolean; // Boolean!
    zip: string; // String!
  }
  LocationCoords: { // field return type
    formatted_address: string; // String!
    latitude: number; // Float!
    longitude: number; // Float!
  }
  Mutation: { // field return type
    convertLead: NexusGenRootTypes['Account']; // Account!
    createAssessment: NexusGenRootTypes['Assessment']; // Assessment!
    createAssessmentAnswer: NexusGenRootTypes['AssessmentAnswer']; // AssessmentAnswer!
    createAssessmentPhrasing: NexusGenRootTypes['AssessmentPhrasing']; // AssessmentPhrasing!
    createEnumAssessmentAnswer: NexusGenRootTypes['EnumAssessmentAnswer']; // EnumAssessmentAnswer!
    createLead: NexusGenRootTypes['Lead']; // Lead!
    createLWELog: NexusGenRootTypes['LeadWorkingEventLog'] | null; // LeadWorkingEventLog
    createUser: NexusGenRootTypes['User']; // User!
    dynamicAssessmentAnswer: NexusGenRootTypes['AssessmentAnswer']; // AssessmentAnswer!
    updateAssessment: NexusGenRootTypes['Assessment']; // Assessment!
    updateAssessmentAnswer: NexusGenRootTypes['AssessmentAnswer']; // AssessmentAnswer!
    updateAssessmentPhrasing: NexusGenRootTypes['AssessmentPhrasing']; // AssessmentPhrasing!
    updateEnumAssessmentAnswer: NexusGenRootTypes['EnumAssessmentAnswer']; // EnumAssessmentAnswer!
    updateLead: NexusGenRootTypes['Lead']; // Lead!
  }
  Query: { // field return type
    account: NexusGenRootTypes['Account'] | null; // Account
    accounts: NexusGenRootTypes['Account'][] | null; // [Account!]
    assessment: NexusGenRootTypes['Assessment'] | null; // Assessment
    assessmentAnswer: NexusGenRootTypes['AssessmentAnswer'] | null; // AssessmentAnswer
    assessmentAnswers: NexusGenRootTypes['AssessmentAnswer'][] | null; // [AssessmentAnswer!]
    assessmentPhrasing: NexusGenRootTypes['AssessmentPhrasing'] | null; // AssessmentPhrasing
    assessmentPhrasings: NexusGenRootTypes['AssessmentPhrasing'][] | null; // [AssessmentPhrasing!]
    assessmentQuestion: NexusGenRootTypes['AssessmentQuestion'] | null; // AssessmentQuestion
    assessmentQuestions: NexusGenRootTypes['AssessmentQuestion'][] | null; // [AssessmentQuestion!]
    assessments: NexusGenRootTypes['Assessment'][] | null; // [Assessment!]
    coordinatesByAddress: NexusGenRootTypes['LocationCoords'] | null; // LocationCoords
    enumAssessmentAnswer: NexusGenRootTypes['EnumAssessmentAnswer'] | null; // EnumAssessmentAnswer
    enumAssessmentAnswers: NexusGenRootTypes['EnumAssessmentAnswer'][] | null; // [EnumAssessmentAnswer!]
    lead: NexusGenRootTypes['Lead'] | null; // Lead
    leads: NexusGenRootTypes['Lead'][] | null; // [Lead!]
    LWELog: NexusGenRootTypes['LeadWorkingEventLog'] | null; // LeadWorkingEventLog
    LWELogs: NexusGenRootTypes['LeadWorkingEventLog'][] | null; // [LeadWorkingEventLog!]
    pipeline: NexusGenRootTypes['Lead'][] | null; // [Lead!]
    role: NexusGenRootTypes['Role'] | null; // Role
    salesTeam: NexusGenRootTypes['SalesTeam'] | null; // SalesTeam
    salesTeams: NexusGenRootTypes['SalesTeam'][] | null; // [SalesTeam!]
    user: NexusGenRootTypes['User'][] | null; // [User!]
    users: NexusGenRootTypes['User'][] | null; // [User!]
    usersByTeam: NexusGenRootTypes['User'][] | null; // [User!]
  }
  Role: { // field return type
    default_access: string; // String!
    id: number; // Int!
    name: string; // String!
    test_role: boolean; // Boolean!
  }
  SalesTeam: { // field return type
    active: boolean; // Boolean!
    child_team_id: number; // Int!
    id: number; // Int!
    name: string; // String!
    Office: NexusGenRootTypes['User'] | null; // User
    office_id: string; // String!
    parent_team_id: number; // Int!
    team_lead_one_id: number; // Int!
    team_lead_two_id: number; // Int!
    test_sales_team: boolean; // Boolean!
    type: string; // String!
    User_SalesTeam_team_lead_one_idToUser: NexusGenRootTypes['User'] | null; // User
    User_SalesTeamToUser_team_id: NexusGenRootTypes['User'][] | null; // [User!]
  }
  User: { // field return type
    access: string; // String!
    address_one: string; // String!
    address_two: string; // String!
    area_id: number; // Int!
    avatar_link: string | null; // String
    city: string; // String!
    Company: NexusGenRootTypes['Company'] | null; // Company
    company_id: number; // Int!
    created_by: number; // Int!
    email_nerd: string; // String!
    email_personal: string; // String!
    employment_status: boolean; // Boolean!
    enitity_type: string; // String!
    first_name: string; // String!
    full_name: string; // String!
    id: number; // Int!
    last_name: string; // String!
    payroll_id: number; // Int!
    phone_cell: string; // String!
    phone_cell_carrier: string; // String!
    phone_home: string; // String!
    preferred_first_name: string; // String!
    referred_by: number; // Int!
    Role: NexusGenRootTypes['Role'] | null; // Role
    role_id: number; // Int!
    SalesTeams_SalesTeamsToUsers_team_id: NexusGenRootTypes['SalesTeam'] | null; // SalesTeam
    security_pin: number; // Int!
    state_abbr: string; // String!
    suffix: string; // String!
    team_id: number; // Int!
    team_position_id: number; // Int!
    test_user: boolean; // Boolean!
    third_party_ids: number; // Int!
    zip: string; // String!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    convertLead: { // args
      account_creator_id: number; // Int!
      advisor_id: number; // Int!
      lead_id: number; // Int!
      type?: string | null; // String
    }
    createAssessment: { // args
      account_id?: number | null; // Int
      assessor_id?: number | null; // Int
      lead_id?: number | null; // Int
    }
    createAssessmentAnswer: { // args
      answer?: string | null; // String
      assessment_id: number; // Int!
      phrasing_id?: number | null; // Int
      question_id?: number | null; // Int
    }
    createAssessmentPhrasing: { // args
      phrasing?: string | null; // String
      question_id?: number | null; // Int
      related_info?: string | null; // String
    }
    createEnumAssessmentAnswer: { // args
      choice?: string | null; // String
      image?: string | null; // String
      question_id?: number | null; // Int
    }
    createLead: { // args
      address_one?: string | null; // String
      address_two?: string | null; // String
      address_verified?: boolean | null; // Boolean
      city?: string | null; // String
      email_one?: string | null; // String
      email_two?: string | null; // String
      first_name?: string | null; // String
      gate_code?: string | null; // String
      last_name?: string | null; // String
      latitude?: string | null; // String
      lead_campaign_id?: number | null; // Int
      lead_creator_id?: number | null; // Int
      lead_owner_id?: number | null; // Int
      longitude?: string | null; // String
      marketing_qualified?: string | null; // String
      phone_cell?: string | null; // String
      phone_home?: string | null; // String
      stage?: string | null; // String
      state_abbr?: string | null; // String
      test_lead?: boolean | null; // Boolean
      zip?: string | null; // String
    }
    createLWELog: { // args
      comm_type_id: number; // Int!
      lead_id: number; // Int!
      lwe_dispo_id: number; // Int!
      lwe_log_creator_id: number; // Int!
      notes?: string | null; // String
      test_log_entry?: boolean | null; // Boolean
    }
    createUser: { // args
      name?: string | null; // String
    }
    dynamicAssessmentAnswer: { // args
      answer: string; // String!
      assessment_id: number; // Int!
      phrasing_id: number; // Int!
      question_id: number; // Int!
    }
    updateAssessment: { // args
      account_id?: number | null; // Int
      assessor_id?: number | null; // Int
      id: number; // Int!
      lead_id?: number | null; // Int
    }
    updateAssessmentAnswer: { // args
      answer?: string | null; // String
      assessment_id?: number | null; // Int
      id: number; // Int!
      phrasing_id?: number | null; // Int
      question_id?: number | null; // Int
    }
    updateAssessmentPhrasing: { // args
      id: number; // Int!
      phrasing?: string | null; // String
      question_id?: number | null; // Int
      related_info?: string | null; // String
    }
    updateEnumAssessmentAnswer: { // args
      choice?: string | null; // String
      id: number; // Int!
      image?: string | null; // String
      question_id?: number | null; // Int
    }
    updateLead: { // args
      address_one?: string | null; // String
      address_two?: string | null; // String
      address_verified?: boolean | null; // Boolean
      city?: string | null; // String
      email_one?: string | null; // String
      email_two?: string | null; // String
      first_name?: string | null; // String
      gate_code?: string | null; // String
      id: number; // Int!
      last_name?: string | null; // String
      latitude?: string | null; // String
      lead_campaign_id?: number | null; // Int
      lead_creator_id?: number | null; // Int
      lead_owner_id?: number | null; // Int
      legal_first_name?: string | null; // String
      longitude?: string | null; // String
      marketing_qualified?: string | null; // String
      middle_name?: string | null; // String
      notification_preference_call?: boolean | null; // Boolean
      notification_preference_email?: boolean | null; // Boolean
      notification_preference_text?: boolean | null; // Boolean
      phone_cell?: string | null; // String
      phone_home?: string | null; // String
      stage?: string | null; // String
      state_abbr?: string | null; // String
      suffix?: string | null; // String
      test_lead?: boolean | null; // Boolean
      zip?: string | null; // String
    }
  }
  Query: {
    account: { // args
      acct_num?: string | null; // String
      id?: number | null; // Int
    }
    accounts: { // args
      advisor_id?: number | null; // Int
      contact_primary_id?: number | null; // Int
      contact_secondary_id?: number | null; // Int
      from_lead_id?: number | null; // Int
      lead_creator_id?: number | null; // Int
      location_id?: number | null; // Int
      organization_id?: number | null; // Int
      status?: string | null; // String
      type?: string | null; // String
      useOr?: boolean | null; // Boolean
    }
    assessment: { // args
      id?: number | null; // Int
    }
    assessmentAnswer: { // args
      id?: number | null; // Int
    }
    assessmentAnswers: { // args
      assessment_id?: number | null; // Int
      phrasing_id?: number | null; // Int
      question_id?: number | null; // Int
      useOr?: boolean | null; // Boolean
    }
    assessmentPhrasing: { // args
      id?: number | null; // Int
    }
    assessmentPhrasings: { // args
      assessment_id?: number | null; // Int
      phrasing_id?: number | null; // Int
      question_id?: number | null; // Int
      useOr?: boolean | null; // Boolean
    }
    assessmentQuestion: { // args
      id?: number | null; // Int
    }
    assessmentQuestions: { // args
      answer_type?: string | null; // String
      category?: string | null; // String
      required?: boolean | null; // Boolean
    }
    assessments: { // args
      account_id?: number | null; // Int
      assessor_id?: number | null; // Int
      lead_id?: number | null; // Int
      useOr?: boolean | null; // Boolean
    }
    coordinatesByAddress: { // args
      address_one?: string | null; // String
      address_two?: string | null; // String
      city?: string | null; // String
      state_abbr?: string | null; // String
      zip?: string | null; // String
    }
    enumAssessmentAnswer: { // args
      id?: number | null; // Int
    }
    enumAssessmentAnswers: { // args
      question_id?: number | null; // Int
    }
    lead: { // args
      email_one?: string | null; // String
      id?: number | null; // Int
      phone_cell?: string | null; // String
    }
    leads: { // args
      address_verified?: boolean | null; // Boolean
      assessment_complete?: boolean | null; // Boolean
      lead_creator_id?: number | null; // Int
      lead_owner_id?: number | null; // Int
      marketing_qualified?: boolean | null; // Boolean
      useOr?: boolean | null; // Boolean
    }
    LWELog: { // args
      id?: number | null; // Int
    }
    LWELogs: { // args
      lead_id?: number | null; // Int
      test_log_entry?: boolean | null; // Boolean
    }
    pipeline: { // args
      address_verified?: boolean | null; // Boolean
      assessment_complete?: boolean | null; // Boolean
      lead_creator_id?: number | null; // Int
      marketing_qualified?: boolean | null; // Boolean
      useOr?: boolean | null; // Boolean
    }
    role: { // args
      id: number; // Int!
    }
    salesTeam: { // args
      id?: number | null; // Int
      name?: string | null; // String
    }
    salesTeams: { // args
      id?: number | null; // Int
      name?: string | null; // String
      team_lead_one_id?: number | null; // Int
      team_lead_two_id?: number | null; // Int
      useOr?: boolean | null; // Boolean
    }
    user: { // args
      email_nerd?: string | null; // String
      id?: number | null; // Int
    }
    users: { // args
      email_nerd?: string | null; // String
      id?: number | null; // Int
    }
    usersByTeam: { // args
      team_id?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Account" | "Assessment" | "AssessmentAnswer" | "AssessmentPhrasing" | "AssessmentQuestion" | "Company" | "Contact" | "EnumAssessmentAnswer" | "EnumCommunicationType" | "EnumLeadCampaignDisqualReason" | "EnumLeadWorkingEventDispo" | "EnumMarketingDisqualReason" | "EnumSalesDisqualReason" | "Lead" | "LeadCampaign" | "LeadSource" | "LeadWorkingEventLog" | "Location" | "LocationCoords" | "Mutation" | "Query" | "Role" | "SalesTeam" | "User";

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "DateTime" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}