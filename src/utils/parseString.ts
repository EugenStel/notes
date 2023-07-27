import { TAG_PATTERN } from "../constants/tagPattern"

export const parseString = (string: any) => string.match(TAG_PATTERN)