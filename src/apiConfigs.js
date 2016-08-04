export function buildApiUrl(params) {
  const baseUrl = '/restapi';
  const apiUrl = params.reduce((prev, currParam) => prev.concat(currParam), baseUrl);
  return apiUrl;
}
