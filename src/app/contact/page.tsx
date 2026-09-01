'use client';

import { useState } from 'react';
import { Instagram, Facebook, MessageCircle, Loader2, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const setF = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.trim() || !form.message.trim()) {
      setErrorMsg('Please fill in your email and message.');
      setStatus('error');
      return;
    }
    setStatus('sending');
    setErrorMsg('');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus('sent');
      setForm({ firstName: '', lastName: '', email: '', message: '' });
    } else {
      const json = await res.json().catch(() => ({}));
      setErrorMsg(json.error ?? 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const inputCls = 'w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-neutral-900 transition-colors bg-transparent font-inter text-sm';

  return (
    <div className="bg-neutral-50 min-h-screen pb-24">
      <div className="pt-12 px-6 md:px-12 max-w-7xl mx-auto">
        <h1 className="font-oswald text-5xl md:text-7xl uppercase mb-16">Ways to find us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

          {/* INFO */}
          <div className="space-y-12">
            <div>
              <h3 className="font-oswald text-2xl uppercase mb-4">Visit Us</h3>
              <p className="font-inter font-light text-neutral-600 leading-relaxed">
                Odisseos 14<br/>
                Athens 104 37, Greece
              </p>
              <a href="https://maps.google.com/?q=Odisseos+14,+Athens+104+37,+Greece" target="_blank" rel="noopener noreferrer" className="font-inter text-sm border-b border-neutral-900 pb-0.5 mt-2 inline-block">Get Directions</a>
            </div>

            <div>
              <h3 className="font-oswald text-2xl uppercase mb-4">Talk to Us</h3>
              <p className="font-inter font-light text-neutral-600 leading-relaxed">
                <a href="mailto:info@entertheblender.gr" className="hover:text-neutral-900 transition-colors">
                  info@entertheblender.gr
                </a>
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span className="font-inter font-light text-neutral-600">+30 210 522 3954</span>
                <a
                  href="https://wa.me/302105223954"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:opacity-70 transition-opacity"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={20} strokeWidth={2.5} />
                </a>
                <a
                  href="viber://chat?number=%2B302105223954"
                  className="text-purple-500 hover:opacity-70 transition-opacity"
                  aria-label="Viber"
                >
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-oswald text-2xl uppercase mb-4">Follow</h3>
              <div className="flex gap-6">
                <a href="https://www.instagram.com/enter_the_blender" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-inter text-sm hover:text-neutral-500 transition-colors">
                  <Instagram size={20} />
                  <span>Instagram</span>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61576905283069" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-inter text-sm hover:text-neutral-500 transition-colors">
                  <Facebook size={20} />
                  <span>Facebook</span>
                </a>
              </div>
            </div>

            <div className="w-full h-64 bg-neutral-200 mt-8 relative overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144.9837584944886!2d23.717871076518625!3d37.98585267191562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bd433413c359%3A0x9c3e3e3e3e3e3e3e!2sOdisseos%2014%2C%20Athina%20104%2037%2C%20Greece!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Blender Location"
              />
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white p-8 md:p-12 border border-neutral-100">
            <h3 className="font-oswald text-2xl uppercase mb-8">Send a Message</h3>

            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle className="w-10 h-10 text-neutral-900 mb-4" />
                <p className="font-oswald text-xl uppercase mb-2">Message Sent</p>
                <p className="font-inter text-sm text-neutral-500">We'll get back to you soon.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-xs font-oswald uppercase tracking-widest border-b border-neutral-400 pb-0.5 hover:border-neutral-900 transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">First Name</label>
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => setF({ firstName: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Last Name</label>
                    <input
                      type="text"
                      value={form.lastName}
                      onChange={(e) => setF({ lastName: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setF({ email: e.target.value })}
                    required
                    className={inputCls}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Message *</label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setF({ message: e.target.value })}
                    required
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-xs font-inter text-red-600 border-l-2 border-red-500 pl-3 py-1 bg-red-50">
                    {errorMsg}
                  </p>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex items-center justify-center gap-2 bg-neutral-900 text-white py-4 font-oswald uppercase tracking-widest text-sm hover:bg-neutral-800 transition-colors disabled:opacity-50"
                  >
                    {status === 'sending' && <Loader2 className="w-4 h-4 animate-spin" />}
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
