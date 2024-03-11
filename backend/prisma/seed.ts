const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function importData() {
  // Clear the tables
  await prisma.staff.deleteMany();
  await prisma.redemption.deleteMany();
  await prisma.teams.deleteMany();

  // Reading data from id to team mappings
  const csv = fs.readFileSync('prisma/data/staff-id-to-team-mapping-long.csv', 'utf8');

  // Parsing the CSV data
  const rows = csv
    .split('\n')
    .slice(1)
    .map((row: string) => row.split(','));

  // Insert data into database
  for (const row of rows) {
    try {
      const epochMillisecondsCreated: string = row[2];
      const dateTime: Date = new Date(parseInt(epochMillisecondsCreated));
      await prisma.staff.create({
        data: {
          id: row[0],
          team_name: row[1],
          created_at: dateTime,
        },
      });

      await prisma.teams.upsert({
        where: { team_name: row[1] },
        update: { team_name: row[1] },
        create: { team_name: row[1] },
      });
    } catch (error) {
      console.error(`Failed to insert row: ${row}`, error);
    }
  }

  await prisma.$disconnect();
}

importData().catch((error) => {
  console.error('Error importing data:', error);
});
