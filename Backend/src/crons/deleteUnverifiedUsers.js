const cron = require('node-cron');
const User = require('../models/userModel'); // Adjust the path as necessary

// Schedule the cron job to run every minute
cron.schedule('* * * * *', async () => {
  try {
    const result = await User.deleteMany({ verified: false, createdAt: { $lt: new Date(Date.now() - 3600 * 1000) } }); // 1 minute for testing
    console.log(`Deleted ${result.deletedCount} unverified users`);
  } catch (error) {
    console.error('Error deleting unverified users:', error);
  }
});

console.log('Cron job to delete unverified users scheduled.');

// const cron = require('node-cron');
// const User = require('../models/userModel');

// cron.schedule('* * * * *', async () => { // Runs every hour
//   try {
//     const oneHourAgo = new Date(Date.now() - 3600 * 1000);
//     const result = await User.deleteMany({ verified: false, createdAt: { $lt: oneHourAgo } });
//     console.log(`Deleted ${result.deletedCount} unverified users`);
//   } catch (error) {
//     console.error('Error deleting unverified users:', error);
//   }
// });


// const cron = require('node-cron');
// const User = require('../models/userModel');

// cron.schedule('0 * * * *', async () => { // Runs every hour
//   try {
//     const result = await User.deleteMany({ verified: false, createdAt: { $lt: new Date(Date.now() - 3600 * 1000) } });
//     console.log(`Deleted ${result.deletedCount} unverified users`);
//   } catch (error) {
//     console.error('Error deleting unverified users:', error);
//   }
// });
