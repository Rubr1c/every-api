import {
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ComponentType,
  type Message,
} from "discord.js";
import {
  createNote,
  deleteUserNote,
  getNoteByTitle,
  getUserNoteCount,
  getUserNotes,
} from "@/lib/note";
import { getUserByDiscordId } from "@/lib/user/user";
import { AppError } from "@/lib/error";

export interface NoteParams {
  t?: string[];
  c?: string[];
  [flag: string]: string[] | undefined;
}

export async function newNote(
  title: string,
  content: string,
  message: Message,
): Promise<void> {
  if (title.trim() === "") {
    message.reply("title can not be empty");
    return;
  }

  if (content.trim() === "") {
    message.reply("content can not be empty");
    return;
  }

  const { id } = await getUserByDiscordId(BigInt(message.author.id));
  try {
    await createNote({
      userId: id,
      title,
      content,
    });
    await message.reply("Created new note!");
  } catch (err) {
    if (err instanceof AppError) {
      await message.reply(`[${err.statusCode}] ${err.message}`);
    } else {
      await message.reply(`Error creating note`);
    }
  }
}

export async function getNote(title: string, message: Message): Promise<void> {
  const { id } = await getUserByDiscordId(BigInt(message.author.id));
  if (id === null) {
    await message.reply(`User not found`);
    return;
  }
  try {
    const note = await getNoteByTitle(id, title);
    const embed = new EmbedBuilder()
      .setTitle(note?.title ?? "")
      .setDescription(note?.content.replace("\\n", "\n") ?? "");
    await message.reply({ embeds: [embed] });
  } catch (err) {
    if (err instanceof AppError) {
      await message.reply(`[${err.statusCode}] ${err.message}`);
    } else {
      await message.reply(`Error fetching note`);
    }
  }
}

export async function deleteNote(
  title: string,
  message: Message,
): Promise<void> {
  const { id } = await getUserByDiscordId(BigInt(message.author.id));
  try {
    await deleteUserNote(id, title);
    await message.reply("Note deleted!");
  } catch (err) {
    if (err instanceof AppError) {
      await message.reply(`[${err.statusCode}] ${err.message}`);
    } else {
      await message.reply(`Error deleting note`);
    }
  }
}

export async function getNotesSum(message: Message) {
  const { id } = await getUserByDiscordId(BigInt(message.author.id));
  const maxPage = Math.ceil((await getUserNoteCount(id)) / 10);
  let page = 1;

  async function buildEmbed(page: number) {
    const notes = await getUserNotes(id, page, 10);
    const embed = new EmbedBuilder()
      .setTitle(`Your Notes (Page ${page}/${maxPage})`)
      .setColor("Blurple");

    for (const note of notes) {
      embed.addFields({
        name: note.title,
        value:
          note.content.length > 20
            ? note.content.slice(0, 20) + "…"
            : note.content,
      });
    }
    return embed;
  }

  function buildRow(page: number) {
    return new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("prev")
        .setLabel("◀️ Previous")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(page === 1),
      new ButtonBuilder()
        .setCustomId("next")
        .setLabel("Next ▶️")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(page === maxPage),
    );
  }

  const embed = await message.reply({
    embeds: [await buildEmbed(page)],
    components: [buildRow(page)],
  });

  const collector = embed.createMessageComponentCollector({
    componentType: ComponentType.Button,
    time: 120_000,
    filter: (btnInt) => btnInt.user.id === message.author.id,
  });

  collector.on("collect", async (btnInt) => {
    await btnInt.deferUpdate();

    if (btnInt.customId === "prev" && page > 1) {
      page--;
    } else if (btnInt.customId === "next" && page < maxPage) {
      page++;
    }

    await btnInt.editReply({
      embeds: [await buildEmbed(page)],
      components: [buildRow(page)],
    });
  });

  collector.on("end", async () => {
    const disabledRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      buildRow(page).components.map((btn) => btn.setDisabled(true)),
    );
    await embed.edit({ components: [disabledRow] });
  });
}
