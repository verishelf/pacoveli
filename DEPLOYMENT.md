# Deployment Guide – Pacoveli

## Vercel (Recommended)

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com) and sign in.
3. Click **Add New Project** and import your repository.
4. Use default settings (framework preset: Next.js).
5. Click **Deploy**.

### Post-Deploy Checklist

- [ ] Add audio files to `public/audio/` and update `music.json`
- [ ] Add album artwork to `public/covers/`
- [ ] Add artist photo to `public/images/`
- [ ] Update `site.json` with real social links and contact email
- [ ] Replace placeholder YouTube IDs in `videos.json` with real video IDs
- [ ] (Optional) Configure contact form: add Resend/SendGrid in `api/contact/route.ts`

## Environment Variables

No required variables for basic deployment.

For contact form email delivery, add:

| Variable       | Description                    |
|----------------|--------------------------------|
| `RESEND_API_KEY` | If using Resend for emails   |
| `CONTACT_EMAIL`  | Recipient for form submissions |

## File Size Limits (Vercel)

- **Serverless function**: 50 MB
- **Static assets**: No hard limit, but large audio/video can slow loading

For large media, consider:

- Hosting audio on a CDN (e.g. Cloudflare R2, AWS S3)
- Using external URLs in `music.json` for `audioUrl`
