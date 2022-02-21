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
import Stack from 'aws-northstar/layouts/Stack';
import Box from 'aws-northstar/layouts/Box';
import KeyValuePair from 'aws-northstar/components/KeyValuePair';
import ExpandableSection from 'aws-northstar/components/ExpandableSection';
import ControlObjectiveCard from '../ControlObjectiveCard';
import TargetEntityCard from '../../../TargetEntityCard';
import { RiskFormData } from '../../types';

const targetEntities = [
    {
        id: 'BU1',
        type: 'Businese Unit',
        entity: {
            name: 'Mobile Banking',
        },
        owner: '<email-address>',
        likelihood: 'High',
        impacts: [
            {
                name: 'Reputational',
                severity: 'High',
                likelihood: 'Low',
            },
            {
                name: 'Financial',
                severity: 'Low',
                likelihood: 'High',
            },
        ],
    },
    {
        id: 'APP1',
        type: 'Application',
        entity: {
            name: 'Net Bank App',
        },
        owner: '<email-address>',
        likelihood: 'High',
        impacts: [
            {
                name: 'Reputational',
                severity: 'High',
                likelihood: 'Low',
            },
            {
                name: 'Financial',
                severity: 'Low',
                likelihood: 'High',
            },
        ],
    },
];

const RiskReview: FunctionComponent<{ data: RiskFormData }> = ({ data }) => {
    return (
        <Stack>
            <ExpandableSection header="General Information" expanded={true}>
                <Stack>
                    <KeyValuePair label="Name" value={data.name} />
                    <KeyValuePair label="Description" value={data.description} />
                    <KeyValuePair label="Category" value={data.category} />
                </Stack>
            </ExpandableSection>
            <ExpandableSection
                header={`Control Objectives (${data.controlObjectives?.length || 0})`}
                expanded={true}
            >
                <Box width="100%">
                    <Stack spacing="xs">
                        {data.controlObjectives?.map((co) => (
                            <ControlObjectiveCard key={co.id} {...co} />
                        ))}
                    </Stack>
                </Box>
            </ExpandableSection>
            <ExpandableSection
                header={`Target Entities (${targetEntities?.length || 0})`}
                expanded={true}
            >
                <Box width="100%">
                    <Stack spacing="xs">
                        {targetEntities.map((te) => (
                            <TargetEntityCard key={te.id} {...te} />
                        ))}
                    </Stack>
                </Box>
            </ExpandableSection>
        </Stack>
    );
};

export default RiskReview;
