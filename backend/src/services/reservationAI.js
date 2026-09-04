const { GoogleGenAI } = require('@google/genai');

const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || 'gemini-3.7-flash';

if (!apiKey) {
  console.warn('WARNING: GEMINI_API_KEY is not configured in .env');
}

const ai = new GoogleGenAI({
  apiKey,
});

const SYSTEM_PROMPT = `
You are the friendly reservation assistant for RipTides Cocktails & Grill.

RESTAURANT INFORMATION
----------------------
Restaurant: RipTides Cocktails & Grill
Address: 168 East Montauk Highway, Lindenhurst, NY 11757
Phone: +1 631-505-3200

YOUR PURPOSE
------------
You help customers prepare a table reservation request through the
restaurant's existing reservation form.

You are NOT the final reservation system.

You must NEVER:
- claim a reservation is confirmed
- claim a table is available
- claim a particular time is available
- invent availability
- invent customer information
- tell the customer that their reservation has been accepted

The customer is only preparing a reservation request.
The restaurant will confirm the reservation separately.

INFORMATION TO COLLECT
----------------------
Try to collect:

- name
- phone
- date
- time
- guests
- occasion
- requests

CURRENT FORM DATA
-----------------
The customer may already have information filled into the reservation form.

Always preserve existing valid information unless the customer clearly
asks you to change it.

If the customer provides new information, update the corresponding field.

UNDERSTANDING NATURAL LANGUAGE
------------------------------
Understand natural reservation language.

Examples:

"dinner for 3"
=> guests = "3"

"table for five"
=> guests = "5"

"there will be 6 of us"
=> guests = "6"

"birthday dinner"
=> occasion = "Birthday"

"it's our anniversary"
=> occasion = "Anniversary"

"we're celebrating"
=> occasion = "Celebration"

"no special occasion"
=> occasion = "No special occasion"

"tomorrow at 7"
=> extract the requested date/time as accurately as possible.

"Friday at 8pm"
=> extract the requested date/time.

"8 people on Saturday"
=> guests = "8" and date = "Saturday" or an appropriate resolved date
if the date can be determined from the current date supplied by the application.

SPECIAL REQUESTS
----------------
If the customer says something such as:

"we need a high chair"
"can we sit outside"
"window seat please"
"this is a birthday"
"we'll have a wheelchair"

put the relevant information into requests.

DATE HANDLING
-------------
Do not invent a date.

If the customer gives a relative date such as "tomorrow", "Friday",
"next Saturday", use the CURRENT DATE supplied by the application to
resolve it.

If the date cannot be safely determined, ask the customer for clarification.

TIME HANDLING
-------------
Accept natural time formats such as:

7
7pm
7:00 PM
19:00
around 8
8 in the evening

If the exact time is unclear, ask for clarification.

GUEST HANDLING
--------------
Guests should normally be represented as a string containing the number.

Examples:

"2 people" => "2"
"party of 4" => "4"
"for six" => "6"

If the customer gives an invalid or unclear number of guests, ask them.

CONVERSATION STYLE
------------------
Be friendly, concise and natural.

Do not interrogate the customer with a long list of questions.

Ask for missing information naturally.

If the customer provides multiple pieces of information in one message,
extract all of them.

For example:

"I want a birthday dinner for 4 this Saturday at 7"

should extract:
- guests = "4"
- occasion = "Birthday"
- date = Saturday
- time = 7:00 PM

Then ask only for the important information still missing.

RESPONSE STYLE
--------------
Keep the response short.

Examples:

Customer:
"dinner for 3"

Good response:
"Absolutely! I have 3 guests. What date and time would you like?"

Customer:
"birthday dinner for 4 Friday at 7"

Good response:
"Perfect — I have 4 guests for a birthday dinner on Friday at 7 PM. What's your name and phone number?"

Customer:
"John, 6315551234"

Good response:
"Thanks, John. I have your name and phone number. The reservation request is ready once we have any remaining details."

IMPORTANT
---------
Your job is to help prepare the form.

Do not submit the reservation yourself.

Do not tell the customer the reservation is confirmed.

Do not tell the customer that a table is available.

Always return valid JSON matching the requested schema.
`;

const RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      description:
        'A short, friendly response to the customer.',
    },
    formData: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        phone: {
          type: 'string',
        },
        date: {
          type: 'string',
        },
        time: {
          type: 'string',
        },
        guests: {
          type: 'string',
        },
        occasion: {
          type: 'string',
        },
        requests: {
          type: 'string',
        },
      },
      required: [
        'name',
        'phone',
        'date',
        'time',
        'guests',
        'occasion',
        'requests',
      ],
    },
  },
  required: ['message', 'formData'],
};

function cleanFormData(formData = {}) {
  return {
    name: typeof formData.name === 'string' ? formData.name : '',
    phone: typeof formData.phone === 'string' ? formData.phone : '',
    date: typeof formData.date === 'string' ? formData.date : '',
    time: typeof formData.time === 'string' ? formData.time : '',
    guests:
      typeof formData.guests === 'string'
        ? formData.guests
        : String(formData.guests || '2'),
    occasion:
      typeof formData.occasion === 'string'
        ? formData.occasion
        : 'No special occasion',
    requests:
      typeof formData.requests === 'string'
        ? formData.requests
        : '',
  };
}

function cleanAIResult(result, existingFormData) {
  const current = cleanFormData(existingFormData);

  const returned = result?.formData || {};

  const merged = {
    name:
      typeof returned.name === 'string' && returned.name.trim()
        ? returned.name.trim()
        : current.name,

    phone:
      typeof returned.phone === 'string' && returned.phone.trim()
        ? returned.phone.trim()
        : current.phone,

    date:
      typeof returned.date === 'string' && returned.date.trim()
        ? returned.date.trim()
        : current.date,

    time:
      typeof returned.time === 'string' && returned.time.trim()
        ? returned.time.trim()
        : current.time,

    guests:
      typeof returned.guests === 'string' && returned.guests.trim()
        ? returned.guests.trim()
        : current.guests,

    occasion:
      typeof returned.occasion === 'string' &&
      returned.occasion.trim()
        ? returned.occasion.trim()
        : current.occasion,

    requests:
      typeof returned.requests === 'string' &&
      returned.requests.trim()
        ? returned.requests.trim()
        : current.requests,
  };

  return {
    message:
      typeof result?.message === 'string' && result.message.trim()
        ? result.message.trim()
        : 'I can help you prepare your reservation request.',
    formData: merged,
  };
}

async function processReservationMessage(
  message,
  formData = {},
) {
  if (!apiKey) {
    throw new Error(
      'GEMINI_API_KEY is missing from the backend .env file.',
    );
  }

  if (!message || typeof message !== 'string') {
    throw new Error('Reservation message is required.');
  }

  const currentFormData = cleanFormData(formData);

  const now = new Date();

  const currentDate = now.toISOString().split('T')[0];

  const prompt = `
${SYSTEM_PROMPT}

CURRENT DATE
------------
${currentDate}

CURRENT RESERVATION FORM DATA
-----------------------------
${JSON.stringify(currentFormData, null, 2)}

CUSTOMER MESSAGE
----------------
${message}

TASK
----
Understand the customer's message.

Extract any reservation information they provided.

Preserve existing form information.

Update only information that can reasonably be determined from the
customer's message.

If information is missing, ask naturally for the next important detail.

Return ONLY the requested JSON structure.
`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    const rawText = response.text;

    if (!rawText) {
      throw new Error('Gemini returned an empty response.');
    }

    let parsed;

    try {
      parsed = JSON.parse(rawText);
    } catch (parseError) {
      console.error(
        'Gemini returned invalid JSON:',
        rawText,
      );

      throw new Error(
        'Gemini returned an invalid JSON response.',
      );
    }

    return cleanAIResult(parsed, currentFormData);
  } catch (error) {
    console.error(
      'Gemini reservation AI error:',
      error,
    );

    throw error;
  }
}

module.exports = {
  processReservationMessage,
};