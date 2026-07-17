const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'topTrainersData.js');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update metaTitle and title
content = content.replace(/metaTitle: "(.*?)",/g, (match, p1) => {
    if (!p1.includes("Noida")) {
        return `metaTitle: "${p1.replace('in India', 'in India (Delhi & Noida NCR)')}",`;
    }
    return match;
});

content = content.replace(/metaDescription: "(.*?)",/g, (match, p1) => {
    if (!p1.includes("Noida")) {
        return `metaDescription: "${p1.replace('Delhi,', 'Delhi, Noida NCR,')}",`;
    }
    return match;
});

content = content.replace(/title: "(.*?)",/g, (match, p1) => {
    if (!p1.includes("Noida")) {
        return `title: "${p1.replace('in India', 'in India (Delhi & Noida NCR)')}",`;
    }
    return match;
});

// 2. Add Noida tags
content = content.replace(/tags: \[\s*([\s\S]*?)\s*\],/g, (match, p1) => {
    let tags = p1.split(',').map(t => t.trim().replace(/"/g, ''));
    let newTags = new Set(tags);
    tags.forEach(tag => {
        if (tag.includes('delhi')) {
            newTags.add(tag.replace('delhi', 'noida'));
            newTags.add(tag.replace('delhi', 'delhi ncr'));
        }
        if (tag.includes('india')) {
             newTags.add(tag.replace('india', 'noida'));
        }
    });
    const formattedTags = Array.from(newTags).filter(Boolean).map(t => `        "${t}"`).join(',\n');
    return `tags: [\n${formattedTags}\n    ],`;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('topTrainersData.js SEO updated successfully!');
