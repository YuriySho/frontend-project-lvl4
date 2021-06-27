// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  data: () => [host, prefix, 'data'].join('/'),
  loginPath: () => [host, prefix, 'login'].join('/'),
  chatPath: () => [host, prefix, '/'].join('/'),
};
