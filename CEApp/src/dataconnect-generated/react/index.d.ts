import { AddNewServiceData, AddNewServiceVariables, ListContractorProfilesData, UpdateProjectStatusData, UpdateProjectStatusVariables, GetMyReviewsData, GetMyReviewsVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useAddNewService(options?: useDataConnectMutationOptions<AddNewServiceData, FirebaseError, AddNewServiceVariables>): UseDataConnectMutationResult<AddNewServiceData, AddNewServiceVariables>;
export function useAddNewService(dc: DataConnect, options?: useDataConnectMutationOptions<AddNewServiceData, FirebaseError, AddNewServiceVariables>): UseDataConnectMutationResult<AddNewServiceData, AddNewServiceVariables>;

export function useListContractorProfiles(options?: useDataConnectQueryOptions<ListContractorProfilesData>): UseDataConnectQueryResult<ListContractorProfilesData, undefined>;
export function useListContractorProfiles(dc: DataConnect, options?: useDataConnectQueryOptions<ListContractorProfilesData>): UseDataConnectQueryResult<ListContractorProfilesData, undefined>;

export function useUpdateProjectStatus(options?: useDataConnectMutationOptions<UpdateProjectStatusData, FirebaseError, UpdateProjectStatusVariables>): UseDataConnectMutationResult<UpdateProjectStatusData, UpdateProjectStatusVariables>;
export function useUpdateProjectStatus(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProjectStatusData, FirebaseError, UpdateProjectStatusVariables>): UseDataConnectMutationResult<UpdateProjectStatusData, UpdateProjectStatusVariables>;

export function useGetMyReviews(vars: GetMyReviewsVariables, options?: useDataConnectQueryOptions<GetMyReviewsData>): UseDataConnectQueryResult<GetMyReviewsData, GetMyReviewsVariables>;
export function useGetMyReviews(dc: DataConnect, vars: GetMyReviewsVariables, options?: useDataConnectQueryOptions<GetMyReviewsData>): UseDataConnectQueryResult<GetMyReviewsData, GetMyReviewsVariables>;
