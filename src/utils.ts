import Airtable from "airtable";

export const base = new Airtable({
  apiKey: import.meta.env.VITE_AIRTABLE_API_KEY,
}).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

export const states = [
  { name: "Abia", value: "Abia" },
  { name: "Adamawa", value: "Adamawa" },
  { name: "Akwa Ibom", value: "Akwa Ibom" },
  { name: "Anambra", value: "Anambra" },
  { name: "Bauchi", value: "Bauchi" },
  { name: "Bayelsa", value: "Bayelsa" },
  { name: "Benue", value: "Benue" },
  { name: "Borno", value: "Borno" },
  { name: "Cross River", value: "Cross River" },
  { name: "Delta", value: "Delta" },
  { name: "Ebonyi", value: "Ebonyi" },
  { name: "Edo", value: "Edo" },
  { name: "Ekiti", value: "Ekiti" },
  { name: "Enugu", value: "Enugu" },
  { name: "Gombe", value: "Gombe" },
  { name: "Imo", value: "Imo" },
  { name: "Jigawa", value: "Jigawa" },
  { name: "Kaduna", value: "Kaduna" },
  { name: "Kano", value: "Kano" },
  { name: "Katsina", value: "Katsina" },
  { name: "Kebbi", value: "Kebbi" },
  { name: "Kogi", value: "Kogi" },
  { name: "Kwara", value: "Kwara" },
  { name: "Lagos", value: "Lagos" },
  { name: "Nasarawa", value: "Nasarawa" },
  { name: "Niger", value: "Niger" },
  { name: "Ogun", value: "Ogun" },
  { name: "Ondo", value: "Ondo" },
  { name: "Osun", value: "Osun" },
  { name: "Oyo", value: "Oyo" },
  { name: "Plateau", value: "Plateau" },
  { name: "Rivers", value: "Rivers" },
  { name: "Sokoto", value: "Sokoto" },
  { name: "Taraba", value: "Taraba" },
  { name: "Yobe", value: "Yobe" },
  { name: "Zamfara", value: "Zamfara" },
];

export const units = [
  { name: "Administrative", value: "Administrative" },
  { name: "Executive", value: "Executive" },
  { name: "Technical", value: "Technical" },
  { name: "Clerical", value: "Clerical" },
  { name: "Secretaries", value: "Secretaries" },
  { name: "Computer Operators", value: "Computer Operators" },
  { name: "Estate Officer", value: "Estate Officer" },
  { name: "Works", value: "Works" },
  { name: "Securities", value: "Securities" },
  { name: "Town Planners", value: "Town Planners" },
  { name: "Accountants", value: "Accountants" },
  { name: "Doctors", value: "Doctors" },
  { name: "Nurses", value: "Nurses" },
  { name: "System Analyst", value: "System Analyst" },
  { name: "Pharmacists", value: "Pharmacists" },
  { name: "Library Officers", value: "Library Officers" },
  { name: "Legal Officers", value: "Legal Officers" },
  { name: "Architect", value: "Architect" },
  { name: "Engineers", value: "Engineers" },
  { name: "Farm Officers", value: "Farm Officers" },
];

export const nonAcademic = [
  { name: "Deputy Bursars", value: "Deputy Bursars" },
  { name: "Doctors", value: "Doctors" },
  { name: "Matrons", value: "Matrons" },
  {
    name: "Principal Assistant Registrars",
    value: "Principal Assistant Registrars",
  },
  { name: "Senior Assistant Registrars", value: "Senior Assistant Registrars" },
  { name: "Pharmacists", value: "Pharmacists" },
  { name: "Secretaries", value: "Secretaries" },
  { name: "System Analyst", value: "System Analyst" },
  { name: "Accountants", value: "Accountants" },
  { name: "Assistant Registrars", value: "Assistant Registrars" },
  { name: "Works (Senior)", value: "Works (Senior)" },
  { name: "Admin Officers", value: "Admin Officers" },
  { name: "Admin Assistants", value: "Admin Assistants" },
  { name: "Legal Officers", value: "Legal Officers" },
  { name: "Computer Operators", value: "Computer Operators" },
  { name: "Nurses", value: "Nurses" },
  { name: "Library Officers", value: "Library Officers" },
  { name: "Security (Senior)", value: "Security (Senior)" },
  { name: "Farm Officers", value: "Farm Officers" },
  { name: "Executive Officers", value: "Executive Officers" },
  { name: "Architects", value: "Architects" },
  { name: "Engineers", value: "Engineers" },
  { name: "Estate Officers", value: "Estate Officers" },
  { name: "Town Planners", value: "Town Planners" },
  { name: "Technologists", value: "Technologists" },
  { name: "Junior Staff", value: "Junior Staff" },
  { name: "Contract Staff", value: "Contract Staff" },
  { name: "Internship", value: "Internship" },
];

export const academic = [
  { name: "Professor", value: "Professor" },
  { name: "Reader", value: "Reader" },
  { name: "Senior Lecturer", value: "Senior Lecturer" },
  { name: "Lecturer I", value: "Lecturer I" },
  { name: "Lecturer II", value: "Lecturer II" },
  { name: "Assistant Lecturer", value: "Assistant Lecturer" },
  { name: "Graduate Assistant", value: "Graduate Assistant" },
  { name: "Clinical Instructor", value: "Clinical Instructor" },
];

export const levels = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
];

export const employmentTypes = [
  { name: "Permanent", value: "Permanent" },
  { name: "Contract", value: "Contract" },
  { name: "Adjunct", value: "Adjunct" },
  { name: "Sabbatical", value: "Sabbatical" },
];

export const academicQualification = [
  { name: "Bachelor of Arts (BA)", value: "Bachelor of Arts (BA)" },
  {
    name: "Bachelor of Business Administration (BBA)",
    value: "Bachelor of Business Administration (BBA)",
  },
  {
    name: "Bachelor of Engineering (BE)",
    value: "Bachelor of Engineering (BE)",
  },
  { name: "Bachelor of Laws (LL.B)", value: "Bachelor of Laws (LL.B)" },
  {
    name: "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
    value: "Bachelor of Medicine and Bachelor of Surgery (MBBS)",
  },
  { name: "Bachelor of Science (BSc)", value: "Bachelor of Science (BSc)" },
  {
    name: "Bachelor of Technology (BTech)",
    value: "Bachelor of Technology (BTech)",
  },
  {
    name: "Bachelor of Pharmacy (B Pharm)",
    value: "Bachelor of Pharmacy (B Pharm)",
  },
];

export const departments = [
  {
    faculty: "Faculty of Law",
    departments: [
      { name: "Public and Private Law", value: "Public and Private Law" },
      {
        name: "International Law and Jurisprudence",
        value: "International Law and Jurisprudence",
      },
      {
        name: "Commercial and Property Law",
        value: "Commercial and Property Law",
      },
    ],
  },
  {
    faculty: "Faculty of Social Sciences",
    departments: [
      { name: "Economics", value: "Economics" },
      { name: "Sociology", value: "Sociology" },
      { name: "Mass Communication", value: "Mass Communication" },
      { name: "Public Administration", value: "Public Administration" },
      { name: "Psychology", value: "Psychology" },
      { name: "Political Science", value: "Political Science" },
      {
        name: "Criminology and Security Studies",
        value: "Criminology and Security Studies",
      },
    ],
  },
  {
    faculty: "Faculty of Physical Sciences",
    departments: [
      {
        name: "Pure and Industrial Chemistry",
        value: "Pure and Industrial Chemistry",
      },
      { name: "Industrial Physics", value: "Industrial Physics" },
      { name: "Computer Science", value: "Computer Science" },
      { name: "Geology", value: "Geology" },
      { name: "Statistics", value: "Statistics" },
      { name: "Mathematics", value: "Mathematics" },
    ],
  },
  {
    faculty: "Faculty of Agriculture",
    departments: [
      { name: "Soil Science", value: "Soil Science" },
      {
        name: "Agriculture Economics and Extension",
        value: "Agriculture Economics and Extension",
      },
      { name: "Crop Science", value: "Crop Science" },
      {
        name: "Food Science and Technology",
        value: "Food Science and Technology",
      },
      { name: "Fishery and Aquaculture", value: "Fishery and Aquaculture" },
    ],
  },
  {
    faculty: "Faculty of Environmental Sciences",
    departments: [
      { name: "Architecture", value: "Architecture" },
      {
        name: "Urban and Regional Planning",
        value: "Urban and Regional Planning",
      },
      { name: "Environment Management", value: "Environment Management" },
      { name: "Estate Management", value: "Estate Management" },
    ],
  },
  {
    faculty: "Faculty of Natural Sciences",
    departments: [
      { name: "Biochemistry", value: "Biochemistry" },
      { name: "Biological Sciences", value: "Biological Sciences" },
      { name: "Microbiology", value: "Microbiology" },
    ],
  },
  {
    faculty: "Faculty of Management Sciences",
    departments: [
      { name: "Entrepreneur Studies", value: "Entrepreneur Studies" },
      { name: "Banking and Finance", value: "Banking and Finance" },
      { name: "Business Administration", value: "Business Administration" },
      { name: "Marketing", value: "Marketing" },
      { name: "Accountancy", value: "Accountancy" },
    ],
  },
  {
    faculty: "Faculty of Education",
    departments: [
      {
        name: "Library and Information Services",
        value: "Library and Information Services",
      },
      { name: "Science Education", value: "Science Education" },
      { name: "Education Foundations", value: "Education Foundations" },
      {
        name: "Art and Social Sciences Education",
        value: "Art and Social Sciences Education",
      },
      { name: "Vocational Education", value: "Vocational Education" },
    ],
  },
  {
    faculty: "Faculty of Arts",
    departments: [
      { name: "Linguistics/Igbo", value: "Linguistics/Igbo" },
      { name: "Religion and Society", value: "Religion and Society" },
      { name: "Music", value: "Music" },
      { name: "Theater Arts", value: "Theater Arts" },
      { name: "English Language", value: "English Language" },
      { name: "Philosophy", value: "Philosophy" },
      {
        name: "History and International Studies",
        value: "History and International Studies",
      },
    ],
  },
  {
    faculty: "Faculty of Basic Clinical Sciences",
    departments: [
      { name: "Medical Microbiology", value: "Medical Microbiology" },
      {
        name: "Pharmacology and Therapeutics",
        value: "Pharmacology and Therapeutics",
      },
      { name: "Hematology", value: "Hematology" },
      { name: "Pathology", value: "Pathology" },
      { name: "Histopathology", value: "Histopathology" },
    ],
  },
  {
    faculty: "Faculty of Basic Clinical Medicine",
    departments: [
      { name: "Community Medicine", value: "Community Medicine" },
      { name: "Pediatrics", value: "Pediatrics" },
      { name: "Surgery", value: "Surgery" },
      { name: "Internal Medicine", value: "Internal Medicine" },
      { name: "Obstetrics and Gynecology", value: "Obstetrics and Gynecology" },
    ],
  },
  {
    faculty: "Faculty of Basic Medical Sciences",
    departments: [
      { name: "Anatomy", value: "Anatomy" },
      { name: "Physiology", value: "Physiology" },
      { name: "Medical Biochemistry", value: "Medical Biochemistry" },
    ],
  },
  {
    faculty: "Faculty of Pharmaceutical Sciences",
    departments: [
      {
        name: "Pharmacology and Toxicology",
        value: "Pharmacology and Toxicology",
      },
      {
        name: "Pharmaceutical Microbiology and Biotechnology",
        value: "Pharmaceutical Microbiology and Biotechnology",
      },
      {
        name: "Pharmaceutics and Pharmaceutical Technology",
        value: "Pharmaceutics and Pharmaceutical Technology",
      },
      {
        name: "Pharmacognosy and Traditional Medicine",
        value: "Pharmacognosy and Traditional Medicine",
      },
      {
        name: "Clinical Pharmacy and Pharmacy Management",
        value: "Clinical Pharmacy and Pharmacy Management",
      },
      {
        name: "Pharmaceutical and Medicinal Chemistry",
        value: "Pharmaceutical and Medicinal Chemistry",
      },
    ],
  },
  {
    faculty: "Faculty of Health Sciences",
    departments: [
      { name: "Nursing", value: "Nursing" },
      {
        name: "Medical Laboratory Sciences",
        value: "Medical Laboratory Sciences",
      },
    ],
  },
  {
    faculty: "Faculty Engineering",
    departments: [
      { name: "Civil Engineering", value: "Civil Engineering" },
      { name: "Mechanical Engineering", value: "Mechanical Engineering" },
      { name: "Chemical Engineering", value: "Chemical Engineering" },
    ],
  },
  {
    faculty: "University Main Library",
    departments: [{ name: "Library Service", value: "Library Service" }],
  },
];


export const nin = {
  nin: "70123456789",
  first_name: "John",
  last_name: "Doe",
  middle_name: "Alamutu",
  phone_number: "08012345678",
  date_of_birth: "1982-01-01",
  photo: "/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgc...",
  gender: "m",
}