'use client';

import { useState, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, CheckCircle2, Clock, Copy, Mail, MapPin, MessageSquare, Send, User } from 'lucide-react';
import { Reveal } from '@/components/reveal';
import { TiltCard } from '@/components/tilt-card';
import { Confetti } from '@/components/confetti';
import { GithubIcon, LinkedinIcon } from '@/components/icons';

type Status = 'idle' | 'sending' | 'success' | 'error';

const CONTACT_TONE = {
  email: { icon: 'bg-sky-500/10 text-sky-500', accent: '#0ea5e9' },
  location: { icon: 'bg-rose-500/10 text-rose-500', accent: '#f43f5e' },
  github: { icon: 'bg-foreground/10 text-foreground', accent: '#94a3b8' },
  linkedin: { icon: 'bg-[#0A66C2]/10 text-[#0A66C2]', accent: '#0A66C2' },
};

const FORM_TONE = {
  name: '#6366f1',
  email: '#0ea5e9',
  message: '#14b8a6',
};

const MESSAGE_MAX_LENGTH = 2000;

export function Contact() {
  const { t } = useTranslation('contact');
  const email = t('email', { ns: 'contact' });
  const github = t('github', { ns: 'contact' });
  const form = t('form', { ns: 'contact', returnObjects: true }) as Record<string, string>;

  const [name, setName] = useState('');
  const [replyTo, setReplyTo] = useState('');
  const [message, setMessage] = useState('');
  const [botField, setBotField] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [emailCopied, setEmailCopied] = useState(false);

  async function onCopyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 1500);
    } catch {}
  }

  function onFieldFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const target = e.target;
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (botField) return;

    const cleanName = name.trim();
    const cleanEmail = replyTo.trim();
    const cleanMessage = message.trim();
    if (!cleanName || !cleanEmail || !cleanMessage) return;

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!accessKey) {
      const subject = encodeURIComponent(`Portfolio contact from ${cleanName}`);
      const body = encodeURIComponent(`${cleanMessage}\n\n— ${cleanName} (${cleanEmail})`);
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
          name: cleanName,
          email: cleanEmail,
          message: cleanMessage,
          subject: `Portfolio contact from ${cleanName}`,
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
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_oklch,var(--primary)_70%,transparent)_25%,color-mix(in_oklch,var(--primary)_70%,transparent)_75%,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklch,var(--primary)_16%,transparent),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-24">
        <Reveal>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {t('eyebrow', { ns: 'contact' })}
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:mt-3 sm:text-4xl">
              {t('headingLead', { ns: 'contact' })}{' '}
              <span className="text-primary">{t('headingAccent', { ns: 'contact' })}</span>{' '}
              {t('headingMid', { ns: 'contact' })}{' '}
              <span className="font-serif italic font-normal">{t('headingItalic', { ns: 'contact' })}</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              {t('description', { ns: 'contact' })}
            </p>
            <span className="mx-auto mt-4 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-primary" />
              {t('responseTimeNote', { ns: 'contact' })}
            </span>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <Reveal delay={0.06}>
            <TiltCard className="h-full" disableTilt>
              <form onSubmit={onSubmit} className="flex h-full flex-col gap-4 p-6">
                <input
                  type="text"
                  name="company"
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
                      {form.nameLabel}
                    </label>
                    <div className="relative mt-1.5">
                      <User
                        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
                        style={{ color: FORM_TONE.name }}
                      />
                      <input
                        id="contact-name"
                        type="text"
                        required
                        maxLength={100}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={onFieldFocus}
                        placeholder={form.namePlaceholder}
                        style={{ '--field-accent': FORM_TONE.name } as CSSProperties}
                        className="w-full rounded-lg border border-border bg-background/50 py-2.5 pl-10 pr-3.5 text-sm outline-none transition-all focus:border-(--field-accent) focus:ring-4 focus:ring-[color-mix(in_oklch,var(--field-accent)_12%,transparent)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
                      {form.emailLabel}
                    </label>
                    <div className="relative mt-1.5">
                      <Mail
                        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
                        style={{ color: FORM_TONE.email }}
                      />
                      <input
                        id="contact-email"
                        type="email"
                        required
                        maxLength={150}
                        value={replyTo}
                        onChange={(e) => setReplyTo(e.target.value)}
                        onFocus={onFieldFocus}
                        placeholder={form.emailPlaceholder}
                        style={{ '--field-accent': FORM_TONE.email } as CSSProperties}
                        className="w-full rounded-lg border border-border bg-background/50 py-2.5 pl-10 pr-3.5 text-sm outline-none transition-all focus:border-(--field-accent) focus:ring-4 focus:ring-[color-mix(in_oklch,var(--field-accent)_12%,transparent)]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-center justify-between">
                    <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
                      {form.messageLabel}
                    </label>
                    <span
                      className={`text-xs tabular-nums ${
                        message.length >= MESSAGE_MAX_LENGTH ? 'text-red-500' : 'text-muted-foreground'
                      }`}
                    >
                      {message.length}/{MESSAGE_MAX_LENGTH}
                    </span>
                  </div>
                  <div className="relative mt-1.5 flex flex-1 flex-col">
                    <MessageSquare
                      className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4"
                      style={{ color: FORM_TONE.message }}
                    />
                    <textarea
                      id="contact-message"
                      required
                      maxLength={MESSAGE_MAX_LENGTH}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onFocus={onFieldFocus}
                      placeholder={form.messagePlaceholder}
                      rows={5}
                      style={{ '--field-accent': FORM_TONE.message } as CSSProperties}
                      className="w-full flex-1 resize-none rounded-lg border border-border bg-background/50 py-2.5 pl-10 pr-3.5 text-sm outline-none transition-all focus:border-(--field-accent) focus:ring-4 focus:ring-[color-mix(in_oklch,var(--field-accent)_12%,transparent)]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-shine group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 sm:w-auto"
                >
                  {status === 'sending' ? form.sending : form.submit}
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                {status === 'success' && (
                  <div className="relative flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                    <Confetti />
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    <div>
                      <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        {form.successTitle}
                      </p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{form.successDetail}</p>
                    </div>
                  </div>
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
                  <div className="flex items-center gap-3">
                    <a href={`mailto:${email}`} className="group flex min-w-0 flex-1 items-center gap-3">
                      <span
                        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 ${CONTACT_TONE.email.icon}`}
                        style={{ boxShadow: `0 4px 14px -6px ${CONTACT_TONE.email.accent}66` }}
                      >
                        <Mail className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs text-muted-foreground">{form.emailLabel}</span>
                        <span className="block truncate text-sm font-medium text-foreground group-hover:text-primary">
                          {email}
                        </span>
                      </span>
                    </a>
                    <button
                      type="button"
                      onClick={onCopyEmail}
                      aria-label={form.copyEmail}
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      {emailCopied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>

                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${CONTACT_TONE.location.icon}`}
                      style={{ boxShadow: `0 4px 14px -6px ${CONTACT_TONE.location.accent}66` }}
                    >
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-muted-foreground">
                        {t('locationLabel', { ns: 'contact' })}
                      </span>
                      <span className="block truncate text-sm font-medium text-foreground">
                        {t('location', { ns: 'contact' })}
                      </span>
                    </span>
                  </div>

                  <a
                    href={`https://github.com/${github}`}
                    className="group flex min-w-0 items-center gap-3"
                  >
                    <span
                      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 ${CONTACT_TONE.github.icon}`}
                      style={{ boxShadow: `0 4px 14px -6px ${CONTACT_TONE.github.accent}66` }}
                    >
                      <GithubIcon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-muted-foreground">GitHub</span>
                      <span className="block truncate text-sm font-medium text-foreground group-hover:text-primary">
                        {github}
                      </span>
                    </span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/vladyslav-tieriekhov"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-w-0 items-center gap-3"
                  >
                    <span
                      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 ${CONTACT_TONE.linkedin.icon}`}
                      style={{ boxShadow: `0 4px 14px -6px ${CONTACT_TONE.linkedin.accent}66` }}
                    >
                      <LinkedinIcon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-muted-foreground">LinkedIn</span>
                      <span className="block truncate text-sm font-medium text-foreground group-hover:text-primary">
                        vladyslav-tieriekhov
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
