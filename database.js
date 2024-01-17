const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const dummyData = [
  {
    id: 1,
    company_name: "Storable Careers - One Posting",
    job_title: "Sr. Financial Analyst",
    city: "United States",
    country: ["United States"],
    job_category: ["Accounting, Payroll & Financial Planning Jobs"],
    job_type: ["Full Time"],
    location_type: ["In-Person"],
    description: "<div> ... (omitted for brevity) ... </div>",
    years_of_experience: {
      $numberInt: "3",
    },
    salary: null,
    date_posted: "2023-10-18",
    application_link:
      "https://boards.greenhouse.io/embed/job_app?for=storablecareers&token=5001974004",
    company_link: "www.storable.com",
    company_logo:
      "https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/912/600/resized/LinkedIn_Posting_GH_Job_Board_(537_×_293_px)_(1).png?1677260086",
    job_board: "Greenhouse",
    job_board_link:
      "https://boards.greenhouse.io/embed/job_board?for=storablecareers",
    promoted: null,
    expired_date: null,
    us_state: null,
    requirements_summary:
      "3+ years Finance/FP&A, Consulting, or Investment Banking experience. BS/BA Degree in Finance, Accounting, Economics, Business or equivalent work experience. Inquisitive nature, strong financial modeling & communication skills, ability to manage multiple projects",
    yoe_range: {
      min: {
        $numberInt: "3",
      },
      max: {
        $numberInt: "3",
      },
    },
    date_posted_parsed: {
      $date: {
        $numberLong: "1697587200000",
      },
    },
    date_posted_epoch: {
      $numberDouble: "1697587200.0",
    },
  },
  {
    id: 2,

    company_name: "Storable Careers - One Posting",
    job_title: "Sr. Financial Analyst",
    city: "United States",
    country: ["United States"],
    job_category: ["Accounting, Payroll & Financial Planning Jobs"],
    job_type: ["Full Time"],
    location_type: ["In-Person"],
    description: "<div> ... (omitted for brevity) ... </div>",
    years_of_experience: {
      $numberInt: "3",
    },
    salary: null,
    date_posted: "2023-10-18",
    application_link:
      "https://boards.greenhouse.io/embed/job_app?for=storablecareers&token=5001974004",
    company_link: "www.storable.com",
    company_logo:
      "https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/912/600/resized/LinkedIn_Posting_GH_Job_Board_(537_×_293_px)_(1).png?1677260086",
    job_board: "Greenhouse",
    job_board_link:
      "https://boards.greenhouse.io/embed/job_board?for=storablecareers",
    promoted: null,
    expired_date: null,
    us_state: null,
    requirements_summary:
      "3+ years Finance/FP&A, Consulting, or Investment Banking experience. BS/BA Degree in Finance, Accounting, Economics, Business or equivalent work experience. Inquisitive nature, strong financial modeling & communication skills, ability to manage multiple projects",
    yoe_range: {
      min: {
        $numberInt: "3",
      },
      max: {
        $numberInt: "3",
      },
    },
    date_posted_parsed: {
      $date: {
        $numberLong: "1697587200000",
      },
    },
    date_posted_epoch: {
      $numberDouble: "1697587200.0",
    },
  },
  {
    id: 3,

    company_name: "Storable Careers - One Posting",
    job_title: "Sr. Financial Analyst",
    city: "United States",
    country: ["United States"],
    job_category: ["Accounting, Payroll & Financial Planning Jobs"],
    job_type: ["Full Time"],
    location_type: ["In-Person"],
    description: "<div> ... (omitted for brevity) ... </div>",
    years_of_experience: {
      $numberInt: "3",
    },
    salary: null,
    date_posted: "2023-10-18",
    application_link:
      "https://boards.greenhouse.io/embed/job_app?for=storablecareers&token=5001974004",
    company_link: "www.storable.com",
    company_logo:
      "https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/912/600/resized/LinkedIn_Posting_GH_Job_Board_(537_×_293_px)_(1).png?1677260086",
    job_board: "Greenhouse",
    job_board_link:
      "https://boards.greenhouse.io/embed/job_board?for=storablecareers",
    promoted: null,
    expired_date: null,
    us_state: null,
    requirements_summary:
      "3+ years Finance/FP&A, Consulting, or Investment Banking experience. BS/BA Degree in Finance, Accounting, Economics, Business or equivalent work experience. Inquisitive nature, strong financial modeling & communication skills, ability to manage multiple projects",
    yoe_range: {
      min: {
        $numberInt: "3",
      },
      max: {
        $numberInt: "3",
      },
    },
    date_posted_parsed: {
      $date: {
        $numberLong: "1697587200000",
      },
    },
    date_posted_epoch: {
      $numberDouble: "1697587200.0",
    },
  },
  {
    id: 4,

    company_name: "Storable Careers - One Posting",
    job_title: "Sr. Financial Analyst",
    city: "United States",
    country: ["United States"],
    job_category: ["Accounting, Payroll & Financial Planning Jobs"],
    job_type: ["Full Time"],
    location_type: ["In-Person"],
    description: "<div> ... (omitted for brevity) ... </div>",
    years_of_experience: {
      $numberInt: "3",
    },
    salary: null,
    date_posted: "2023-10-18",
    application_link:
      "https://boards.greenhouse.io/embed/job_app?for=storablecareers&token=5001974004",
    company_link: "www.storable.com",
    company_logo:
      "https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/912/600/resized/LinkedIn_Posting_GH_Job_Board_(537_×_293_px)_(1).png?1677260086",
    job_board: "Greenhouse",
    job_board_link:
      "https://boards.greenhouse.io/embed/job_board?for=storablecareers",
    promoted: null,
    expired_date: null,
    us_state: null,
    requirements_summary:
      "3+ years Finance/FP&A, Consulting, or Investment Banking experience. BS/BA Degree in Finance, Accounting, Economics, Business or equivalent work experience. Inquisitive nature, strong financial modeling & communication skills, ability to manage multiple projects",
    yoe_range: {
      min: {
        $numberInt: "3",
      },
      max: {
        $numberInt: "3",
      },
    },
    date_posted_parsed: {
      $date: {
        $numberLong: "1697587200000",
      },
    },
    date_posted_epoch: {
      $numberDouble: "1697587200.0",
    },
  },
  {
    id: 5,

    company_name: "Storable Careers - One Posting",
    job_title: "Sr. Financial Analyst",
    city: "United States",
    country: ["United States"],
    job_category: ["Accounting, Payroll & Financial Planning Jobs"],
    job_type: ["Full Time"],
    location_type: ["In-Person"],
    description: "<div> ... (omitted for brevity) ... </div>",
    years_of_experience: {
      $numberInt: "3",
    },
    salary: null,
    date_posted: "2023-10-18",
    application_link:
      "https://boards.greenhouse.io/embed/job_app?for=storablecareers&token=5001974004",
    company_link: "www.storable.com",
    company_logo:
      "https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/912/600/resized/LinkedIn_Posting_GH_Job_Board_(537_×_293_px)_(1).png?1677260086",
    job_board: "Greenhouse",
    job_board_link:
      "https://boards.greenhouse.io/embed/job_board?for=storablecareers",
    promoted: null,
    expired_date: null,
    us_state: null,
    requirements_summary:
      "3+ years Finance/FP&A, Consulting, or Investment Banking experience. BS/BA Degree in Finance, Accounting, Economics, Business or equivalent work experience. Inquisitive nature, strong financial modeling & communication skills, ability to manage multiple projects",
    yoe_range: {
      min: {
        $numberInt: "3",
      },
      max: {
        $numberInt: "3",
      },
    },
    date_posted_parsed: {
      $date: {
        $numberLong: "1697587200000",
      },
    },
    date_posted_epoch: {
      $numberDouble: "1697587200.0",
    },
  },
  {
    id: 1,
    company_name: "Storable Careers - One Posting",
    job_title: "Sr. Financial Analyst",
    city: "United States",
    country: ["United States"],
    job_category: ["Accounting, Payroll & Financial Planning Jobs"],
    job_type: ["Full Time"],
    location_type: ["In-Person"],
    description: "<div> ... (omitted for brevity) ... </div>",
    years_of_experience: {
      $numberInt: "3",
    },
    salary: null,
    date_posted: "2023-10-18",
    application_link:
      "https://boards.greenhouse.io/embed/job_app?for=storablecareers&token=5001974004",
    company_link: "www.storable.com",
    company_logo:
      "https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/912/600/resized/LinkedIn_Posting_GH_Job_Board_(537_×_293_px)_(1).png?1677260086",
    job_board: "Greenhouse",
    job_board_link:
      "https://boards.greenhouse.io/embed/job_board?for=storablecareers",
    promoted: null,
    expired_date: null,
    us_state: null,
    requirements_summary:
      "3+ years Finance/FP&A, Consulting, or Investment Banking experience. BS/BA Degree in Finance, Accounting, Economics, Business or equivalent work experience. Inquisitive nature, strong financial modeling & communication skills, ability to manage multiple projects",
    yoe_range: {
      min: {
        $numberInt: "3",
      },
      max: {
        $numberInt: "3",
      },
    },
    date_posted_parsed: {
      $date: {
        $numberLong: "1697587200000",
      },
    },
    date_posted_epoch: {
      $numberDouble: "1697587200.0",
    },
  },
  {
    id: 1,
    company_name: "Storable Careers - One Posting",
    job_title: "Sr. Financial Analyst",
    city: "United States",
    country: ["United States"],
    job_category: ["Accounting, Payroll & Financial Planning Jobs"],
    job_type: ["Full Time"],
    location_type: ["In-Person"],
    description: "<div> ... (omitted for brevity) ... </div>",
    years_of_experience: {
      $numberInt: "3",
    },
    salary: null,
    date_posted: "2023-10-18",
    application_link:
      "https://boards.greenhouse.io/embed/job_app?for=storablecareers&token=5001974004",
    company_link: "www.storable.com",
    company_logo:
      "https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/912/600/resized/LinkedIn_Posting_GH_Job_Board_(537_×_293_px)_(1).png?1677260086",
    job_board: "Greenhouse",
    job_board_link:
      "https://boards.greenhouse.io/embed/job_board?for=storablecareers",
    promoted: null,
    expired_date: null,
    us_state: null,
    requirements_summary:
      "3+ years Finance/FP&A, Consulting, or Investment Banking experience. BS/BA Degree in Finance, Accounting, Economics, Business or equivalent work experience. Inquisitive nature, strong financial modeling & communication skills, ability to manage multiple projects",
    yoe_range: {
      min: {
        $numberInt: "3",
      },
      max: {
        $numberInt: "3",
      },
    },
    date_posted_parsed: {
      $date: {
        $numberLong: "1697587200000",
      },
    },
    date_posted_epoch: {
      $numberDouble: "1697587200.0",
    },
  },
  {
    id: 1,
    company_name: "Storable Careers - One Posting",
    job_title: "Sr. Financial Analyst",
    city: "United States",
    country: ["United States"],
    job_category: ["Accounting, Payroll & Financial Planning Jobs"],
    job_type: ["Full Time"],
    location_type: ["In-Person"],
    description: "<div> ... (omitted for brevity) ... </div>",
    years_of_experience: {
      $numberInt: "3",
    },
    salary: null,
    date_posted: "2023-10-18",
    application_link:
      "https://boards.greenhouse.io/embed/job_app?for=storablecareers&token=5001974004",
    company_link: "www.storable.com",
    company_logo:
      "https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/912/600/resized/LinkedIn_Posting_GH_Job_Board_(537_×_293_px)_(1).png?1677260086",
    job_board: "Greenhouse",
    job_board_link:
      "https://boards.greenhouse.io/embed/job_board?for=storablecareers",
    promoted: null,
    expired_date: null,
    us_state: null,
    requirements_summary:
      "3+ years Finance/FP&A, Consulting, or Investment Banking experience. BS/BA Degree in Finance, Accounting, Economics, Business or equivalent work experience. Inquisitive nature, strong financial modeling & communication skills, ability to manage multiple projects",
    yoe_range: {
      min: {
        $numberInt: "3",
      },
      max: {
        $numberInt: "3",
      },
    },
    date_posted_parsed: {
      $date: {
        $numberLong: "1697587200000",
      },
    },
    date_posted_epoch: {
      $numberDouble: "1697587200.0",
    },
  },
  {
    id: 1,
    company_name: "Storable Careers - One Posting",
    job_title: "Sr. Financial Analyst",
    city: "United States",
    country: ["United States"],
    job_category: ["Accounting, Payroll & Financial Planning Jobs"],
    job_type: ["Full Time"],
    location_type: ["In-Person"],
    description: "<div> ... (omitted for brevity) ... </div>",
    years_of_experience: {
      $numberInt: "3",
    },
    salary: null,
    date_posted: "2023-10-18",
    application_link:
      "https://boards.greenhouse.io/embed/job_app?for=storablecareers&token=5001974004",
    company_link: "www.storable.com",
    company_logo:
      "https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/912/600/resized/LinkedIn_Posting_GH_Job_Board_(537_×_293_px)_(1).png?1677260086",
    job_board: "Greenhouse",
    job_board_link:
      "https://boards.greenhouse.io/embed/job_board?for=storablecareers",
    promoted: null,
    expired_date: null,
    us_state: null,
    requirements_summary:
      "3+ years Finance/FP&A, Consulting, or Investment Banking experience. BS/BA Degree in Finance, Accounting, Economics, Business or equivalent work experience. Inquisitive nature, strong financial modeling & communication skills, ability to manage multiple projects",
    yoe_range: {
      min: {
        $numberInt: "3",
      },
      max: {
        $numberInt: "3",
      },
    },
    date_posted_parsed: {
      $date: {
        $numberLong: "1697587200000",
      },
    },
    date_posted_epoch: {
      $numberDouble: "1697587200.0",
    },
  },
  {
    id: 1,
    company_name: "Storable Careers - One Posting",
    job_title: "Sr. Financial Analyst",
    city: "United States",
    country: ["United States"],
    job_category: ["Accounting, Payroll & Financial Planning Jobs"],
    job_type: ["Full Time"],
    location_type: ["In-Person"],
    description: "<div> ... (omitted for brevity) ... </div>",
    years_of_experience: {
      $numberInt: "3",
    },
    salary: null,
    date_posted: "2023-10-18",
    application_link:
      "https://boards.greenhouse.io/embed/job_app?for=storablecareers&token=5001974004",
    company_link: "www.storable.com",
    company_logo:
      "https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/912/600/resized/LinkedIn_Posting_GH_Job_Board_(537_×_293_px)_(1).png?1677260086",
    job_board: "Greenhouse",
    job_board_link:
      "https://boards.greenhouse.io/embed/job_board?for=storablecareers",
    promoted: null,
    expired_date: null,
    us_state: null,
    requirements_summary:
      "3+ years Finance/FP&A, Consulting, or Investment Banking experience. BS/BA Degree in Finance, Accounting, Economics, Business or equivalent work experience. Inquisitive nature, strong financial modeling & communication skills, ability to manage multiple projects",
    yoe_range: {
      min: {
        $numberInt: "3",
      },
      max: {
        $numberInt: "3",
      },
    },
    date_posted_parsed: {
      $date: {
        $numberLong: "1697587200000",
      },
    },
    date_posted_epoch: {
      $numberDouble: "1697587200.0",
    },
  },
  {
    id: 1,
    company_name: "Storable Careers - One Posting",
    job_title: "Sr. Financial Analyst",
    city: "United States",
    country: ["United States"],
    job_category: ["Accounting, Payroll & Financial Planning Jobs"],
    job_type: ["Full Time"],
    location_type: ["In-Person"],
    description: "<div> ... (omitted for brevity) ... </div>",
    years_of_experience: {
      $numberInt: "3",
    },
    salary: null,
    date_posted: "2023-10-18",
    application_link:
      "https://boards.greenhouse.io/embed/job_app?for=storablecareers&token=5001974004",
    company_link: "www.storable.com",
    company_logo:
      "https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/912/600/resized/LinkedIn_Posting_GH_Job_Board_(537_×_293_px)_(1).png?1677260086",
    job_board: "Greenhouse",
    job_board_link:
      "https://boards.greenhouse.io/embed/job_board?for=storablecareers",
    promoted: null,
    expired_date: null,
    us_state: null,
    requirements_summary:
      "3+ years Finance/FP&A, Consulting, or Investment Banking experience. BS/BA Degree in Finance, Accounting, Economics, Business or equivalent work experience. Inquisitive nature, strong financial modeling & communication skills, ability to manage multiple projects",
    yoe_range: {
      min: {
        $numberInt: "3",
      },
      max: {
        $numberInt: "3",
      },
    },
    date_posted_parsed: {
      $date: {
        $numberLong: "1697587200000",
      },
    },
    date_posted_epoch: {
      $numberDouble: "1697587200.0",
    },
  },
  {
    id: 1,
    company_name: "Storable Careers - One Posting",
    job_title: "Sr. Financial Analyst",
    city: "United States",
    country: ["United States"],
    job_category: ["Accounting, Payroll & Financial Planning Jobs"],
    job_type: ["Full Time"],
    location_type: ["In-Person"],
    description: "<div> ... (omitted for brevity) ... </div>",
    years_of_experience: {
      $numberInt: "3",
    },
    salary: null,
    date_posted: "2023-10-18",
    application_link:
      "https://boards.greenhouse.io/embed/job_app?for=storablecareers&token=5001974004",
    company_link: "www.storable.com",
    company_logo:
      "https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/912/600/resized/LinkedIn_Posting_GH_Job_Board_(537_×_293_px)_(1).png?1677260086",
    job_board: "Greenhouse",
    job_board_link:
      "https://boards.greenhouse.io/embed/job_board?for=storablecareers",
    promoted: null,
    expired_date: null,
    us_state: null,
    requirements_summary:
      "3+ years Finance/FP&A, Consulting, or Investment Banking experience. BS/BA Degree in Finance, Accounting, Economics, Business or equivalent work experience. Inquisitive nature, strong financial modeling & communication skills, ability to manage multiple projects",
    yoe_range: {
      min: {
        $numberInt: "3",
      },
      max: {
        $numberInt: "3",
      },
    },
    date_posted_parsed: {
      $date: {
        $numberLong: "1697587200000",
      },
    },
    date_posted_epoch: {
      $numberDouble: "1697587200.0",
    },
  },
  {
    id: 1,
    company_name: "Storable Careers - One Posting",
    job_title: "Sr. Financial Analyst",
    city: "United States",
    country: ["United States"],
    job_category: ["Accounting, Payroll & Financial Planning Jobs"],
    job_type: ["Full Time"],
    location_type: ["In-Person"],
    description: "<div> ... (omitted for brevity) ... </div>",
    years_of_experience: {
      $numberInt: "3",
    },
    salary: null,
    date_posted: "2023-10-18",
    application_link:
      "https://boards.greenhouse.io/embed/job_app?for=storablecareers&token=5001974004",
    company_link: "www.storable.com",
    company_logo:
      "https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/912/600/resized/LinkedIn_Posting_GH_Job_Board_(537_×_293_px)_(1).png?1677260086",
    job_board: "Greenhouse",
    job_board_link:
      "https://boards.greenhouse.io/embed/job_board?for=storablecareers",
    promoted: null,
    expired_date: null,
    us_state: null,
    requirements_summary:
      "3+ years Finance/FP&A, Consulting, or Investment Banking experience. BS/BA Degree in Finance, Accounting, Economics, Business or equivalent work experience. Inquisitive nature, strong financial modeling & communication skills, ability to manage multiple projects",
    yoe_range: {
      min: {
        $numberInt: "3",
      },
      max: {
        $numberInt: "3",
      },
    },
    date_posted_parsed: {
      $date: {
        $numberLong: "1697587200000",
      },
    },
    date_posted_epoch: {
      $numberDouble: "1697587200.0",
    },
  },
  {
    id: 1,
    company_name: "Storable Careers - One Posting",
    job_title: "Sr. Financial Analyst",
    city: "United States",
    country: ["United States"],
    job_category: ["Accounting, Payroll & Financial Planning Jobs"],
    job_type: ["Full Time"],
    location_type: ["In-Person"],
    description: "<div> ... (omitted for brevity) ... </div>",
    years_of_experience: {
      $numberInt: "3",
    },
    salary: null,
    date_posted: "2023-10-18",
    application_link:
      "https://boards.greenhouse.io/embed/job_app?for=storablecareers&token=5001974004",
    company_link: "www.storable.com",
    company_logo:
      "https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/912/600/resized/LinkedIn_Posting_GH_Job_Board_(537_×_293_px)_(1).png?1677260086",
    job_board: "Greenhouse",
    job_board_link:
      "https://boards.greenhouse.io/embed/job_board?for=storablecareers",
    promoted: null,
    expired_date: null,
    us_state: null,
    requirements_summary:
      "3+ years Finance/FP&A, Consulting, or Investment Banking experience. BS/BA Degree in Finance, Accounting, Economics, Business or equivalent work experience. Inquisitive nature, strong financial modeling & communication skills, ability to manage multiple projects",
    yoe_range: {
      min: {
        $numberInt: "3",
      },
      max: {
        $numberInt: "3",
      },
    },
    date_posted_parsed: {
      $date: {
        $numberLong: "1697587200000",
      },
    },
    date_posted_epoch: {
      $numberDouble: "1697587200.0",
    },
  },
  {
    id: 1,
    company_name: "Storable Careers - One Posting",
    job_title: "Sr. Financial Analyst",
    city: "United States",
    country: ["United States"],
    job_category: ["Accounting, Payroll & Financial Planning Jobs"],
    job_type: ["Full Time"],
    location_type: ["In-Person"],
    description: "<div> ... (omitted for brevity) ... </div>",
    years_of_experience: {
      $numberInt: "3",
    },
    salary: null,
    date_posted: "2023-10-18",
    application_link:
      "https://boards.greenhouse.io/embed/job_app?for=storablecareers&token=5001974004",
    company_link: "www.storable.com",
    company_logo:
      "https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/912/600/resized/LinkedIn_Posting_GH_Job_Board_(537_×_293_px)_(1).png?1677260086",
    job_board: "Greenhouse",
    job_board_link:
      "https://boards.greenhouse.io/embed/job_board?for=storablecareers",
    promoted: null,
    expired_date: null,
    us_state: null,
    requirements_summary:
      "3+ years Finance/FP&A, Consulting, or Investment Banking experience. BS/BA Degree in Finance, Accounting, Economics, Business or equivalent work experience. Inquisitive nature, strong financial modeling & communication skills, ability to manage multiple projects",
    yoe_range: {
      min: {
        $numberInt: "3",
      },
      max: {
        $numberInt: "3",
      },
    },
    date_posted_parsed: {
      $date: {
        $numberLong: "1697587200000",
      },
    },
    date_posted_epoch: {
      $numberDouble: "1697587200.0",
    },
  },
  {
    id: 1,
    company_name: "Storable Careers - One Posting",
    job_title: "Sr. Financial Analyst",
    city: "United States",
    country: ["United States"],
    job_category: ["Accounting, Payroll & Financial Planning Jobs"],
    job_type: ["Full Time"],
    location_type: ["In-Person"],
    description: "<div> ... (omitted for brevity) ... </div>",
    years_of_experience: {
      $numberInt: "3",
    },
    salary: null,
    date_posted: "2023-10-18",
    application_link:
      "https://boards.greenhouse.io/embed/job_app?for=storablecareers&token=5001974004",
    company_link: "www.storable.com",
    company_logo:
      "https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/912/600/resized/LinkedIn_Posting_GH_Job_Board_(537_×_293_px)_(1).png?1677260086",
    job_board: "Greenhouse",
    job_board_link:
      "https://boards.greenhouse.io/embed/job_board?for=storablecareers",
    promoted: null,
    expired_date: null,
    us_state: null,
    requirements_summary:
      "3+ years Finance/FP&A, Consulting, or Investment Banking experience. BS/BA Degree in Finance, Accounting, Economics, Business or equivalent work experience. Inquisitive nature, strong financial modeling & communication skills, ability to manage multiple projects",
    yoe_range: {
      min: {
        $numberInt: "3",
      },
      max: {
        $numberInt: "3",
      },
    },
    date_posted_parsed: {
      $date: {
        $numberLong: "1697587200000",
      },
    },
    date_posted_epoch: {
      $numberDouble: "1697587200.0",
    },
  },
  {
    id: 1,
    company_name: "Storable Careers - One Posting",
    job_title: "Sr. Financial Analyst",
    city: "United States",
    country: ["United States"],
    job_category: ["Accounting, Payroll & Financial Planning Jobs"],
    job_type: ["Full Time"],
    location_type: ["In-Person"],
    description: "<div> ... (omitted for brevity) ... </div>",
    years_of_experience: {
      $numberInt: "3",
    },
    salary: null,
    date_posted: "2023-10-18",
    application_link:
      "https://boards.greenhouse.io/embed/job_app?for=storablecareers&token=5001974004",
    company_link: "www.storable.com",
    company_logo:
      "https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/912/600/resized/LinkedIn_Posting_GH_Job_Board_(537_×_293_px)_(1).png?1677260086",
    job_board: "Greenhouse",
    job_board_link:
      "https://boards.greenhouse.io/embed/job_board?for=storablecareers",
    promoted: null,
    expired_date: null,
    us_state: null,
    requirements_summary:
      "3+ years Finance/FP&A, Consulting, or Investment Banking experience. BS/BA Degree in Finance, Accounting, Economics, Business or equivalent work experience. Inquisitive nature, strong financial modeling & communication skills, ability to manage multiple projects",
    yoe_range: {
      min: {
        $numberInt: "3",
      },
      max: {
        $numberInt: "3",
      },
    },
    date_posted_parsed: {
      $date: {
        $numberLong: "1697587200000",
      },
    },
    date_posted_epoch: {
      $numberDouble: "1697587200.0",
    },
  },
];

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Use function keyword to allow binding 'this'
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model("User", userSchema);
app.get("/", (req, res) => {
  res.send("Hello, this is the backend page");
});

app.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new User({ name, email, password: hashedPassword });

    const savedUser = await newUser.save();
    console.log("User saved to MongoDB:", savedUser);

    res.json({ message: "Data received and saved successfully" });
  } catch (error) {
    console.error("Error saving user to MongoDB:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour, you can adjust this value
    });
    console.log(token);

    return res.json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
app.get("/products", (req, res) => {
  res.json(dummyData);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(process.env.MONGODB_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // Update the write concern to the appropriate value
  writeConcern: {
    w: "majority",
    wtimeout: 0,
    j: true,
  },
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
