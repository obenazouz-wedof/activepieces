import { wedofAuth } from '../../..';
import { createTrigger, TriggerStrategy } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { wedofCommon } from '../../common/wedof';

export const certificationFolderSurveyLongTermExperienceAnswered = createTrigger({
  auth: wedofAuth,
  name: 'certificationFolderSurveyLongTermExperienceAnswered',
  displayName: 'Enquête "Situation professionnelle au moins un an" répondue',
  description: "Se déclenche lorsqu'un une enquête de au moins un an de cursus est répondue",
  type: TriggerStrategy.WEBHOOK,
  props: {},
  sampleData: {
    "id": 0,
    "initialExperience": {
      "id": 0,
      "qualification": 0,
      "certificationName": "string",
      "job": "string",
      "companyName": "string",
      "salaryYearly": 0,
      "situation": "string",
      "contractType": "string",
      "executiveStatus": true,
      "startDate": "2019-08-24T14:15:22Z",
      "endDate": "2019-08-24T14:15:22Z",
      "createdOn": "2019-08-24T14:15:22Z",
      "updatedOn": "2019-08-24T14:15:22Z"
    },
    "initialExperienceAnsweredDate": "2019-08-24T14:15:22Z",
    "sixMonthExperience": {
      "id": 0,
      "qualification": 0,
      "certificationName": "string",
      "job": "string",
      "companyName": "string",
      "salaryYearly": 0,
      "situation": "string",
      "contractType": "string",
      "executiveStatus": true,
      "startDate": "2019-08-24T14:15:22Z",
      "endDate": "2019-08-24T14:15:22Z",
      "createdOn": "2019-08-24T14:15:22Z",
      "updatedOn": "2019-08-24T14:15:22Z"
    },
    "sixMonthExperienceAnsweredDate": "2019-08-24T14:15:22Z",
    "sixMonthExperienceStartDate": "2019-08-24T14:15:22Z",
    "longTermExperience": {
      "id": 0,
      "qualification": 0,
      "certificationName": "string",
      "job": "string",
      "companyName": "string",
      "salaryYearly": 0,
      "situation": "string",
      "contractType": "string",
      "executiveStatus": true,
      "startDate": "2019-08-24T14:15:22Z",
      "endDate": "2019-08-24T14:15:22Z",
      "createdOn": "2019-08-24T14:15:22Z",
      "updatedOn": "2019-08-24T14:15:22Z"
    },
    "longTermExperienceAnsweredDate": "2019-08-24T14:15:22Z",
    "longTermExperienceStartDate": "2019-08-24T14:15:22Z",
    "state": "created"
  },

  async onEnable(context) {
    const url = context.webhookUrl as string;
    const name =
      'Activepieces - certificationFolderSurveyLongTermExperienceAnswered - ' +
      url.substring(url.lastIndexOf('/') + 1);

    const message = {
      url: context.webhookUrl,
      events: ['certificationFolderSurvey.longTermExperienceAnswered'],
      name: name,
      secret: null,
      enabled: true,
      ignoreSsl: false,
    };

    const id = await context.store.get('_webhookId');

    if (id === null) {
      const response = await httpClient.sendRequest({
        method: HttpMethod.POST,
        url: wedofCommon.baseUrl + '/webhooks',
        body: message,
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': context.auth as string,
          'User-Agent': 'activepieces'
        },
      });

      await context.store.put('_webhookId', response.body.id);
    } else {
      console.log('/////////// webhook already exist ////');
    }
  },

  async onDisable(context) {
    const id = await context.store.get('_webhookId');

    await httpClient.sendRequest({
      method: HttpMethod.DELETE,
      url: wedofCommon.baseUrl + '/webhooks/' + id,
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': context.auth as string,
        'User-Agent': 'activepieces'
      },
    });
    await context.store.delete('_webhookId');
  },
  async run(context) {
    return [context.payload.body];
  },
});
