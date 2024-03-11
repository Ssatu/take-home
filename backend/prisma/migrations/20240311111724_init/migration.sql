-- CreateTable
CREATE TABLE "staff" (
    "id" TEXT NOT NULL,
    "team_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "team_name" TEXT NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("team_name")
);

-- CreateTable
CREATE TABLE "Redemption" (
    "redemption_id" SERIAL NOT NULL,
    "team_name" TEXT NOT NULL,
    "redeemed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "staff_collected_id" TEXT NOT NULL,

    CONSTRAINT "Redemption_pkey" PRIMARY KEY ("redemption_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Redemption_team_name_key" ON "Redemption"("team_name");

-- CreateIndex
CREATE UNIQUE INDEX "Redemption_staff_collected_id_key" ON "Redemption"("staff_collected_id");

-- AddForeignKey
ALTER TABLE "Redemption" ADD CONSTRAINT "Redemption_staff_collected_id_fkey" FOREIGN KEY ("staff_collected_id") REFERENCES "staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Redemption" ADD CONSTRAINT "Redemption_team_name_fkey" FOREIGN KEY ("team_name") REFERENCES "teams"("team_name") ON DELETE RESTRICT ON UPDATE CASCADE;
