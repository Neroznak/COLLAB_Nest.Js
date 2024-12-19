-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userName" TEXT NOT NULL DEFAULT 'unnamed user',
    "email" TEXT NOT NULL,
    "password" TEXT,
    "rating" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "profilePictureUrl" TEXT NOT NULL DEFAULT '/uploads/no-user-image.png',
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "language" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "learningGoals" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL,
    "subscriptionPlane" TEXT NOT NULL,
    "paymentHistory" TEXT NOT NULL,
    "collabId" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "completionRate" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "duration" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT '/uploads/no-course-image.png',
    "videoPreviewUrl" TEXT,
    "tags" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "studentsCount" INTEGER NOT NULL,
    "groupSize" INTEGER NOT NULL,
    "structure" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collab" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "capital" DOUBLE PRECISION NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Collab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "isEdited" BOOLEAN NOT NULL,
    "reactions" TEXT NOT NULL,
    "attachments" TEXT NOT NULL,
    "isPinned" BOOLEAN NOT NULL,
    "replyToMessageId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "collabId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReaderMessage" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "messageId" INTEGER NOT NULL,

    CONSTRAINT "ReaderMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "expectedAnswer" TEXT NOT NULL,
    "maxScore" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskOption" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "order" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "TaskOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_collabId_fkey" FOREIGN KEY ("collabId") REFERENCES "Collab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collab" ADD CONSTRAINT "Collab_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_collabId_fkey" FOREIGN KEY ("collabId") REFERENCES "Collab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReaderMessage" ADD CONSTRAINT "ReaderMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReaderMessage" ADD CONSTRAINT "ReaderMessage_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskOption" ADD CONSTRAINT "TaskOption_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
