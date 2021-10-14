-- CreateTable
CREATE TABLE "PointItem" (
    "pointId" UUID NOT NULL,
    "itemId" INTEGER NOT NULL,

    PRIMARY KEY ("pointId","itemId")
);

-- AddForeignKey
ALTER TABLE "PointItem" ADD FOREIGN KEY ("pointId") REFERENCES "Point"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointItem" ADD FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
