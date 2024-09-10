type Variables = {
  [key: string]: number | string;
};
export function processGraphQLQuery(query: string, variables: Variables) {
  return query.replace(/(\w+):\s*\$(\w+)/g, (match, key, variableName) => {
    if (variableName in variables) {
      return `${key}: ${JSON.stringify(variables[variableName])}`;
    }
    return match;
  });
}
