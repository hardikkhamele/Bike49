import fs from 'fs/promises';
import path from 'path';

const dbFilePath = path.join(process.cwd(), 'vehicles_db.json');

// Initialize the file if it doesn't exist
async function initDb() {
  try {
    await fs.access(dbFilePath);
  } catch {
    await fs.writeFile(dbFilePath, JSON.stringify([]));
  }
}

export async function getVehicles() {
  await initDb();
  const data = await fs.readFile(dbFilePath, 'utf-8');
  return JSON.parse(data);
}

export async function saveVehicles(vehicles: any[]) {
  await fs.writeFile(dbFilePath, JSON.stringify(vehicles, null, 2));
}

export async function addVehicle(vehicle: any) {
  const vehicles = await getVehicles();
  const newVehicle = { ...vehicle, _id: Date.now().toString() };
  vehicles.push(newVehicle);
  await saveVehicles(vehicles);
  return newVehicle;
}

export async function updateVehicle(id: string, updates: any) {
  const vehicles = await getVehicles();
  const index = vehicles.findIndex((v: any) => v._id === id);
  if (index !== -1) {
    vehicles[index] = { ...vehicles[index], ...updates };
    await saveVehicles(vehicles);
    return vehicles[index];
  }
  return null;
}

export async function deleteVehicle(id: string) {
  const vehicles = await getVehicles();
  const newVehicles = vehicles.filter((v: any) => v._id !== id);
  await saveVehicles(newVehicles);
}
