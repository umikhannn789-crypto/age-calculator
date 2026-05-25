
function calculateExactAge(birthDate, currentDate) {
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

  
    if (days < 0) {
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += lastMonth.getDate();
        months--;
    }

  
    if (months < 0) {
        months += 12;
        years--;
    }

    return { years, months, days };
}


function displayAge(age) {
    document.getElementById('yearsValue').textContent = age.years;
    document.getElementById('monthsValue').textContent = age.months;
    document.getElementById('daysValue').textContent = age.days;
    document.getElementById('result').classList.add('show');
}


function calculateAge() {
   
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    
    const errorDiv = document.getElementById('error');
    const resultDiv = document.getElementById('result');
    
  
    resultDiv.classList.remove('show');
    errorDiv.classList.remove('show');
    
   
    if (!day || !month || !year) {
        errorDiv.innerHTML = 'Please fill in all fields';
        errorDiv.classList.add('show');
        return;
    }
    
    const birthDay = parseInt(day);
    const birthMonth = parseInt(month);
    const birthYear = parseInt(year);
    const today = new Date();
    
   
    if (birthDay < 1 || birthDay > 31) {
        errorDiv.innerHTML = 'Please enter valid day (1-31)';
        errorDiv.classList.add('show');
        return;
    }
    
   
    if (birthYear < 1900 || birthYear > today.getFullYear()) {
        errorDiv.innerHTML = 'Please enter valid year';
        errorDiv.classList.add('show');
        return;
    }
    
  
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
  
    if (birthDate.getDate() !== birthDay || 
        birthDate.getMonth() !== birthMonth - 1) {
        errorDiv.innerHTML = 'Invalid date! Check day for selected month';
        errorDiv.classList.add('show');
        return;
    }
    
    if (birthDate > today) {
        errorDiv.innerHTML = 'Birth date cannot be in future';
        errorDiv.classList.add('show');
        return;
    }
    

    const age = calculateExactAge(birthDate, today);
    displayAge(age);
}