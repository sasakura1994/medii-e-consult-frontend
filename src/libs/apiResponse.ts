type ComvertedDataType = {
  [key: string]:
    | string
    | string[]
    | number
    | number[]
    | boolean
    | null
    | undefined;
};

/**
 * Responseデータの null を undefined に変換
 */
export const fromNullToUndefined = <T extends ComvertedDataType>(
  data: T
): T => {
  if (!data) {
    return {} as T;
  }

  if (Object.keys(data).length === 0) {
    return {} as T;
  }

  const newData: ComvertedDataType = {};
  Object.entries(data).forEach(([key, value]) => {
    if (value === null) {
      newData[key] = undefined;
    } else {
      newData[key] = value;
    }
  });

  return newData as T;
};
