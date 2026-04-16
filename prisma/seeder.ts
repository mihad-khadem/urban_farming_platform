import prisma from "../src/config/db";
import bcrypt from "bcrypt";
import { Role, Status } from "@prisma/client";

const runSeed = async () => {
  console.log("Seeding started...");

  const password = await bcrypt.hash("123456", 10);

  // ADMIN + CUSTOMER

  await prisma.user.createMany({
    data: [
      {
        name: "Admin",
        email: "admin@farm.com",
        password,
        role: Role.ADMIN,
        status: Status.APPROVED,
      },
      {
        name: "Customer",
        email: "customer@farm.com",
        password,
        role: Role.CUSTOMER,
        status: Status.APPROVED,
      },
    ],
    skipDuplicates: true,
  });

  //  10 VENDORS

  const vendors: any[] = [];

  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.upsert({
      where: { email: `vendor${i}@farm.com` },
      update: {},
      create: {
        name: `Vendor ${i}`,
        email: `vendor${i}@farm.com`,
        password: password as string,
        role: Role.VENDOR,
        status: Status.APPROVED,
      },
    });

    const vendorProfile = await prisma.vendorProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        farmName: `Urban Farm ${i}`,
        location: `Dhaka Zone ${i}`,
        status: Status.APPROVED,
      },
    });

    vendors.push(vendorProfile);

    //  Certification
    await prisma.certification.create({
      data: {
        vendorId: vendorProfile.id,
        certifyingBody: "Organic Authority BD",
        documentUrl: "https://example.com/cert.pdf",
        status: Status.APPROVED,
      },
    });

    //  Rental Space
    await prisma.rentalSpace.create({
      data: {
        vendorId: vendorProfile.id,
        location: `Plot ${i}`,
        size: "10x10",
        price: 100,
        available: true,
      },
    });
  }

  //  100 PRODUCTS

  const categories = ["Vegetables", "Fruits", "Herbs", "Seeds"];

  for (let i = 1; i <= 100; i++) {
    const vendor = vendors[Math.floor(Math.random() * vendors.length)];

    await prisma.product.create({
      data: {
        name: `Organic Product ${i}`,
        description: "Fresh organic produce",
        price: Number((Math.random() * 50 + 10).toFixed(2)),
        quantity: Math.floor(Math.random() * 100) + 1,
        category: categories[i % categories.length],
        isCertified: true,
        vendorId: vendor.id,
      },
    });
  }

  console.log(" Seeding completed!");
};

// RUN + CLEAN EXIT

runSeed()
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
