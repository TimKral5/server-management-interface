const { test, expect } = require("@jest/globals");
const { SMIApi } = require("./api.js");
const api = new SMIApi("http://localhost:3005/api/v0");

// System Information
test("Get Static Info", async () => {
   await expect(api.getStaticInfo()).resolves.not.toBe(undefined);
});

test("Get Static Info with Filter 'cpu'", async () => {
   await expect(api.getStaticInfo("cpu")).resolves.not.toBe(undefined);
});

test("Get Dynamic Info", async () => {
   await expect(api.getDynamicInfo()).resolves.not.toBe(undefined);
});

test("Get Dynamic Info with Filter 'time'", async () => {
   await expect(api.getDynamicInfo("time")).resolves.not.toBe(undefined);
});

// System Configuration
test("Get all Compose Instances", async () => {
   await expect(api.getAllComposeInstances()).resolves.not.toBe(undefined);
});

test("Get 'MariaDB' Compose Instance", async () => {
   await expect(api.getAllComposeInstances()).resolves.not.toBe(undefined);
});

test("Get 'db' Container from 'MariaDB' Compose Instance", async () => {
   await expect(api.getComposeContainer("mariadb", "db")).resolves.not.toBe(undefined);
});

test("Get all Services", async () => {
   await expect(api.getAllServices()).resolves.not.toBe(undefined);
});

test("Get Service", async () => {
   const service = await api.getAllServices()[0];
   await expect(api.getService(service)).resolves.not.toBe(undefined);
});

// Backup
test("Get all Backup Configutations", async () => {
   await expect(api.getAllBackupConfigurations()).resolves.not.toBe(undefined);
});

test("Get Backup Configuration", async () => {
   const configuration = (await api.getAllBackupConfigurations())[0];
   await expect(api.getBackupConfiguration(configuration)).resolves.not.toBe(undefined);
});

test("Create Backup", async () => {
   const configuration = (await api.getAllBackupConfigurations())[0];
   await expect(api.createBackup(configuration)).resolves.not.toBe(undefined);
});