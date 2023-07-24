/**
 * (c) 2021, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
import { IntelHexWithId } from "@microbit/microbit-fs";
import { microbitBoardId } from "@microbit/microbit-universal-hex";
import microPythonV1HexUrl from "./microbit-micropython-v1.hex";
import microPythonCalliopeHexUrl from "./main/microPython_CalliopeminiV3.hex";

const v3Calliope = {
  name: "MicroPython (Calliope mini V3)",
  url: microPythonCalliopeHexUrl,
  boardId: microbitBoardId.V2,
  version: "2.1.1",
  web: "https://github.com/calliope-edu/micropython-microbit-v2/tree/mini2.1.1renaming",
};

export const microPythonConfig = {
  versions: [
    {
      name: "MicroPython (micro:bit V1)",
      url: microPythonV1HexUrl,
      boardId: microbitBoardId.V1,
      version: "1.1.1",
      web: "https://github.com/bbcmicrobit/micropython/releases/tag/v1.1.1",
    },
    v3Calliope,
  ],
  // We've previously used this field to allow flags to affect
  // the stubs used and might do so again.
  stubs: "main",
};

const fetchValidText = async (input: RequestInfo) => {
  const response = await fetch(input);
  if (response.status !== 200) {
    throw new Error(
      `Unexpected status: ${response.statusText} ${response.status}`
    );
  }
  return response.text();
};

export type MicroPythonSource = () => Promise<IntelHexWithId[]>;

export const fetchMicroPython: MicroPythonSource = async () =>
  Promise.all(
    microPythonConfig.versions.map(async ({ boardId, url }) => {
      const hex = await fetchValidText(url);
      return { boardId, hex };
    })
  );
