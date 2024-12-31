const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');

const employeeRoutes = require('./routes/employeeRoutes');
const roleRoutes = require('./routes/roleRoutes');

const errorHandler = require('./middlewares/errorHandler');
const delayMiddleware = require('./middlewares/delay');

const Employee = require('./models/employeeModel');

dotenv.config();
connectDB();

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:3000', // Replace with your client's origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }),
);
app.use(express.json()); // For parsing JSON
app.use(delayMiddleware);

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/roles', roleRoutes);

// Error Handling Middleware
app.use(errorHandler);

app.get('/api/', async (req, res) => {
  return res.status(200).json({
    message: 'success',
  });
});

const getPaginatedEmployees = async (searchQuery, page, pageSize) => {
  // MongoDB query to filter by firstName + lastName or by id
  const regexSearchQuery = new RegExp(searchQuery, 'i'); // Case-insensitive regex search
  const employees = await Employee.find({
    $or: [
      { firstName: { $regex: regexSearchQuery } },
      { lastName: { $regex: regexSearchQuery } },
      // { id: searchQuery }, // Filter by ID (assuming searchQuery can also be an ID)
    ],
  })
    .skip((page - 1) * pageSize) // Pagination: skip the records for previous pages
    .limit(pageSize); // Limit to pageSize results

  // Get the total count of filtered employees
  const total = await Employee.countDocuments({
    $or: [
      { firstName: { $regex: regexSearchQuery } },
      { lastName: { $regex: regexSearchQuery } },
      // { id: searchQuery },
    ],
  });

  return {
    options: employees,
    total,
  };
};

app.get('/api/search/employees', async (req, res) => {
  const { query, page = 1, limit = 5 } = req.query;
  console.log('?');

  try {
    const results = await Employee.find({
      firstName: { $regex: query, $options: 'i' }, // Case-insensitive search by name
    })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalResults = await Employee.countDocuments({
      name: { $regex: query, $options: 'i' },
    });

    console.log(results);

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees' });
  }
});

// Create the /api/data endpoint
app.get('/api/data', async (req, res) => {
  const { search, page = 1 } = req.query; // Get search query and page from request params
  const pageSize = 5; // Set the number of employees per page (can be adjusted)

  if (!search) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  try {
    // Get paginated employees based on the search query and page
    const { options, total } = await getPaginatedEmployees(
      search,
      parseInt(page),
      pageSize,
    );

    return res.json({
      options,
      total,
    });
  } catch (err) {
    console.error('Error fetching employees:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/api/active-plan', async (req, res) => {
  try {
    res.json({ active: 'pro' });
  } catch (e) {
    res.status(500).send('NO ACTIVE');
  }
});

app.post('/api/subscribe-plan', async (req, res) => {
  console.log(':P');
  const { plan } = req.body;
  console.log(plan);

  return res.status(200).json({ message: 'sent' });
});

app.post('/api/unsubscribe-plan', async (req, res) => {
  const { plan } = req.body;
  console.log(plan);

  return res.status(200).json({ message: 'sent' });
});

app.get('/api/my-data', async (req, res) => {
  return res.status(200).json({
    firstName: 'Amr',
    lastName: 'Shoukry',
    email: 'myMail@gmail.con',
  });
});

app.put('/api/my-data', async (req, res) => {
  return res.status(500).send('UPDATE');
});

const data = [
  {
    name: 'PDF',
    percentage: 40,
  },
  {
    name: 'Excel',
    percentage: 10,
  },
  {
    name: 'Image',
    percentage: 30,
  },
  {
    name: 'Word',
    percentage: 20,
  },
];

app.get('/api/file-type-results', async (req, res) => {
  return res.status(200).json(data);
});

const storageData = [
  {
    id: 'Available',
    label: 'Available',
    value: 75,
    color: 'var(--mainColor1)',
  },
  {
    id: 'Used',
    label: 'Used',
    value: 25,
    color: 'var(--mainColorPie)',
  },
];

const barData = [
  {
    month: 'Jan',
    successful: 50,
  },
  {
    month: 'Feb',
    successful: 70,
  },
  {
    month: 'Mar',
    successful: 40,
  },
  {
    month: 'Apr',
    successful: 50,
  },
  {
    month: 'May',
    successful: 70,
  },
];

app.get('/api/storage-results', async (req, res) => {
  return res.status(200).json(storageData);
});

app.post('/api/trains', async (req, res) => {
  return res.status(200).json({
    message: 'trained',
  });
});

app.get('/api/categorization-results', async (req, res) => {
  return res.status(200).json(barData);
});

app.get('/api/user/activities', async (req, res) => {
  console.log('RE');
  const myItems = [
    {
      text: 'HELLO',
      time: '2024/5/8',
    },
  ];
  return res.status(200).json(myItems);
});

const messagesData = [
  {
    id: 1,
    type: 'customer',
    content: 'Hello!',
    time: '2024-09-19T08:00:00Z',
  },
  {
    id: 2,
    type: 'admin',
    content: 'Hi there!',
    time: '2024-09-19T08:01:30Z',
  },
  {
    id: 3,
    type: 'customer',
    content: 'I need help with my order.',
    time: '2024-09-19T08:05:00Z',
  },
  {
    id: 4,
    type: 'admin',
    content: 'Sure, I can assist you with that.',
    time: '2024-09-19T08:07:15Z',
  },
  {
    id: 5,
    type: 'customer',
    content: 'Can you provide the status of my order?',
    time: '2024-09-19T08:10:00Z',
  },
  {
    id: 6,
    type: 'admin',
    content: 'Let me check that for you.',
    time: '2024-09-19T08:12:30Z',
  },
  {
    id: 7,
    type: 'customer',
    content: 'Thank you!',
    time: '2024-09-19T08:15:00Z',
  },
  {
    id: 8,
    type: 'admin',
    content: 'Your order is currently being processed.',
    time: '2024-09-19T08:17:45Z',
  },
  {
    id: 9,
    type: 'customer',
    content: 'When will it be shipped?',
    time: '2024-09-19T08:20:00Z',
  },
  {
    id: 10,
    type: 'admin',
    content: 'It should be shipped by the end of the day.',
    time: '2024-09-19T08:22:30Z',
  },
  {
    id: 11,
    type: 'customer',
    content: 'Great, I appreciate the help!',
    time: '2024-09-19T08:25:00Z',
  },
];

const notifications = [
  {
    head: 'Available Storage Is Running Low.',
    description:
      'Your available storage is running low. Free up space by managing your files or upgrade to a larger plan to ensure uninterrupted access and functionality.',
    time: 'Today , 09:10 AM',
  },
  {
    head: 'Available Storage Is Running Low.',
    description:
      'Your available storage is running low. Free up space by managing your files or upgrade to a larger plan to ensure uninterrupted access and functionality.',
    time: 'Today , 09:10 AM',
  },
  {
    head: 'Available Storage Is Running Low.',
    description:
      'Your available storage is running low. Free up space by managing your files or upgrade to a larger plan to ensure uninterrupted access and functionality.',
    time: 'Today , 09:10 AM',
  },
  {
    head: 'Available Storage Is Running Low.',
    description:
      'Your available storage is running low. Free up space by managing your files or upgrade to a larger plan to ensure uninterrupted access and functionality.',
    time: 'Today , 09:10 AM',
  },
  {
    head: 'Available Storage Is Running Low.',
    description:
      'Your available storage is running low. Free up space by managing your files or upgrade to a larger plan to ensure uninterrupted access and functionality.',
    time: 'Today , 09:10 AM',
  },
  {
    head: 'Available Storage Is Running Low.',
    description:
      'Your available storage is running low. Free up space by managing your files or upgrade to a larger plan to ensure uninterrupted access and functionality.',
    time: 'Today , 09:10 AM',
  },
  {
    head: 'Available Storage Is Running Low.',
    description:
      'Your available storage is running low. Free up space by managing your files or upgrade to a larger plan to ensure uninterrupted access and functionality.',
    time: 'Today , 09:10 AM',
  },
  {
    head: 'Available Storage Is Running Low.',
    description:
      'Your available storage is running low. Free up space by managing your files or upgrade to a larger plan to ensure uninterrupted access and functionality.',
    time: 'Today , 09:10 AM',
  },
];

const searchData = [
  {
    id: 1,
    name: 'FileName',
    score: 90,
    path: 'HR SectionFolder1Folder9',
    type: 'pdf',
  },
  {
    id: 2,
    name: 'FileName',
    score: 50,
    path: 'HR SectionFolder1Folder9',
    type: 'word',
  },
  {
    id: 3,
    name: 'FileName',
    score: 20,
    path: 'HR SectionFolder1Folder9',
    type: 'excel',
  },
  {
    id: 4,
    name: 'FileName',
    score: 30,
    path: 'HR SectionFolder1Folder9',
    type: 'excel',
  },
  {
    id: 5,
    name: 'FileName',
    score: 20,
    path: 'HR SectionFolder1Folder9',
    type: 'excel',
  },
  {
    id: 6,
    name: 'FileName',
    score: 20,
    path: 'HR SectionFolder1Folder9',
    type: 'excel',
  },
];

app.get('/api/messages', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const pageSize = parseInt(req.query.pageSize) || 5; // Default to 5 items per page if not provided

  // Reverse the messages array to start from the most recent messages
  const reversedMessages = [...messagesData].reverse();

  // Calculate the starting index and ending index for pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  // Slice the reversed array based on the pagination indices
  const paginatedMessages = reversedMessages.slice(startIndex, endIndex);

  console.log(page);
  console.log(paginatedMessages);

  return res.status(200).json(paginatedMessages);
});

app.post('/api/messages', (req, res) => {
  const { type, content, time } = req.body;
  console.log(type);
  console.log(content);
  console.log(time);

  // Validate the incoming data
  if (!type || !content || !time) {
    return res
      .status(400)
      .json({ error: 'Missing required fields: type, content, and time.' });
  }

  // Create a new message object
  const newMessage = {
    id: messagesData.length + 1, // Generate a new ID based on the length of the existing data
    type,
    content,
    time,
  };

  // Add the new message to the array
  messagesData.push(newMessage);

  // Return the newly added message
  return res.status(201).json(newMessage);
});

app.get('/api/notifications', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const pageSize = parseInt(req.query.pageSize) || 5; // Default to 5 items per page if not provided

  // Calculate the starting index and ending index for pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  // Slice the reversed array based on the pagination indices
  const paginatedMessages = notifications.slice(startIndex, endIndex);

  return res.status(200).json(paginatedMessages);
});

app.get('/api/search', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const pageSize = parseInt(req.query.pageSize) || 5; // Default to 5 items per page if not provided

  // Calculate the starting index and ending index for pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  // Slice the reversed array based on the pagination indices
  const paginatedMessages = searchData.slice(startIndex, endIndex);

  return res.status(200).json(paginatedMessages);
});

