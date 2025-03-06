function generateEmail() {
    const randomDigits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10) + 1).join('');
    const email = `${randomDigits}@villanova.edu`;
    return email;
};

function generateBinaryResponse() {
    const randomNumber = Math.random(); 
    return randomNumber >= 0.5 ? 'yes' : 'no';
};

function generateBinaryLabel() {
    const binaryLabels = [
      { value: 'yes', label: 'yes' },
      { value: 'no', label: 'no' },
    ];
  
    const randomIndex = Math.floor(Math.random() * binaryLabels.length);
  
    return binaryLabels[randomIndex];
}

function generateRandomGender() {
    const randomNumber = Math.random(); 
    return randomNumber >= 0.5 ? 'Male' : 'Female';
};

function generateAge() {
    return Math.floor(Math.random() * (24 - 18 + 1)) + 18;
};

function generateMinAge() {
    const randomNumber = Math.random(); 
    return randomNumber >= 0.5 ? 18 : 21;
};

function generateMaxAge() {
    const randomNumber = Math.random(); 
    return randomNumber >= 0.5 ? 23 : 24;
};

function generateLocation() {
    const randomNumber = Math.random(); 
    return randomNumber >= 0.5 ? 'On Campus' : 'Off Campus';
}

function generateScaleValue() {
    return Math.floor(Math.random() * 5) + 1;
}

function generateBudget() {
    const minValue = 500;
    const maxValue = 10000;
    const increment = 500;

    const numberOfValues = (maxValue - minValue) / increment + 1;
    const randomIndex = Math.floor(Math.random() * numberOfValues);
    const budgetValue = minValue + randomIndex * increment;

    return budgetValue;
}

function generateClass() {
    const classes = ["Freshman", "Sophomore", "Junior", "Senior"];
    const randomIndex = Math.floor(Math.random() * classes.length);
    return classes[randomIndex];
}

function generateNicotinePref() {
    const nicotinePrefList = [
        {value: '0', label: 'No preference'},
        {value: '1', label: 'Never'},
        {value: '2', label: 'Rarely'},
        {value: '3', label: 'Moderate'},
        {value: '4', label: 'Socially'},
        {value: '5', label: 'Regularly'},
      ];

      const randomIndex = Math.floor(Math.random() * nicotinePrefList.length);

      return {
          label: nicotinePrefList[randomIndex].label,
          value: nicotinePrefList[randomIndex].value,
      };
};

function generateAlcoholPref() {
    const alcoholPrefList = [
        {value: '0', label: 'No preference'},
        {value: '1', label: 'Abstinent'},
        {value: '2', label: 'Rarely'},
        {value: '3', label: 'Moderate'},
        {value: '4', label: 'Socially'},
        {value: '5', label: 'Heavy Use'},
      ];

      const randomIndex = Math.floor(Math.random() * alcoholPrefList.length);

      return {
        label: alcoholPrefList[randomIndex].label,
        value: alcoholPrefList[randomIndex].value,
      }
};

function generatePersonalityPref() {
    const personalityPrefList = [
        {value: '0', label: 'No preference'},
        {value: '1', label: 'Introverted'},
        {value: '2', label: 'Partially Introverted'},
        {value: '3', label: 'Moderate'},
        {value: '4', label: 'Partially Extroverted'},
        {value: '5', label: 'Extroverted'},
      ];

      const randomIndex = Math.floor(Math.random() * personalityPrefList.length);

      return {
        label: personalityPrefList[randomIndex].label,
        value: personalityPrefList[randomIndex].value,
      }

};

function generateWeedPref() {
    const weedPrefList = [
        {value: '0', label: 'No preference'},
        {value: '1', label: 'Never'},   
        {value: '2', label: 'Rarely'},
        {value: '3', label: 'Moderate'},
        {value: '4', label: 'Socially'},
        {value: '5', label: 'Always'},
      ];

      const randomIndex = Math.floor(Math.random() * weedPrefList.length);

      return {
        label: weedPrefList[randomIndex].label,
        value: weedPrefList[randomIndex].value,
      }
};

function generateVisitPref() {
    const visitTimes = [
        {value: 'morning', label: 'morning'},
        {value: 'afternoon', label: 'afternoon'},   
        {value: 'evening', label: 'evening'},
        {value: 'night', label: 'night'},
    ];

    const numItems = Math.floor(Math.random() * visitTimes.length) + 1;

    const result = [];
    let remainingItems = numItems;

    for (let i = 0; i < visitTimes.length && remainingItems > 0; i++) {
        if (Math.random() < remainingItems / (visitTimes.length - i)) {
            result.push(visitTimes[i]);
            remainingItems--;
        }
    }

    return result;
};

function generatePetAllergies() {
    const petAllergies = [
        {value: 'dog', label: 'dog'},
        {value: 'cat', label: 'cat'},   
        {value: 'hamster', label: 'hamster'},
        {value: 'fish', label: 'fish'},
    ]

    const randomIndex = Math.floor(Math.random() * petAllergies.length);

    return petAllergies[randomIndex];
};

function generateRandomMajor() {
    const collegeMajors = [
        'Accounting', 'Art History', 'Biology', 'Business Administration',
        'Chemistry', 'Civil Engineering', 'Computer Science', 'Economics',
        'English', 'Environmental Science', 'History', 'Marketing',
        'Mathematics', 'Mechanical Engineering', 'Nursing', 'Philosophy',
        'Physics', 'Political Science', 'Psychology', 'Sociology',
      ];

    const randomIndex = Math.floor(Math.random() * collegeMajors.length);
    const randomMajor = collegeMajors[randomIndex];

    return randomMajor;
}

module.exports = {
    generateEmail,
    generateBinaryResponse,
    generateBinaryLabel,
    generateAge,
    generateLocation,
    generateScaleValue,
    generateBudget,
    generateClass,
    generateMinAge,
    generateMaxAge,
    generateNicotinePref,
    generateAlcoholPref,
    generatePersonalityPref,
    generateWeedPref,
    generateVisitPref,
    generatePetAllergies,
    generateRandomGender,
    generateRandomMajor,
};