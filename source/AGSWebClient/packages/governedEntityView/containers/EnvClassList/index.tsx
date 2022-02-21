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
import { EnvironmentClass } from '@ags/webclient-estates-core/types';
import { QueryType } from '@ags/webclient-estates-core/queries';
import { useAgsListQuery } from '@ags/webclient-core/queries';
import GovenedEntityListView from '../../components/Association/ListView';

export interface EnvClassListViewProps {
    onEditAssociation: (selectedGovernedEntityId: string) => void;
}

const EnvClassListView: FunctionComponent<EnvClassListViewProps> = ({
    onEditAssociation,
}) => {
    // load envclasses
    const { isLoading, data, isError, error } = useAgsListQuery<EnvironmentClass>(
        QueryType.LIST_ENVCLASSES
    );

    return (
        <GovenedEntityListView
            onEditAssociation={onEditAssociation}
            entityName="Environment Class"
            useName={true}
            isLoading={isLoading}
            data={data}
            isError={isError}
            error={error}
        />
    );
};

export default EnvClassListView;
