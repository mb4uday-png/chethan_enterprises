import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddNewServiceData {
  service_insert: Service_Key;
}

export interface AddNewServiceVariables {
  description: string;
  iconUrl?: string | null;
  name: string;
}

export interface Bid_Key {
  id: UUIDString;
  __typename?: 'Bid_Key';
}

export interface ContractorProfile_Key {
  id: UUIDString;
  __typename?: 'ContractorProfile_Key';
}

export interface ContractorService_Key {
  contractorProfileId: UUIDString;
  serviceId: UUIDString;
  __typename?: 'ContractorService_Key';
}

export interface GetMyReviewsData {
  reviews: ({
    id: UUIDString;
    comment?: string | null;
    rating: number;
    contractorProfile?: {
      id: UUIDString;
    } & ContractorProfile_Key;
      project?: {
        id: UUIDString;
      } & Project_Key;
  } & Review_Key)[];
}

export interface GetMyReviewsVariables {
  clientId: UUIDString;
}

export interface ListContractorProfilesData {
  contractorProfiles: ({
    id: UUIDString;
    bio?: string | null;
    experienceYears: number;
    hourlyRate?: number | null;
    licenseNumber: string;
    websiteUrl?: string | null;
  } & ContractorProfile_Key)[];
}

export interface Project_Key {
  id: UUIDString;
  __typename?: 'Project_Key';
}

export interface Review_Key {
  id: UUIDString;
  __typename?: 'Review_Key';
}

export interface Service_Key {
  id: UUIDString;
  __typename?: 'Service_Key';
}

export interface UpdateProjectStatusData {
  project_update?: Project_Key | null;
}

export interface UpdateProjectStatusVariables {
  id: UUIDString;
  status: string;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface AddNewServiceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddNewServiceVariables): MutationRef<AddNewServiceData, AddNewServiceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddNewServiceVariables): MutationRef<AddNewServiceData, AddNewServiceVariables>;
  operationName: string;
}
export const addNewServiceRef: AddNewServiceRef;

export function addNewService(vars: AddNewServiceVariables): MutationPromise<AddNewServiceData, AddNewServiceVariables>;
export function addNewService(dc: DataConnect, vars: AddNewServiceVariables): MutationPromise<AddNewServiceData, AddNewServiceVariables>;

interface ListContractorProfilesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListContractorProfilesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListContractorProfilesData, undefined>;
  operationName: string;
}
export const listContractorProfilesRef: ListContractorProfilesRef;

export function listContractorProfiles(): QueryPromise<ListContractorProfilesData, undefined>;
export function listContractorProfiles(dc: DataConnect): QueryPromise<ListContractorProfilesData, undefined>;

interface UpdateProjectStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectStatusVariables): MutationRef<UpdateProjectStatusData, UpdateProjectStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProjectStatusVariables): MutationRef<UpdateProjectStatusData, UpdateProjectStatusVariables>;
  operationName: string;
}
export const updateProjectStatusRef: UpdateProjectStatusRef;

export function updateProjectStatus(vars: UpdateProjectStatusVariables): MutationPromise<UpdateProjectStatusData, UpdateProjectStatusVariables>;
export function updateProjectStatus(dc: DataConnect, vars: UpdateProjectStatusVariables): MutationPromise<UpdateProjectStatusData, UpdateProjectStatusVariables>;

interface GetMyReviewsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyReviewsVariables): QueryRef<GetMyReviewsData, GetMyReviewsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetMyReviewsVariables): QueryRef<GetMyReviewsData, GetMyReviewsVariables>;
  operationName: string;
}
export const getMyReviewsRef: GetMyReviewsRef;

export function getMyReviews(vars: GetMyReviewsVariables): QueryPromise<GetMyReviewsData, GetMyReviewsVariables>;
export function getMyReviews(dc: DataConnect, vars: GetMyReviewsVariables): QueryPromise<GetMyReviewsData, GetMyReviewsVariables>;

