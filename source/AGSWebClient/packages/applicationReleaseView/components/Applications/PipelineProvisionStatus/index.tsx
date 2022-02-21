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
import { FunctionComponent } from 'react';
import StatusIndicator from 'aws-northstar/components/StatusIndicator';

const PipelineProvisionStatus: FunctionComponent<{
    status: string | undefined;
}> = ({ status }) => {
    if (status === 'ACTIVE') {
        return <StatusIndicator statusType="positive">{status}</StatusIndicator>;
    } else if (status?.includes('FAILED')) {
        return <StatusIndicator statusType="negative">{status}</StatusIndicator>;
    }
    return <StatusIndicator statusType="info">{status || 'UNKNOWN'}</StatusIndicator>;
};

export default PipelineProvisionStatus;
