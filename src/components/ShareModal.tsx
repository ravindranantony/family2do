import React from 'react';
import { XIcon, CopyIcon, MailIcon, Share2Icon, MessageSquareIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const appUrl = 'https://familytodo.vercel.app';

  const formatTodoMessage = () => {
    return `🎯 Family Todo List\n\nI've shared our family todo list with you! You can view and collaborate on it here:\n\n${appUrl}\n\n✨ Click the link above to start organizing together!`;
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent('Join Our Family Todo List!');
    const body = encodeURIComponent(formatTodoMessage());
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(formatTodoMessage());
    window.open(`https://wa.me/?text=${text}`);
  };

  const shareViaSMS = () => {
    const text = encodeURIComponent(formatTodoMessage());
    window.open(`sms:?&body=${text}`);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formatTodoMessage());
      toast.success('Message copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy message');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Share2Icon className="w-6 h-6 text-blue-500" />
            Share Todo List
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <XIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg mb-6">
            <h3 className="font-medium text-gray-700 mb-2">Preview Message:</h3>
            <p className="text-gray-600 whitespace-pre-line">{formatTodoMessage()}</p>
          </div>

          <div className="grid gap-3">
            <button
              onClick={shareViaEmail}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <MailIcon className="w-5 h-5" />
              Share via Email
            </button>

            <button
              onClick={shareViaWhatsApp}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              <MessageSquareIcon className="w-5 h-5" />
              Share via WhatsApp
            </button>

            <button
              onClick={shareViaSMS}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              <MessageSquareIcon className="w-5 h-5" />
              Share via SMS
            </button>

            <button
              onClick={copyToClipboard}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <CopyIcon className="w-5 h-5" />
              Copy to Clipboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};