-- CreateTable
CREATE TABLE "UserTests" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "testDate" TIMESTAMP(3) NOT NULL,
    "ambits_result" TEXT NOT NULL,
    "perspectives_result" TEXT NOT NULL,
    "dimensions_result" TEXT NOT NULL,

    CONSTRAINT "UserTests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserTests" ADD CONSTRAINT "UserTests_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
