# Umair Ali — Full-Stack Developer Portfolio (Next.js)

Your resume PDF is already in place (`public/resume.pdf`) — the "Download
Resume" button works out of the box. Add your own photo at
`public/images/profile.jpg` for the hero circle (it shows your initials
"UA" until you do).

## Chalane ka tareeqa (Getting started)

```bash
npm install
npm run dev
```

Phir browser mein `http://localhost:3000` khol lein.

Production build ke liye:

```bash
npm run build
npm start
```

## Apni info dalna (Add your own content)

Sirf **`lib/content.ts`** file edit karein — yehi single file hai jahan se
sara text control hota hai:

- `profile` — naam, role, tagline, email, resume link
- `skills` — apni skills aur % level
- `stack` — tech badges (HTML, CSS, JS, React, Figma, waghera)
- `experience` — kaam ka timeline
- `projects` — har project ka title, description, tags aur video path
- `testimonial` — client quote (hero section mein dikhta hai)

## Apni videos lagana (Adding project videos)

1. Apni demo video ko `.mp4` format mein export karein (720p, 15–30 seconds,
   file size ~15–20MB se kam rakhein taake page fast rahe).
2. File ko `public/videos/` folder mein rakhein, e.g. `project-1.mp4`.
3. `lib/content.ts` mein har project ke `video` field ko us file ke path se
   match karein (`/videos/project-1.mp4`).

Website par har project card par ek play button dikhega — koi bhi visitor
usay click karke video inline play kar sakta hai, download ki zaroorat nahi.

## Resume PDF

Apna resume `public/resume.pdf` naam se rakh dein — "Download Resume" button
usi ko point karta hai.

## Deploy

Sabse aasan tareeqa Vercel hai: GitHub par push karein, phir
vercel.com par import kar ke ek click mein live kar dein.
