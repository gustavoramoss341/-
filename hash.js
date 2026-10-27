import { createHash } from "node:crypto";
import { mkdirSync } from "node:fs";

const FRASE = "Não dá pra congelar, mas dá pra reviver, de novo e de novo e de novo... daqui pra frente.";

const hash = createHash("sha256").update(FRASE).digest("hex");

mkdirSync(`site/${hash}`, { recursive: true });

console.log("Dica pública (10 primeiros):", hash.slice(0, 10));
console.log("Pasta criada: site/" + hash);