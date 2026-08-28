import { NextRequest, NextResponse } from 'next/server';
import { createBookingPreference } from '@/lib/mercadopago';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      bookingId,
      bookingCode,
      hotelName,
      roomName,
      totalAmount,
      nights,
      payerEmail,
      payerName,
    } = body;

    if (!bookingCode || !totalAmount || !payerEmail) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos para la reserva' },
        { status: 400 }
      );
    }

    const preference = await createBookingPreference({
      bookingId: bookingId || `bk-${Date.now()}`,
      bookingCode: bookingCode,
      title: `${hotelName} - ${roomName}`,
      description: `Estadía por ${nights} noche(s) con Tarifa Afiliado FEDETUR`,
      unitPrice: Number(totalAmount),
      quantity: 1,
      payerEmail: payerEmail,
      payerName: payerName || 'Afiliado FEDETUR',
    });

    return NextResponse.json({
      preferenceId: preference.id,
      initPoint: preference.initPoint,
      sandboxInitPoint: preference.sandboxInitPoint,
    });
  } catch (error: any) {
    console.error('Error creating MercadoPago preference:', error);
    return NextResponse.json(
      { error: 'Error al procesar la pasarela de pago MercadoPago' },
      { status: 500 }
    );
  }
}
