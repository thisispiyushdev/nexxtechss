const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const files = fs.readdirSync(pagesDir).filter(file => file.endsWith('TrainerPage.jsx'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Extract the Category and Name for this trainer page from the h1
  const h1Match = content.match(/Best (.*?) Trainer in Delhi(?: & Noida NCR)?:\s*<span[^>]*>(.*?)<\/span>/);
  if (!h1Match) {
    console.log(`Could not find h1 match in ${file}`);
    return;
  }
  
  const category = h1Match[1];
  const name = h1Match[2];

  // 1. Change Breadcrumbs
  content = content.replace(
    /name:\s*"Best (.*?) Trainer in Delhi & Noida NCR"/g,
    'name: "Best $1 Trainer in Delhi"'
  );

  // 2. Change <h1>
  content = content.replace(
    /Best (.*?) Trainer in Delhi & Noida NCR:/g,
    'Best $1 Trainer in Delhi:'
  );

  // 3. Change <h2> 
  content = content.replace(
    /The Best (.*?) Trainer in Delhi & Noida NCR/g,
    'The Best $1 Trainer in Delhi'
  );

  // 4. Inject a new H2 section for Noida right after the main <div className="prose..."> starts
  // We'll look for `<div className="prose ...">` and insert our new section right after its opening tag and first paragraph(s)
  
  const noidaSection = `
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-4 border-b pb-2 dark:border-gray-800">
              Best ${category} Trainer in Noida NCR
            </h2>
            <p>
              ${name} is also widely recognized as the top ${category} expert for students and professionals in Noida NCR. With the growing tech hub in Noida, mastering these skills locally under industry-leading guidance provides a significant career advantage.
            </p>
`;

  // Check if we already injected it
  if (!content.includes(`Best ${category} Trainer in Noida NCR`)) {
    // Inject before the first <h2> inside the prose div
    const h2Index = content.indexOf('<h2 className="text-2xl sm:text-3xl font-bold');
    if (h2Index !== -1) {
      content = content.slice(0, h2Index) + noidaSection + content.slice(h2Index);
    }
  }

  // 5. Optionally add a "Delhi" specific paragraph near the start, if we want.
  // The existing intro paragraphs already mention Delhi, so it's fine.

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
