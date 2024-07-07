import { describe, expect, test } from "@jest/globals";
import { ComposeInfo, ComposeInfoCollection, ContainerHandler } from "./docker-container";

describe("ContainerHandler Tests", () => {
   test("Get All Compose Instances", () => {
      /** @type {ComposeInfoCollection} */
      let result;
   
      expect(
         () => result = ContainerHandler.getAllComposeInstances("containers")
      ).not.toThrowError();
      
      expect(result).toBeDefined();
      expect(result.entries.length).toBeGreaterThan(0);
   });
   
   test("Get Compose Instance", () => {
      /** @type {ComposeInfo} */
      let result;
   
      expect(
         () => result = ContainerHandler.getComposeInstance("containers", "mariadb")
      ).not.toThrowError();
      
      expect(result).toBeDefined();
      expect(result.isEmpty).toBeFalsy();
   });
});

describe("ComposeInfo Tests", () => {
   test("Existing Compose Instance", () => {
      const compose = new ComposeInfo("containers", "mariadb");
      expect(compose.isEmpty).toBeFalsy();
      expect(compose.containers).toBeDefined();
      expect(compose.export).toBeDefined();
   });

   test("Non-Existing Compose Instance", () => {
      const compose = new ComposeInfo("containers", "maria");
      expect(compose.isEmpty).toBeTruthy();
      expect(compose.containers).toBeDefined();
      expect(compose.export).toBeDefined();
   });
});

describe("ComposeInfoCollection Tests", () => {
   test("Empty Compose-Info Collection", () => {
      const collection = new ComposeInfoCollection([]);
      expect(collection.entries).toBeDefined();
      expect(collection.export).toBeDefined();
      expect(collection.find("")).toBeDefined();
      expect(collection.find("").isEmpty).toBeTruthy();
   });

   test("Populated Compose-Info Collection", () => {
      const collection = new ComposeInfoCollection([
         new ComposeInfo("containers", "mariadb")
      ]);

      expect(collection.find("mariadb").isEmpty).toBeFalsy();
      expect(collection.find("maria").isEmpty).toBeTruthy();
   });
});