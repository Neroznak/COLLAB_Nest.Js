import {Categories, Collab, Difficulty} from "@prisma/client";

export class Task {
    id: number; // Поле id, тип number
    createdAt: Date; // Поле createdAt, тип Date
    updatedAt: Date; // Поле updatedAt, тип Date
    title: string; // Поле title, тип string
    category: Categories; // Поле category, использует enum Categories из Prisma
    content: string; // Поле content, тип string
    isDeleted: boolean; // Поле isDeleted, тип boolean
    difficulty: Difficulty; // Поле difficulty, использует enum Difficulty из Prisma
    collab: Collab[]; // Поле collab для связи с другими сущностями, тип можно уточнить
}
