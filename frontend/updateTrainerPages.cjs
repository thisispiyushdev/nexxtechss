const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('TrainerPage.jsx'));
files.push('TopTrainersPage.jsx');
files.push('TagPage.jsx');

files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Make replacements
    let newContent = content.replace(/Trainer in Delhi/g, "Trainer in Delhi & Noida NCR");
    newContent = newContent.replace(/trainer in Delhi/g, "trainer in Delhi & Noida NCR");
    newContent = newContent.replace(/trainers in Delhi/gi, "trainers in Delhi & Noida NCR");
    
    // Specifically for URLs/Breadcrumbs if we don't want to break routes:
    // Route paths like "/best-cloud-computing-trainer-in-delhi" shouldn't change unless we change router.
    // The previous replace might have touched paths. Let's fix paths back to original if they changed.
    newContent = newContent.replace(/\/best-([a-z-]+)-trainer-in-delhi-&-noida-ncr/g, "/best-$1-trainer-in-delhi");
    newContent = newContent.replace(/\/best-([a-z-]+)-trainers-in-delhi-&-noida-ncr/g, "/best-$1-trainers-in-delhi");
    newContent = newContent.replace(/\/best-([a-z-]+)-trainer-in-delhi-&amp;-noida-ncr/g, "/best-$1-trainer-in-delhi");

    if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated ${file}`);
    }
});
