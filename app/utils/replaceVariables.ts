import {Variable} from '~/components/VariablesEditor/models/variable';

export const replaceVariables = (body: string, variables: Variable[]): string => {
  const variableMap: Record<string, string> = variables.reduce(
    (acc, variable) => {
      if (variable.checked) {
        acc[variable.name] = variable.value;
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  return body.replace(/{{(.*?)}}/g, (_, variable) => {
    return `"${variableMap[variable]}"` || `{{${variable}}}`;
  });
};
