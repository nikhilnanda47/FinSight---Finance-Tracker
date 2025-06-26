// src/pages/Home.jsx

import { Link } from "react-router-dom";
import dashboard_logo from "/src/assets/dashboard_logo.svg";
import { motion, useAnimation } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const faqData = [
  {
    question: "Is FinSight free to use?",
    answer:
      "Yes! FinSight is completely free for individual users. Premium features may be introduced later for advanced tools.",
  },
  {
    question: "Can I use FinSight on my phone?",
    answer:
      "Absolutely. FinSight is fully responsive and works smoothly on mobile, tablet, and desktop devices.",
  },
  {
    question: "How secure is my financial data?",
    answer:
      "Your privacy is our priority. All data is encrypted and stored securely. We never share your information with third parties.",
  },
  {
    question: "Can I export my transactions?",
    answer:
      "Yes, FinSight allows you to export your data to CSV for offline analysis and backup.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-gray-800">
      {/* Navbar */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 shadow-md bg-white">
        <Link to="/" className="flex items-center">
          <img
            src="/src/assets/finsight_logo.png"
            alt="FinSight Logo"
            className="w-8 h-8 mr-2"
          />
          <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight">
            FinSight
          </h1>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-5 py-2 rounded-md border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-200 shadow"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-16 bg-gray-50">
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            <span className="mr-2">Take Control of Your</span>
            <span className="text-blue-600">
              <Typewriter
                words={["Finances", "Spending", "Budget", "Goals", "Savings"]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={60}
                delaySpeed={1200}
              />
            </span>{" "}
            with FinSight 💰
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Easily track your income and expenses, set budget goals, and view
            personalized insights with our clean and powerful dashboard.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-200"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-md hover:bg-blue-50 transition duration-200"
            >
              Already have an account?
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 mb-10 md:mb-0">
          <img
            src={dashboard_logo}
            alt="Dashboard Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="px-6 md:px-16 py-20 bg-white">
        <h3 className="text-4xl font-extrabold text-center mb-14 text-gray-800">
          Why <span className="text-blue-600">FinSight</span>?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Feature Card 1 */}
          <div className="group p-6 rounded-xl border border-gray-200 shadow hover:shadow-xl transition duration-300 bg-gradient-to-tr from-white to-blue-50">
            <div className="w-14 h-14 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 text-2xl mb-4 transition group-hover:scale-110">
              💸
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Track Every Transaction
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Log income and expenses in real-time with categorized tracking and
              notes for better insight.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="group p-6 rounded-xl border border-gray-200 shadow hover:shadow-xl transition duration-300 bg-gradient-to-tr from-white to-blue-50">
            <div className="w-14 h-14 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 text-2xl mb-4 transition group-hover:scale-110">
              📊
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Visual Reports
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Use beautiful and dynamic charts to understand your spending
              habits and plan for the future.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="group p-6 rounded-xl border border-gray-200 shadow hover:shadow-xl transition duration-300 bg-gradient-to-tr from-white to-blue-50">
            <div className="w-14 h-14 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 text-2xl mb-4 transition group-hover:scale-110">
              ⚠️
            </div>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Smart Budget Alerts
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Set monthly spending limits and receive alerts before you exceed
              them to stay on track.
            </p>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="px-6 md:px-16 py-20 bg-gray-50 overflow-hidden">
        <h3 className="text-4xl font-extrabold text-center mb-14 text-gray-800">
          What Our <span className="text-blue-600">Users Say</span>
        </h3>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            }}
          >
            {[...Array(2)].flatMap(() =>
              [0, 1, 2, 3].map((index) => (
                <div
                  key={`${index}-${Math.random()}`}
                  className="flex-none w-[300px] bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition"
                >
                  <p className="text-gray-700 text-base italic">
                    {
                      [
                        "FinSight helped me save more every month with simple visuals and easy tracking!",
                        "My budgeting game changed after switching to FinSight. Highly recommend it.",
                        "The alerts saved me from overspending. Feels like I hired a financial coach!",
                        "Simple, beautiful, and powerful. Best money management tool I’ve used so far.",
                      ][index]
                    }
                  </p>
                  <div className="mt-4 flex items-center">
                    <img
                      src={
                        [
                          "https://randomuser.me/api/portraits/women/68.jpg",
                          "https://randomuser.me/api/portraits/men/44.jpg",
                          "https://randomuser.me/api/portraits/men/75.jpg",
                          "https://randomuser.me/api/portraits/women/45.jpg",
                        ][index]
                      }
                      alt="User"
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {
                          [
                            "Priya Sharma",
                            "Rahul Kumar",
                            "Amit Mehra",
                            "Sneha Das",
                          ][index]
                        }
                      </p>
                      <p className="text-xs text-gray-500">
                        {
                          [
                            "Freelancer",
                            "Software Dev",
                            "Finance Analyst",
                            "Teacher",
                          ][index]
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        </div>
      </section>
      <section className="w-full bg-white py-20 px-4 md:px-8 lg:px-20 xl:px-32">
        <h3 className="text-4xl font-extrabold text-center mb-14 text-gray-800">
          Frequently Asked <span className="text-blue-600">Questions</span>
        </h3>

        <div className="space-y-6">
          {faqData.map((faq, index) => {
            const controls = useAnimation();
            const [ref, inView] = useInView({
              triggerOnce: true,
              threshold: 0.1,
            });

            useEffect(() => {
              if (inView) {
                controls.start({ opacity: 1, y: 0 });
              }
            }, [inView, controls]);

            return (
              <motion.div
                key={index}
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={controls}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Disclosure>
                  {({ open }) => (
                    <div className="border rounded-lg overflow-hidden">
                      <Disclosure.Button className="flex justify-between w-full px-6 py-4 text-left text-lg font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition duration-200">
                        <span>{faq.question}</span>
                        <ChevronUpIcon
                          className={`w-5 h-5 transform transition-transform duration-200 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-6 pb-4 pt-2 text-gray-700 bg-white">
                        {faq.answer}
                      </Disclosure.Panel>
                    </div>
                  )}
                </Disclosure>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-sm text-gray-500 bg-gray-100">
        Made with ❤️ by FinSight Team | © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
