/*
  Warnings:

  - A unique constraint covering the columns `[merchantRef]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Payment_merchantRef_key" ON "Payment"("merchantRef");
