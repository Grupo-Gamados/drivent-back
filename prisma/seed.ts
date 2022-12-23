import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });

    await prisma.locals.create({
      data: {
        name: "Auditório Principal",
      },
    });

    await prisma.locals.create({
      data: {
        name: "Auditório Lateral",
      },
    });

    await prisma.locals.create({
      data: {
        name: "Sala de Workshop",
      },
    });

    await prisma.days.create({
      data: {
        name: "Sexta, 06/01",
      },
    });

    await prisma.days.create({
      data: {
        name: "Sábado, 07/01",
      },
    });

    await prisma.days.create({
      data: {
        name: "Domingo, 08/01",
      },
    });

    await prisma.activities.create({
      data: {
        name: "Minecraft: montando o PC ideal",
        startTime: "09:00",
        endTime: "10:00",
        duration: "1",
        totalVagas: 30,
        dayId: 1,
        localId: 1,
      },
    });

    await prisma.activities.create({
      data: {
        name: "LoL: montando o PC ideal",
        startTime: "10:00",
        endTime: "11:00",
        duration: "1",
        totalVagas: 30,
        dayId: 1,
        localId: 1,
      },
    });

    await prisma.activities.create({
      data: {
        name: "Palestra x",
        startTime: "09:00",
        endTime: "10:30",
        duration: "1.5",
        totalVagas: 30,
        dayId: 1,
        localId: 2,
      },
    });

    await prisma.activities.create({
      data: {
        name: "Palestra y",
        startTime: "09:00",
        endTime: "10:00",
        duration: "1",
        totalVagas: 30,
        dayId: 1,
        localId: 3,
      },
    });

    await prisma.activities.create({
      data: {
        name: "Palestra z",
        startTime: "10:00",
        endTime: "11:00",
        duration: "1",
        totalVagas: 5,
        dayId: 1,
        localId: 3,
      },
    });

    await prisma.activities.create({
      data: {
        name: "Palestra Israel",
        startTime: "09:00",
        endTime: "11:00",
        duration: "2",
        totalVagas: 5,
        dayId: 2,
        localId: 1,
      },
    });

    await prisma.activities.create({
      data: {
        name: "Palestra Gabriel",
        startTime: "10:00",
        endTime: "12:00",
        duration: "2",
        totalVagas: 5,
        dayId: 2,
        localId: 2,
      },
    });

    await prisma.activities.create({
      data: {
        name: "Almoço com pizzas da Carol",
        startTime: "12:00",
        endTime: "13:00",
        duration: "1",
        totalVagas: 15,
        dayId: 2,
        localId: 2,
      },
    });

    await prisma.activities.create({
      data: {
        name: "Palestra JP",
        startTime: "09:00",
        endTime: "11:00",
        duration: "2",
        totalVagas: 5,
        dayId: 2,
        localId: 3,
      },
    });

    await prisma.activities.create({
      data: {
        name: "Palesta com Elon Musk Jr",
        startTime: "08:00",
        endTime: "11:00",
        duration: "3",
        totalVagas: 50,
        dayId: 3,
        localId: 1,
      },
    });

    await prisma.activities.create({
      data: {
        name: "Assistir o filme do Pelé",
        startTime: "09:00",
        endTime: "11:00",
        duration: "2",
        totalVagas: 50,
        dayId: 3,
        localId: 3,
      },
    });
  }

  await prisma.ticketType.create({
    data: {
      name: "online",
      price: 100,
      isRemote: true,
      includesHotel: false,
    },
  });

  await prisma.ticketType.create({
    data: {
      name: "presencial",
      price: 250,
      isRemote: false,
      includesHotel: false,
    },
  });

  await prisma.ticketType.create({
    data: {
      name: "presencial",
      price: 600,
      isRemote: false,
      includesHotel: true,
    },
  });

  await prisma.hotel.create({
    data: {
      name: "Driven Resort",
      image: "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg",
    },
  });

  await prisma.hotel.create({
    data: {
      name: "Driven Palace",
      image: "https://media-cdn.tripadvisor.com/media/photo-s/1d/05/37/ea/exterior-view.jpg",
    },
  });

  await prisma.hotel.create({
    data: {
      name: "Driven World",
      image: "https://media-cdn.tripadvisor.com/media/photo-s/19/ee/b4/79/axel-hotel-barcelona.jpg",
    },
  });

  await prisma.room.create({
    data: {
      name: "Room 1",
      capacity: 1,
      hotelId: 1,
    },
  });

  await prisma.room.create({
    data: {
      name: "Room 1",
      capacity: 1,
      hotelId: 2,
    },
  });

  await prisma.room.create({
    data: {
      name: "Room 1",
      capacity: 1,
      hotelId: 3,
    },
  });

  await prisma.room.create({
    data: {
      name: "Room 2",
      capacity: 2,
      hotelId: 1,
    },
  });

  await prisma.room.create({
    data: {
      name: "Room 2",
      capacity: 2,
      hotelId: 2,
    },
  });

  await prisma.room.create({
    data: {
      name: "Room 2",
      capacity: 2,
      hotelId: 3,
    },
  });

  await prisma.room.create({
    data: {
      name: "Room 3",
      capacity: 2,
      hotelId: 1,
    },
  });

  await prisma.room.create({
    data: {
      name: "Room 3",
      capacity: 3,
      hotelId: 2,
    },
  });

  await prisma.room.create({
    data: {
      name: "Room 3",
      capacity: 2,
      hotelId: 3,
    },
  });

  await prisma.room.create({
    data: {
      name: "Room 4",
      capacity: 8,
      hotelId: 2,
    },
  });

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
