export interface Variable {
  name: string;
  desc: string;
}

export interface Dataset {
  label: string;
  badgeClass: string;
  emoji: string;
  n: string;
  source: string;
  unit: string;
  description: string;
  caveat: string;
  variables: {
    categorical: Variable[];
    quantitative: Variable[];
  };
}

export interface Question {
  dataset: 'diabetes' | 'social' | 'county';
  question: string;
  isStat: boolean;
  why: string;
  vars: string[];
}

export const DATASETS: Record<string, Dataset> = {
  diabetes: {
    label: "Diabetes Hospital Readmission",
    badgeClass: "bg-blue-50 text-blue-700",
    emoji: "🏥",
    n: "251 patient encounters",
    source: "130 U.S. hospitals, 1999–2008",
    unit: "Each row = one hospital admission",
    description: "This dataset contains hospital records for patients diagnosed with diabetes, drawn from a study of clinical care across 130 hospitals in the United States between 1999 and 2008. Each row represents a single hospital admission. The data includes patient background, care received during the visit, and whether the patient was readmitted within 30 days of discharge. Early readmission is a major concern in healthcare because it often signals inadequate management and results in financial penalties for hospitals.",
    caveat: "Because each row is a hospital encounter rather than a unique individual, the same patient may appear more than once.",
    variables: {
      categorical: [
        { name: "race", desc: "Patient's recorded race" },
        { name: "gender", desc: "Patient's gender" },
        { name: "age_group", desc: "Age at admission: Young Adult/Child (<40), Middle Age (40–59), Older Adult (60–79), Senior (80+)" },
        { name: "A1C_status", desc: "HbA1c result: Normal, Elevated, or Not Tested" },
        { name: "insulin", desc: "Insulin prescribing status: No, Steady, Up, or Down" },
        { name: "diabetesMed", desc: "Whether any diabetes medication was prescribed: Yes or No" },
        { name: "change", desc: "Whether diabetes medication was changed during stay: Ch or No" },
        { name: "readmitted_30days", desc: "Readmitted within 30 days: Yes or No" },
        { name: "stay_length", desc: "Hospital stay length: Short (1–3 d), Medium (4–7 d), Long (8–14 d)" },
        { name: "med_burden", desc: "Total medications: Low (1–10), Moderate (11–20), High (21+)" },
      ],
      quantitative: [
        { name: "time_in_hospital", desc: "Number of days hospitalized" },
        { name: "num_lab_procedures", desc: "Number of lab tests performed" },
        { name: "num_procedures", desc: "Number of medical procedures performed" },
        { name: "num_medications", desc: "Total distinct medications prescribed" },
        { name: "number_outpatient", desc: "Outpatient visits in the year before admission" },
        { name: "number_emergency", desc: "ER visits in the year before admission" },
        { name: "number_inpatient", desc: "Prior hospitalizations in the year before admission" },
        { name: "number_diagnoses", desc: "Total diagnoses recorded during stay" },
      ]
    }
  },
  social: {
    label: "Social Media & Mental Health",
    badgeClass: "bg-purple-50 text-purple-700",
    emoji: "📱",
    n: "250 survey respondents",
    source: "Voluntary self-report survey",
    unit: "Each row = one survey respondent",
    description: "This dataset comes from a survey examining the relationship between social media use and mental health indicators. Each row represents one survey respondent. Participants answered questions about their social media habits and their mental and emotional well-being, including distraction, worry, depression, sleep quality, and social comparison. The survey was completed voluntarily by 250 respondents ranging in age from 13 to 60.",
    caveat: "Because the data comes from a self-reported survey, researchers should think carefully about what kinds of conclusions can and cannot be drawn from it.",
    variables: {
      categorical: [
        { name: "gender", desc: "Respondent's gender: Male, Female, Other" },
        { name: "age_group", desc: "Age category: Teen (13–17), Young Adult (18–24), Adult (25–35), Older Adult (36–60)" },
        { name: "relationship_status", desc: "Single, In a relationship, Married, Divorced" },
        { name: "occupation", desc: "University Student, School Student, Salaried Worker, Retired" },
        { name: "org_type", desc: "University, School, Company/Private, Other" },
        { name: "daily_sm_time", desc: "Daily social media use: Less than 1 hr up to More than 5 hrs" },
        { name: "uses_tiktok", desc: "Whether respondent uses TikTok: Yes or No" },
        { name: "uses_instagram", desc: "Whether respondent uses Instagram: Yes or No" },
        { name: "mh_category", desc: "Mental health concern level: Low (1–2), Moderate (2–3.5), High (3.5–5)" },
      ],
      quantitative: [
        { name: "age", desc: "Respondent's age in years" },
        { name: "num_platforms", desc: "Total number of social media platforms used (1–9)" },
        { name: "purposeless_use", desc: "How often social media is used without purpose (1=Never, 5=Always)" },
        { name: "distracted_by_sm", desc: "How often social media causes distraction while busy (1–5)" },
        { name: "restless_without_sm", desc: "Restlessness without social media (1–5)" },
        { name: "easily_distracted", desc: "General level of distractibility (1–5)" },
        { name: "bothered_by_worries", desc: "How much bothered by worries (1–5)" },
        { name: "difficulty_concentrating", desc: "Difficulty concentrating on tasks (1–5)" },
        { name: "social_comparison", desc: "Frequency of comparing oneself to others on social media (1–5)" },
        { name: "validation_seeking", desc: "How often approval is sought through social media (1–5)" },
        { name: "feel_depressed", desc: "How often respondent feels depressed or down (1–5)" },
        { name: "interest_fluctuation", desc: "Frequency of fluctuating interest in daily activities (1–5)" },
        { name: "sleep_issues", desc: "How often sleep problems occur (1–5)" },
        { name: "mh_score", desc: "Composite mental health concern score — average of 7 items (1.0–5.0)" },
      ]
    }
  },
  county: {
    label: "U.S. County Demographics",
    badgeClass: "bg-emerald-50 text-emerald-700",
    emoji: "🗺",
    n: "313 U.S. counties",
    source: "U.S. Census Bureau — American Community Survey",
    unit: "Each row = one county",
    description: "This dataset contains demographic and economic information for 313 counties across the United States, drawn from the US Census Bureau's American Community Survey. Each row represents one county. The data includes information about the people who live there — their age, education levels, income, housing, and ethnic and linguistic backgrounds — as well as characteristics of the county itself.",
    caveat: "Because each row represents an entire county rather than an individual person, researchers should think carefully about what the population and observational unit are.",
    variables: {
      categorical: [
        { name: "County", desc: "Name of the county" },
        { name: "State", desc: "Two-letter state abbreviation" },
        { name: "region", desc: "US Census region: Northeast, Midwest, South, or West" },
        { name: "urbanization", desc: "Population density: Rural (<50/sq mi), Suburban (50–500), Urban (500+)" },
        { name: "edu_attainment", desc: "% adults with bachelor's: Low (<15%), Moderate (15–25%), High (25%+)" },
        { name: "income_category", desc: "Median household income: Lower (<$42k), Middle ($42k–$60k), Higher ($60k+)" },
        { name: "foreign_born_category", desc: "% foreign-born: Low (0–2%), Moderate (2–7%), High (7%+)" },
      ],
      quantitative: [
        { name: "pct_hispanic", desc: "Percentage of residents identifying as Hispanic or Latino" },
        { name: "pct_foreign_born", desc: "Percentage of residents born outside the US" },
        { name: "pct_language_other", desc: "Percentage speaking a language other than English at home" },
        { name: "pct_bachelors", desc: "Percentage of adults with a bachelor's degree or higher" },
        { name: "pct_high_school", desc: "Percentage of adults with a high school diploma or higher" },
        { name: "median_household_income", desc: "Median annual household income in dollars" },
        { name: "per_capita_income", desc: "Average income per person in the county, in dollars" },
        { name: "homeownership_rate", desc: "Percentage of housing units that are owner-occupied" },
        { name: "median_home_value", desc: "Median estimated value of owner-occupied homes, in dollars" },
        { name: "mean_travel_time", desc: "Average commute time to work, in minutes" },
        { name: "pop_per_sq_mile", desc: "Number of people per square mile — population density" },
        { name: "pct_under_18", desc: "Percentage of county residents under 18 years old" },
        { name: "pct_65_older", desc: "Percentage of county residents 65 or older" },
      ]
    }
  }
};

export const QUESTIONS: Question[] = [
  {
    dataset: "diabetes",
    question: "Do patients who had their diabetes medication changed (change = Ch) tend to have longer hospital stays than those whose medication was not changed?",
    isStat: true,
    why: "This compares <strong>time_in_hospital</strong> across two groups defined by <strong>change</strong>. The hospital stay varies from patient to patient — we need a two-sample comparison to answer this, not a single lookup.",
    vars: ["time_in_hospital", "change"]
  },
  {
    dataset: "diabetes",
    question: "How many patients in this dataset were prescribed diabetes medication?",
    isStat: false,
    why: "This is a simple count of a fixed characteristic in the dataset (<strong>diabetesMed = Yes</strong>). There is one exact answer — no sampling, no variability, no inference required.",
    vars: ["diabetesMed"]
  },
  {
    dataset: "diabetes",
    question: "What proportion of Senior patients (age_group = 80+) were readmitted within 30 days?",
    isStat: true,
    why: "<strong>readmitted_30days</strong> varies across Senior patients — some are readmitted, some are not. We use a sample proportion to estimate the true population proportion, with uncertainty built in.",
    vars: ["age_group", "readmitted_30days"]
  },
  {
    dataset: "diabetes",
    question: "Is there a relationship between the number of lab procedures performed and the length of hospital stay?",
    isStat: true,
    why: "Both <strong>num_lab_procedures</strong> and <strong>time_in_hospital</strong> vary across patients. This calls for a correlation or regression analysis — a core statistical method for exploring relationships in data.",
    vars: ["num_lab_procedures", "time_in_hospital"]
  },
  {
    dataset: "diabetes",
    question: "What is the highest number of diagnoses recorded for any single patient in this dataset?",
    isStat: false,
    why: "This asks for the maximum value of <strong>number_diagnoses</strong> — a single fixed number you can find by sorting the dataset. No inference, no variability across a population.",
    vars: ["number_diagnoses"]
  },
  {
    dataset: "diabetes",
    question: "On average, do patients with Elevated A1C status have a higher medication burden than patients with Normal A1C?",
    isStat: true,
    why: "<strong>med_burden</strong> varies across patients in both groups. Comparing averages requires statistical reasoning — the mean differs from patient to patient, so we need inference to draw conclusions.",
    vars: ["A1C_status", "med_burden", "num_medications"]
  },
  {
    dataset: "diabetes",
    question: "Does the proportion of patients readmitted within 30 days differ across racial groups?",
    isStat: true,
    why: "Both <strong>race</strong> and <strong>readmitted_30days</strong> vary across observations. This is a classic two-way proportion comparison requiring a chi-square or proportion test — not a deterministic calculation.",
    vars: ["race", "readmitted_30days"]
  },
  {
    dataset: "diabetes",
    question: "Which stay_length category (Short, Medium, Long) appears most frequently in the dataset?",
    isStat: false,
    why: "Finding the mode of <strong>stay_length</strong> is a direct count — it produces one fixed answer from the data. No sample, no inference, no probability. This is a descriptive lookup, not a statistical question.",
    vars: ["stay_length"]
  },
  {
    dataset: "social",
    question: "Is there a relationship between the number of social media platforms used and a respondent's mental health score?",
    isStat: true,
    why: "Both <strong>num_platforms</strong> and <strong>mh_score</strong> vary from respondent to respondent. Exploring their relationship requires correlation or regression — statistical tools for quantifying association with uncertainty.",
    vars: ["num_platforms", "mh_score"]
  },
  {
    dataset: "social",
    question: "What social media platform does respondent #23 use most?",
    isStat: false,
    why: "This asks about a single individual's data — one fixed row in the dataset. There is no variability, no sample, and no inference. This is a record lookup, not a statistical question.",
    vars: ["uses_tiktok", "uses_instagram"]
  },
  {
    dataset: "social",
    question: "Do university students report higher levels of social comparison than salaried workers?",
    isStat: true,
    why: "<strong>social_comparison</strong> varies across respondents in both groups. Comparing the two occupational groups requires a statistical test (e.g., two-sample t-test), because both groups show variability in their responses.",
    vars: ["occupation", "social_comparison"]
  },
  {
    dataset: "social",
    question: "How many respondents in the dataset use both TikTok and Instagram?",
    isStat: false,
    why: "This is a direct count — filtering rows where <strong>uses_tiktok = Yes</strong> and <strong>uses_instagram = Yes</strong>. The answer is a single fixed number. No inference, no sampling distribution.",
    vars: ["uses_tiktok", "uses_instagram"]
  },
  {
    dataset: "social",
    question: "Do respondents who report more purposeless social media use also tend to report higher depression scores?",
    isStat: true,
    why: "Both <strong>purposeless_use</strong> and <strong>feel_depressed</strong> are measured on a 1–5 scale and vary across respondents. This calls for correlation analysis — a statistical method that quantifies the strength and direction of association.",
    vars: ["purposeless_use", "feel_depressed"]
  },
  {
    dataset: "social",
    question: "What is the average mental health score (mh_score) for respondents who use social media more than 5 hours per day?",
    isStat: true,
    why: "<strong>mh_score</strong> varies across the respondents who use social media more than 5 hours daily (<strong>daily_sm_time</strong>). The mean is a statistic estimated from this subgroup — it comes with sampling variability and uncertainty.",
    vars: ["daily_sm_time", "mh_score"]
  },
  {
    dataset: "social",
    question: "What is the maximum mh_score recorded in the entire dataset?",
    isStat: false,
    why: "The maximum of <strong>mh_score</strong> is a single, fixed value from the dataset. It doesn't involve sampling, inference, or variability across a population — just identifying one extreme data point.",
    vars: ["mh_score"]
  },
  {
    dataset: "social",
    question: "Is the proportion of respondents with High mental health concern (mh_category = High) greater among those who report difficulty concentrating than among those who do not?",
    isStat: true,
    why: "Both <strong>difficulty_concentrating</strong> and <strong>mh_category</strong> vary across respondents. Comparing proportions between these groups requires a hypothesis test — the answer is uncertain and depends on the sample.",
    vars: ["difficulty_concentrating", "mh_category"]
  },
  {
    dataset: "social",
    question: "What age group has the most respondents in the dataset?",
    isStat: false,
    why: "Finding the most common <strong>age_group</strong> is a mode calculation — a direct count with a fixed answer. No inference, no probability, no variability about the population is involved.",
    vars: ["age_group"]
  },
  {
    dataset: "county",
    question: "Do counties in the West region tend to have higher median household incomes than counties in the South?",
    isStat: true,
    why: "<strong>median_household_income</strong> varies across counties in both regions. Comparing them requires a two-sample test — the answer differs across the population of counties and cannot be determined from a single lookup.",
    vars: ["region", "median_household_income"]
  },
  {
    dataset: "county",
    question: "What is the median household income of Orange County, California?",
    isStat: false,
    why: "This asks for a single recorded value for one specific county — a fixed data point, not a question about a distribution. No sample, no inference, no variability across counties is involved.",
    vars: ["County", "State", "median_household_income"]
  },
  {
    dataset: "county",
    question: "Is there a relationship between the percentage of adults with a bachelor's degree and per capita income across US counties?",
    isStat: true,
    why: "Both <strong>pct_bachelors</strong> and <strong>per_capita_income</strong> vary from county to county. This calls for regression or correlation analysis — statistical methods that estimate the strength of the relationship while accounting for uncertainty.",
    vars: ["pct_bachelors", "per_capita_income"]
  },
  {
    dataset: "county",
    question: "How many counties in this dataset are classified as Urban?",
    isStat: false,
    why: "Counting counties where <strong>urbanization = Urban</strong> gives one fixed answer from the data. No sampling, no inference, no variability — this is a direct filter and count.",
    vars: ["urbanization"]
  },
  {
    dataset: "county",
    question: "On average, do counties with a higher percentage of foreign-born residents also tend to have longer mean commute times?",
    isStat: true,
    why: "Both <strong>pct_foreign_born</strong> and <strong>mean_travel_time</strong> vary across counties. Exploring this relationship requires correlation analysis — we are estimating a pattern in a population of counties, not reading a single fixed fact.",
    vars: ["pct_foreign_born", "mean_travel_time"]
  },
  {
    dataset: "county",
    question: "Which state has the most counties in this dataset?",
    isStat: false,
    why: "Counting counties per <strong>State</strong> and finding the maximum is a direct tabulation. The answer is fixed and exact — no inference, no distribution, no variability about a population.",
    vars: ["State", "County"]
  },
  {
    dataset: "county",
    question: "Do rural counties have a significantly higher percentage of residents over 65 compared to urban counties?",
    isStat: true,
    why: "<strong>pct_65_older</strong> varies across counties in both <strong>urbanization</strong> categories. 'Significantly higher' signals hypothesis testing — we are drawing an inference about county-level populations, not computing a single fixed fact.",
    vars: ["urbanization", "pct_65_older"]
  },
  {
    dataset: "county",
    question: "What is the homeownership rate in the county with the highest median home value?",
    isStat: false,
    why: "This identifies one specific county using <strong>median_home_value</strong> and reads its <strong>homeownership_rate</strong> — a two-step lookup. Both values are fixed facts for that county. No inference or population-level variability is involved.",
    vars: ["median_home_value", "homeownership_rate"]
  }
];
