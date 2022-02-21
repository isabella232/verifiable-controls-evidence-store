/* 
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  
  Licensed under the Apache License, Version 2.0 (the "License").
  You may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  
      http://www.apache.org/licenses/LICENSE-2.0
  
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
import { QueryBase, AgsApiOptions } from '@ags/webclient-core/queries';
import { AGS_SERVICES_RELEASE_MANAGEMENT_SERVICE } from '../../config/constants';
import { ReleaseCandidate } from '../../types';

export class GetReleaseCandidates extends QueryBase<ReleaseCandidate[]> {
    createRequest(queryKey: string[]): AgsApiOptions {
        return {
            serviceName: AGS_SERVICES_RELEASE_MANAGEMENT_SERVICE,
            pathTemplate: 'releasecandidates/',
            queryParams: { applicationId: queryKey[1] },
            method: 'GET',
        };
    }
}
