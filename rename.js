const fs = require('fs');
const path = require('path');

const directory = 'd:/ewaste-passport/src';

const replacements = [
  { file: 'layouts/AppLayout.tsx', search: /E-WASTE PASSPORT/g, replace: 'E-WASTE QUIZ' },
  { file: 'layouts/AppLayout.tsx', search: /My Passport/g, replace: 'My Scorecard' },
  { file: 'layouts/AppLayout.tsx', search: /Passport/g, replace: 'Scorecard' },
  { file: 'pages/Landing.tsx', search: /E-WASTE PASSPORT/g, replace: 'E-WASTE QUIZ' },
  { file: 'pages/Landing.tsx', search: /Start My Passport/g, replace: 'Start Quiz' },
  { file: 'pages/Landing.tsx', search: /E-Waste Passport/g, replace: 'E-Waste Quiz' },
  { file: 'pages/Dashboard.tsx', search: /My Passport/g, replace: 'My Scorecard' },
  { file: 'pages/ProfileSetup.tsx', search: /Create Your Passport/g, replace: 'Setup Profile' },
  { file: 'pages/ProfileSetup.tsx', search: /Create My Passport/g, replace: 'Create Profile' },
  { file: 'pages/Profile.tsx', search: /Manage your passport details/g, replace: 'Manage your profile details' },
  { file: 'pages/Profile.tsx', search: /Reset My Passport/g, replace: 'Reset My Data' },
  { file: 'pages/Profile.tsx', search: /Reset your passport\?/g, replace: 'Reset your data?' },
  { file: 'pages/Passport.tsx', search: /My Passport/g, replace: 'My Scorecard' },
  { file: 'pages/Passport.tsx', search: /E-WASTE PASSPORT/g, replace: 'E-WASTE QUIZ' },
  { file: 'pages/Certificate.tsx', search: /E-WASTE PASSPORT/g, replace: 'E-WASTE QUIZ' },
  { file: '../src/App.tsx', search: /Your passport is ready/g, replace: 'Your profile is ready' },
  { file: '../src/App.tsx', search: /Your passport has been reset/g, replace: 'Your data has been reset' },
  { file: '../index.html', search: /E-Waste Passport/g, replace: 'E-Waste Quiz' },
  { file: '../README.md', search: /E-Waste Passport/g, replace: 'E-Waste Quiz' },
  { file: 'pages/Quiz.tsx', search: /Continue to Passport/g, replace: 'Continue to Scorecard' }
];

replacements.forEach(({ file, search, replace }) => {
  const filePath = path.join(directory, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(search, replace);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
