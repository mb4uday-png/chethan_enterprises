const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'ce',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const addNewServiceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddNewService', inputVars);
}
addNewServiceRef.operationName = 'AddNewService';
exports.addNewServiceRef = addNewServiceRef;

exports.addNewService = function addNewService(dcOrVars, vars) {
  return executeMutation(addNewServiceRef(dcOrVars, vars));
};

const listContractorProfilesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListContractorProfiles');
}
listContractorProfilesRef.operationName = 'ListContractorProfiles';
exports.listContractorProfilesRef = listContractorProfilesRef;

exports.listContractorProfiles = function listContractorProfiles(dc) {
  return executeQuery(listContractorProfilesRef(dc));
};

const updateProjectStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProjectStatus', inputVars);
}
updateProjectStatusRef.operationName = 'UpdateProjectStatus';
exports.updateProjectStatusRef = updateProjectStatusRef;

exports.updateProjectStatus = function updateProjectStatus(dcOrVars, vars) {
  return executeMutation(updateProjectStatusRef(dcOrVars, vars));
};

const getMyReviewsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyReviews', inputVars);
}
getMyReviewsRef.operationName = 'GetMyReviews';
exports.getMyReviewsRef = getMyReviewsRef;

exports.getMyReviews = function getMyReviews(dcOrVars, vars) {
  return executeQuery(getMyReviewsRef(dcOrVars, vars));
};
