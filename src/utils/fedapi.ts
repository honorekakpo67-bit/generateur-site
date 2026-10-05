export interface FedaPayConfig {
  baseUrl: string;
  apiKey: string;
  publicKey: string;
  callbackUrl: string;
  successUrl: string;
  cancelUrl: string;
}

export interface FedaPayTransactionResponse {
  success: boolean;
  transactionId?: string;
  token?: string;
  checkoutUrl?: string;
  error?: string;
}

export interface FedaPayVerifyResponse {
  success: boolean;
  status: 'approved' | 'pending' | 'declined' | 'cancelled';
  transactionId: string;
  error?: string;
}

const DEFAULT_CONFIG: FedaPayConfig = {
  baseUrl: import.meta.env.VITE_FEDAPAY_BASE_URL || 'https://sandbox-api.fedapay.com/v1',
  apiKey: import.meta.env.VITE_FEDAPAY_API_KEY || 'sk_sandbox_VT6I8V0RnNZSV_SEujyRecTY',
  publicKey: import.meta.env.VITE_FEDAPAY_PUBLIC_KEY || 'pk_sandbox_SSQ64NsbdCp5aqrXbkCWiFBK',
  callbackUrl: import.meta.env.VITE_FEDAPAY_CALLBACK_URL || 'http://localhost:8000/api/callbacks/fedapay',
  successUrl: import.meta.env.VITE_FRONTEND_SUCCESS_URL || `${window.location.origin}/#payment-success`,
  cancelUrl: import.meta.env.VITE_FRONTEND_CANCEL_URL || `${window.location.origin}/#payment-cancel`,
};

export function getFedaPayConfig(): FedaPayConfig {
  return DEFAULT_CONFIG;
}

export async function initFedaPayPayment(
  amount: number,
  currency: 'XOF',
  description: string,
  metadata: Record<string, string>,
  config: FedaPayConfig = getFedaPayConfig()
): Promise<FedaPayTransactionResponse> {
  try {
    const response = await fetch(`${config.baseUrl}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        amount,
        currency,
        description,
        callback_url: config.callbackUrl,
        return_url: config.successUrl,
        cancel_url: config.cancelUrl,
        metadata,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('FedaPay init error:', data);
      return { 
        success: false, 
        error: data.message || data.error || 'Erreur lors de l\'initialisation du paiement FedaPay' 
      };
    }

    const transaction = data.transaction || data;
    const token = transaction.token || transaction.id;
    const checkoutUrl = `https://sandbox.fedapay.com/checkout/${token}`;

    return {
      success: true,
      transactionId: transaction.id?.toString() || token,
      token,
      checkoutUrl,
    };
  } catch (error) {
    console.error('FedaPay initPayment error:', error);
    return { success: false, error: 'Erreur de connexion au service de paiement FedaPay' };
  }
}

export async function verifyFedaPayPayment(
  transactionId: string,
  config: FedaPayConfig = getFedaPayConfig()
): Promise<FedaPayVerifyResponse> {
  try {
    const response = await fetch(`${config.baseUrl}/transactions/${transactionId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('FedaPay verify error:', data);
      return { 
        success: false, 
        status: 'declined', 
        transactionId, 
        error: data.message || data.error || 'Erreur de vérification FedaPay' 
      };
    }

    const transaction = data.transaction || data;
    const statusMap: Record<string, 'approved' | 'pending' | 'declined' | 'cancelled'> = {
      'approved': 'approved',
      'pending': 'pending',
      'declined': 'declined',
      'cancelled': 'cancelled',
      'canceled': 'cancelled',
    };

    return {
      success: true,
      status: statusMap[transaction.status] || 'pending',
      transactionId: transaction.id?.toString() || transactionId,
    };
  } catch (error) {
    console.error('FedaPay verifyPayment error:', error);
    return { success: false, status: 'declined', transactionId, error: 'Erreur de connexion à FedaPay' };
  }
}

export async function simulatePayment(
  amount: number,
  _currency: 'XOF',
  _metadata: Record<string, string>
): Promise<FedaPayTransactionResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const transactionId = `test_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

  return {
    success: true,
    transactionId,
    token: transactionId,
    checkoutUrl: `${window.location.origin}/#test-payment?tid=${transactionId}&amount=${amount}`,
  };
}