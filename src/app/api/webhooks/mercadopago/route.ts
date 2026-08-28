import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const topic = searchParams.get('topic') || searchParams.get('type');
    const paymentId = searchParams.get('data.id') || searchParams.get('id');

    console.log(`[MercadoPago Webhook Received] Topic: ${topic}, ID: ${paymentId}`);

    // Aquí se actualizaría el estado de la reserva en Supabase mediante el SDK del servidor
    // Por ejemplo: UPDATE bookings SET status = 'confirmed' WHERE booking_code = external_reference

    return NextResponse.json({ received: true, status: 'processed' }, { status: 200 });
  } catch (error: any) {
    console.error('Error processing MercadoPago webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
