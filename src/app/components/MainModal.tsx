import { motion } from "framer-motion";

interface MainModalProps {
  heading: string;
  body: string;
  show: boolean;
  onHide: () => void;
}

const MainModal: React.FC<MainModalProps> = ({ heading, body, show, onHide }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-lg w-96"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <h2 className="text-xl font-bold">{heading}</h2>
        <p className="mt-2">{body}</p>
        <button onClick={onHide} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
      </motion.div>
    </div>
  );
};

export default MainModal;
