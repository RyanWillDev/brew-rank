export function buildApiUrl(params) {
  const baseUrl = 'http://localhost:3000/restapi';
  const apiUrl = params.reduce((prev, currParam) => prev.concat(currParam), baseUrl);
  return apiUrl;
}
