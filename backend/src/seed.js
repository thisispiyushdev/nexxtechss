/**
 * Create tables and seed data using PostgreSQL (pg).
 * Run: node src/seed.js
 */
import db from "./config/db.js";

async function createTables() {
  console.log("🔨 Checking tables via Postgres...\n");

  // Test if tables already exist by trying to select from them
  const tables = ["reviews", "placement_stats", "blogs", "courses"];
  for (const table of tables) {
      const { error } = await db.from(table).select('id').limit(1);
      if (error) {
        if (error.code === "42P01") {
          console.log(`  ❌ Table '${table}' does not exist. Please create it manually.`);
          console.log(`     And run the SQL from your schema.sql\n`);
        } else {
          console.log(`  ⚠️ Table '${table}': ${error.message}`);
        }
      } else {
        console.log(`  ✅ Table '${table}' exists`);
      }
  }
  
  console.log("\nNow attempting to seed data...\n");

  // Seed reviews
  try {
    const { error } = await db.from('reviews').insert([
      { name: 'Lakshya Jonwal', role: 'Full Stack Developer', company: 'Amazon', image: '/students/lakshya.png', text: 'NEXXTECHS transformed my career. The hands-on training with real projects gave me the confidence to crack interviews at top tech giants.', is_active: true, sort_order: 0 },
      { name: 'Vikram Rathod', role: 'UI/UX Designer', company: 'Zomato', image: '/students/vikram.png', text: 'The design principles I learned here helped me build a world-class portfolio. The mentorship is truly personalized.', is_active: true, sort_order: 1 },
      { name: 'Vansh', role: 'Cyber Security Analyst', company: 'Deloitte', image: '/students/vansh.png', text: 'Mastering ethical hacking was made easy with the advanced labs and expert guidance at NEXXTECHS.', is_active: true, sort_order: 2 },
      { name: 'Arpan Dewadi', role: 'Data Scientist', company: 'American Express', image: '/students/arpan.png', text: 'Turning complex data into insights is a superpower I gained here. The Data Science module is incredibly practical.', is_active: true, sort_order: 3 },
      { name: 'Sahil Maan', role: 'DevOps Engineer', company: 'Microsoft', image: '/students/sahil.png', text: 'Cloud computing and CI/CD pipelines felt daunting until I joined NEXXTECHS. Now I handle massive enterprise architectures.', is_active: true, sort_order: 4 },
      { name: 'Anuj', role: 'Digital Marketing Lead', company: 'Flipkart', image: '/students/anuj.png', text: 'The growth hacking strategies and performance marketing skills I developed here have been invaluable.', is_active: true, sort_order: 5 }
    ]);
    if (error && error.code !== '23505') throw error;
    console.log("  ✅ Reviews seeded");
  } catch (revErr) {
    console.log("  Reviews:", revErr.message);
  }

  // Seed stats
  try {
    const { error } = await db.from('placement_stats').insert([
      { label: 'Students Trained', value: 5000, suffix: '+', icon: 'Users', sort_order: 0 },
      { label: 'Hiring Partners', value: 100, suffix: '+', icon: 'Building2', sort_order: 1 },
      { label: 'Students Placed', value: 500, suffix: '+', icon: 'Trophy', sort_order: 2 }
    ]);
    if (error && error.code !== '23505') throw error;
    console.log("  ✅ Stats seeded");
  } catch (statErr) {
    console.log("  Stats:", statErr.message);
  }

  console.log("\n✨ Done!");
  process.exit(0);
}

createTables().catch((err) => {
  console.error(err);
  process.exit(1);
});
