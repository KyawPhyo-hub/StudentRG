const express = require('express');
const bodyParser = require('body-parser');
const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');

const app = express();
const port = 3000; // Change this to your desired port

// Configure AWS SDK
const client = new DynamoDBClient({
    region: 'us-east-1' // Replace with your AWS region
});

app.use(bodyParser.json());

app.post('/registerStudent', async (req, res) => {
    const student = req.body;

    const params = {
        TableName: 'my-vdc-table',
        Item: {
            studentId: { S: student.studentId },
            name: { S: student.studentName },
            birthday: { S: student.birthday },
            academicYear: { S: student.academicYear },
            department: { S: student.department },
            registerDate: { S: student.registerDate }
        }
    };

    try {
        await client.send(new PutItemCommand(params));
        res.status(200).json({ message: 'Student registered successfully' });
    } catch (error) {
        console.error('Error saving student information:', error);
        res.status(500).json({ error: 'Error registering student' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
