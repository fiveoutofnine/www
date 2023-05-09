const getUTCMonthShortName = (date: Date): string => {
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][
    date.getUTCMonth()
  ];
};

export default getUTCMonthShortName;
