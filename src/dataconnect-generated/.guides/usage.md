# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { addNewService, listContractorProfiles, updateProjectStatus, getMyReviews } from '@dataconnect/generated';


// Operation AddNewService:  For variables, look at type AddNewServiceVars in ../index.d.ts
const { data } = await AddNewService(dataConnect, addNewServiceVars);

// Operation ListContractorProfiles: 
const { data } = await ListContractorProfiles(dataConnect);

// Operation UpdateProjectStatus:  For variables, look at type UpdateProjectStatusVars in ../index.d.ts
const { data } = await UpdateProjectStatus(dataConnect, updateProjectStatusVars);

// Operation GetMyReviews:  For variables, look at type GetMyReviewsVars in ../index.d.ts
const { data } = await GetMyReviews(dataConnect, getMyReviewsVars);


```