import { useCallback, useState } from 'react';
import { initFedaPayPayment, verifyFedaPayPayment, simulatePayment, type FedaPayTransactionResponse } from '../utils/fedapi';
import type { Payment } from '../types/generator';

const PAYMENT_AMOUNT = 500000;
const PAYMENT_CURRENCY = 'XOF' as const;

const EMPTY_PAYMENT: Payment = {
  status: 'none',
  amount: PAYMENT_AMOUNT,
  currency: PAYMENT_CURRENCY,
};

export function usePayment() {
  const [payment, setPayment] = useState<Payment>(EMPTY_PAYMENT);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startPayment = useCallback(async (metadata: Record<string, string>) => {
    setIsProcessing(true);
    setError(null);
    setPayment((prev) => ({ ...prev, status: 'processing' }));

    const description = `Publication site web - ${metadata.site_title || 'Site généré'}`;

    try {
      const result = await initFedaPayPayment(PAYMENT_AMOUNT, PAYMENT_CURRENCY, description, metadata);
      
      if (!result.success || !result.checkoutUrl || !result.transactionId) {
        setPayment((prev) => ({ ...prev, status: 'failed' }));
        setError(result.error || 'Échec de l\'initialisation du paiement FedaPay');
        setIsProcessing(false);
        return { success: false, error: result.error };
      }

      setPayment((prev) => ({
        ...prev,
        status: 'pending',
        transactionId: result.transactionId,
        paymentUrl: result.checkoutUrl,
      }));

      setIsProcessing(false);
      return { success: true, paymentUrl: result.checkoutUrl, transactionId: result.transactionId };
    } catch (e) {
      setPayment((prev) => ({ ...prev, status: 'failed' }));
      const errorMsg = e instanceof Error ? e.message : 'Erreur lors de l\'initialisation du paiement';
      setError(errorMsg);
      setIsProcessing(false);
      return { success: false, error: errorMsg };
    }
  }, []);

  const checkPaymentStatus = useCallback(async (transactionId: string) => {
    setPayment((prev) => ({ ...prev, status: 'processing' }));

    try {
      const result = await verifyFedaPayPayment(transactionId);

      if (result.success && result.status === 'approved') {
        setPayment((prev) => ({ ...prev, status: 'paid' }));
        return { success: true };
      }

      setPayment((prev) => ({ ...prev, status: 'failed' }));
      setError(result.error || 'Paiement échoué ou en attente');
      return { success: false, error: result.error };
    } catch (e) {
      setPayment((prev) => ({ ...prev, status: 'failed' }));
      const errorMsg = e instanceof Error ? e.message : 'Erreur de vérification du paiement';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  }, []);

  const resetPayment = useCallback(() => {
    setPayment(EMPTY_PAYMENT);
    setError(null);
    setIsProcessing(false);
  }, []);

  const formatAmount = useCallback((amount: number, currency: string) => {
    if (currency === 'XOF') {
      return `${(amount / 100).toLocaleString('fr-FR')} FCFA`;
    }
    return `${(amount / 100).toFixed(2)} ${currency}`;
  }, []);

  return {
    payment,
    isProcessing,
    error,
    startPayment,
    checkPaymentStatus,
    resetPayment,
    formatAmount,
    PAYMENT_AMOUNT,
    PAYMENT_CURRENCY,
  };
}