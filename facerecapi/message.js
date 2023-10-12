const accountSid = 'AC05b12118b143f702224a50fb2e92d693';
const authToken = '5362d0da3e1638b878341736ca525d6b';

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

const abs = [];

fetch('http://localhost:5000/abs')
  .then(async (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(async (data) => {
    abs.push(...data);

    for (const student of abs) {
      const { roll_no, Name, phno } = student;

      const message = `Dear ${Name}, you were absent . Please contact us for more details.`;

      // Send SMS using Twilio
      try {
        await client.messages.create({
          body: message,
          from: '+15419452374', // Use your Twilio phone number here
          to: phno,
        });

        console.log(`SMS sent to ${Name} (${roll_no})`);
      } catch (error) {
        console.error(`Error sending SMS to ${Name} (${roll_no}): ${error.message}`);
      }
    }
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
