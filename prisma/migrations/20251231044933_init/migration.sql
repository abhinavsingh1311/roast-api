-- CreateEnum
CREATE TYPE "AppType" AS ENUM ('WEBSITE', 'DISCORD', 'SLACK', 'MOBILE_APP');

-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('CODING', 'GAMING', 'PRODUCTIVITY', 'EDUCATIONAL');

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "appType" "AppType" NOT NULL DEFAULT 'WEBSITE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoastLog" (
    "id" TEXT NOT NULL,
    "apiKeyId" TEXT NOT NULL,
    "theme" "Theme" NOT NULL,
    "heat" INTEGER NOT NULL,
    "context" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoastLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_key_key" ON "ApiKey"("key");

-- AddForeignKey
ALTER TABLE "RoastLog" ADD CONSTRAINT "RoastLog_apiKeyId_fkey" FOREIGN KEY ("apiKeyId") REFERENCES "ApiKey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
