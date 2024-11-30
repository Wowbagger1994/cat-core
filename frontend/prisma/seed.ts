import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// List of documents
	const documents = [
		{ name: "Passaporto valido" },
		{ name: "Visto turistico per l’Italia" },
		{ name: "Visto per lavoro autonomo" },
		{ name: "Visto per lavoro subordinato" },
		{ name: "Visto per nomadi digitali" },
		{ name: "Permesso di soggiorno per studio" },
		{ name: "Permesso di soggiorno temporaneo" },
	];

	// Seed Documents
	for (const doc of documents) {
		await prisma.documents.create({
			data: doc,
		});
	}

	console.log("Seeded Documents!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
