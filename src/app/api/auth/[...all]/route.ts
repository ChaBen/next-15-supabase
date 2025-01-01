import { auth } from '@/lib/auth'
import { toNextJsHandler } from 'better-auth/next-js'
import arcjet, { protectSignup } from '@arcjet/next'
import { NextRequest, NextResponse } from 'next/server'

const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  rules: [
    protectSignup({
      email: {
        mode: 'LIVE', // will block requests. Use "DRY_RUN" to log only
        // Block emails that are disposable, invalid, or have no MX records
        block: ['DISPOSABLE', 'INVALID', 'NO_MX_RECORDS'],
      },
      bots: {
        mode: 'LIVE',
        allow: [],
      },
      rateLimit: {
        // uses a sliding window rate limit
        mode: 'LIVE',
        interval: '10m', // counts requests over a 10 minute sliding window
        max: 5, // allows 5 submissions within the window
      },
    }),
  ],
})

export const config = { api: { bodyParser: false } }

const betterAuthHandlers = toNextJsHandler(auth.handler)
const ajProtectedPOST = async (req: NextRequest) => {
  const { email } = await req.clone().json()
  const decision = await aj.protect(req, { email })

  if (decision.isDenied()) {
    if (decision.reason.isEmail()) {
      return NextResponse.json(
        {
          message: 'Invalid email',
          reason: decision.reason,
        },
        { status: 400 },
      )
    } else {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }
  }
  return betterAuthHandlers.POST(req)
}

export { ajProtectedPOST as POST }
export const { GET } = betterAuthHandlers
