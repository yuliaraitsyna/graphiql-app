type Variables = {
  [key: string]: number | string;
};

export function extractVariablesFromGraphQLQuery(query: string): {updatedQuery: string; variables: Variables} {
  const variables: Variables = {};
  const updatedQuery = query.replace(/(\w+):\s*(\d+|"[^"]+")/g, (match, key, value) => {
    const variableName = key.toLowerCase();
    variables[variableName] = isNaN(Number(value)) ? value.replace(/"/g, '') : Number(value);
    return `${key}: $${variableName}`;
  });

  return {updatedQuery, variables};
}
