export const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' },
];

// arr to obj ,such as { CN : "China", US : "USA" }
export const calendarTypeKeyValue = calendarTypeOptions.reduce((acc: {[key: string]: string}, cur : {key: string, display_name: string}) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});