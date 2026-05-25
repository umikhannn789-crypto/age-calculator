// Function to calculate exact age
function calculateExactAge(birthDate, currentDate) {
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    // Adjust days if negative
    if (days < 0) {
        // Get last day of previous month
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += lastMonth.getDate();
        months--;
    }

    // Adjust months if negative
    if (months < 0) {
        months += 12;
        years--;
    }

    return { years, months, days };
}

// Function to display age
function displayAge(age) {
    const yearsDisplay = document.getElementById('yearsValue');
    const monthsDisplay = document.getElementById('monthsValue');
    const daysDisplay = document.getElementById('daysValue');
    const ageDisplay = document.getElementById('ageDisplay');
    const resultDiv = document.getElementById('result');

    // Update values
    yearsDisplay.textContent = age.years;
    monthsDisplay.textContent = age.months;
    daysDisplay.textContent = age.days;
    
    // Update main display
    let ageText = '';
    if (age.years === 0) {
        ageText = `${age.months} months, ${age.days} days`;
    } else {
        ageText = `${age.years} ${age.years === 1 ? 'year' : 'years'}, ${age.months} ${age.months === 1 ? 'month' : 'months'}, ${age.days} ${age.days === 1 ? 'day' : 'days'}`;
    }
    ageDisplay.textContent = ageText;
    
    // Show result with animation
    resultDiv.classList.add('show');
}

// Function to show error
function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.innerHTML = `⚠️ ${message}`;
    errorDiv.classList.add('show');
    
    // Hide result if showing
    document.getElementById('result').classList.remove('show');
}

// Function to clear error
function clearError() {
    const errorDiv = document.getElementById('error');
    errorDiv.classList.remove('show');
    errorDiv.innerHTML = '';
}

// Function to get days in a month
function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

// Main calculation function
function calculateAge() {
    // Get input values
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    // Clear previous error and result
    clearError();
    document.getElementById('result').classList.remove('show');

    // Validation: Check if all fields are filled
    if (!day || !month || !year) {
        showError('Please fill in all fields (Day, Month, and Year)');
        return;
    }

    // Convert to numbers
    const birthDay = parseInt(day);
    const birthMonth = parseInt(month);
    const birthYear = parseInt(year);

    // Validation: Check day range
    if (birthDay < 1 || birthDay > 31) {
        showError('Please enter a valid day between 1 and 31');
        return;
    }

    // Validation: Check year range
    const currentYear = new Date().getFullYear();
    if (birthYear < 1900 || birthYear > currentYear) {
        showError(`Please enter a valid year between 1900 and ${currentYear}`);
        return;
    }

    // Create birth date object
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    
    // Validation: Check if date is valid (e.g., Feb 30)
    if (birthDate.getDate() !== birthDay || 
        birthDate.getMonth() !== birthMonth - 1 || 
        birthDate.getFullYear() !== birthYear) {
        showError('Invalid date! Please check the day for the selected month');
        return;
    }

    // Validation: Check if birth date is not in future
    const today = new Date();
    if (birthDate > today) {
        showError('Birth date cannot be in the future!');
        return;
    }

    // Calculate age
    const age = calculateExactAge(birthDate, today);
    
    // Display result
    displayAge(age);
}

// Real-time validation for day input
document.getElementById('day').addEventListener('input', function() {
    const day = parseInt(this.value);
    if (day && (day < 1 || day > 31)) {
        showError('Day must be between 1 and 31');
    } else {
        clearError();
    }
});

// Validate day when month changes
document.getElementById('month').addEventListener('change', function() {
    const dayInput = document.getElementById('day');
    const month = parseInt(this.value);
    const year = document.getElementById('year').value;
    
    if (month && dayInput.value && year) {
        const maxDays = getDaysInMonth(month, year);
        if (parseInt(dayInput.value) > maxDays) {
            showError(`Selected month only has ${maxDays} days`);
            dayInput.value = '';
        } else {
            clearError();
        }
    }
});
document.getElementById('year').addEventListener('change', function() {
    const month = parseInt(document.getElementById('month').value);
    const dayInput = document.getElementById('day');
    
    if (month && dayInput.value && this.value) {
        const maxDays = getDaysInMonth(month, this.value);
        if (parseInt(dayInput.value) > maxDays) {
            showError(`Selected month only has ${maxDays} days`);
            dayInput.value = '';
        } else {
            clearError();
        }
    }
});
document.querySelectorAll('input, select').forEach(element => {
    element.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateAge();
        }
    });
});

