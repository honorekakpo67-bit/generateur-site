import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, CreditCardIcon, Loader2Icon, ShieldIcon, XIcon } from 'lucide-react';
import { usePayment } from '../hooks/usePayment';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (transactionId: string) => void;
  siteTitle: string;
  siteKind: string;
}

export function PaymentModal({ isOpen, onClose, onSuccess, siteTitle, siteKind }: PaymentModalProps) {
  const {
    payment,
    isProcessing,
    error,
    startPayment,
    checkPaymentStatus,
    resetPayment,
    formatAmount,
  } = usePayment();

  const [step, setStep] = useState<'init' | 'redirect' | 'verifying' | 'success'>('init');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      resetPayment();
      setStep('init');
      return;
    }
    setStep('init');
  }, [isOpen, resetPayment]);

  useEffect(() => {
    if (step === 'redirect' && payment.paymentUrl) {
      window.open(payment.paymentUrl, '_blank', 'noopener,noreferrer');
      setStep('verifying');
      if (payment.transactionId) {
        startVerification(payment.transactionId);
      }
    }
  }, [step, payment.paymentUrl, payment.transactionId, startVerification]);

  const startVerification = useCallback(async (transactionId: string) => {
    const interval = setInterval(async () => {
      const result = await checkPaymentStatus(transactionId);
      if (result.success) {
        clearInterval(interval);
        setStep('success');
        onSuccess(transactionId);
      }
    }, 3000);

    let seconds = 300;
    const countdownInterval = setInterval(() => {
      seconds -= 3;
      setCountdown(seconds);
      if (seconds <= 0) clearInterval(countdownInterval);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(countdownInterval);
    };
  }, [checkPaymentStatus, onSuccess]);

  const handleStartPayment = async () => {
    const metadata = {
      site_title: siteTitle,
      site_kind: siteKind,
      timestamp: Date.now().toString(),
    };
    const result = await startPayment(metadata);
    if (result.success) {
      setStep('redirect');
    }
  };

  const benefits = [
    { icon: ShieldIcon, title: 'Site multi-pages professionnel', desc: '5+ pages (Accueil, Services, À propos, Tarifs, Contact...)' },
    { icon: CreditCardIcon, title: 'Hébergement inclus', desc: 'Pas de frais mensuels, le site vit dans le lien de partage' },
    { icon: CheckIcon, title: 'Design système cohérent', desc: 'Typographie, couleurs, composants adaptés à votre métier' },
    { icon: CreditCardIcon, title: 'Responsive mobile/desktop', desc: 'Optimisé pour tous les écrans, navigation fluide' },
    { icon: ShieldIcon, title: 'Déploiement instantané', desc: 'En ligne en quelques secondes après paiement' },
    { icon: CheckIcon, title: 'Code source téléchargeable', desc: 'Récupérez le HTML complet pour héberger où vous voulez' },
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-line">
          <h2 id="payment-title" className="text-[18px] font-semibold text-ink">
            Paiement sécurisé — {formatAmount(PAYMENT_AMOUNT, PAYMENT_CURRENCY)}
          </h2>
          <button
            onClick={onClose}
            disabled={step === 'verifying' || step === 'success' || isProcessing}
            className="p-1 rounded-lg text-inkMuted hover:bg-elevated hover:text-ink transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Fermer"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {step === 'init' && (
            <>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-4">
                  <CreditCardIcon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-[20px] font-bold text-ink">Publier « {siteTitle} »</h3>
                <p className="mt-2 text-inkMuted">Site {siteKind} · {benefits.length} avantages inclus</p>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-surface border border-line">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <b.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-ink">{b.title}</p>
                      <p className="text-sm text-inkMuted">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                  <AlertCircleIcon className="h-4 w-4" />
                  {error}
                </div>
              )}

              <button
                onClick={handleStartPayment}
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-accent text-white font-semibold text-[16px] flex items-center justify-center gap-2 transition-colors hover:bg-accentDim disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2Icon className="h-5 w-5 animate-spin" />
                    Initialisation...
                  </>
                ) : (
                  <>
                    <CreditCardIcon className="h-5 w-5" />
                    Payer {formatAmount(PAYMENT_AMOUNT, PAYMENT_CURRENCY)} via FedaPay
                  </>
                )}
              </button>

              <p className="text-center text-xs text-inkFaint">
                Paiement sécurisé par FedaPay · Aucune donnée bancaire stockée
              </p>
            </>
          )}

          {step === 'redirect' && (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-info/10">
                <Loader2Icon className="h-8 w-8 text-info animate-spin" />
              </div>
              <h3 className="text-[18px] font-semibold text-ink">Redirection vers FedaPay</h3>
              <p className="text-inkMuted">Une nouvelle fenêtre s'est ouverte pour finaliser le paiement.</p>
              <p className="text-sm text-inkFaint">Revenez ici une fois le paiement terminé. Vérification automatique dans {countdown}s...</p>
              <button
                onClick={() => setStep('init')}
                className="text-accent font-medium hover:underline"
              >
                Revenir au début
              </button>
            </div>
          )}

          {step === 'verifying' && (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-info/10">
                <Loader2Icon className="h-8 w-8 text-info animate-spin" />
              </div>
              <h3 className="text-[18px] font-semibold text-ink">Vérification du paiement</h3>
              <p className="text-inkMuted">Nous confirmons votre transaction auprès de FedaPay...</p>
              <p className="text-sm text-inkFaint">Tentative dans {countdown}s</p>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10"
              >
                <CheckIcon className="h-8 w-8 text-accent" />
              </motion.div>
              <h3 className="text-[20px] font-bold text-ink">Paiement confirmé !</h3>
              <p className="text-inkMuted">Votre site « {siteTitle} » va être publié.</p>
              <div className="p-3 rounded-lg bg-accent/5 border border-accent/20 text-sm text-accent font-medium">
                Transaction : {payment.transactionId}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function AlertCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

const PAYMENT_AMOUNT = 500000;
const PAYMENT_CURRENCY = 'XOF' as const;