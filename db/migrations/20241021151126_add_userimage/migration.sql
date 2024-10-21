/*
  Warnings:

  - You are about to drop the column `url` on the `userimage` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `Userimage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `userimage` DROP FOREIGN KEY `UserImage_userId_fkey`;

-- AlterTable
ALTER TABLE `userimage` DROP COLUMN `url`,
    ADD COLUMN `fileName` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Userimage` ADD CONSTRAINT `Userimage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
