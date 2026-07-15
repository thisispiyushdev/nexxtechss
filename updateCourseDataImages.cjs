const fs = require('fs');

let content = fs.readFileSync('frontend/src/data/coursesData.js', 'utf8');

content = content.replace(/\/course-images\/da\.webp/g, '/course-images/Data-Analytics.webp');
content = content.replace(/\/course-images\/ds\.webp/g, '/course-images/Data-Science.webp');
content = content.replace(/\/course-images\/ccp\.webp/g, '/course-images/Cloud-Computing.webp');
content = content.replace(/\/course-images\/cyber\.webp/g, '/course-images/Cyber-Security.webp');
content = content.replace(/\/course-images\/Devops\.webp/g, '/course-images/DevOps.webp');
content = content.replace(/\/course-images\/dsa\.webp/g, '/course-images/DSA.webp');
content = content.replace(/\/course-images\/python\.webp/g, '/course-images/Python-Full-Stack.webp');
content = content.replace(/\/course-images\/web\.webp/g, '/course-images/Web-Development.webp');
content = content.replace(/\/course-images\/dmm\.webp/g, '/course-images/Digital-Marketing.webp');
content = content.replace(/\/course-images\/sapp\.webp/g, '/course-images/SAP.webp');
content = content.replace(/\/course-images\/graphicc\.webp/g, '/course-images/graphic.webp');
content = content.replace(/\/course-images\/uiuxx\.webp/g, '/course-images/uiux.webp');

fs.writeFileSync('frontend/src/data/coursesData.js', content);
console.log('Update coursesData images successful');
