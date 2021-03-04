// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.

import { Environment } from '@ecoinsoft/core-frontend/src/lib/environments/environment';

// The list of which env maps to which file can be found in `.angular-cli.json`.
class envImpl implements Environment {
    footerText="Tiger Team ";
    production = false;

    serverUrl = 'http://localhost:8080';
    // serverUrl = 'http://139.59.100.123:8080';

    xApiKey = '1Y7GFfZubS6g0LSzxKfZ';
    dateFormat = 'dd-MM-yyyy';
    dateTimeFormat = 'dd-MM-yyyy HH:mm:ss a';
    dateTime24Format = 'dd-MM-yyyy HH:mm:ss';
    applicationName = 'J Phea SYSTEM';
    socketUrl: '';
    logError = true;

    pageFeature = {

    };
}

export const environment = new envImpl();
