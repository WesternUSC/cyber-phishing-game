
import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export const revalidate = 1800;

const SOURCE_URL =
  "https://www.uwo.ca/fm/notices/campus-road-closures.html";

export async function GET() {
  try {
    const response = await fetch(SOURCE_URL, {
      next: { revalidate: 1800 },
      headers: {
        "User-Agent": "USC-Road-Closures-Viewer",
      },
    });

    if (!response.ok) {
      throw new Error(`Western website returned ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const heading = $("h2").filter((_, element) => {
      return $(element).text().trim() === "Campus Road Closures";
    }).first();

    if (!heading.length) {
      throw new Error("Campus Road Closures section was not found.");
    }

    const closures: {
      title: string;
      description: string;
    }[] = [];

    let current = heading.next();

    while (current.length && !current.is("h2")) {
      if (current.is("h3")) {
        const title = current.text().trim();
        const descriptions: string[] = [];

        let sibling = current.next();

        while (
          sibling.length &&
          !sibling.is("h2, h3")
        ) {
          const text = sibling.text().trim();

          if (text) {
            descriptions.push(text);
          }

          sibling = sibling.next();
        }

        if (title) {
          closures.push({
            title,
            description: descriptions.join(" "),
          });
        }

        current = sibling;
      } else {
        current = current.next();
      }
    }

    return NextResponse.json({
      closures,
      source: SOURCE_URL,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to fetch campus road closures:", error);

    return NextResponse.json(
      { error: "Unable to load road closures right now." },
      { status: 502 }
    );
  }
}
