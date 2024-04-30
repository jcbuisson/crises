-- CreateTable
CREATE TABLE "crise" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "intensity" INTEGER NOT NULL,

    CONSTRAINT "crise_pkey" PRIMARY KEY ("id")
);
