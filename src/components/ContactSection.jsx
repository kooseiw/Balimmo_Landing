// Static replacement for the original Livewire contact form.
export default function ContactSection() {
  return (
    <section id="contact" className="section-pad">
      <div className="container-x">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:gap-16">
          {/* Left: copy + image */}
          <div className="w-full space-y-6 text-center lg:sticky lg:top-28 lg:text-left">
            <h2 className="text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
              Let our team guide you
            </h2>
            <p className="text-primary">
              Book a free consultation with our experts and let us find your dream villa together.
            </p>
            <img
              src="/landing/assets/img/other/contact-us-thumb.avif"
              alt="Let our team guide you"
              className="mx-auto h-auto w-full rounded-lg object-cover lg:mx-0"
            />
          </div>

          {/* Right: static form */}
          <div className="w-full">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-5 rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100 sm:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-primary">First name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-primary">Last name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-primary">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-primary">Phone</label>
                <input
                  type="tel"
                  placeholder="+62 ..."
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-primary">Message</label>
                <textarea
                  rows="4"
                  placeholder="Tell us about your project..."
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-accent"
                />
              </div>

              <button type="submit" className="btn-solid w-full">
                Send my request
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
