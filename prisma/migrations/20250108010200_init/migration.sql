-- CreateTable
CREATE TABLE "Questions" (
    "id_question" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "id_dimension" INTEGER NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id_question")
);
