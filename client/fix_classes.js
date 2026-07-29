const fs = require('fs');
const path = 'app/(storefront)/(auth)/auth/register/components/register-form.tsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /(w|h|p|m|gap|max-w|min-h|pl|pr|pt|pb|px|py|top|left|right|bottom)-\[([0-9]+)px\]/g;
content = content.replace(regex, (match, prefix, pxValue) => {
    const val = parseFloat(pxValue) / 4;
    return `${prefix}-${val}`;
});

fs.writeFileSync(path, content, 'utf8');
console.log("Done");
