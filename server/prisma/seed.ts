import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "jojo",
      email: "jojo@example.com",
      avatarUrl: "https://github.com/victordonat0.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Example Pool",
      code: "BOL123",
      ownerId: user.id,

      participants:{
        create:{
            userId: user.id
        }
      }
    },
  });

  await prisma.game.create({
    data:{
        date: "2022-11-11T03:37:08.663Z",
        firstTeamCountryCode:"DE",
        secondTeamCountryCode:"BR",
    }
  })

  await prisma.game.create({
    data:{
        date: "2022-11-12T03:37:08.663Z",
        firstTeamCountryCode:"AR",
        secondTeamCountryCode:"BR",

        guesses:{
            create:{
                firstTeamPoints: 2,
                secondTeamPoints: 1,

                participant:{
                    connect:{
                        userId_poolId:{
                            userId: user.id,
                            poolId: pool.id,
                        }
                    }
                }
            }
        }
    }
  })
}

main();
