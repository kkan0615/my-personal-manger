import { InputRuleType } from '@/types/libs/bootstraps/form'

/**
 * Check validation by rules
 * @param value - check value
 * @param rules - rules made white array of function
 */

export const validate = <T = any>(value: T, rules: Array<InputRuleType>): boolean | string => {
  let isValid: boolean | string = true

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i]

    const result = rule(value)
    if (!result || typeof result === 'string') {
      isValid = result
      break
    }
  } // for ends

  return isValid
}
