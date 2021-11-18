export type InputRuleType = (v: any) => string | boolean

export type RuleType<T = Record<string, any>> = Record<keyof T | string, Array<InputRuleType>>
