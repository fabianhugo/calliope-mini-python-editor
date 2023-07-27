/**
 * (c) 2021, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
import { isMigration, parseMigrationFromUrl } from "./migration";

// The heart project.
export const testMigrationUrl =
  // origin needs to match jest's testUrl
  "http://localhost/#import:#project:XQAAQAC5AAAAAAAAAAA9goAXHC4MqgeNHgoIMpsTCWf7Uey9qBfvYDRDhV58HgPWnVk17lpHQ7c4ONTtuHEl1qEq2ZMWi8WcCqCLtyiRuaSVeT8JYXrNwU0FGB/FzyKsCUHFukWNfqjhGUtC6tr40TXTrMxbZMa4uHAk3g2yAPoEUBVOzWOtbBPU7/MGN57oFvJCdjbgvwc3MX7/+EP0AA==";

describe("parseMigrationFromUrl", () => {
  it("parses valid URL", () => {
    const migration = parseMigrationFromUrl(testMigrationUrl);
    expect(migration).toEqual({
      migration: {
        meta: {
          cloudId: "calliope.cc",
          comment: "",
          editor: "python",
          name: "Hearts",
        },
        source: `from calliopemini import *\r\ndisplay.show(Image.HEART)`,
      },
      postMigrationUrl: "http://localhost/",
    });
  });
  it("undefined for nonsense", () => {
    const migration = parseMigrationFromUrl(
      "https://python.microbit.org/v/2#import:#project:=XQAAgACRAAAAAAAAAAA9iImmlGSt1R="
    );
    expect(migration).toEqual(undefined);
  });
  it("undefined for no project on URL", () => {
    const migration = parseMigrationFromUrl(
      "https://python.microbit.org/v/2#import:#notAProject:XQAAgACRAAAAAAAAAAA9iImmlGSt1R++5LD+ZJ36cRz46B+lhYtNRoWF0nijpaVyZlK7ACfSpeoQpgfk21st4ty06R4PEOM4sSAXBT95G3en+tghrYmE+YJp6EiYgzA9ThKkyShWq2UdvmCzqxoNfYc1wlmTqlNv/Piaz3WoSe3flvr/ItyLl0aolQlEpv4LA8A="
    );
    expect(migration).toEqual(undefined);
  });
  it("isMigration checks fields", () => {
    expect(isMigration({})).toEqual(false);
    expect(isMigration({ meta: { name: "foo" } })).toEqual(false);
    expect(isMigration({ meta: {}, source: "" })).toEqual(false);
    expect(isMigration({ meta: { name: "foo" }, source: "" })).toEqual(true);
  });
});
