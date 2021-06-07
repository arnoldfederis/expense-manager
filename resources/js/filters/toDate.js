Vue.filter('toDate', (value, isTimestamp = false, format = 'YYYY-MM-DD hh:mm:ss') => {
  if (isTimestamp) {
    value = new Date(value * 1000);
  }

  return moment(value).format(format);
});
