import {Variable} from '~/components/models/variable';

export const replaceVariablesInURL = (url: string, variables: Variable[]): string => {
  const variableMap: Record<string, string> = variables.reduce(
    (acc, variable) => {
      if (variable.checked) {
        acc[variable.name] = variable.value;
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  return url.replace(/{(.*?)}/g, (_, variable) => {
    return variableMap[variable] || `{${variable}}`;
  });
};
