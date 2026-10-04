/**
 * Frequently asked questions. Answers state only what is known and point
 * everything else to the enquiry, never to a future update.
 */

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: 'Where exactly is Samodus Hotels?',
    a: 'At 15 Ademosu Street in the Sabo area of Sagamu, Ogun State. Sagamu sits on the Lagos–Ibadan Expressway, roughly an hour from Lagos mainland in normal traffic and under an hour from Ibadan. Use the directions link on the Location page for turn-by-turn navigation.',
  },
  {
    q: 'How do I book?',
    a: 'Send your dates through the Book page. The hotel replies with availability and the nightly rate, and you confirm directly with reception. There is no online payment on this website.',
  },
  {
    q: 'What are check-in and check-out times?',
    a: 'They are given with your booking confirmation. If you expect to arrive late at night or need an early check-in, say so in your enquiry.',
  },
  {
    q: 'Is there power at night?',
    a: 'The hotel runs a generator when the public supply is off. Rooms are air conditioned.',
  },
  {
    q: 'Do rooms have their own bathroom?',
    a: 'Yes. Every room is en-suite, with a television and air conditioning.',
  },
  {
    q: 'Is there parking, Wi-Fi or food on site?',
    a: 'Ask in your enquiry and reception will confirm what is available during your stay. Only facilities the hotel has confirmed to us are listed on this site.',
  },
  {
    q: 'Can I book several rooms for a wedding or ceremony?',
    a: 'Yes. Put the number of rooms and the dates in your enquiry and the hotel will quote for the group.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'Payment is made to the hotel, not through this website. Confirm the accepted methods, usually transfer or cash, when the hotel replies to your enquiry.',
  },
];
