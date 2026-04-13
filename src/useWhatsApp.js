const WA = 'https://wa.me/916370056989';

export default function useWhatsApp() {
  const open = (message = '') => {
    const text = message ? `?text=${encodeURIComponent(message)}` : '';
    window.open(`${WA}${text}`, '_blank');
  };
  return { open };
}
