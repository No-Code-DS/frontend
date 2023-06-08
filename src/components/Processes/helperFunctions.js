export function convertDataFormat(inputObj) {
  const entries = Object.entries(inputObj);
  const columns = entries.map(([key, value]) => key);
  const rows = entries[0][1].map((_, rowIndex) => entries.map(([_, value]) => value[rowIndex]));
  return { columns, rows };
}

export async function getData(projectId, tokenCookie) {
  const response = await fetch(`/api/projects/${projectId}/data_source`, {
    headers: { 
      'accepts': 'application/json',
      'Authorization': 'Bearer ' + tokenCookie.access_token,
    },
  });
  let jsonData = await response.json();
  let formattedData = convertDataFormat(jsonData);
  return formattedData;
}