-- CreateTable
CREATE TABLE "point" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "fone" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "cep" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
