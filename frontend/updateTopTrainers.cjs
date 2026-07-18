const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'TopTrainersPage.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace the single h1 rendering with a split one
const searchString = `{pageData.title}`;
const replaceString = `{pageData.title.includes("(Delhi & Noida NCR)") ? (
                <>
                  {pageData.title.replace("(Delhi & Noida NCR)", "in Delhi")}
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mt-4 text-center">
                    {pageData.title.replace("in India (Delhi & Noida NCR)", "in Noida NCR")}
                  </h2>
                </>
              ) : (
                pageData.title
              )}`;

if (content.includes(searchString) && !content.includes("pageData.title.includes")) {
  // Only replace the first occurrence inside the <h1 ...>
  content = content.replace(/<h1[^>]*>[\s\S]*?{pageData\.title}[\s\S]*?<\/h1>/, match => {
    return match.replace('{pageData.title}', replaceString);
  });
  
  // Update breadcrumbs as well if we want, but for top lists it's just `pageData.title`
  // Actually, breadcrumbs is: `{ name: pageData.title, path: \`/\${fullSlug}\` }`
  content = content.replace(/name: pageData\.title/, 'name: pageData.title.replace("(Delhi & Noida NCR)", "in Delhi")');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated TopTrainersPage.jsx');
} else {
  console.log('Already updated or string not found');
}
