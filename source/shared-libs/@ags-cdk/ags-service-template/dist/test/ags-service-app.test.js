"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const cdk = require("@aws-cdk/core");
const ssm = require("@aws-cdk/aws-ssm");
const ags_service_stage_1 = require("../lib/ags-service-stage");
const ags_service_app_1 = require("../lib/ags-service-app");
class TestStackOne extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        new ssm.StringParameter(this, 'TestParamsStackOne', {
            stringValue: 'Test Value Stack One',
        });
    }
}
class TestStackTwo extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        new ssm.StringParameter(this, 'TestParamsStackTwo', {
            stringValue: 'Test Value Stack Two',
        });
    }
}
class SingleStackTestStage extends ags_service_stage_1.AGSServiceStage {
    constructor(scope, id, props) {
        super(scope, id, props);
        super.addStack(TestStackOne, '', {});
    }
}
class MultiStackTestStage extends ags_service_stage_1.AGSServiceStage {
    constructor(scope, id, props) {
        super(scope, id, props);
        super.addStack(TestStackOne, 'TestStackOne', {});
        super.addStack(TestStackTwo, 'TestStackTwo', {});
    }
}
test('AGSService App Snapshot Test', () => {
    // WHEN
    const app = new ags_service_app_1.AGSServiceApp({
        stageConstructor: SingleStackTestStage,
        context: {
            serviceName: 'TestService',
            personal: 'off',
            targetEnvs: {
                Test1: {
                    account: '12345',
                    region: 'ap-southeast-2',
                },
            },
        },
    });
    // THEN
    const cloudAssembly = app.synth();
    expect(cloudAssembly.nestedAssemblies.length).toBe(1);
    expect(cloudAssembly.nestedAssemblies[0].displayName).toBe('Test1Stage');
    expect(cloudAssembly.nestedAssemblies[0].nestedAssembly.stacks.length).toBe(1);
    expect(cloudAssembly.nestedAssemblies[0].nestedAssembly.stacks[0].stackName).toBe('TestService');
    expect(cloudAssembly.nestedAssemblies[0].nestedAssembly.stacks[0].template).toMatchSnapshot();
});
test('AGSService Stage can load multi stack', () => {
    // WHEN
    const app = new ags_service_app_1.AGSServiceApp({
        stageConstructor: MultiStackTestStage,
        context: {
            serviceName: 'TestService',
            personal: 'off',
            targetEnvs: {
                Test1: {
                    account: '12345',
                    region: 'ap-southeast-2',
                },
            },
        },
    });
    // THEN
    const cloudAssembly = app.synth({ force: true });
    console.log(JSON.stringify(cloudAssembly.nestedAssemblies[0].nestedAssembly.stacks[0].template));
    console.log(JSON.stringify(cloudAssembly.nestedAssemblies[0].nestedAssembly.stacks[1].template));
    expect(cloudAssembly.nestedAssemblies.length).toBe(1);
    expect(cloudAssembly.nestedAssemblies[0].displayName).toBe('Test1Stage');
    expect(cloudAssembly.nestedAssemblies[0].nestedAssembly.stacks.length).toBe(2);
    expect(cloudAssembly.nestedAssemblies[0].nestedAssembly.stacks[0].stackName).toBe('TestService-TestStackOne');
    expect(cloudAssembly.nestedAssemblies[0].nestedAssembly.stacks[1].stackName).toBe('TestService-TestStackTwo');
    expect(cloudAssembly.nestedAssemblies[0].nestedAssembly.stacks[0].template).toMatchSnapshot();
    expect(cloudAssembly.nestedAssemblies[0].nestedAssembly.stacks[1].template).toMatchSnapshot();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdzLXNlcnZpY2UtYXBwLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0L2Fncy1zZXJ2aWNlLWFwcC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7O0VBY0U7QUFDRixxQ0FBcUM7QUFDckMsd0NBQXdDO0FBQ3hDLGdFQUFpRjtBQUNqRiw0REFBdUQ7QUFFdkQsTUFBTSxZQUFhLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDaEMsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUFxQjtRQUMvRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixJQUFJLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQ2hELFdBQVcsRUFBRSxzQkFBc0I7U0FDdEMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBRUQsTUFBTSxZQUFhLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDaEMsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUFxQjtRQUMvRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQ2hELFdBQVcsRUFBRSxzQkFBc0I7U0FDdEMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBRUQsTUFBTSxvQkFBcUIsU0FBUSxtQ0FBZTtJQUM5QyxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQTJCO1FBQ3JFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLEtBQUssQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6QyxDQUFDO0NBQ0o7QUFFRCxNQUFNLG1CQUFvQixTQUFRLG1DQUFlO0lBQzdD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QyxDQUFDLENBQUMsQ0FBQztJQUN0RCxNQUFNLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN6RSxNQUFNLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9FLE1BQU0sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQzdFLDBCQUEwQixDQUM3QixDQUFDO0lBQ0YsTUFBTSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FDN0UsMEJBQTBCLENBQzdCLENBQUM7SUFDRixNQUFNLENBQ0YsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUN0RSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3BCLE1BQU0sQ0FDRixhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQ3RFLENBQUMsZUFBZSxFQUFFLENBQUM7QUFDeEIsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBcbiAgQ29weXJpZ2h0IEFtYXpvbi5jb20sIEluYy4gb3IgaXRzIGFmZmlsaWF0ZXMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gIFxuICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpLlxuICBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICBcbiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICBcbiAgVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cbmltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIHNzbSBmcm9tICdAYXdzLWNkay9hd3Mtc3NtJztcbmltcG9ydCB7IEFHU1NlcnZpY2VTdGFnZSwgQUdTU2VydmljZVN0YWdlUHJvcHMgfSBmcm9tICcuLi9saWIvYWdzLXNlcnZpY2Utc3RhZ2UnO1xuaW1wb3J0IHsgQUdTU2VydmljZUFwcCB9IGZyb20gJy4uL2xpYi9hZ3Mtc2VydmljZS1hcHAnO1xuXG5jbGFzcyBUZXN0U3RhY2tPbmUgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAgICAgbmV3IHNzbS5TdHJpbmdQYXJhbWV0ZXIodGhpcywgJ1Rlc3RQYXJhbXNTdGFja09uZScsIHtcbiAgICAgICAgICAgIHN0cmluZ1ZhbHVlOiAnVGVzdCBWYWx1ZSBTdGFjayBPbmUnLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNsYXNzIFRlc3RTdGFja1R3byBleHRlbmRzIGNkay5TdGFjayB7XG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBjZGsuU3RhY2tQcm9wcykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcbiAgICAgICAgbmV3IHNzbS5TdHJpbmdQYXJhbWV0ZXIodGhpcywgJ1Rlc3RQYXJhbXNTdGFja1R3bycsIHtcbiAgICAgICAgICAgIHN0cmluZ1ZhbHVlOiAnVGVzdCBWYWx1ZSBTdGFjayBUd28nLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmNsYXNzIFNpbmdsZVN0YWNrVGVzdFN0YWdlIGV4dGVuZHMgQUdTU2VydmljZVN0YWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IEFHU1NlcnZpY2VTdGFnZVByb3BzKSB7XG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgICAgIHN1cGVyLmFkZFN0YWNrKFRlc3RTdGFja09uZSwgJycsIHt9KTtcbiAgICB9XG59XG5cbmNsYXNzIE11bHRpU3RhY2tUZXN0U3RhZ2UgZXh0ZW5kcyBBR1NTZXJ2aWNlU3RhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogQUdTU2VydmljZVN0YWdlUHJvcHMpIHtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAgICAgc3VwZXIuYWRkU3RhY2soVGVzdFN0YWNrT25lLCAnVGVzdFN0YWNrT25lJywge30pO1xuICAgICAgICBzdXBlci5hZGRTdGFjayhUZXN0U3RhY2tUd28sICdUZXN0U3RhY2tUd28nLCB7fSk7XG4gICAgfVxufVxuXG50ZXN0KCdBR1NTZXJ2aWNlIEFwcCBTbmFwc2hvdCBUZXN0JywgKCkgPT4ge1xuICAgIC8vIFdIRU5cbiAgICBjb25zdCBhcHAgPSBuZXcgQUdTU2VydmljZUFwcCh7XG4gICAgICAgIHN0YWdlQ29uc3RydWN0b3I6IFNpbmdsZVN0YWNrVGVzdFN0YWdlLFxuICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICBzZXJ2aWNlTmFtZTogJ1Rlc3RTZXJ2aWNlJyxcbiAgICAgICAgICAgIHBlcnNvbmFsOiAnb2ZmJyxcbiAgICAgICAgICAgIHRhcmdldEVudnM6IHtcbiAgICAgICAgICAgICAgICBUZXN0MToge1xuICAgICAgICAgICAgICAgICAgICBhY2NvdW50OiAnMTIzNDUnLFxuICAgICAgICAgICAgICAgICAgICByZWdpb246ICdhcC1zb3V0aGVhc3QtMicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvLyBUSEVOXG4gICAgY29uc3QgY2xvdWRBc3NlbWJseSA9IGFwcC5zeW50aCgpO1xuICAgIGV4cGVjdChjbG91ZEFzc2VtYmx5Lm5lc3RlZEFzc2VtYmxpZXMubGVuZ3RoKS50b0JlKDEpO1xuICAgIGV4cGVjdChjbG91ZEFzc2VtYmx5Lm5lc3RlZEFzc2VtYmxpZXNbMF0uZGlzcGxheU5hbWUpLnRvQmUoJ1Rlc3QxU3RhZ2UnKTtcbiAgICBleHBlY3QoY2xvdWRBc3NlbWJseS5uZXN0ZWRBc3NlbWJsaWVzWzBdLm5lc3RlZEFzc2VtYmx5LnN0YWNrcy5sZW5ndGgpLnRvQmUoMSk7XG4gICAgZXhwZWN0KGNsb3VkQXNzZW1ibHkubmVzdGVkQXNzZW1ibGllc1swXS5uZXN0ZWRBc3NlbWJseS5zdGFja3NbMF0uc3RhY2tOYW1lKS50b0JlKFxuICAgICAgICAnVGVzdFNlcnZpY2UnXG4gICAgKTtcbiAgICBleHBlY3QoXG4gICAgICAgIGNsb3VkQXNzZW1ibHkubmVzdGVkQXNzZW1ibGllc1swXS5uZXN0ZWRBc3NlbWJseS5zdGFja3NbMF0udGVtcGxhdGVcbiAgICApLnRvTWF0Y2hTbmFwc2hvdCgpO1xufSk7XG5cbnRlc3QoJ0FHU1NlcnZpY2UgU3RhZ2UgY2FuIGxvYWQgbXVsdGkgc3RhY2snLCAoKSA9PiB7XG4gICAgLy8gV0hFTlxuICAgIGNvbnN0IGFwcCA9IG5ldyBBR1NTZXJ2aWNlQXBwKHtcbiAgICAgICAgc3RhZ2VDb25zdHJ1Y3RvcjogTXVsdGlTdGFja1Rlc3RTdGFnZSxcbiAgICAgICAgY29udGV4dDoge1xuICAgICAgICAgICAgc2VydmljZU5hbWU6ICdUZXN0U2VydmljZScsXG4gICAgICAgICAgICBwZXJzb25hbDogJ29mZicsXG4gICAgICAgICAgICB0YXJnZXRFbnZzOiB7XG4gICAgICAgICAgICAgICAgVGVzdDE6IHtcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudDogJzEyMzQ1JyxcbiAgICAgICAgICAgICAgICAgICAgcmVnaW9uOiAnYXAtc291dGhlYXN0LTInLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy8gVEhFTlxuICAgIGNvbnN0IGNsb3VkQXNzZW1ibHkgPSBhcHAuc3ludGgoeyBmb3JjZTogdHJ1ZSB9KTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgICBjbG91ZEFzc2VtYmx5Lm5lc3RlZEFzc2VtYmxpZXNbMF0ubmVzdGVkQXNzZW1ibHkuc3RhY2tzWzBdLnRlbXBsYXRlXG4gICAgICAgIClcbiAgICApO1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgIGNsb3VkQXNzZW1ibHkubmVzdGVkQXNzZW1ibGllc1swXS5uZXN0ZWRBc3NlbWJseS5zdGFja3NbMV0udGVtcGxhdGVcbiAgICAgICAgKVxuICAgICk7XG4gICAgZXhwZWN0KGNsb3VkQXNzZW1ibHkubmVzdGVkQXNzZW1ibGllcy5sZW5ndGgpLnRvQmUoMSk7XG4gICAgZXhwZWN0KGNsb3VkQXNzZW1ibHkubmVzdGVkQXNzZW1ibGllc1swXS5kaXNwbGF5TmFtZSkudG9CZSgnVGVzdDFTdGFnZScpO1xuICAgIGV4cGVjdChjbG91ZEFzc2VtYmx5Lm5lc3RlZEFzc2VtYmxpZXNbMF0ubmVzdGVkQXNzZW1ibHkuc3RhY2tzLmxlbmd0aCkudG9CZSgyKTtcbiAgICBleHBlY3QoY2xvdWRBc3NlbWJseS5uZXN0ZWRBc3NlbWJsaWVzWzBdLm5lc3RlZEFzc2VtYmx5LnN0YWNrc1swXS5zdGFja05hbWUpLnRvQmUoXG4gICAgICAgICdUZXN0U2VydmljZS1UZXN0U3RhY2tPbmUnXG4gICAgKTtcbiAgICBleHBlY3QoY2xvdWRBc3NlbWJseS5uZXN0ZWRBc3NlbWJsaWVzWzBdLm5lc3RlZEFzc2VtYmx5LnN0YWNrc1sxXS5zdGFja05hbWUpLnRvQmUoXG4gICAgICAgICdUZXN0U2VydmljZS1UZXN0U3RhY2tUd28nXG4gICAgKTtcbiAgICBleHBlY3QoXG4gICAgICAgIGNsb3VkQXNzZW1ibHkubmVzdGVkQXNzZW1ibGllc1swXS5uZXN0ZWRBc3NlbWJseS5zdGFja3NbMF0udGVtcGxhdGVcbiAgICApLnRvTWF0Y2hTbmFwc2hvdCgpO1xuICAgIGV4cGVjdChcbiAgICAgICAgY2xvdWRBc3NlbWJseS5uZXN0ZWRBc3NlbWJsaWVzWzBdLm5lc3RlZEFzc2VtYmx5LnN0YWNrc1sxXS50ZW1wbGF0ZVxuICAgICkudG9NYXRjaFNuYXBzaG90KCk7XG59KTtcbiJdfQ==