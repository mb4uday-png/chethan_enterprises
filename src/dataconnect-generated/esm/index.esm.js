import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'ce',
  location: 'us-east4'
};

export const addNewServiceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddNewService', inputVars);
}
addNewServiceRef.operationName = 'AddNewService';

export function addNewService(dcOrVars, vars) {
  return executeMutation(addNewServiceRef(dcOrVars, vars));
}

export const listContractorProfilesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListContractorProfiles');
}
listContractorProfilesRef.operationName = 'ListContractorProfiles';

export function listContractorProfiles(dc) {
  return executeQuery(listContractorProfilesRef(dc));
}

export const updateProjectStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProjectStatus', inputVars);
}
updateProjectStatusRef.operationName = 'UpdateProjectStatus';

export function updateProjectStatus(dcOrVars, vars) {
  return executeMutation(updateProjectStatusRef(dcOrVars, vars));
}

export const getMyReviewsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyReviews', inputVars);
}
getMyReviewsRef.operationName = 'GetMyReviews';

export function getMyReviews(dcOrVars, vars) {
  return executeQuery(getMyReviewsRef(dcOrVars, vars));
}

