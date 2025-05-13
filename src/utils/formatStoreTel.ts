const formatStoreTel = (value: string) => {
  const onlyNums = value.replace(/[^0-9]/g, '');

  if (onlyNums.startsWith('02')) {
    // 서울 (02-xxxx-xxxx)
    if (onlyNums.length <= 2) return onlyNums;
    if (onlyNums.length <= 6)
      return `${onlyNums.slice(0, 2)}-${onlyNums.slice(2)}`;
    if (onlyNums.length <= 10)
      return `${onlyNums.slice(0, 2)}-${onlyNums.slice(2, 6)}-${onlyNums.slice(
        6,
      )}`;
  } else {
    // 나머지 지역 (지역번호 3자리)
    if (onlyNums.length <= 3) return onlyNums;
    if (onlyNums.length <= 7)
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(
      7,
      11,
    )}`;
  }

  return onlyNums;
};
