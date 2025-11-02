import { motion } from "framer-motion";

const PHONE_NUMBER = "905313345111";
const DEFAULT_MESSAGE = encodeURIComponent(
  " تواصل معنا  "
);
const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}?text=${DEFAULT_MESSAGE}`;

const FloatingWhatsAppButton = () => {
  return (
  <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="تواصل عبر واتساب"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 1 }}
  className="group fixed bottom-4 right-4 z-50 inline-flex h-12 items-center gap-2.5 rounded-full bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 px-4 text-white shadow-[0_18px_45px_-15px_rgba(16,185,129,0.8)] transition-all duration-300 hover:shadow-[0_20px_55px_-18px_rgba(16,185,129,0.95)] md:bottom-6 md:right-8 md:h-14 md:gap-3 md:px-5"
    >
      <span className="relative inline-flex h-full items-center gap-3">
        <span
          aria-hidden="true"
          className="absolute -inset-1 rounded-full bg-emerald-400/0 blur-xl transition-opacity duration-300 group-hover:bg-emerald-400/30"
        ></span>
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm md:h-10 md:w-10">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-white"
        >
          <path d="M12.02 2.007c-5.495 0-9.953 4.39-9.953 9.806 0 1.728.463 3.417 1.34 4.911L2 22l5.418-1.326c1.428.78 3.039 1.192 4.602 1.192 5.495 0 9.953-4.39 9.953-9.807S17.516 2.007 12.02 2.007Zm0 17.716c-1.356 0-2.687-.36-3.86-1.042l-.277-.162-3.213.786.857-3.091-.18-.317a7.8 7.8 0 0 1-1.14-4.08c0-4.261 3.537-7.727 7.813-7.727 4.275 0 7.812 3.466 7.812 7.727 0 4.262-3.537 7.906-7.812 7.906Zm4.29-5.852c-.235-.118-1.386-.685-1.6-.762-.214-.078-.37-.118-.525.118-.157.236-.602.762-.739.92-.136.157-.271.177-.506.059-.235-.118-.992-.365-1.89-1.162-.698-.598-1.17-1.338-1.306-1.574-.136-.236-.015-.364.102-.482.104-.103.235-.266.353-.398.118-.132.157-.236.235-.392.078-.157.039-.295-.02-.413-.059-.118-.525-1.263-.72-1.728-.19-.454-.382-.392-.525-.4-.136-.007-.295-.009-.454-.009-.157 0-.413.059-.63.295-.214.236-.83.812-.83 1.979 0 1.166.851 2.292.97 2.45.118.157 1.67 2.614 4.05 3.577.566.233 1.008.372 1.352.477.568.181 1.086.155 1.495.094.455-.068 1.386-.566 1.583-1.112.196-.546.196-1.014.138-1.112-.059-.098-.214-.157-.45-.275Z" />
        </svg>
        </span>
        <span className="relative hidden text-sm font-semibold tracking-wide md:block">
        تواصل
        </span>
      </span>
    </motion.a>
  );
};

export default FloatingWhatsAppButton;
