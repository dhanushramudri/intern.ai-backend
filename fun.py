from selenium import webdriver
from selenium.webdriver.common.by import By
import json

import requests

url = "https://joby.ai/?sort=Relevance-and-Date&page=2"

# Use a headless browser to simulate a user
options = webdriver.ChromeOptions()
options.add_argument("--headless")
driver = webdriver.Chrome(options=options)

driver.get(url)

# Wait for dynamic content to load (adjust the sleep time if needed)
driver.implicitly_wait(4)

try:
    # Find all job item elements within the specified HTML structure
    job_item_elements = driver.find_elements(By.CLASS_NAME, 'job-item')

    if job_item_elements:
        all_jobs_data = []

        for job_item in job_item_elements:
            try:
                # Extracting job title
                job_title = job_item.find_element(By.CLASS_NAME, 'job-title').text
            except:
                job_title = "job_title not found"

            try:
                # Extracting company name
                company_name = job_item.find_element(By.CLASS_NAME, 'company-name').text
            except:
                company_name = "company_name not found"

            try:
                # Extracting location
                location_element = job_item.find_element(By.CLASS_NAME, 'job-location')
                location = location_element.text if location_element else "location not specified"
            except:
                location = "location not specified"

            try:
                # Extracting job description and requirements
                description_and_requirements_elements = job_item.find_elements(By.CLASS_NAME, 'requirements_text')
                job_description = description_and_requirements_elements[0].text if len(description_and_requirements_elements) > 0 else "No description available"
                requirements = description_and_requirements_elements[1].text if len(description_and_requirements_elements) > 1 else "No requirements specified"
            except:
                job_description = "No description available"
                requirements = "requirements not specified"

            try:
                # Extracting company logo URL
                company_logo_url = job_item.find_element(By.CLASS_NAME, 'company-logo').get_attribute('src')
            except:
                company_logo_url = "company_logo not found"

            try:
                # Extracting job details
                job_details_element = job_item.find_element(By.CLASS_NAME, 'job-details')
                job_details_items = job_details_element.find_elements(By.CLASS_NAME, 'item')

                # Extracting only the text from each job details item
                job_details_keywords = [item.text.replace('💰', '').replace('🛢️', '').replace('⏰', '').replace('💼', '').replace('🟢', '').strip() for item in job_details_items]
            except:
                job_details_keywords = []

            try:
                # Extracting job details links
                job_details_links_element = job_item.find_element(By.CLASS_NAME, 'more-details-1')
                job_details_links = {
                    "website": None,
                    "linkedin": None,
                    "all_job_openings": None
                }

                for link_element in job_details_links_element.find_elements(By.CLASS_NAME, 'item'):
                    link_text = link_element.text.lower()
                    link_href = link_element.get_attribute('href')

                    if "website" in link_text:
                        job_details_links["website"] = link_href
                    elif "linkedin" in link_text:
                        job_details_links["linkedin"] = link_href
                    elif "all job openings" in link_text:
                        job_details_links["all_job_openings"] = link_href

            except:
                job_details_links = {}

            # Create a dictionary for each job
            job_data = {
                "job_title": job_title,
                "company_name": company_name,
                "location": location,
                "job_description": job_description,
                "requirements": requirements,
                "company_logo_url": company_logo_url,
                "job_details_keywords": job_details_keywords,
                "job_details_links": job_details_links
            }

            all_jobs_data.append(job_data)

        # Convert collected job data to JSON format
        json_data = json.dumps(all_jobs_data, indent=2)
        print("All Jobs Data in JSON format:")
        print(json_data)

    else:
        print("Job items not found on the page.")
except Exception as e:
    print(f"An error occurred: {e}")

finally:
    driver.quit()

# ... (existing code)

# Convert collected job data to JSON format
json_data = json.dumps(all_jobs_data, indent=2)

# POST the scraped data to your backend server
url = "http://localhost:5000/scrape-and-save"  # Update the URL with your actual backend server URL
headers = {'Content-Type': 'application/json'}
response = requests.post(url, data=json_data, headers=headers)

# Check the response from the server
if response.status_code == 200:
    print("Scraped jobs saved to MongoDB successfully")
else:
    print(f"Failed to save scraped jobs. Server responded with status code {response.status_code}")