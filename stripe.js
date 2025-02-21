
export class Stripe {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error("Stripe API key is required")
    }
    this.apiKey = apiKey
  }

  async fetch(c, path, opts = {}) {
    // -H "Authorization: Bearer {{YOUR_API_KEY}}" \
    // -H "Stripe-Version: 2024-09-30.acacia" \
    let headers = {
      "Authorization": `Bearer ${this.apiKey}`,
      "Stripe-Version": "2025-01-27.acacia",
    }
    if (opts.body) {
      // Stripe doesn't accept JSON!
      // opts.body = JSON.stringify(opts.body)
      console.log(opts.body)
      // let form_data = new FormData()
      // for (var key in opts.body) {
      //   form_data.append(key, opts.body[key])
      // }
      opts.body = objectToFormData(opts.body)
      // const data = new URLSearchParams(new FormData(formElement))
      opts.body = new URLSearchParams(opts.body)
      headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    opts = {
      ...opts,
      headers: {
        ...headers,
        ...opts.headers,
      },
    }
    let u = `https://api.stripe.com${path}`
    console.log(u, opts)
    let r = await fetch(u, opts)

    if (!r.ok) {
      c.data.logger.log(await r.text())
      throw new Error(`Error with Stripe: ${r.status}`)
    }
    return await r.json()
  }

}

function objectToFormData(obj, form, namespace) {
  let fd = form || new FormData()
  let formKey

  for (let property in obj) {
    if (!obj.hasOwnProperty(property)) {
      continue
    }

    if (namespace) {
      formKey = namespace + '[' + property + ']'
    } else {
      formKey = property
    }

    if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
      objectToFormData(obj[property], fd, formKey)
    } else {
      fd.append(formKey, obj[property])
    }
  }
  return fd
}