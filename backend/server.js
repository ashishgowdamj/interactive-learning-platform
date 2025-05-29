const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
// Explicit CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json()); // for parsing application/json

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('Python Code Execution Server is running!');
});

// Route to execute Python code
app.post('/execute-python', (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  // IMPORTANT: Executing arbitrary user code is a significant security risk.
  // For a production environment, use a secure sandbox (e.g., Docker, isolated environments).
  // This is a basic implementation for learning purposes ONLY.

  // Find the full path to the python executable
  // This can help if 'python' isn't in the default PATH or if multiple versions are installed
  const pythonExecutable = process.env.PYTHON_PATH || 'python'; // Allow specifying path via env var

  const pythonProcess = spawn(pythonExecutable, ['-']); // The hyphen tells python to read from stdin

  let stdout = '';
  let stderr = '';

  pythonProcess.stdout.on('data', (data) => {
    stdout += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    stderr += data.toString();
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
    res.json({ stdout, stderr, exitCode: code });
  });

  pythonProcess.on('error', (err) => {
    console.error('Failed to spawn Python process:', err);
    // Provide more details in the response for debugging
    res.status(500).json({ error: 'Failed to execute code (spawn error)', details: err.message, code: err.code });
  });

  // Write the code to the Python process's stdin
  pythonProcess.stdin.write(code);
  pythonProcess.stdin.end(); // Signal end of input
});

// Start the server and add error handling for listen
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Please free up the port or use a different one.`);
  } else {
    console.error('Server failed to start:', err);
  }
  process.exit(1); // Exit the process with an error code
});

// Global handler for uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1); // Exit the process after logging
}); 