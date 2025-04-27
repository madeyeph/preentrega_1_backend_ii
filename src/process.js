import { Command } from "commander"

export const programProcess = new Command()

programProcess
    .option('--mode <mode>', 'modo de ejecución del entorno del server', 'production')
    .parse()