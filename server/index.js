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
const jwt = require('jsonwebtoken');

dotenv.config();
connectDB();

let shouldFail = true; // Flag to toggle between success and failure

const toggleRequestMiddleware = (req, res, next) => {
  console.log(shouldFail);
  if (shouldFail) {
    shouldFail = false; // Set flag to false after failing
    return res
      .status(500)
      .json({ message: 'Request failed for testing purposes.' });
  }

  shouldFail = true; // Set flag to true for next failure
  next(); // Proceed to the next middleware or route handler
};

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
app.use(toggleRequestMiddleware);

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

let number = 1;

app.get('/api/active-plan', async (req, res) => {
  console.log(number);
  if (number === 2) {
    number -= 1;
    return res.status(200).json({ active: 'pro' });
  } else {
    number += 1;
    return res.status(500).send('NO ACTIVE');
  }

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
  return res.status(500).json({
    error: 'ah',
  });

  return res.status(200).json({
    message: 'trained',
  });
});

app.get('/api/categorization-results', async (req, res) => {
  return res.status(200).json(barData);
});

const error = {
  error: 'FAILED',
};

app.get('/api/user/activities', async (req, res) => {
  console.log('RE');
  const myItems = [
    {
      text: 'HELLO',
      time: '2024/5/8',
    },
  ];

  return res.status(500).json(error);
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

const versions = [
  {
    id: 1,
    uploaded: '28/10/2024',
    type: 'pdf',
    name: 'myFileOld',
  },
  {
    id: 2,
    uploaded: '28/11/2024',
    type: 'pdf',
    name: 'myFileOld2',
  },
  {
    id: 3,
    uploaded: '28/12/2024',
    type: 'pdf',
    name: 'myFileOld3',
  },
  {
    id: 4,
    uploaded: '28/12/2024',
    type: 'pdf',
    name: 'myFileOld4',
  },
  {
    id: 5,
    uploaded: '28/12/2024',
    type: 'pdf',
    name: 'myFileOld5',
  },
  {
    id: 6,
    uploaded: '28/12/2024',
    type: 'pdf',
    name: 'myFileOld6',
  },
];

const moveData = {
  name: 'all',
  type: null,
  id: 0,
  folders: [
    {
      name: 'SyntaxSquad',
      type: 'Section',
      id: 4,
      folders: [
        {
          name: 'Advertisement',
          type: 'Folder',
          id: 4,
          folders: [],
        },
        {
          name: 'Email',
          type: 'Folder',
          id: 5,
          folders: [
            {
              name: 'asd',
              type: 'Folder',
              id: 16,
              folders: [
                {
                  name: 'asd3',
                  type: 'Folder',
                  id: 19,
                  folders: [],
                },
              ],
            },
          ],
        },
        {
          name: 'Form',
          type: 'Folder',
          id: 6,
          folders: [
            {
              name: 'asd2',
              type: 'Folder',
              id: 17,
              folders: [],
            },
          ],
        },
        {
          name: 'Letter',
          type: 'Folder',
          id: 7,
          folders: [],
        },
        {
          name: 'Memo',
          type: 'Folder',
          id: 8,
          folders: [],
        },
        {
          name: 'News',
          type: 'Folder',
          id: 9,
          folders: [],
        },
        {
          name: 'Note',
          type: 'Folder',
          id: 10,
          folders: [],
        },
        {
          name: 'Report',
          type: 'Folder',
          id: 11,
          folders: [],
        },
        {
          name: 'Resume',
          type: 'Folder',
          id: 12,
          folders: [],
        },
        {
          name: 'Scientific',
          type: 'Folder',
          id: 13,
          folders: [
            {
              name: 'asd3',
              type: 'Folder',
              id: 18,
              folders: [],
            },
          ],
        },
      ],
    },
    {
      name: 'smile please',
      type: 'Section',
      id: 8,
      folders: [],
    },
    {
      name: 'happy day brother',
      type: 'Section',
      id: 9,
      folders: [],
    },
  ],
};

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

app.get('/api/versions', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const pageSize = parseInt(req.query.pageSize) || 5; // Default to 5 items per page if not provided

  // Calculate the starting index and ending index for pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;

  // Slice the reversed array based on the pagination indices
  const paginatedMessages = versions.slice(startIndex, endIndex);

  return res.status(200).json(paginatedMessages);
});

app.delete('/api/versions/:id', async (req, res) => {
  const id = Number(req.params.id); // Get the ID from the URL parameters

  console.log(id);

  // Find the index of the version to be deleted
  console.log(versions);
  const index = versions.findIndex((version) => version.id === id);

  console.log(index);

  if (index === -1) {
    // If the version with the specified ID is not found
    return res.status(404).json({ error: 'Version not found' });
  }

  // Remove the version from the array
  const [deletedVersion] = versions.splice(index, 1); // Removes the version at the index

  // Return the deleted version as the response
  return res.status(200).json({
    message: 'Version deleted successfully',
    deletedVersion,
  });
});

app.get('/api/structure', async (req, res) => {
  return res.status(200).json(moveData);
});

app.get('/api/section-settings/:id', async (req, res) => {
  return res.status(200).json({ message: 'success' });
});

app.get('/api/folder-settings/:id', async (req, res) => {
  return res.status(200).json({ message: 'success' });
});

app.get('/api/file-settings/:id', async (req, res) => {
  return res.status(200).json({ message: 'success' });
});

let metadata = [];
let fileMetadata = [];

app.get('/api/metadata/:id', async (req, res) => {
  return res.status(200).json(metadata);
});

app.get('/api/file-metadata/:id', async (req, res) => {
  return res.status(200).json(fileMetadata);
});

app.post('/api/metadata', (req, res) => {
  const { folderId, fields } = req.body;
  console.log(req.body);
  console.log(folderId, fields);

  if (!folderId || !Array.isArray(fields)) {
    return res
      .status(400)
      .json({ success: false, error: 'Folder ID and fields are required.' });
  }

  // Check if metadata already exists for this folder
  const existingIndex = metadata.findIndex(
    (item) => item.folderId === folderId,
  );
  if (existingIndex !== -1) {
    return res.status(400).json({
      success: false,
      error: 'Metadata already exists. Use PUT to update.',
    });
  }

  // Add new metadata
  metadata = fields;

  return res.status(201).json({ success: true, metadata });
});

app.put('/api/metadata', (req, res) => {
  const { id, fields } = req.body;

  // if (!Array.isArray(fields)) {
  //   return res
  //     .status(400)
  //     .json({ success: false, error: 'Fields are required.' });
  // }

  // Find existing metadata
  // const index = metadata.findIndex((item) => item.folderId === id);
  // if (index === -1) {
  //   return res
  //     .status(404)
  //     .json({ success: false, error: 'Metadata not found.' });
  // }

  // Update metadata fields
  metadata = fields;

  return res.status(200).json({ success: true, metadata: metadata });
});

app.get('/api/me', (req, res) => {
  console.log('ADS');
  return res.status(200).json({
    firstName: 'Amr',
    lastName: 'Shoukry',
    email: 'amr@gmail.com',
    img: 'https://i.pravatar.cc/150?img=3',
  });
});

const SECRET_KEY = 'your_secret_key'; // Replace with a strong secret key

app.post('/api/login', (req, res) => {
  const { company, email, password } = req.body;
  console.log(company);

  let userData;
  switch (company) {
    case 'owner':
      userData = {
        firstName: 'owner',
        lastName: 'Amr',
        email: 'owner@gmail.com',
        role: 'owner',
        img: 'https://picsum.photos/200',
      };
      break;
    case 'manager':
      userData = {
        firstName: 'manager',
        lastName: 'Amr',
        email: 'manager@gmail.com',
        role: 'manager',
        img: 'https://picsum.photos/200',
      };
      break;
    case 'employee':
      userData = {
        firstName: 'employee',
        lastName: 'Amr',
        email: 'employee@gmail.com',
        role: 'employee',
        img: 'https://picsum.photos/200',
      };
      break;
    default:
      return res.status(400).json({ error: 'Invalid company type' });
  }

  // Generate JWT
  console.log('TOKEN?');
  const token = jwt.sign(userData, SECRET_KEY, { expiresIn: '1h' });

  res.json({ token });
});

app.get('/api/online', async (req, res) => {
  return res.status(200).json({ status: 'online' });
});

app.get('/api/section', async (req, res) => {
  return res.status(200).json([0, 1]);
});
