document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const registerDateInput = document.getElementById('registerDate');

    // Automatically set the registration date to today's date
    const today = new Date().toISOString().substr(0, 10);
    registerDateInput.value = today;

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const studentName = document.getElementById('studentName').value;
        const studentId = document.getElementById('studentId').value;
        const birthday = document.getElementById('birthday').value;
        const academicYear = document.getElementById('academicYear').value;
        const department = document.getElementById('department').value;
        const registerDate = registerDateInput.value;

        // Create a data object
        const studentData = {
            studentName,
            studentId,
            birthday,
            academicYear,
            department,
            registerDate
        };

        // Send data to the API endpoint
        fetch('http://your-ec2-public-ip:3000/registerStudent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        })
        .then(response => response.json())
        .then(data => {
            alert(`Student ${studentName} has been registered successfully!`);
            registrationForm.reset(); // Optionally reset the form
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error registering the student.');
        });
    });
});
