import { NextResponse } from 'next/server';
import { getVehicles, addVehicle } from '@/lib/jsonDb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let vehicles = await getVehicles();
    
    if (status) {
      vehicles = vehicles.filter((v: any) => v.status === status);
    }

    // Sort by newest first
    vehicles.reverse();
    return NextResponse.json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return NextResponse.json({ error: 'Failed to fetch vehicles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    let imageUrl = data.image;
    if (imageUrl && imageUrl.startsWith('data:image')) {
      const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, 'base64');
      const filename = `vehicle_${Date.now()}.jpg`;
      const fs = require('fs');
      const path = require('path');
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      fs.writeFileSync(path.join(uploadDir, filename), buffer);
      imageUrl = `/uploads/${filename}`;
    }

    const newVehicle = await addVehicle({
      ...data,
      image: imageUrl || "https://placehold.co/800x600/051b3d/ef6a22?text=No+Image",
      status: data.status || 'pending',
      createdAt: new Date().toISOString()
    });

    return NextResponse.json(newVehicle, { status: 201 });
  } catch (error) {
    console.error('Error creating vehicle:', error);
    return NextResponse.json({ error: 'Failed to submit vehicle' }, { status: 500 });
  }
}
