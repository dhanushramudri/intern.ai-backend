const { spawn } = require("child_process");

// Run Python scraping script
const pythonProcess = spawn("python", ["scraping.py"]);

pythonProcess.stdout.on("data", (data) => {
  console.log(`Python script output: ${data}`);
});

pythonProcess.stderr.on("data", (data) => {
  console.error(`Error in Python script: ${data}`);
});

pythonProcess.on("close", (code) => {
  console.log(`Python script exited with code ${code}`);

  // Run Node.js script to save scraped data to MongoDB
  const saveProcess = spawn("node", ["database.js"]);

  saveProcess.stdout.on("data", (data) => {
    console.log(`Save process output: ${data}`);
  });

  saveProcess.stderr.on("data", (data) => {
    console.error(`Error in save process: ${data}`);
  });

  saveProcess.on("close", (saveCode) => {
    console.log(`Save process exited with code ${saveCode}`);
  });
});
