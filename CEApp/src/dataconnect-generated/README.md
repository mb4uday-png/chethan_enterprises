# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListContractorProfiles*](#listcontractorprofiles)
  - [*GetMyReviews*](#getmyreviews)
- [**Mutations**](#mutations)
  - [*AddNewService*](#addnewservice)
  - [*UpdateProjectStatus*](#updateprojectstatus)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListContractorProfiles
You can execute the `ListContractorProfiles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listContractorProfiles(): QueryPromise<ListContractorProfilesData, undefined>;

interface ListContractorProfilesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListContractorProfilesData, undefined>;
}
export const listContractorProfilesRef: ListContractorProfilesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listContractorProfiles(dc: DataConnect): QueryPromise<ListContractorProfilesData, undefined>;

interface ListContractorProfilesRef {
  ...
  (dc: DataConnect): QueryRef<ListContractorProfilesData, undefined>;
}
export const listContractorProfilesRef: ListContractorProfilesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listContractorProfilesRef:
```typescript
const name = listContractorProfilesRef.operationName;
console.log(name);
```

### Variables
The `ListContractorProfiles` query has no variables.
### Return Type
Recall that executing the `ListContractorProfiles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListContractorProfilesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListContractorProfiles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listContractorProfiles } from '@dataconnect/generated';


// Call the `listContractorProfiles()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listContractorProfiles();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listContractorProfiles(dataConnect);

console.log(data.contractorProfiles);

// Or, you can use the `Promise` API.
listContractorProfiles().then((response) => {
  const data = response.data;
  console.log(data.contractorProfiles);
});
```

### Using `ListContractorProfiles`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listContractorProfilesRef } from '@dataconnect/generated';


// Call the `listContractorProfilesRef()` function to get a reference to the query.
const ref = listContractorProfilesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listContractorProfilesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.contractorProfiles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.contractorProfiles);
});
```

## GetMyReviews
You can execute the `GetMyReviews` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyReviews(vars: GetMyReviewsVariables): QueryPromise<GetMyReviewsData, GetMyReviewsVariables>;

interface GetMyReviewsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyReviewsVariables): QueryRef<GetMyReviewsData, GetMyReviewsVariables>;
}
export const getMyReviewsRef: GetMyReviewsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyReviews(dc: DataConnect, vars: GetMyReviewsVariables): QueryPromise<GetMyReviewsData, GetMyReviewsVariables>;

interface GetMyReviewsRef {
  ...
  (dc: DataConnect, vars: GetMyReviewsVariables): QueryRef<GetMyReviewsData, GetMyReviewsVariables>;
}
export const getMyReviewsRef: GetMyReviewsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyReviewsRef:
```typescript
const name = getMyReviewsRef.operationName;
console.log(name);
```

### Variables
The `GetMyReviews` query requires an argument of type `GetMyReviewsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMyReviewsVariables {
  clientId: UUIDString;
}
```
### Return Type
Recall that executing the `GetMyReviews` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyReviewsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMyReviews`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyReviews, GetMyReviewsVariables } from '@dataconnect/generated';

// The `GetMyReviews` query requires an argument of type `GetMyReviewsVariables`:
const getMyReviewsVars: GetMyReviewsVariables = {
  clientId: ..., 
};

// Call the `getMyReviews()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyReviews(getMyReviewsVars);
// Variables can be defined inline as well.
const { data } = await getMyReviews({ clientId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyReviews(dataConnect, getMyReviewsVars);

console.log(data.reviews);

// Or, you can use the `Promise` API.
getMyReviews(getMyReviewsVars).then((response) => {
  const data = response.data;
  console.log(data.reviews);
});
```

### Using `GetMyReviews`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyReviewsRef, GetMyReviewsVariables } from '@dataconnect/generated';

// The `GetMyReviews` query requires an argument of type `GetMyReviewsVariables`:
const getMyReviewsVars: GetMyReviewsVariables = {
  clientId: ..., 
};

// Call the `getMyReviewsRef()` function to get a reference to the query.
const ref = getMyReviewsRef(getMyReviewsVars);
// Variables can be defined inline as well.
const ref = getMyReviewsRef({ clientId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyReviewsRef(dataConnect, getMyReviewsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.reviews);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.reviews);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## AddNewService
You can execute the `AddNewService` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addNewService(vars: AddNewServiceVariables): MutationPromise<AddNewServiceData, AddNewServiceVariables>;

interface AddNewServiceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddNewServiceVariables): MutationRef<AddNewServiceData, AddNewServiceVariables>;
}
export const addNewServiceRef: AddNewServiceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addNewService(dc: DataConnect, vars: AddNewServiceVariables): MutationPromise<AddNewServiceData, AddNewServiceVariables>;

interface AddNewServiceRef {
  ...
  (dc: DataConnect, vars: AddNewServiceVariables): MutationRef<AddNewServiceData, AddNewServiceVariables>;
}
export const addNewServiceRef: AddNewServiceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addNewServiceRef:
```typescript
const name = addNewServiceRef.operationName;
console.log(name);
```

### Variables
The `AddNewService` mutation requires an argument of type `AddNewServiceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddNewServiceVariables {
  description: string;
  iconUrl?: string | null;
  name: string;
}
```
### Return Type
Recall that executing the `AddNewService` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddNewServiceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddNewServiceData {
  service_insert: Service_Key;
}
```
### Using `AddNewService`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addNewService, AddNewServiceVariables } from '@dataconnect/generated';

// The `AddNewService` mutation requires an argument of type `AddNewServiceVariables`:
const addNewServiceVars: AddNewServiceVariables = {
  description: ..., 
  iconUrl: ..., // optional
  name: ..., 
};

// Call the `addNewService()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addNewService(addNewServiceVars);
// Variables can be defined inline as well.
const { data } = await addNewService({ description: ..., iconUrl: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addNewService(dataConnect, addNewServiceVars);

console.log(data.service_insert);

// Or, you can use the `Promise` API.
addNewService(addNewServiceVars).then((response) => {
  const data = response.data;
  console.log(data.service_insert);
});
```

### Using `AddNewService`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addNewServiceRef, AddNewServiceVariables } from '@dataconnect/generated';

// The `AddNewService` mutation requires an argument of type `AddNewServiceVariables`:
const addNewServiceVars: AddNewServiceVariables = {
  description: ..., 
  iconUrl: ..., // optional
  name: ..., 
};

// Call the `addNewServiceRef()` function to get a reference to the mutation.
const ref = addNewServiceRef(addNewServiceVars);
// Variables can be defined inline as well.
const ref = addNewServiceRef({ description: ..., iconUrl: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addNewServiceRef(dataConnect, addNewServiceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.service_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.service_insert);
});
```

## UpdateProjectStatus
You can execute the `UpdateProjectStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateProjectStatus(vars: UpdateProjectStatusVariables): MutationPromise<UpdateProjectStatusData, UpdateProjectStatusVariables>;

interface UpdateProjectStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectStatusVariables): MutationRef<UpdateProjectStatusData, UpdateProjectStatusVariables>;
}
export const updateProjectStatusRef: UpdateProjectStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProjectStatus(dc: DataConnect, vars: UpdateProjectStatusVariables): MutationPromise<UpdateProjectStatusData, UpdateProjectStatusVariables>;

interface UpdateProjectStatusRef {
  ...
  (dc: DataConnect, vars: UpdateProjectStatusVariables): MutationRef<UpdateProjectStatusData, UpdateProjectStatusVariables>;
}
export const updateProjectStatusRef: UpdateProjectStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProjectStatusRef:
```typescript
const name = updateProjectStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateProjectStatus` mutation requires an argument of type `UpdateProjectStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProjectStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateProjectStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProjectStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProjectStatusData {
  project_update?: Project_Key | null;
}
```
### Using `UpdateProjectStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProjectStatus, UpdateProjectStatusVariables } from '@dataconnect/generated';

// The `UpdateProjectStatus` mutation requires an argument of type `UpdateProjectStatusVariables`:
const updateProjectStatusVars: UpdateProjectStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateProjectStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProjectStatus(updateProjectStatusVars);
// Variables can be defined inline as well.
const { data } = await updateProjectStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProjectStatus(dataConnect, updateProjectStatusVars);

console.log(data.project_update);

// Or, you can use the `Promise` API.
updateProjectStatus(updateProjectStatusVars).then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

### Using `UpdateProjectStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProjectStatusRef, UpdateProjectStatusVariables } from '@dataconnect/generated';

// The `UpdateProjectStatus` mutation requires an argument of type `UpdateProjectStatusVariables`:
const updateProjectStatusVars: UpdateProjectStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateProjectStatusRef()` function to get a reference to the mutation.
const ref = updateProjectStatusRef(updateProjectStatusVars);
// Variables can be defined inline as well.
const ref = updateProjectStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProjectStatusRef(dataConnect, updateProjectStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

