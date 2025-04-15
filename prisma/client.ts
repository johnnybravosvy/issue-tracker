import { PrismaClient } from '@prisma/client'

// add prisma to the NodeJS global types to
// prevent multiple instances of prisma client
// get created by hot-reloading in development
declare global {
    var prisma: PrismaClient
}

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') {
    global.prisma = prisma
}

export default prisma



// // lib/prisma.ts
// import { PrismaClient } from "@prisma/client";

// declare global {
//     // eslint-disable-next-line no-var
//     var prisma: PrismaClient | undefined;
// }

// const prisma: PrismaClient =
//     global.prisma ||
//     new PrismaClient({
//         log:
//             process.env.NODE_ENV === "development"
//                 ? ["query", "error", "warn"]
//                 : ["error"],
//     });

// if (process.env.NODE_ENV !== "production") {
//     global.prisma = prisma;
// }

// export default prisma;
// import { PrismaClient } from "@prisma/client";

// const prismaClientSingleton = () => {
//     return new PrismaClient();
// }

// type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// const globalForPrisma = globalThis as unknown as {
//     prisma: PrismaClientSingleton | undefined;
// };

// const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

// export default prisma;

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma;