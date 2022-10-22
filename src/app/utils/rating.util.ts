export const getRatingClassname = (rating: number) => {
  let classname;

  switch (rating) {
    case 1:
      classname = 'worst';
      break;
    case 2:
      classname = 'poor';
      break;
    case 3:
      classname = 'average';
      break;
    case 4:
      classname = 'good';
      break;
    case 5:
      classname = 'excellent';
      break;

    default:
      classname = 'undefined';
      break;
  }

  return classname;
};
