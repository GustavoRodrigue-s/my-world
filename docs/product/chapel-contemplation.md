# Capela — what it becomes when it reopens

Ideas kept for later (decided direction in [ADR 0008](../architecture/adr/0008-chapel-becomes-contemplation.md);
the details below are **not** decided). Migrated from Notion "Propósito".

## Landing

A real, very beautiful chapel, animated: scrolling changes the scenes, with
background music that starts only when the visitor chooses to "enter". It shows
the life of Jesus, the Holy Family, the Passion (a pain that had meaning, for
whoever is there), the Church, the saints and the angels.

Proposed arc (to decide): door → nave and stained glass (life and family) → the
Passion (the light falls) → the resurrection (the light returns) → the Church,
saints and angels → the letter → lighting a candle. In practice it follows the
mysteries of the rosary.

## The letter

At the end, a letter from Gustavo about this love, inviting the reader to make
the blood that was shed worth it. It is the first of the **letters** area.

## Candles of intention

A visitor lights a candle and leaves an intention, named or anonymous, and
Gustavo prays for it. **Intentions are private**: the public sees only the lit
candles; the text is read only by Gustavo. Ideas: a candle stays lit for 9 days
(a novena) and can be marked "rezada".

Backend when needed: Next.js API routes on Vercel plus a small database.

## Other ideas

The Angelus at 6h, 12h and 18h; a guided rosary; a minute of silence.

## Care

- Music: Gregorian chant, Palestrina, Allegri are public domain, but the
  **recordings** must be free too.
- Intentions talk about faith and health — **sensitive data under the LGPD**.
- Spam protection for the candles.

## Visual references

The Scrovegni Chapel (Giotto) and the Maestà (Duccio), both public domain —
Duccio's Last Supper already lives in the current Capela.
