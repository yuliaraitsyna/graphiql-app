interface IFormat {
  data: string | string[];
  setData: (str: string) => IFormat;
  getData: () => string;

  join: () => IFormat;
  trim: () => IFormat;
  getLines: () => IFormat;
  getFieldLines: () => IFormat;
  argumentObjectProcessing: () => IFormat;
  setPadding: () => IFormat;

  mutation: (callback: (str: string) => string) => IFormat;
  mutationFunc: {
    trim: (str: string) => string;
    removeDuplicatedSpace: (str: string) => string;
    correctBracketSpace: (str: string) => string;
    correctShapedBracketSpace: (str: string) => string;
    correctArgumentSpace: (str: string) => string;
    correctCommaBehavior: (str: string) => string;
    setLineBreak: (str: string) => string;
  };
}

const rules: IFormat = {
  data: '',

  setData: str => {
    rules.data = str;
    return rules;
  },

  getData: () => rules.data as string,

  join: () => {
    if (Array.isArray(rules.data)) {
      rules.data = (rules.data as string[]).join('');
    }
    return rules;
  },

  trim: () => {
    if (typeof rules.data === 'string') {
      rules.data = rules.data.trim();
    }
    return rules;
  },

  getLines: () => {
    if (typeof rules.data === 'string') {
      rules.data = rules.data.match(/[^{}]*[{}]\s*/g) || [];
    }
    return rules;
  },

  getFieldLines: () => {
    if (Array.isArray(rules.data)) {
      const array: string[] = [];

      (rules.data as string[]).forEach(str => {
        if (
          !str.includes('query') &&
          !str.includes('subscription') &&
          !str.includes('mutation') &&
          !str.includes('fragment')
        ) {
          if (str.includes('}') && !str.includes('(')) {
            array.push(...str.split(' '));
          }

          if (str.includes('{') && !str.includes('(') && str.length > 1) {
            const splitArray = str.split(' ').slice(0, -1);
            splitArray[splitArray.length - 1] += ' {';
            array.push(...splitArray);
          }

          if (str.includes('{') && str.length === 1) {
            array.push(str);
          }

          if (str.includes('{') && str.includes('(')) {
            array.push(str);
          }
        } else {
          array.push(str);
        }
      });

      rules.data = array;
    }
    return rules;
  },

  argumentObjectProcessing: () => {
    if (Array.isArray(rules.data)) {
      rules.data = (rules.data as string[])
        .join('')
        .replace(/\(([^)]*)\)/g, (_, grp) => `(${grp.replace(/\{/g, '<')})`)
        .replace(/\(([^)]*)\)/g, (_, grp) => `(${grp.replace(/\}/g, '>')})`)
        .replace(/\(([^)]*)\)/g, (_, grp) => `(${grp.replace(/</g, '{')})`)
        .replace(/\(([^)]*)\)/g, (_, grp) => `(${grp.replace(/>/g, '}')})`);

      rules.getLines();
    }
    return rules;
  },

  setPadding: () => {
    if (Array.isArray(rules.data)) {
      const array: string[] = [];
      let indentLevel = 0;

      (rules.data as string[]).forEach(str => {
        if (str.includes('{')) {
          array.push(`${'  '.repeat(indentLevel)}${str}`);
          indentLevel++;
        } else if (str.includes('}')) {
          indentLevel--;
          array.push(`${'  '.repeat(indentLevel)}${str}`);
        } else {
          array.push(`${'  '.repeat(indentLevel)}${str}`);
        }
      });

      rules.data = array;
    }
    return rules;
  },

  mutation: callback => {
    if (Array.isArray(rules.data)) {
      rules.data = (rules.data as string[]).map(callback);
    }
    return rules;
  },

  mutationFunc: {
    trim: str => str.trim(),
    removeDuplicatedSpace: str => str.replace(/\s+/g, ' '),
    correctBracketSpace: str => str.replace(' (', '(').replace('){', ') {'),
    correctShapedBracketSpace: str => str.replace(/\s*{/g, ' {').replace(/\s*}/g, ' }').replace(/{\s*/g, '{ '),
    correctArgumentSpace: str => str.replace(/:\s*/g, ': '),
    correctCommaBehavior: str => (str.includes('(') ? str.replace(/,\s*/g, ', ') : str.replace(/,/g, '')),
    setLineBreak: str => `${str}\n`,
  },
};

export const formatting = (query: string): string => {
  return rules
    .setData(query)
    .trim()
    .getLines()
    .mutation(rules.mutationFunc.trim)
    .mutation(rules.mutationFunc.removeDuplicatedSpace)
    .argumentObjectProcessing()
    .mutation(rules.mutationFunc.correctBracketSpace)
    .mutation(rules.mutationFunc.correctShapedBracketSpace)
    .mutation(rules.mutationFunc.correctArgumentSpace)
    .mutation(rules.mutationFunc.correctCommaBehavior)
    .mutation(rules.mutationFunc.trim)
    .getFieldLines()
    .setPadding()
    .mutation(rules.mutationFunc.setLineBreak)
    .join()
    .getData();
};
