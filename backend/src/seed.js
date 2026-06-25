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
    try {
      await db.query(`SELECT id FROM ${table} LIMIT 1`);
      console.log(`  ✅ Table '${table}' exists`);
    } catch (error) {
      if (error.code === "42P01") {
        console.log(`  ❌ Table '${table}' does not exist. Please create it manually.`);
        console.log(`     And run the SQL from your schema.sql\n`);
      } else {
        console.log(`  ⚠️ Table '${table}': ${error.message}`);
      }
    }
  }
  
  console.log("\nNow attempting to seed data...\n");

  // Seed reviews
  try {
    await db.query(`
      INSERT INTO reviews (name, role, company, image, text, is_active, sort_order)
      VALUES 
      ('Lakshya Jonwal', 'Full Stack Developer', 'Amazon', '/students/lakshya.png', 'NEXXTECHS transformed my career. The hands-on training with real projects gave me the confidence to crack interviews at top tech giants.', true, 0),
      ('Vikram Rathod', 'UI/UX Designer', 'Zomato', '/students/vikram.png', 'The design principles I learned here helped me build a world-class portfolio. The mentorship is truly personalized.', true, 1),
      ('Vansh', 'Cyber Security Analyst', 'Deloitte', '/students/vansh.png', 'Mastering ethical hacking was made easy with the advanced labs and expert guidance at NEXXTECHS.', true, 2),
      ('Arpan Dewadi', 'Data Scientist', 'American Express', '/students/arpan.png', 'Turning complex data into insights is a superpower I gained here. The Data Science module is incredibly practical.', true, 3),
      ('Sahil Maan', 'DevOps Engineer', 'Microsoft', '/students/sahil.png', 'Cloud computing and CI/CD pipelines felt daunting until I joined NEXXTECHS. Now I handle massive enterprise architectures.', true, 4),
      ('Anuj', 'Digital Marketing Lead', 'Flipkart', '/students/anuj.png', 'The growth hacking strategies and performance marketing skills I developed here have been invaluable.', true, 5)
      ON CONFLICT DO NOTHING;
    `);
    console.log("  ✅ Reviews seeded");
  } catch (revErr) {
    console.log("  Reviews:", revErr.message);
  }

  // Seed stats
  try {
    await db.query(`
      INSERT INTO placement_stats (label, value, suffix, icon, sort_order)
      VALUES 
      ('Students Trained', 5000, '+', 'Users', 0),
      ('Hiring Partners', 100, '+', 'Building2', 1),
      ('Students Placed', 500, '+', 'Trophy', 2)
      ON CONFLICT DO NOTHING;
    `);
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
