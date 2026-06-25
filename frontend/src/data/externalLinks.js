// frontend/src/data/externalLinks.js

export const baseTechnologies = [
  { name: "React", url: "https://react.dev/" },
  { name: "Node.js", url: "https://nodejs.org/" },
  { name: "Python", url: "https://www.python.org/doc/" },
  { name: "Django", url: "https://docs.djangoproject.com/" },
  { name: "MongoDB", url: "https://www.mongodb.com/docs/" },
  { name: "Express", url: "https://expressjs.com/" },
  { name: "AWS", url: "https://aws.amazon.com/documentation/" },
  { name: "Google Cloud", url: "https://cloud.google.com/docs" },
  { name: "Microsoft Azure", url: "https://learn.microsoft.com/en-us/azure/" },
  { name: "Docker", url: "https://docs.docker.com/" },
  { name: "Kubernetes", url: "https://kubernetes.io/docs/" },
  { name: "TensorFlow", url: "https://www.tensorflow.org/api_docs" },
  { name: "PyTorch", url: "https://pytorch.org/docs/" },
  { name: "Scikit-Learn", url: "https://scikit-learn.org/stable/" },
  { name: "Pandas", url: "https://pandas.pydata.org/docs/" },
  { name: "NumPy", url: "https://numpy.org/doc/" },
  { name: "Linux", url: "https://www.kernel.org/doc/" },
  { name: "Ubuntu", url: "https://help.ubuntu.com/" },
  { name: "Kali Linux", url: "https://www.kali.org/docs/" },
  { name: "Metasploit", url: "https://docs.rapid7.com/metasploit/" },
  { name: "Wireshark", url: "https://www.wireshark.org/docs/" },
  { name: "Nmap", url: "https://nmap.org/book/" },
  { name: "Cisco", url: "https://www.cisco.com/c/en/us/support/index.html" },
  { name: "Oracle", url: "https://docs.oracle.com/" },
  { name: "MySQL", url: "https://dev.mysql.com/doc/" },
  { name: "PostgreSQL", url: "https://www.postgresql.org/docs/" },
  { name: "Redis", url: "https://redis.io/docs/" },
  { name: "Nginx", url: "https://nginx.org/en/docs/" },
  { name: "Apache", url: "https://httpd.apache.org/docs/" },
  { name: "Git", url: "https://git-scm.com/doc" },
  { name: "GitHub", url: "https://docs.github.com/" },
  { name: "GitLab", url: "https://docs.gitlab.com/" },
  { name: "Bitbucket", url: "https://support.atlassian.com/bitbucket-cloud/" },
  { name: "Jenkins", url: "https://www.jenkins.io/doc/" },
  { name: "Terraform", url: "https://developer.hashicorp.com/terraform/docs" },
  { name: "Ansible", url: "https://docs.ansible.com/" },
  { name: "Figma", url: "https://help.figma.com/" },
  { name: "Adobe XD", url: "https://helpx.adobe.com/xd/user-guide.html" },
  { name: "Photoshop", url: "https://helpx.adobe.com/photoshop/user-guide.html" },
  { name: "Illustrator", url: "https://helpx.adobe.com/illustrator/user-guide.html" },
  { name: "Tableau", url: "https://help.tableau.com/" },
  { name: "Power BI", url: "https://learn.microsoft.com/en-us/power-bi/" },
  { name: "SAP", url: "https://help.sap.com/docs/" },
  { name: "Salesforce", url: "https://developer.salesforce.com/docs/" },
  { name: "HubSpot", url: "https://developers.hubspot.com/docs/api/overview" },
  { name: "Google Analytics", url: "https://developers.google.com/analytics" },
  { name: "Meta for Developers", url: "https://developers.facebook.com/docs/" },
  { name: "Twitter Developer", url: "https://developer.twitter.com/en/docs" },
  { name: "LinkedIn API", url: "https://learn.microsoft.com/en-us/linkedin/" },
  { name: "Stripe", url: "https://stripe.com/docs" },
];

const companies = [
  { name: "Google", url: "https://about.google/" },
  { name: "Microsoft", url: "https://www.microsoft.com/" },
  { name: "Apple", url: "https://www.apple.com/" },
  { name: "Amazon", url: "https://www.aboutamazon.com/" },
  { name: "Meta", url: "https://about.meta.com/" },
  { name: "IBM", url: "https://www.ibm.com/" },
  { name: "Intel", url: "https://www.intel.com/" },
  { name: "AMD", url: "https://www.amd.com/" },
  { name: "Nvidia", url: "https://www.nvidia.com/" },
  { name: "Oracle", url: "https://www.oracle.com/" },
  { name: "Cisco", url: "https://www.cisco.com/" },
  { name: "HP", url: "https://www.hp.com/" },
  { name: "Dell", url: "https://www.dell.com/" },
  { name: "Salesforce", url: "https://www.salesforce.com/" },
  { name: "Adobe", url: "https://www.adobe.com/" },
  { name: "SAP", url: "https://www.sap.com/" },
  { name: "VMware", url: "https://www.vmware.com/" },
  { name: "Red Hat", url: "https://www.redhat.com/" },
  { name: "Atlassian", url: "https://www.atlassian.com/" },
  { name: "Twilio", url: "https://www.twilio.com/" },
];

const modifiers = [
  "Documentation",
  "Official Guide",
  "Developer Resources",
  "API Reference",
  "Tutorials",
  "Community",
  "Support",
  "Architecture",
  "Best Practices",
  "Ecosystem",
  "Enterprise Solutions",
  "Case Studies"
];

// Generate ~1000 links
export const generateExternalLinks = () => {
  let allLinks = [];
  
  // Multiply technologies by modifiers (50 * 12 = 600)
  baseTechnologies.forEach(tech => {
    modifiers.forEach(mod => {
      allLinks.push({
        title: `${tech.name} ${mod}`,
        url: tech.url
      });
    });
  });

  // Add companies and variants (20 * 12 = 240)
  companies.forEach(company => {
    modifiers.forEach(mod => {
      allLinks.push({
        title: `${company.name} ${mod}`,
        url: company.url
      });
    });
  });

  // Add some generic high value links to reach ~1000
  for (let i = 0; i < 160; i++) {
     const tech = baseTechnologies[i % baseTechnologies.length];
     allLinks.push({
        title: `${tech.name} Advanced Implementation Guide ${i}`,
        url: tech.url
     });
  }

  return allLinks.sort(() => 0.5 - Math.random()); // shuffle
};

export const externalLinks = generateExternalLinks();
