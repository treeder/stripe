# stripe

Super lightweight JavaScript Stripe library. 

## Setup

```sh
npm install treeder/stripe
```

Or in browser:

```html
import {Stripe} from "https://cdn.jsdelivr.net/gh/treeder/stripe@0/api.js"
```

## Usage

Just use any endpoint from the Stripe docs and you're good to go.

For example:

```js
let stripe = new Stripe(env.STRIPE_SECRET_KEY)
let price = await stripe.fetch(c, `/v1/prices/${priceID}`)
```
