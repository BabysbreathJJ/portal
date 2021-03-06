// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // apiBase: 'http://evanclinuxdev1.eastasia.cloudapp.azure.com:8080/v1'
  apiBase: 'http://frontend.westus.azurecontainer.io/v1'
  // apiBase: 'http://frontend.centralus.azurecontainer.io/v1'
};
