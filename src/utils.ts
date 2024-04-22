import Airtable from "airtable";

export const base = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
}).base(import.meta.env.VITE_AIRTABLE_BASE_ID);


export const states = [
  { name: 'Abia', value: 'Abia' },
  { name: 'Adamawa', value: 'Adamawa' },
  { name: 'Akwa Ibom', value: 'Akwa Ibom' },
  { name: 'Anambra', value: 'Anambra' },
  { name: 'Bauchi', value: 'Bauchi' },
  { name: 'Bayelsa', value: 'Bayelsa' },
  { name: 'Benue', value: 'Benue' },
  { name: 'Borno', value: 'Borno' },
  { name: 'Cross River', value: 'Cross River' },
  { name: 'Delta', value: 'Delta' },
  { name: 'Ebonyi', value: 'Ebonyi' },
  { name: 'Edo', value: 'Edo' },
  { name: 'Ekiti', value: 'Ekiti' },
  { name: 'Enugu', value: 'Enugu' },
  { name: 'Gombe', value: 'Gombe' },
  { name: 'Imo', value: 'Imo' },
  { name: 'Jigawa', value: 'Jigawa' },
  { name: 'Kaduna', value: 'Kaduna' },
  { name: 'Kano', value: 'Kano' },
  { name: 'Katsina', value: 'Katsina' },
  { name: 'Kebbi', value: 'Kebbi' },
  { name: 'Kogi', value: 'Kogi' },
  { name: 'Kwara', value: 'Kwara' },
  { name: 'Lagos', value: 'Lagos' },
  { name: 'Nasarawa', value: 'Nasarawa' },
  { name: 'Niger', value: 'Niger' },
  { name: 'Ogun', value: 'Ogun' },
  { name: 'Ondo', value: 'Ondo' },
  { name: 'Osun', value: 'Osun' },
  { name: 'Oyo', value: 'Oyo' },
  { name: 'Plateau', value: 'Plateau' },
  { name: 'Rivers', value: 'Rivers' },
  { name: 'Sokoto', value: 'Sokoto' },
  { name: 'Taraba', value: 'Taraba' },
  { name: 'Yobe', value: 'Yobe' },
  { name: 'Zamfara', value: 'Zamfara' }
];


export const units = [
  { name: 'Administrative', value: 'Administrative' },
  { name: 'Executive', value: 'Executive' },
  { name: 'Technical', value: 'Technical' },
  { name: 'Clerical', value: 'Clerical' },
  { name: 'Secretaries', value: 'Secretaries' },
  { name: 'Computer Operators', value: 'Computer Operators' },
  { name: 'Estate Officer', value: 'Estate Officer' },
  { name: 'Works', value: 'Works' },
  { name: 'Securities', value: 'Securities' },
  { name: 'Town Planners', value: 'Town Planners' },
  { name: 'Accountants', value: 'Accountants' },
  { name: 'Doctors', value: 'Doctors' },
  { name: 'Nurses', value: 'Nurses' },
  { name: 'System Analyst', value: 'System Analyst' },
  { name: 'Pharmacists', value: 'Pharmacists' },
  { name: 'Library Officers', value: 'Library Officers' },
  { name: 'Legal Officers', value: 'Legal Officers' },
  { name: 'Architect', value: 'Architect' },
  { name: 'Engineers', value: 'Engineers' },
  { name: 'Farm Officers', value: 'Farm Officers' }
];
