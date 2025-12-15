"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type ContactFormValues = {
  name: string;
  email: string;
  subject?: string;
  message: string;
  choice: string;       // dropdown
  confirmSubmit: boolean; // checkbox
};

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    defaultValues: {
      choice: "num1",
      confirmSubmit: false,
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    setIsSuccess(false);
    console.log("Contact form submitted:", data);
    setIsSuccess(true);
    reset({ choice: "num1", confirmSubmit: false });
  };

  return (
    <section className="w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-lg">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-[#303030] to-[#494949] px-6 py-6 text-white sm:px-8 sm:py-8">
        <p className="text-xs uppercase tracking-wide text-gray-300">
          Get in touch
        </p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          Have a question or feedback?
        </h1>
        <p className="mt-2 text-sm text-gray-300 sm:text-base">
          Fill out the form below and the team will respond as soon as
          possible.
          <span className="ml-1 text-red-400">*</span> fields are required.
        </p>
      </div>

      {/* Form section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 px-6 py-6 sm:px-8 sm:py-8"
      >
        {/* Name */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-800">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Your full name"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#8E7571]"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
          />
          {errors.name && (
            <p className="text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-800">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#8E7571]"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Dropdown (simple choices) */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-800">
            Choose an option
          </label>
          <select
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#8E7571]"
            {...register("choice")}
          >
            <option value="num1">num1</option>
            <option value="num2">num2</option>
            <option value="num3">num3</option>
          </select>
        </div>

        {/* Subject */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-800">
            Subject (optional)
          </label>
          <input
            type="text"
            placeholder="What is this about?"
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#8E7571]"
            {...register("subject", {
              maxLength: {
                value: 100,
                message: "Subject must be at most 100 characters",
              },
            })}
          />
          {errors.subject && (
            <p className="text-xs text-red-600">{errors.subject.message}</p>
          )}
        </div>

        {/* Message / Suggestion */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-800">
            Any Suggestion <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={5}
            placeholder="Write your suggestions here..."
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#8E7571]"
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters",
              },
            })}
          />
          {errors.message && (
            <p className="text-xs text-red-600">{errors.message.message}</p>
          )}
        </div>

        {/* Confirm checkbox */}
        <div className="space-y-1">
          <label className="flex items-center gap-2 text-sm text-gray-800">
            <input
              type="checkbox"
              {...register("confirmSubmit", {
                required: "Please confirm before submitting",
              })}
            />
            <span>Are you sure you want to submit?</span>
          </label>
          {errors.confirmSubmit && (
            <p className="text-xs text-red-600">
              {errors.confirmSubmit.message as string}
            </p>
          )}
        </div>

        {/* Success message */}
        {isSuccess && (
          <p className="text-sm text-green-600">
            Thank you! Your message has been sent.
          </p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-sm bg-[#0E0C0B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#5C4A47] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
      </form>
    </section>
  );
}
