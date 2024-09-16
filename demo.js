// Import required modules
const os = require('os');
const fs = require('fs');
const EventEmitter = require('events');
const path = require('path');

// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();

// Define the directory and file path
const dirPath = 'D:\B1';
const filePath = path.join(dirPath, 'system_info.txt');

// Gather system information
const systemInfo = {
osType: os.type(),
  platform: os.platform(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
  cpus: os.cpus(),
};

// Convert system information to a string
const data = JSON.stringify(systemInfo, null, 2);

// Function to write data to a file
function writeDataToFile() {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return;
    }

    // Emit an event when the file has been written
    eventEmitter.emit('completed');
  });
}

// Ensure the directory exists before writing
function ensureDirectoryExists(callback) {
  fs.mkdir(dirPath, { recursive: true }, (err) => {
    if (err) {
      console.error('Error creating directory:', err);
      return;
    }
    callback();
  });
}

// Handle the 'completed' event
eventEmitter.on('completed', () => {
  console.log('Completed task!');
});

// Execute the process
ensureDirectoryExists(writeDataToFile);

