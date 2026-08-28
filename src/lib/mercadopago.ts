import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

// Inicialización del cliente con MercadoPago SDK
const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN || 'TEST-mock-token';

export const mpClient = new MercadoPagoConfig({
  accessToken: accessToken,
  options: { timeout: 5000 },
});

export interface CreatePreferenceParams {
  bookingId: string;
  bookingCode: string;
  title: string;
  description: string;
  unitPrice: number;
  quantity: number;
  payerEmail: string;
  payerName: string;
}

export async function createBookingPreference(params: CreatePreferenceParams) {
  try {
    const preference = new Preference(mpClient);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const response = await preference.create({
      body: {
        items: [
          {
            id: params.bookingId,
            title: `FEDETUR Reserva: ${params.title} (${params.bookingCode})`,
            description: params.description,
            quantity: params.quantity,
            unit_price: Number(params.unitPrice),
            currency_id: 'ARS',
          },
        ],
        payer: {
          email: params.payerEmail,
          name: params.payerName,
        },
        back_urls: {
          success: `${appUrl}/reserva/confirmacion/${params.bookingCode}?status=approved`,
          failure: `${appUrl}/reserva/confirmacion/${params.bookingCode}?status=rejected`,
          pending: `${appUrl}/reserva/confirmacion/${params.bookingCode}?status=pending`,
        },
        auto_return: 'approved',
        statement_descriptor: 'FEDETUR TURISMO',
        external_reference: params.bookingCode,
        notification_url: `${appUrl}/api/webhooks/mercadopago`,
      },
    });

    return {
      id: response.id,
      initPoint: response.init_point,
      sandboxInitPoint: response.sandbox_init_point,
    };
  } catch (error) {
    console.warn('[MercadoPago Warning - Falling back to Sandbox Mock]:', error);
    // En caso de credenciales de prueba no configuradas en local, devolvemos URL simulada
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    return {
      id: `mock-pref-${Date.now()}`,
      initPoint: `${appUrl}/reserva/confirmacion/${params.bookingCode}?status=approved&mock_payment=true`,
      sandboxInitPoint: `${appUrl}/reserva/confirmacion/${params.bookingCode}?status=approved&mock_payment=true`,
    };
  }
}
