import type { Message } from "discord.js";
import { prefix } from "../config";
import { exec_cmd } from "../commands";

export async function handleMessageCreate(message: Message): Promise<void> {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift();
    
    if (!cmd) return; 
    
    return await exec_cmd(cmd, args, message);
}

