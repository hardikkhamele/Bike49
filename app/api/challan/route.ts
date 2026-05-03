// Mock API handler for challan verification
export async function POST(request: Request) {
  try {
    const { challanNo, vehicleNo, dlNo } = await request.json();

    // Simple validation
    if (!challanNo || !vehicleNo || !dlNo) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Mock API response: simulate verification
    const isValid = Math.random() > 0.1; // 90% success rate for demo
    const fineAmount = Math.floor(Math.random() * (5000 - 500)) + 500;

    if (isValid) {
      return Response.json(
        {
          success: true,
          message: "Challan verified successfully",
          challanNo,
          vehicleNo,
          fineAmount,
          penaltyName: "Traffic Violation",
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        },
        { status: 200 }
      );
    } else {
      return Response.json(
        { success: false, message: "Challan not found. Please verify the details." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
