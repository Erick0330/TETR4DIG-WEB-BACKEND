-- CreateTable
CREATE TABLE "Dimensions" (
    "id_dimension" SERIAL NOT NULL,
    "name_dimension" TEXT NOT NULL,
    "questions_amount" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "id_perspective" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Dimensions_pkey" PRIMARY KEY ("id_dimension")
);
