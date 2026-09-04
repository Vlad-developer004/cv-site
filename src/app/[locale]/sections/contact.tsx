'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, Send } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { TiltCard } from '@/components/tilt-card';
import { GithubIcon } from '@/components/icons';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function Contact() {
  const { t } = useTranslation('contact');
  const email = t('email', { ns: 'contact' });
  const github = t('github', { ns: 'contact' });
  const form = t('form', { ns: 'contact', returnObjects: true }) as Record<string, string>;

  const [name, setName] = useState('');
  const [replyTo, setReplyTo] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!accessKey) {
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${replyTo})`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email: replyTo,
          message,
          subject: `Portfolio contact from ${name}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setName('');
        setReplyTo('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="section-divider relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklch,var(--primary)_16%,transparent),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t('eyebrow', { ns: 'contact' })}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {t('headingLead', { ns: 'contact' })}{' '}
              <span className="text-primary">{t('headingAccent', { ns: 'contact' })}</span>{' '}
              {t('headingMid', { ns: 'contact' })}{' '}
              <span className="font-serif italic font-normal">{t('headingItalic', { ns: 'contact' })}</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              {t('description', { ns: 'contact' })}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <Reveal delay={0.06}>
            <TiltCard className="h-full" disableTilt>
              <form onSubmit={onSubmit} className="flex h-full flex-col gap-4 p-6">
                <div>
                  <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
                    {form.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={form.namePlaceholder}
                    className="mt-1.5 w-full rounded-lg border border-border bg-background/50 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/50"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
                    {form.emailLabel}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={replyTo}
                    onChange={(e) => setReplyTo(e.target.value)}
                    placeholder={form.emailPlaceholder}
                    className="mt-1.5 w-full rounded-lg border border-border bg-background/50 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/50"
                  />
                </div>

                <div className="flex flex-1 flex-col">
                  <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
                    {form.messageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={form.messagePlaceholder}
                    rows={5}
                    className="mt-1.5 w-full flex-1 resize-none rounded-lg border border-border bg-background/50 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary/50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-shine group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                >
                  {status === 'sending' ? form.sending : form.submit}
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                {status === 'success' && (
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">{form.success}</p>
                )}
                {status === 'error' && <p className="text-sm text-red-500">{form.error}</p>}
              </form>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex h-full flex-col gap-4">
              <div className="glass rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-foreground">
                  {t('infoHeading', { ns: 'contact' })}
                </h3>
                <div className="mt-4 space-y-4">
                  <a href={`mailto:${email}`} className="flex items-center gap-3 group">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-muted-foreground">{form.emailLabel}</span>
                      <span className="block truncate text-sm font-medium text-foreground group-hover:text-primary">
                        {email}
                      </span>
                    </span>
                  </a>

                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs text-muted-foreground">
                        {t('locationLabel', { ns: 'contact' })}
                      </span>
                      <span className="block text-sm font-medium text-foreground">
                        {t('location', { ns: 'contact' })}
                      </span>
                    </span>
                  </div>

                  <a
                    href={`https://github.com/${github}`}
                    className="flex items-center gap-3 group"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <GithubIcon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs text-muted-foreground">GitHub</span>
                      <span className="block text-sm font-medium text-foreground group-hover:text-primary">
                        {github}
                      </span>
                    </span>
                  </a>
                </div>
              </div>

              <div className="glass rounded-2xl p-6">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  {t('availabilityHeading', { ns: 'contact' })}
                </span>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {t('availabilityDescription', { ns: 'contact' })}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
