export const convertReadableByte = (byte: number, fixedNum = 2): string => {
  // NOTE: https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string/10420404#answer-20732091
  const fileSizeUnits = [
    "B",
    "kB",
    "MB",
    "GB",
    "TB",
    "PB",
    "EB",
    "ZB",
    "YB",
  ] as const satisfies readonly string[];
  // NOTE: べき乗を計算。1024にpowerOfN乗する
  const powerOfN = Math.floor(Math.log(byte) / Math.log(1024));
  const humanReadableFileByte = (byte / Math.pow(1024, powerOfN)).toFixed(
    fixedNum
  );
  return `${humanReadableFileByte}${fileSizeUnits[powerOfN]}`;
};
