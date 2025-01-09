-- CreateTable
CREATE TABLE "Perspectives" (
    "id_perspective" SERIAL NOT NULL,
    "id_ambit" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "dimensions_amount" INTEGER NOT NULL,
    "perspective_name" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Perspectives_pkey" PRIMARY KEY ("id_perspective")
);

-- CreateTable
CREATE TABLE "Ambits" (
    "id_ambit" SERIAL NOT NULL,
    "ambit" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "num_questions" INTEGER NOT NULL DEFAULT 0,
    "delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Ambits_pkey" PRIMARY KEY ("id_ambit")
);

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_id_dimension_fkey" FOREIGN KEY ("id_dimension") REFERENCES "Dimensions"("id_dimension") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dimensions" ADD CONSTRAINT "Dimensions_id_perspective_fkey" FOREIGN KEY ("id_perspective") REFERENCES "Perspectives"("id_perspective") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Perspectives" ADD CONSTRAINT "Perspectives_id_ambit_fkey" FOREIGN KEY ("id_ambit") REFERENCES "Ambits"("id_ambit") ON DELETE RESTRICT ON UPDATE CASCADE;
