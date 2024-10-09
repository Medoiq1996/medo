import React, { useState } from 'react';
import { Upload, Settings, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [codes, setCodes] = useState('');
  const [newHost, setNewHost] = useState('');
  const [newRemarks, setNewRemarks] = useState('');
  const [newTrojan, setNewTrojan] = useState('');
  const [output, setOutput] = useState('');

  const handleProcess = () => {
    const updatedUrls = codes.split('\n')
      .filter(line => line.trim() !== '')
      .map(url => updateUrl(url, newHost, newRemarks, newTrojan));
    setOutput(updatedUrls.join('\n'));
  };

  const updateUrl = (url, newHost, newRemarks, newTrojan) => {
    return url.replace(/(sni=)([^&]+)/, `$1${newHost}`).replace(/(host=)([^&]+)/, `$1${newHost}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-800 text-white">
      <header className="bg-black bg-opacity-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Shield className="h-10 w-10 text-yellow-400 mr-3" />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
              AS-TEAM
            </h1>
          </motion.div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Upload className="mr-2 h-6 w-6 text-yellow-400" /> تحميل ومعالجة الروابط
          </h2>

          <div className="space-y-4">
            <select className="w-full bg-white bg-opacity-20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300">
              <option value="">اختر مصدر الإدخال</option>
              <option value="1">إدخال يدوي</option>
              <option value="2">تحميل من ملف نصي</option>
              <option value="3">تحميل من عدة روابط</option>
            </select>

            <textarea
              placeholder="أدخل الرموز هنا... (واحد في كل سطر)"
              className="w-full h-32 bg-white bg-opacity-20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
              value={codes}
              onChange={(e) => setCodes(e.target.value)}
            />

            {['المضيف الجديد', 'الملاحظات الجديدة', 'التروجان الجديد'].map((placeholder, index) => (
              <input
                key={placeholder}
                type="text"
                placeholder={`أدخل ${placeholder}`}
                className="w-full bg-white bg-opacity-20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
                value={[newHost, newRemarks, newTrojan][index]}
                onChange={(e) => [setNewHost, setNewRemarks, setNewTrojan][index](e.target.value)}
              />
            ))}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleProcess}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl px-4 py-3 transition duration-300 flex items-center justify-center"
            >
              <Settings className="mr-2 h-5 w-5" /> معالجة الرموز
            </motion.button>
          </div>

          {output && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 bg-black bg-opacity-30 rounded-xl p-4"
            >
              <h3 className="text-lg font-semibold mb-2">النتيجة</h3>
              <pre className="text-sm overflow-x-auto whitespace-pre-wrap break-words">
                {output}
              </pre>
            </motion.div>
          )}
        </motion.div>

        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12 text-sm text-white text-opacity-80"
        >
          <p>© 2024 AS-TEAM. جميع الحقوق محفوظة.</p>
          <a href="https://t.me/Fahad1975A" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 transition duration-300">
            انضم إلى قناتنا على تيليجرام
          </a>
        </motion.footer>
      </main>
    </div>
  );
};

export default Dashboard;