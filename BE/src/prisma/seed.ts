import { prisma } from "./client";

async function main() {
  try {
    await prisma.threads.createMany({
      data: [
        {
          content: "Belajar backend itu seru kalau sudah paham alurnya.",
          created_by: 1,
        },
        {
          content: "Hari ini coba setup auth pakai JWT di Express.",
          created_by: 1,
        },
        {
          content: "Tailwind ternyata bikin styling jauh lebih cepat.",
          created_by: 1,
        },
        {
          content: "Ngurus VPS sendiri bikin lebih paham server.",
          created_by: 1,
        },
        {
          content: "WordPress masih relevan buat banyak use case.",
          created_by: 1,
        },
        {
          content: "Docker vs native setup, dua-duanya ada plus minus.",
          created_by: 1,
        },
        {
          content: "React Router bikin navigasi aplikasi lebih rapi.",
          created_by: 1,
        },
        {
          content: "Redux cocok untuk state global yang kompleks.",
          created_by: 1,
        },
        {
          content: "Cloudflare Tunnel mempermudah expose service lokal.",
          created_by: 1,
        },
        {
          content: "Belajar database itu penting buat scaling aplikasi.",
          created_by: 1,
        },
        {
          content: "Membangun sistem auth dari nol itu menantang.",
          created_by: 1,
        },
        {
          content: "UI simpel tapi fungsional itu lebih disukai.",
          created_by: 1,
        },
        {
          content: "Clean code bikin project lebih mudah dirawat.",
          created_by: 1,
        },
        { content: "Deploy pertama selalu paling deg-degan.", created_by: 1 },
        { content: "Pelan-pelan tapi konsisten lebih baik.", created_by: 1 },
      ],
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
