-- CreateTable
CREATE TABLE "_itemTopoint" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_itemTopoint_AB_unique" ON "_itemTopoint"("A", "B");

-- CreateIndex
CREATE INDEX "_itemTopoint_B_index" ON "_itemTopoint"("B");

-- AddForeignKey
ALTER TABLE "_itemTopoint" ADD FOREIGN KEY ("A") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_itemTopoint" ADD FOREIGN KEY ("B") REFERENCES "point"("id") ON DELETE CASCADE ON UPDATE CASCADE;
