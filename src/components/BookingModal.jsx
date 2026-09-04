import { useEffect, useState } from 'react';

const INITIAL_FORM_DATA = {
  name: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
  occasion: 'No special occasion',
  requests: '',
};

const RESTAURANT_PHONE = '+16315053200';

const INITIAL_AI_MESSAGE = {
  role: 'assistant',
  content:
    "Hi! I'm the RipTides reservation assistant. I can help you choose a date, time, guest count, and occasion, then automatically submit your reservation request once I have everything I need.",
};

export default function BookingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // ---------------------------------------------------------
  // AI ASSISTANT STATE
  // ---------------------------------------------------------

  const [aiOpen, setAiOpen] = useState(false);

  const [aiInput, setAiInput] = useState('');

  const [aiMessages, setAiMessages] = useState([
    INITIAL_AI_MESSAGE,
  ]);

  const [aiLoading, setAiLoading] = useState(false);

  // ---------------------------------------------------------
  // CLOSE WITH ESCAPE + LOCK BACKGROUND SCROLL
  // ---------------------------------------------------------

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  // ---------------------------------------------------------
  // RESET WHEN MODAL CLOSES
  // ---------------------------------------------------------

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);

      setFormData(INITIAL_FORM_DATA);

      setAiOpen(false);

      setAiInput('');

      setAiLoading(false);

      setSubmitting(false);

      setSubmitError('');

      setAiMessages([
        INITIAL_AI_MESSAGE,
      ]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // ---------------------------------------------------------
  // NORMAL FORM HANDLER
  // ---------------------------------------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------------------------------------------------------
  // CHECK IF AI HAS EVERYTHING REQUIRED
  // ---------------------------------------------------------

  const isReservationComplete = (data) => {
    return Boolean(
      data?.name?.trim() &&
        data?.phone?.trim() &&
        data?.date?.trim() &&
        data?.time?.trim() &&
        data?.guests?.toString().trim(),
    );
  };

  // ---------------------------------------------------------
  // SUBMIT RESERVATION TO WEB3FORMS
  // ---------------------------------------------------------

  const submitReservation = async (reservationData) => {
    setSubmitting(true);

    setSubmitError('');

    const accessKey =
      import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setSubmitError(
        'The reservation form is not configured yet. Please call RipTides directly.',
      );

      setSubmitting(false);

      return false;
    }

    const message = [
      'NEW RIPTIDES RESERVATION REQUEST',
      '',
      `Name: ${reservationData.name}`,
      `Phone: ${reservationData.phone}`,
      `Date: ${reservationData.date}`,
      `Time: ${reservationData.time}`,
      `Guests: ${reservationData.guests}`,
      `Occasion: ${
        reservationData.occasion ||
        'No special occasion'
      }`,
      `Special Requests: ${
        reservationData.requests || 'None'
      }`,
      '',
      'IMPORTANT:',
      'This is a reservation request only.',
      'The table is NOT confirmed until RipTides confirms availability with the customer.',
    ].join('\n');

    try {
      console.log(
        'Submitting reservation request to Web3Forms...',
      );

      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },

          body: JSON.stringify({
            access_key: accessKey,

            subject:
              'New Table Reservation Request from RipTides Website',

            from_name: 'RipTides Website',

            name: reservationData.name,

            phone: reservationData.phone,

            date: reservationData.date,

            time: reservationData.time,

            guests: reservationData.guests,

            occasion:
              reservationData.occasion ||
              'No special occasion',

            requests:
              reservationData.requests ||
              'None',

            message,
          }),
        },
      );

      const result = await response.json();

      console.log(
        'Web3Forms response:',
        result,
      );

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            'Unable to send reservation request.',
        );
      }

      // -----------------------------------------------------
      // SUCCESS
      // -----------------------------------------------------

      setFormData(reservationData);

      setSubmitted(true);

      setSubmitError('');

      return true;
    } catch (error) {
      console.error(
        'Reservation submission failed:',
        error,
      );

      setSubmitError(
        'We could not send your reservation request. Please try again or call (631) 505-3200.',
      );

      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // ---------------------------------------------------------
  // NORMAL MANUAL RESERVATION SUBMISSION
  // ---------------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    await submitReservation(formData);
  };

  // ---------------------------------------------------------
  // AI RESERVATION ASSISTANT
  // ---------------------------------------------------------

  const handleAiSend = async (event) => {
    event.preventDefault();

    console.log('================================');
    console.log('AI SEND CLICKED');
    console.log('================================');

    const message = aiInput.trim();

    if (!message) {
      console.log(
        'AI send stopped: message is empty.',
      );

      return;
    }

    if (aiLoading || submitting) {
      console.log(
        'AI send stopped: request already processing.',
      );

      return;
    }

    // -------------------------------------------------------
    // SHOW CUSTOMER MESSAGE
    // -------------------------------------------------------

    setAiInput('');

    setAiMessages((prev) => [
      ...prev,

      {
        role: 'user',
        content: message,
      },
    ]);

    setAiLoading(true);

    try {
      // -----------------------------------------------------
      // AI BACKEND URL
      // -----------------------------------------------------

      const aiUrl =
        import.meta.env.VITE_RESERVATION_AI_URL ||
        'http://localhost:5000/api/reservation-ai';

      console.log(
        'AI URL:',
        aiUrl,
      );

      console.log(
        'AI message:',
        message,
      );

      console.log(
        'Current form data:',
        formData,
      );

      const requestBody = {
        message,

        formData,
      };

      console.log(
        'AI request body:',
        requestBody,
      );

      // -----------------------------------------------------
      // SEND TO GEMINI BACKEND
      // -----------------------------------------------------

      const response = await fetch(
        aiUrl,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',

            Accept:
              'application/json',
          },

          body: JSON.stringify(
            requestBody,
          ),
        },
      );

      console.log(
        'AI HTTP status:',
        response.status,
      );

      const responseText =
        await response.text();

      console.log(
        'Raw AI response:',
        responseText,
      );

      let result;

      try {
        result =
          JSON.parse(responseText);
      } catch (parseError) {
        console.error(
          'Could not parse AI response:',
          parseError,
        );

        throw new Error(
          `Backend returned invalid JSON. HTTP ${response.status}`,
        );
      }

      console.log(
        'Parsed AI response:',
        result,
      );

      if (!response.ok) {
        throw new Error(
          result?.message ||
            result?.detail ||
            `AI request failed with HTTP ${response.status}`,
        );
      }

      if (result.success === false) {
        throw new Error(
          result?.message ||
            'The AI backend returned an unsuccessful response.',
        );
      }

      // -----------------------------------------------------
      // MERGE AI FORM DATA
      // -----------------------------------------------------

      let updatedFormData = {
        ...formData,
      };

      if (result.formData) {
        console.log(
          'AI returned form data:',
          result.formData,
        );

        updatedFormData = {
          ...formData,

          ...Object.fromEntries(
            Object.entries(
              result.formData,
            ).filter(
              ([, value]) =>
                value !== undefined &&
                value !== null &&
                value !== '',
            ),
          ),
        };

        setFormData(
          updatedFormData,
        );
      }

      // -----------------------------------------------------
      // SHOW AI RESPONSE
      // -----------------------------------------------------

      if (result.message) {
        setAiMessages((prev) => [
          ...prev,

          {
            role: 'assistant',

            content:
              result.message,
          },
        ]);
      }

      // -----------------------------------------------------
      // CHECK IF RESERVATION IS COMPLETE
      // -----------------------------------------------------

      const complete =
        isReservationComplete(
          updatedFormData,
        );

      console.log(
        'Reservation complete:',
        complete,
      );

      // -----------------------------------------------------
      // AUTOMATIC AI SUBMISSION
      // -----------------------------------------------------

      if (complete) {
        console.log(
          '================================',
        );

        console.log(
          'AI HAS ALL REQUIRED DETAILS',
        );

        console.log(
          'AUTOMATICALLY SUBMITTING RESERVATION',
        );

        console.log(
          '================================',
        );

        // ---------------------------------------------------
        // TELL CUSTOMER WHAT IS HAPPENING
        // ---------------------------------------------------

        setAiMessages((prev) => [
          ...prev,

          {
            role: 'assistant',

            content:
              'Perfect! I have everything I need. I’m submitting your reservation request now. Your table is not confirmed yet — the RipTides team will review availability and contact you to confirm.',
          },
        ]);

        // ---------------------------------------------------
        // SUBMIT AUTOMATICALLY
        // ---------------------------------------------------

        const success =
          await submitReservation(
            updatedFormData,
          );

        // ---------------------------------------------------
        // IF SUBMISSION FAILED
        // ---------------------------------------------------

        if (!success) {
          setAiMessages((prev) => [
            ...prev,

            {
              role: 'assistant',

              content:
                'I could not send the reservation request right now. Please try again or call RipTides at (631) 505-3200.',
            },
          ]);
        }
      }
    } catch (error) {
      console.error(
        '================================',
      );

      console.error(
        'RESERVATION AI ERROR',
      );

      console.error(
        '================================',
      );

      console.error(
        'Error:',
        error,
      );

      console.error(
        'Error name:',
        error?.name,
      );

      console.error(
        'Error message:',
        error?.message,
      );

      console.error(
        'Error stack:',
        error?.stack,
      );

      setAiMessages((prev) => [
        ...prev,

        {
          role: 'assistant',

          content:
            `Connection error: ${
              error?.message ||
              'Unable to connect to the reservation assistant.'
            }`,
        },
      ]);
    } finally {
      setAiLoading(false);

      console.log(
        'AI loading finished.',
      );
    }
  };

  // ---------------------------------------------------------
  // TODAY
  // ---------------------------------------------------------

  const today = new Date()
    .toISOString()
    .split('T')[0];

  // ---------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      {/* =====================================================
          BACKDROP
      ===================================================== */}

      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[#001421]/75 backdrop-blur-sm"
        aria-label="Close booking window"
      />

      {/* =====================================================
          MODAL
      ===================================================== */}

      <div className="relative z-10 flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] bg-white text-[#06283d] shadow-2xl">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="relative shrink-0 overflow-hidden bg-[#06283d] px-6 py-6 sm:px-8 sm:py-7">

          {/* Decorative glow */}

          <div
            className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#0093b2]/30 blur-3xl"
            aria-hidden="true"
          />

          <div
            className="absolute -bottom-24 left-1/3 h-40 w-40 rounded-full bg-[#5ed7e5]/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 flex items-start justify-between gap-5">

            <div className="min-w-0">

              <div className="mb-3 flex items-center gap-2">

                <span className="h-1 w-8 rounded-full bg-[#5ed7e5]" />

                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#5ed7e5]">
                  RESERVATIONS
                </span>

              </div>

              <h2
                id="booking-modal-title"
                className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl"
              >
                Book A Table
              </h2>

              <p className="mt-2 max-w-md text-sm font-medium leading-6 text-slate-300">
                Request a table at RipTides Cocktails & Grill.
              </p>

            </div>

            {/* Close */}

            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl font-light text-white transition-all hover:scale-105 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5ed7e5]"
              aria-label="Close booking window"
            >
              <span aria-hidden="true">
                ×
              </span>
            </button>

          </div>
        </div>

        {/* ===================================================
            SCROLLABLE CONTENT
        =================================================== */}

        <div className="min-h-0 flex-1 overflow-y-auto">

          <div className="p-6 sm:p-8">

            {submitted ? (

              /* =================================================
                 SUCCESS STATE
              ================================================= */

              <div className="py-4 text-center sm:py-8">

                {/* Success icon */}

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e5f7fa] text-4xl text-[#008fa8] ring-8 ring-[#f2fbfc]">
                  ✓
                </div>

                <p className="section-kicker mt-7">
                  REQUEST RECEIVED
                </p>

                <h3 className="mt-2 text-3xl font-black tracking-tight text-[#06283d]">
                  Thanks, {formData.name}!
                </h3>

                <p className="mx-auto mt-4 max-w-md text-sm font-medium leading-7 text-slate-600 sm:text-base">
                  Your reservation request has been received.
                  Our team will contact you at{' '}
                  <strong className="text-[#06283d]">
                    {formData.phone}
                  </strong>{' '}
                  to confirm availability.
                </p>

                {/* Reservation summary */}

                <div className="mx-auto mt-7 max-w-md rounded-2xl border border-slate-200 bg-[#f7f4ec] p-5 text-left sm:p-6">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#06283d] text-lg text-white">
                      📅
                    </div>

                    <div>

                      <p className="text-xs font-black uppercase tracking-widest text-[#008fa8]">
                        REQUESTED RESERVATION
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#06283d]">
                        We'll confirm your table by phone.
                      </p>

                    </div>

                  </div>

                  <div className="mt-5 space-y-3">

                    <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3 text-sm">

                      <span className="font-bold text-slate-500">
                        Date
                      </span>

                      <span className="text-right font-black text-[#06283d]">
                        {formData.date}
                      </span>

                    </div>

                    <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3 text-sm">

                      <span className="font-bold text-slate-500">
                        Time
                      </span>

                      <span className="text-right font-black text-[#06283d]">
                        {formData.time}
                      </span>

                    </div>

                    <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3 text-sm">

                      <span className="font-bold text-slate-500">
                        Guests
                      </span>

                      <span className="text-right font-black text-[#06283d]">
                        {formData.guests}
                      </span>

                    </div>

                    {formData.occasion &&
                      formData.occasion !==
                        'No special occasion' && (

                        <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3 text-sm">

                          <span className="font-bold text-slate-500">
                            Occasion
                          </span>

                          <span className="text-right font-black text-[#06283d]">
                            {formData.occasion}
                          </span>

                        </div>
                      )}

                    {formData.requests && (

                      <div className="pt-1 text-sm">

                        <span className="font-bold text-slate-500">
                          Special request
                        </span>

                        <p className="mt-1 font-medium leading-6 text-[#06283d]">
                          {formData.requests}
                        </p>

                      </div>
                    )}

                  </div>
                </div>

                {/* Confirmation notice */}

                <div className="mx-auto mt-6 max-w-md rounded-2xl border border-[#0093b2]/20 bg-[#e5f7fa]/70 p-4 text-left">

                  <div className="flex items-start gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-base shadow-sm">
                      ℹ️
                    </div>

                    <div>

                      <p className="text-sm font-black text-[#06283d]">
                        Your table is not confirmed yet
                      </p>

                      <p className="mt-1 text-xs font-medium leading-5 text-slate-600 sm:text-sm">
                        The RipTides team will review availability and contact you directly to confirm your table.
                      </p>

                    </div>

                  </div>

                </div>

                <div className="mx-auto mt-7 max-w-md">

                  <p className="text-xs font-medium text-slate-500">
                    Need an immediate answer?
                  </p>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">

                    <a
                      href={`tel:${RESTAURANT_PHONE}`}
                      className="btn-gold justify-center"
                    >
                      CALL (631) 505-3200
                    </a>

                    <button
                      type="button"
                      onClick={onClose}
                      className="btn-secondary justify-center"
                    >
                      CLOSE
                    </button>

                  </div>

                </div>

              </div>

            ) : (

              /* =================================================
                 RESERVATION FORM
              ================================================= */

              <>

                <div className="mb-7">

                  <p className="section-kicker">
                    REQUEST YOUR TABLE
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-[#06283d] sm:text-3xl">
                    Tell Us When You'd Like to Visit
                  </h3>

                  <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-slate-600">
                    Fill out the form below and our team will contact you to confirm availability.
                  </p>

                </div>

                {/* =================================================
                    AI RESERVATION ASSISTANT
                ================================================= */}

                <div className="mb-6 overflow-hidden rounded-2xl border border-[#0093b2]/20 bg-[#e5f7fa]/60">

                  <button
                    type="button"
                    onClick={() =>
                      setAiOpen(
                        (prev) => !prev,
                      )
                    }
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-[#e5f7fa]"
                    aria-expanded={aiOpen}
                  >

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#06283d] text-lg text-white">
                        🤖
                      </div>

                      <div className="min-w-0">

                        <p className="text-sm font-black text-[#06283d]">
                          Need help with your reservation?
                        </p>

                        <p className="mt-0.5 text-xs font-medium text-slate-600">
                          Ask our AI assistant — it can complete and submit the request for you.
                        </p>

                      </div>

                    </div>

                    <span
                      className="shrink-0 text-lg font-black text-[#008fa8]"
                      aria-hidden="true"
                    >
                      {aiOpen
                        ? '−'
                        : '+'}
                    </span>

                  </button>

                  {aiOpen && (

                    <div className="border-t border-[#0093b2]/15 bg-white p-4">

                      {/* =================================================
                          CHAT MESSAGES
                      ================================================= */}

                      <div
                        className="max-h-56 space-y-3 overflow-y-auto rounded-xl bg-slate-50 p-3"
                        aria-live="polite"
                      >

                        {aiMessages.map(
                          (
                            item,
                            index,
                          ) => (

                            <div
                              key={`${item.role}-${index}`}
                              className={`flex ${
                                item.role ===
                                'user'
                                  ? 'justify-end'
                                  : 'justify-start'
                              }`}
                            >

                              <div
                                className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm font-medium leading-5 ${
                                  item.role ===
                                  'user'
                                    ? 'bg-[#06283d] text-white'
                                    : 'border border-slate-200 bg-white text-[#06283d]'
                                }`}
                              >
                                {item.content}
                              </div>

                            </div>
                          ),
                        )}

                        {aiLoading && (

                          <div className="flex justify-start">

                            <div className="rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-bold text-slate-500">
                              Thinking…
                            </div>

                          </div>
                        )}

                        {submitting && (

                          <div className="flex justify-start">

                            <div className="rounded-2xl border border-[#0093b2]/20 bg-[#e5f7fa] px-3.5 py-2.5 text-sm font-bold text-[#06283d]">
                              Sending your reservation request…
                            </div>

                          </div>
                        )}

                      </div>

                      {/* =================================================
                          AI INPUT
                      ================================================= */}

                      <form
                        onSubmit={
                          handleAiSend
                        }
                        className="mt-3 flex gap-2"
                      >

                        <input
                          value={
                            aiInput
                          }
                          onChange={(
                            event,
                          ) =>
                            setAiInput(
                              event
                                .target
                                .value,
                            )
                          }
                          disabled={
                            aiLoading ||
                            submitting
                          }
                          placeholder="e.g. Dinner for 4 on Friday at 7 PM"
                          className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-[#06283d] outline-none placeholder:text-slate-400 focus:border-[#0093b2] focus:ring-2 focus:ring-[#0093b2]/20"
                          aria-label="Ask the reservation assistant"
                        />

                        <button
                          type="submit"
                          disabled={
                            aiLoading ||
                            submitting ||
                            !aiInput.trim()
                          }
                          className="shrink-0 rounded-xl bg-[#0093b2] px-4 py-3 text-sm font-black text-white transition hover:bg-[#007a93] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {aiLoading
                            ? '...'
                            : 'SEND'}
                        </button>

                      </form>

                      <p className="mt-2 text-[11px] font-medium leading-4 text-slate-500">
                        AI can complete and submit your reservation request automatically. Your table is only confirmed after RipTides confirms availability.
                      </p>

                    </div>
                  )}

                </div>

                {/* =================================================
                    MAIN RESERVATION FORM
                ================================================= */}

                <form
                  onSubmit={
                    handleSubmit
                  }
                  className="space-y-5"
                >

                  {/* =================================================
                     NAME + PHONE
                  ================================================= */}

                  <div className="grid gap-5 sm:grid-cols-2">

                    <div>

                      <label
                        htmlFor="booking-name"
                        className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600"
                      >
                        Full Name{' '}
                        <span aria-hidden="true">
                          *
                        </span>
                      </label>

                      <input
                        id="booking-name"
                        name="name"
                        type="text"
                        required
                        value={
                          formData.name
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Your name"
                        autoComplete="name"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 font-medium text-[#06283d] outline-none transition-all placeholder:text-slate-400 focus:border-[#0093b2] focus:bg-white focus:ring-2 focus:ring-[#0093b2]/20"
                      />

                    </div>

                    <div>

                      <label
                        htmlFor="booking-phone"
                        className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600"
                      >
                        Phone Number{' '}
                        <span aria-hidden="true">
                          *
                        </span>
                      </label>

                      <input
                        id="booking-phone"
                        name="phone"
                        type="tel"
                        required
                        value={
                          formData.phone
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="(631) 555-1234"
                        autoComplete="tel"
                        inputMode="tel"
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 font-medium text-[#06283d] outline-none transition-all placeholder:text-slate-400 focus:border-[#0093b2] focus:bg-white focus:ring-2 focus:ring-[#0093b2]/20"
                      />

                    </div>

                  </div>

                  {/* =================================================
                     DATE + TIME + GUESTS
                  ================================================= */}

                  <div className="grid gap-5 sm:grid-cols-3">

                    <div>

                      <label
                        htmlFor="booking-date"
                        className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600"
                      >
                        Date{' '}
                        <span aria-hidden="true">
                          *
                        </span>
                      </label>

                      <input
                        id="booking-date"
                        name="date"
                        type="date"
                        required
                        min={today}
                        value={
                          formData.date
                        }
                        onChange={
                          handleChange
                        }
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3.5 font-medium text-[#06283d] outline-none transition-all focus:border-[#0093b2] focus:bg-white focus:ring-2 focus:ring-[#0093b2]/20"
                      />

                    </div>

                    <div>

                      <label
                        htmlFor="booking-time"
                        className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600"
                      >
                        Time{' '}
                        <span aria-hidden="true">
                          *
                        </span>
                      </label>

                      <input
                        id="booking-time"
                        name="time"
                        type="time"
                        required
                        value={
                          formData.time
                        }
                        onChange={
                          handleChange
                        }
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3.5 font-medium text-[#06283d] outline-none transition-all focus:border-[#0093b2] focus:bg-white focus:ring-2 focus:ring-[#0093b2]/20"
                      />

                    </div>

                    <div>

                      <label
                        htmlFor="booking-guests"
                        className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600"
                      >
                        Guests{' '}
                        <span aria-hidden="true">
                          *
                        </span>
                      </label>

                      <select
                        id="booking-guests"
                        name="guests"
                        required
                        value={
                          formData.guests
                        }
                        onChange={
                          handleChange
                        }
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3.5 font-medium text-[#06283d] outline-none transition-all focus:border-[#0093b2] focus:bg-white focus:ring-2 focus:ring-[#0093b2]/20"
                      >

                        <option value="1">
                          1 Guest
                        </option>

                        <option value="2">
                          2 Guests
                        </option>

                        <option value="3">
                          3 Guests
                        </option>

                        <option value="4">
                          4 Guests
                        </option>

                        <option value="5">
                          5 Guests
                        </option>

                        <option value="6">
                          6 Guests
                        </option>

                        <option value="7">
                          7 Guests
                        </option>

                        <option value="8">
                          8 Guests
                        </option>

                        <option value="9">
                          9 Guests
                        </option>

                        <option value="10">
                          10 Guests
                        </option>

                        <option value="11">
                          11 Guests
                        </option>

                        <option value="12">
                          12 Guests
                        </option>

                        <option value="13+">
                          13+ Guests
                        </option>

                      </select>

                    </div>

                  </div>

                  {/* =================================================
                     OCCASION
                  ================================================= */}

                  <div>

                    <label
                      htmlFor="booking-occasion"
                      className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600"
                    >
                      What is this booking for?{' '}
                      <span className="font-medium normal-case tracking-normal text-slate-400">
                        (Optional)
                      </span>
                    </label>

                    <select
                      id="booking-occasion"
                      name="occasion"
                      value={
                        formData.occasion
                      }
                      onChange={
                        handleChange
                      }
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 font-medium text-[#06283d] outline-none transition-all focus:border-[#0093b2] focus:bg-white focus:ring-2 focus:ring-[#0093b2]/20"
                    >

                      <option>
                        No special occasion
                      </option>

                      <option>
                        Birthday
                      </option>

                      <option>
                        Anniversary
                      </option>

                      <option>
                        Date Night
                      </option>

                      <option>
                        Graduation
                      </option>

                      <option>
                        Family Celebration
                      </option>

                      <option>
                        Engagement
                      </option>

                      <option>
                        Business / Corporate
                      </option>

                      <option>
                        Private Celebration
                      </option>

                      <option>
                        Other
                      </option>

                    </select>

                  </div>

                  {/* =================================================
                     SPECIAL REQUESTS
                  ================================================= */}

                  <div>

                    <label
                      htmlFor="booking-requests"
                      className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-600"
                    >
                      Special Requests{' '}
                      <span className="font-medium normal-case tracking-normal text-slate-400">
                        (Optional)
                      </span>
                    </label>

                    <textarea
                      id="booking-requests"
                      name="requests"
                      rows={4}
                      value={
                        formData.requests
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Birthday, outdoor seating, accessibility needs, etc."
                      className="w-full resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 font-medium text-[#06283d] outline-none transition-all placeholder:text-slate-400 focus:border-[#0093b2] focus:bg-white focus:ring-2 focus:ring-[#0093b2]/20"
                    />

                  </div>

                  {/* =================================================
                     IMPORTANT NOTICE
                  ================================================= */}

                  <div className="rounded-2xl border border-[#0093b2]/20 bg-[#e5f7fa]/60 p-4 sm:p-5">

                    <div className="flex items-start gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-base shadow-sm">
                        ℹ️
                      </div>

                      <div>

                        <p className="text-sm font-black text-[#06283d]">
                          Reservation request
                        </p>

                        <p className="mt-1 text-xs font-medium leading-5 text-slate-600 sm:text-sm">
                          This form sends a{' '}
                          <strong className="text-[#06283d]">
                            reservation request
                          </strong>
                          . Your table is not confirmed until RipTides confirms availability with you.
                        </p>

                      </div>

                    </div>

                  </div>

                  {submitError && (

                    <div
                      className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium leading-6 text-red-700"
                      role="alert"
                    >
                      {submitError}
                    </div>

                  )}

                  {/* =================================================
                     MANUAL SUBMIT
                  ================================================= */}

                  <button
                    type="submit"
                    disabled={
                      submitting
                    }
                    className="btn-primary w-full justify-center !py-4 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {submitting
                      ? 'SENDING REQUEST…'
                      : 'REQUEST RESERVATION'}

                    {!submitting && (

                      <span aria-hidden="true">
                        →
                      </span>

                    )}

                  </button>

                </form>

                {/* =================================================
                   OR CALL
                ================================================= */}

                <div className="my-7 flex items-center gap-4">

                  <div className="h-px flex-1 bg-slate-200" />

                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                    OR
                  </span>

                  <div className="h-px flex-1 bg-slate-200" />

                </div>

                <div className="rounded-2xl border border-slate-200 bg-[#f7f4ec] p-5 sm:p-6">

                  <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#06283d] text-xl text-white">
                      📞
                    </div>

                    <div className="min-w-0">

                      <h3 className="text-lg font-black text-[#06283d]">
                        Prefer to call?
                      </h3>

                      <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
                        For immediate availability or large parties, call our team directly.
                      </p>

                      <a
                        href={`tel:${RESTAURANT_PHONE}`}
                        className="mt-4 inline-flex items-center rounded-full bg-[#06283d] px-5 py-2.5 text-sm font-black text-white transition-all hover:-translate-y-0.5 hover:bg-[#002b45]"
                      >
                        (631) 505-3200
                      </a>

                    </div>

                  </div>

                </div>

                {/* =================================================
                   RESTAURANT INFO
                ================================================= */}

                <div className="mt-5 grid gap-4 sm:grid-cols-2">

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">

                    <p className="text-xs font-black uppercase tracking-widest text-[#008fa8]">
                      LOCATION
                    </p>

                    <p className="mt-2 text-sm font-bold leading-6 text-[#06283d]">
                      168 East Montauk Highway
                      <br />
                      Lindenhurst, NY 11757
                    </p>

                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5">

                    <p className="text-xs font-black uppercase tracking-widest text-[#008fa8]">
                      HOURS
                    </p>

                    <p className="mt-2 text-sm font-bold leading-6 text-[#06283d]">
                      Mon: 3:00 PM – 12:00 AM
                      <br />
                      Tue – Sun: 2:00 PM – 12:00 AM
                    </p>

                  </div>

                </div>

                {/* Continue browsing */}

                <button
                  type="button"
                  onClick={
                    onClose
                  }
                  className="mt-6 w-full rounded-full border border-slate-300 bg-white px-6 py-3 font-bold text-slate-600 transition-all hover:border-[#06283d] hover:bg-[#f7f4ec] hover:text-[#06283d]"
                >
                  CONTINUE BROWSING
                </button>

              </>

            )}

          </div>

        </div>

      </div>
    </div>
  );
}